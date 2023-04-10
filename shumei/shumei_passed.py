import requests
import re
import random
import json
import base64
import cv2
import time
from Crypto.Cipher import DES

from xiaohongshu_check import Check


def encrypt(key, text):
    """
    DES 加密
    :param key: 密钥, 长度必须为 16(AES-128)、24(AES-192)、32(AES-256) Bytes 长度
    :param text: 密文
    :return:
    """
    encrypter = DES.new(key.encode(), DES.MODE_ECB)
    length = 8
    count = len(text)
    if count < length:
        add = (length - count)
        text = text + ('\0' * add)
    elif count > length:
        add = (length - (count % length))
        text = text + ('\0' * add)
    ciphertext = encrypter.encrypt(text.encode())
    return base64.b64encode(ciphertext)


def decrypt(key, text):
    """
    DES 解密
    :param key: 密钥
    :param text: 密文
    :return:
    """
    decrypter = DES.new(key.encode(), DES.MODE_ECB)
    return decrypter.decrypt(text).decode('utf-8')


def des_res(key, text):
    return encrypt(decrypt("sshummei", base64.b64decode(key))[:8], text).decode()


class ShuMei():
    '''
    响应体riskLevel为pass即验证成功
    '''

    def __init__(self, deviceId):
        self.deviceId = deviceId
        self.register_url = "https://captcha.fengkongcloud.com/ca/v1/register"
        self.fverify_url = "https://captcha.fengkongcloud.com/ca/v2/fverify"
        self.img_url = "https://castatic.fengkongcloud.com"
        # self.organization = self.get_organization()
        self.organization = "eR46sBuqF0fdw7KWFLYa"
        self.rid = ''
        self.js_url = self.captcha_js()
        self.header = {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Connection': 'keep-alive',
            'Host': 'captcha.fengkongcloud.com',
            'Referer': 'https://www.ishumei.com/trial/captcha.html',
            'sec-ch-ua': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
            'sec-ch-ua-mobile': '?0',
            'Sec-Fetch-Dest': 'script',
            'Sec-Fetch-Mode': 'no-cors',
            'Sec-Fetch-Site': 'cross-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
        }

        self.imgs_path = ['bg.jpg', 'fg.png']

    def get_organization(self):
        url = "https://www.ishumei.com/trial/captcha.html"
        res = requests.get(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'})
        organization = re.search('organization:"(.*?)"', res.text).group(1)
        # print(f"organization:{organization}")
        return organization

    def get_register_data(self):
        data = {
            'sdkver': '1.1.3',
            'channel': 'GooglePlay',
            'rversion': '1.0.1',
            'model': 'slide',
            'lang': 'zh-cn',
            'data': '{"os":"android","sdkver":"1.1.4","deviceId":"' + self.deviceId + '"}',
            'appId': 'default',
            'callback': f'sm_{int((time.time()) * 1000)}',
            'organization': self.organization,
        }
        res = requests.get(url=self.register_url, headers=self.header, params=data)
        register_data = re.search("sm_\d+\((.*?)\)", res.text).group(1)
        register_data = json.loads(register_data)
        # print(register_data)
        return register_data['detail']

    def save_img(self, img_urls):

        for i in range(2):
            res = requests.get(self.img_url + img_urls[i])
            # print(self.img_url + img_urls[i])
            with open(self.imgs_path[i], 'wb', ) as f_wb:
                f_wb.write(res.content)
                # print(f'{self.imgs_path[i]}图已保存')

    def img_distance(self):
        target = self.imgs_path[0]
        template = self.imgs_path[1]
        target_rgb = cv2.imread(target)
        target_gray = cv2.cvtColor(target_rgb, cv2.COLOR_BGR2GRAY)
        template_rgb = cv2.imread(template, 0)
        res = cv2.matchTemplate(target_gray, template_rgb, cv2.TM_CCOEFF_NORMED)
        value = cv2.minMaxLoc(res)
        distance = value[3][0] + 7
        # print(f"滑块距离：{distance/2}")
        return int(distance / 2)

    def generate_trajectory(self, dis):
        '''
        :param dis:移动距离
        :return: 轨迹数组
        [横坐标,纵坐标,时间10ms累加]
        '''
        tra_list = []
        x = 0
        y = 0
        t = 0
        tra_list.append([x, y, t])
        while 1:
            x += random.randint(0, 30)
            y += random.randint(-5, 5)
            t += random.randint(95, 105)
            if x < dis:
                tra_list.append([x, y, t])
            else:
                tra_list.append([dis, y, t])
                break
        # print(f"轨迹数组:{tra_list}")
        return tra_list

    def captcha_js(self):
        # url = f"https://captcha.fengkongcloud.com/ca/v1/conf?sdkver=1.1.3&organization={self.organization}&appId=default&rversion=1.0.3&lang=zh-cn&channel=DEFAULT&callback=sm_{int(time.time() * 1000)}&model=slide"
        url = f"https://captcha.fengkongcloud.com/ca/v1/conf?lang=zh-cn&organization={self.organization}&channel=GooglePlay&appId=default&callback=sm_{int(time.time() * 1000)}&rversion=1.0.1&sdkver=1.1.3&model=slide"
        res = requests.get(url).text
        js_url = "https://castatic.fengkongcloud.com" + re.search('"js":"(.*?)"}', res).group(1)
        return js_url

    def get_par_name(self):
        html_js = requests.get(self.js_url).text
        list_ = html_js.split(",'}", maxsplit=1)[-1].split(',')
        key_list = []
        for i in list_:
            if '0x' not in i and 4 <= len(i) <= 5 and 'dir' not in i:
                key_list.append(i.replace("'", '')[::-1])
        par_name = key_list[0:13]
        # print('参数:', par_name)
        return par_name

    def get_ver_params(self):

        distance = self.img_distance()
        trajectory = self.generate_trajectory(distance)
        par_name = self.get_par_name()
        ver_params = {
            par_name[3]: distance / 310,
            par_name[4]: trajectory,
            par_name[5]: random.randint(2700, 3500),
            par_name[6]: 310,
            par_name[7]: 155,
            par_name[8]: 1,
            par_name[9]: 0,
            par_name[10]: -1,
            'protocol': par_name[11],

            par_name[11]: -1,

            par_name[0]: 'default',
            par_name[1]: "GooglePlay",
            par_name[2]: 'zh-cn',
        }
        # print(f"ver_params:{ver_params}")
        return ver_params

    def enc_params(self, key, params):
        enc_param = dict()
        for i, j in params.items():
            if i == 'act.os' or i == 'protocol':
                enc_param[i] = j
            else:
                enc_param[i] = des_res(key, str(j))
        return enc_param

    def generate_params(self):
        data = self.get_register_data()
        key = data["k"]
        img_urls = [data['bg'], data['fg']]
        self.save_img(img_urls)
        self.rid = data['rid']
        # organization = self.get_organization()
        organization = self.organization
        ostype = 'web'
        callback = f'sm_{int((time.time()) * 1000)}'
        sdkver = '1.1.3'
        rversion = '1.0.1'
        # protocol = '68'
        params = self.get_ver_params()
        params = self.enc_params(key, params)

        params.update({
            'rid': self.rid,
            'organization': organization,
            'ostype': ostype,
            'callback': callback,
            'sdkver': sdkver,
            'rversion': rversion,
            'atc.os': "android",
        })
        # print(f"params:{params}")
        return params



    def passed(self):
        params = self.generate_params()
        res = requests.get(self.fverify_url, headers=self.header, params=params)
        print(res.text)
        C = Check(self.rid)
        return C.check()


# if __name__ == '__main__':
#     shumei = ShuMei("202011131152366fd135a2d35983939e1d11135f040bab01064c2fb1873dd9")
#     res = shumei.passed()
#     print(res)
