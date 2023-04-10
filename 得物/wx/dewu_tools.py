# -*- coding: utf-8 -*-
# @Author  : cx
# @Date    : 2022/8/9 10:39
# Software : PyCharm
# version：Python 3.7.6

"""

 _______________&&&&&&&&&_______________________
 ______________&&&&&&&&&&&&_____________________
 ______________&&&&&&&&&&&&&____________________
 _____________&&__&&&&&&&&&&&___________________
 ____________&&&__&&&&&&_&&&&&__________________
 ____________&&&_&&&&&&&___&&&&_________________
 ___________&&&__&&&&&&&&&&_&&&&________________
 __________&&&&__&&&&&&&&&&&_&&&&_______________
 ________&&&&&___&&&&&&&&&&&__&&&&&_____________
 _______&&&&&&___&&&_&&&&&&&&___&&&&&___________
 _______&&&&&___&&&___&&&&&&&&___&&&&&&_________
 ______&&&&&&___&&&__&&&&&&&&&&&___&&&&&&_______
 _____&&&&&&___&&&&_&&&&&&&&&&&&&&__&&&&&&______
 ____&&&&&&&__&&&&&&&&&&&&&&&&&&&&&_&&&&&&&_____
 ____&&&&&&&__&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&____
 ___&&&&&&&__&&&&&&_&&&&&&&&&&&&&&&&&_&&&&&&&___
 ___&&&&&&&__&&&&&&_&&&&&&_&&&&&&&&&___&&&&&&___
 ___&&&&&&&____&&__&&&&&&___&&&&&&_____&&&&&&___
 ___&&&&&&&________&&&&&&____&&&&&_____&&&&&____
 ____&&&&&&________&&&&&_____&&&&&_____&&&&_____
 _____&&&&&________&&&&______&&&&&_____&&&______
 ______&&&&&______;&&&________&&&______&________
 ________&&_______&&&&________&&&&______________

"""

import json
import random
import string
import time

import execjs
import requests

from loguru import logger
from requests.adapters import HTTPAdapter

Referer = 'https://servicewechat.com/wx3c12cdd0ae8b1a7b/381/page-frame.html'

def random_obj_r():
    """
    加wx:_Teemo1202
    :return:
    """
    pass


def get_ip(key=''):
    res = requests.get(
        f"https://sch.shanchendaili.com/api.html?action=get_ip&key={key}&time=1&count=1&protocol=http&type=text&textSep=1&only=0",timeout=5).text
    ip = res.strip()
    ip = {'http': "http://" + ip, 'https': "http://" + ip}
    # ip = {'http': "http://13482744668:13482744668@" + ip, 'https': "http://13482744668:13482744668@" + ip}
    # ip = {}
    logger.info(f"ip===>{ip}")
    return ip


def payload_data(obj_r):
    payload_data_url = "http://127.0.0.1:3000/payload_data"
    data = {
        'obj_r': obj_r
    }
    while 1:
        try:
            response = requests.post(payload_data_url, data=data, timeout=3)
            # logger.info(f"payload_data===>{response.text[:100]}")
            if response.status_code == 200:
                return response.text
            else:
                return ""
        except Exception as e:
            logger.info(f"payload_data_err===>{str(e)[:200]}")
            time.sleep(1)
            continue


def sk_aesDecrypt(text, sk_key):
    sk_aesDecrypt_url = "http://127.0.0.1:3000/sk_aesDecrypt"
    data = {
        "text": text,
        "sk_key": sk_key,
    }
    while 1:
        try:
            response = requests.post(sk_aesDecrypt_url, data=data, timeout=3)
            # logger.info(f"sk_aesDecrypt===>{response.text[:100]}")
            if response.status_code == 200:
                return response.text
            else:
                logger.info(f"sk_aesDecrypt_request_err===>{response.status_code}")
                return ""
        except Exception as e:
            logger.info(f"sk_aesDecrypt_err===>{str(e)[:200]}")
            time.sleep(1)
            continue


def skDecrypt(sk_decrypt):
    skDecrypt_url = "http://127.0.0.1:3000/skDecrypt"
    data = {
        "sk_decrypt": sk_decrypt,
    }
    while 1:
        try:
            response = requests.post(skDecrypt_url, data=data, timeout=3)
            # logger.info(f"skDecrypt===>{response.text[:100]}")
            if response.status_code == 200:
                return response.text
            else:
                return ""
        except Exception as e:
            logger.info(f"skDecrypt_err===>{str(e)[:200]}")
            time.sleep(1)
            continue


def get_sign(data):
    sign_url = "http://127.0.0.1:3000/sign"
    data = {
        "data": json.dumps(data)
    }
    while 1:
        try:
            response = requests.post(sign_url, data=data, timeout=3)
            # logger.info(f"get_sign===>{response.text[:100]}")
            if response.status_code == 200:
                return response.text
            else:
                return ""
        except Exception as e:
            logger.info(f"get_sign_err===>{str(e)[:200]}")
            time.sleep(1)
            continue


def get_sk(proxies, obj_r, ua):
    """
    生成随机sk
    """
    # return ""
    sk_url = "https://dav.dewu.com/webSk"
    headers = {
        'Host': 'dav.dewu.com',
        'charset': 'utf-8',
        'dsn': 'p=w&bcn=dewu',
        "User-Agent": ua,
        'content-type': 'application/json',
        'Referer': Referer,
    }

    json_data = payload_data(json.dumps(obj_r))

    json_data = json.loads(json_data)

    sk_key = json_data.get("sk_key")
    iud = json_data.get("iud")
    json_data = {'data': json_data.get("data")}

    try:
        response = requests.post(sk_url, headers=headers, json=json_data, proxies=proxies,
                                 timeout=3)
    except requests.exceptions.RequestException as e:
        logger.info(f"get sk req err===>{str(e)}")
        return "", iud
    sk_data = sk_aesDecrypt(response.text, sk_key)
    sk_decrypt = json.loads(json.loads(sk_data))['k']
    sk = skDecrypt(sk_decrypt)
    logger.info(f"sk===>{sk}")
    return sk, iud


def get_ltk(iud, obj_r):
    get_ltk_url = "http://127.0.0.1:3000/get_ltk"
    data = {
        "iud": iud,
        "obj_r": json.dumps(obj_r)
    }
    while 1:
        try:
            response = requests.post(get_ltk_url, data=data, timeout=3)
            if response.status_code == 200:
                return response.text
            else:
                return ""
        except Exception as e:
            logger.info(f"Fun110_err===>{str(e)[:200]}")
            time.sleep(1)
            continue


def Fun110_1008(t, e, n, r):
    sign_url = "http://127.0.0.1:3000/Fun110_1008"
    data = {
        't': t,
        'e': e,
        'n': n,
        'r': json.dumps(r),
    }
    while 1:
        try:
            response = requests.post(sign_url, data=data, timeout=3)
            # logger.info(f"Fun110_1008===>{response.text[:100]}")
            if response.status_code == 200:
                return response.text
            else:
                return ""
        except Exception as e:
            logger.info(f"Fun110_1008_err===>{str(e)[:200]}")
            time.sleep(1)
            continue
