import random
import requests
import time
from urllib.parse import quote
import hashlib


class Check():
    def __init__(self, rid):
        self.rid = rid
        self.check_url = "http://www.xiaohongshu.com/api/sns/v1/system_service/slide_captcha_check"
        self.params = {'rid': rid, 'platform': 'Android',
                       'deviceId': 'a53db11d-1928-3bc1-9cd5-d4d58c3fc0b0',
                       'device_fingerprint': '202011131152366fd135a2d35983939e1d11135f040bab01064c2fb1873dd9',
                       'device_fingerprint1': '202011131152366fd135a2d35983939e1d11135f040bab01064c2fb1873dd9',
                       'versionName': '5.26.0', 'channel': 'GooglePlay', 'sid': 'session.1607670322462357054214',
                       'lang': 'zh-Hans', 't': str(int(time.time()))}
        self.headers = {
            'Host': 'www.xiaohongshu.com',
            'authorization': 'session.1607670322462357054214',
            'device_id': 'a53db11d-1928-3bc1-9cd5-d4d58c3fc0b0',
            'user-agent': 'Dalvik/2.1.0 (Linux; U; Android 8.1.0; AOSP on msm8996 Build/OPM1.171019.011) Resolution/1080*1794 Version/5.26.0 Build/5260254 Device/(google;AOSP on msm8996) NetType/WiFi',
        }

    def get_sign(self, params):
        """
        生成所需要的sign
        :param data: 请求参数
        :return: 返回生成的sign值
        """
        device_id = params['deviceId']
        data = {k: params[k] for k in sorted(params.keys())}
        data_str = ''
        for k, v in data.items():
            data_str += '{}={}'.format(k, v)

        # print(data_str)
        data_str = quote(data_str, 'utf-8')
        xor_str = ''
        device_id_length = len(device_id)
        for i in range(len(data_str)):
            data_char = data_str[i]
            device_id_index = int(i % device_id_length)
            device_id_char = device_id[device_id_index]
            rst = ord(device_id_char) ^ ord(data_char)
            xor_str += str(rst)

        md5 = hashlib.md5()
        md5.update(xor_str.encode())
        md5_str = md5.hexdigest()

        md5_str += device_id
        md5 = hashlib.md5()
        md5.update(md5_str.encode())
        return md5.hexdigest()

    def get_shield(self, params):
        """
        获取该参数前，请确保服务已经正常开启了
        获取所需要的shield参数，设备信息相关的不能变动，请求的设备信息也要与这个保持一致
        :param params: 请求参数，格式为 str
        :return: 返回 shield 的值，格式为str
        """
        url = "http://172.16.9.197:8083/xhs/shield"
        # 将带有sign的请求参数按照key的字母表顺序进行排序
        data = {k: params[k] for k in sorted(params.keys())}
        # 拼接成字符串
        data_str = ''
        for k, v in data.items():
            data_str += '{}={}'.format(k, v)
        # print(data_str)

        payload = {
            "deviceId": "a53db11d-1928-3bc1-9cd5-d4d58c3fc0b0",
            "session_Id": "session.1607670322462357054214",
            "userAgent": "Dalvik/2.1.0 (Linux; U; Android 8.1.0; AOSP on msm8996 Build/OPM1.171019.011) Resolution/1080*1794 Version/5.26.0 Build/5260254 Device/(google;AOSP on msm8996) NetType/WiFi",
            "params": data_str
        }
        headers = {
            'Content-Type': 'application/json;charset=UTF-8'
        }
        rsp = requests.request("POST", url, headers=headers, json=payload)
        return rsp.text

    def add_sign_shield(self):
        url_params = {
            "url": "/api/sns/v1/system_service/slide_captcha_check"
        }
        test_sign = self.get_sign(self.params)
        # print(test_sign)

        self.params["sign"] = test_sign

        url_params.update(self.params)
        shield = self.get_shield(url_params)
        self.headers["shield"] = shield
        # print(shield)

    def check(self):
        self.add_sign_shield()
        res = requests.post(url=self.check_url,headers = self.headers,data=self.params)
        return res.text

# if __name__ == '__main__':
#     C = Check('20210111214558930000b7aec9165885')
#     C.check()