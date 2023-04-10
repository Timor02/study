# -*- coding: utf-8 -*-

import requests
import json
import get_point
from PIL import Image

'''
http://47.95.70.97:8950/captcha/captcha/captchaImage  post  获取dataToken参数

http://47.95.70.97:8950/captcha/captcha/checkCaptcha  post  获取token参数

http://bulletin.cebpubservice.com/xxfbcmses/search/bulletin.html get  获取数据

http://47.95.70.97:8950/captcha/captcha/image/big_source_60_65ded5353c5ee48d.png    get  验证码图片残缺

'''


def save_img(bigImgName, sourceImgName):
    img_url = 'http://47.95.70.97:8950/captcha/captcha/image/'
    with open('img/bigImgName.png', 'wb')as f_wb:
        f_wb.write(session.get(url=img_url + bigImgName, headers=headers).content)

    with open('img/sourceImgName.png', 'wb')as f_wb:
        f_wb.write(session.get(url=img_url + sourceImgName, headers=headers).content)


session = requests.session()

url1 = 'http://47.95.70.97:8950/captcha/captcha/captchaImage'

headers = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Length': '0',
    'Host': '47.95.70.97:8950',
    'Origin': 'http://bulletin.cebpubservice.com',
    'Pragma': 'no-cache',
    'Referer': 'http://bulletin.cebpubservice.com/VerificationCode/login.html?id=88&url=http://bulletin.cebpubservice.com/xxfbcmses/search/bulletin.html?searchDate=1995-06-24&dates=300&categoryId=88&industryName=&area=&status=&publishMedia=&sourceInfo=&showStatus=&word=',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',

}

res1 = session.post(url=url1, headers=headers)
res_data = json.loads(res1.text)
dataToken = res_data['dataToken']

bigImgName = res_data['bigImgName']
sourceImgName = res_data['sourceImgName']

save_img(bigImgName, sourceImgName)

img1 = Image.open('img/sourceImgName.png')
img2 = Image.open('img/bigImgName.png')

point = get_point.get_gap(img1, img2)
url2 = 'http://47.95.70.97:8950/captcha/captcha/checkCaptcha'

data = {
    'dataToken': dataToken,
    'point': point-7,
}

res2 = session.post(url=url2, headers=headers, data=data)
token = json.loads(res2.text)['data']
data_url = 'http://bulletin.cebpubservice.com/xxfbcmses/search/bulletin.html?searchDate=1995-06-24&dates=300&categoryId=88&industryName=&area=&status=&publishMedia=&sourceInfo=&showStatus=&word=&token={}'.format(token)
headers.update({'Host': 'bulletin.cebpubservice.com'})
res3 = session.get(data_url, headers=headers)
print(res3.text)
