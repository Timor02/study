# -*- coding: utf-8 -*-
# @Author  : cx
# @Date    : 2023/4/10 10:02
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
import time
import random
import string

import requests
from loguru import logger
from dewu_tools import get_sk, get_sign, random_obj_r, get_ip, sk_aesDecrypt, Fun110_1008, get_ltk, Referer

def init_risk():
    while 1:
        proxies = get_ip()
        if not proxies:
            time.sleep(5)
            continue
        obj_r_info = random_obj_r()
        ua = obj_r_info['ua']
        obj_r = obj_r_info['system_info']
        sk, iud = get_sk(proxies, obj_r, ua)
        return proxies, sk, obj_r, ua, iud

def keyword_search_spider(keyword,page):
    search_url = 'https://app.dewu.com/api/v1/h5/search/fire/search/list'
    headers = {
        'Host': 'app.dewu.com',
        'charset': 'utf-8',
        'appversion': '5.3.0',
        'platform': 'h5',
        'wxapp-route-id': '[object Undefined]',
        'appid': 'wxapp',
        'content-type': 'application/json',
        'sks': '1,xdw2',
        'Referer': Referer,
    }

    proxies, sk, obj_r, ua, iud = init_risk()

    headers['User-Agent'] = ua

    params = {
        # 'sign': '9bd87e5585237834e836a9ed0502c2b7',
        'title': f'{keyword}',
        'page': f'{page}',
        'sortType': '1',
        'sortMode': '1',
        'limit': '20',
        'showHot': '1',
    }
    params.update({
        "sign": get_sign(params)
    })
    headers.update({"sk": sk, })
    ltk = get_ltk(iud, obj_r)
    logger.info(f"ltk===>{ltk}")
    headers['ltk'] = ltk
    tmp = Fun110_1008(json.dumps(params), "GET", "wx", obj_r)
    tmp = json.loads(tmp)
    params = json.loads(tmp['d'])
    # return
    try:
        response = requests.get(search_url, params=params, headers=headers, proxies=proxies, timeout=3)
    except requests.exceptions.RequestException as e:
        logger.info(f"keyword search req err===>{str(e)}")
        return
    res_data = sk_aesDecrypt(response.text, tmp['a'])
    print(res_data)


if __name__ == '__main__':
    keyword_search_spider("nike",1)