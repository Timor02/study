"""
关联分析-抖音
"""

import sys
import time
import json
import base64

import urllib3
import requests

from loguru import logger
from Crypto.Cipher import AES
from urllib.parse import quote

urllib3.disable_warnings()

class Algorithm(object):
    def __init__(self, keywords, timesteamp, body):
        self.canvas_hash = 536919696  # canvas指纹
        self.offset = [24, 18, 12, 6, 0]
        self.timesteamp = timesteamp
        self.us_and_linker_tmp_sign = None
        self.referer = f"trendinsight.oceanengine.com/arithmetic-index/analysis?keyword={quote(keywords)}&tab=correlation"
        self.referer_hash_code = 0
        self.user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36 Edg/99.0.1150.55"
        self.body = json.dumps(body, ensure_ascii=False).replace(" ", "")

    def get_sdb_hash(self, string=None, sdb_value=0, sdb_type=0):
        for i in string:
            if sdb_type == 1:
                sdb_value = (((sdb_value * 65599) + ord(i)) % 0x100000000) >> 0
            elif sdb_type == 0:
                sdb_value = (((sdb_value ^ ord(i)) * 65599) % 0x100000000) >> 0
        return sdb_value

    def get_tmp_code(self, referer_hash_code):
        tmp01 = (referer_hash_code * 65521) ^ int(self.timesteamp)
        tmp02 = (tmp01 % 0x100000000) >> 0
        tmp03 = bin(tmp02).replace("0b", "")
        tmp04 = "10000000110000" + "0" * (32 - len(tmp03)) + tmp03  # 补0
        return int(tmp04, 2)

    def get_num(self, num):
        if 0 <= num < 26:
            s = 65
        elif 26 <= num < 52:
            s = 71
        elif num == 62 or num == 63:
            s = - 17
        else:
            s = -4
        return chr(num + s)

    def get_group_sign(self, code):
        sign = ""
        for offset in self.offset:
            tmp_sign = (code >> offset) & 63
            sign += self.get_offset_code(tmp_sign)
        return sign

    def get_offset_code(self, num):
        if 0 <= num < 26:
            s = 65
        elif 26 <= num < 52:
            s = 71
        elif num == 62 or num == 63:
            s = - 17
        else:
            s = -4
        return chr(num + s)

    def get_sign03(self, code):
        new_canvas_hash = (self.canvas_hash ^ code) >> 6
        sign = self.get_group_sign(-1073741824 ^ new_canvas_hash)
        tmp_sign1 = (code ^ self.canvas_hash) & 63
        sign += self.get_offset_code(tmp_sign1)
        return sign

    def get_sign04(self, code):
        tmp_sdb_hash = self.get_sdb_hash(str(code))
        ua_hash = self.get_sdb_hash(self.user_agent, tmp_sdb_hash)
        ua_tmp_sign = (ua_hash % 65521) << 16
        body_hash = self.get_sdb_hash(self.body, sdb_type=1)
        # print("body_hash: ", body_hash)
        linker = f"body_hash={body_hash}&pathname=/api/open/index/get_relation_word&tt_webid=&uuid="
        linker_hash = self.get_sdb_hash(linker, tmp_sdb_hash)
        self.us_and_linker_tmp_sign = ua_tmp_sign ^ (linker_hash % 65521)
        sign = self.get_group_sign(self.us_and_linker_tmp_sign >> 2)
        return sign

    def get_sign05(self, code):
        """
        s1 = linker_hash % 65521
        s2 = ua_tmp_sign ^ s1
        :param code:
        :return:
        """
        tmp_code = (self.us_and_linker_tmp_sign % 0x100000000) << 28
        tmp_code01 = tmp_code ^ (((code ^ 65824) % 0x100000000) >> 4)
        sign = self.get_group_sign(tmp_code01)
        return sign

    def get_sign(self):
        referer_hash = self.get_sdb_hash(self.timesteamp + self.referer)
        referer_hash_code = referer_hash % 65521
        tmpcode01 = self.get_tmp_code(referer_hash_code)
        # print("big_num: ", tmpcode01)
        sign1 = self.get_group_sign(tmpcode01 >> 2)
        sign2 = self.get_group_sign((tmpcode01 << 28) ^ 515)
        sign3 = self.get_sign03(tmpcode01)
        sign4 = self.get_sign04(tmpcode01)
        sign5 = self.get_sign05(tmpcode01)
        sign6 = self.get_group_sign(referer_hash_code)
        sign7 = "_02B4Z6wo00f01" + sign1 + sign2 + sign3 + sign4 + sign5 + sign6
        sign8 = hex(self.get_sdb_hash(sign7, sdb_type=1))[-2:]
        logger.info("sign => " + sign7 + sign8)
        return sign7 + sign8


# AES-128
def decrtptlx(String):
    iv = "amlheW91LHFpYW53".encode(encoding='utf-8')
    key = 'anN2bXA2NjYsamlh'.encode(encoding='utf-8')
    cryptor = AES.new(key=key, mode=AES.MODE_CFB, IV=iv, segment_size=128)
    decode = base64.b64decode(String)
    plain_text = cryptor.decrypt(decode)
    return plain_text


def get_relation_word_run(keyword, body):
    timesteamp = str(int(time.time()))
    algorithm = Algorithm(keyword, timesteamp, body)
    sign = algorithm.get_sign()
    url = f"https://trendinsight.oceanengine.com/api/open/index/get_relation_word?_signature={sign}"
    headers = {
        'referer': f'https://trendinsight.oceanengine.com/arithmetic-index/analysis?keyword={quote(keyword)}&tab=correlation',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36 Edg/99.0.1150.55',
    }
    try:
        response = requests.post(url, headers=headers, json=body, verify=False, timeout=30,)
    except Exception as e:
        logger.info(f"get_relation request err: {str(e)}")
        return
    try:
        html = response.json()
        item = decrtptlx(html['data']).decode()
    except Exception as e:
        logger.info(f"get_relation json err: {str(e)} {response.text}")
        return
    return item


if __name__ == '__main__':
    keyword = "冰墩墩"
    body = {"param": {"app_name": "aweme", "end_date": "20220327", "keyword": keyword, "start_date": "20220321"}}
    print(get_relation_word_run(keyword, body))
