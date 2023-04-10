import time
import requests
import execjs
import json
import re
import os
import math
import random
from img_locate import ImgProcess

S = requests.Session()


def get_trace_normal(distance):
    global current_x
    track = [[random.randint(-30, -19), random.randint(-25, -20), 0]]
    track.append([0, 0, 0])

    # random.randint(20, 30)
    step_list = [1, 2, 3]
    x = 0
    x_list = []
    while True:
        x = x + random.randint(1, 4)

        if x < distance:
            x_list.append(x)
        else:
            break
    # x_list.append(distance)

    # x = [(10 / 20) * i for i in range(random.randint(25,35))]
    x = [(10 / 20) * i for i in x_list]
    _y = random.randint(-1, 1)
    current_t = random.randint(-40, -30)
    for _x in x:
        current_x = int(sigmoid(_x, distance))
        _t = random.randint(40, 60)
        current_t += _t
        track.append([
            current_x,
            _y,
            current_t
        ])
    track.append([
        current_x,
        _y,
        current_t + random.randint(100, 200)
    ])
    passtime = (track[-1][2] / 1000)
    time.sleep(1)
    return track


# b偏移量
def sigmoid(x, b):
    # t =2
    # return (2/ (2+ math.exp(-x + t))) * b

    t = 8

    s = (2 / (2 + math.exp(-x + t)))
    return s * b


def geetest():
    url_demo = f"https://www.geetest.com/demo/gt/register-slide-official?t={int(time.time() * 1000)}"
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36"
    }
    res = S.get(url=url_demo, headers=headers).json()
    gt = res['gt']
    challenge = res['challenge']
    with open('geetest.js', 'r', encoding='utf-8')as f_r:
        js_code = f_r.read()
    js_compile = execjs.compile(js_code)
    encrypt_key = js_compile.call('ce')
    w1 = js_compile.call("w1", gt, challenge, encrypt_key)
    url_version = f"https://api.geetest.com/gettype.php?gt=ff3cd843746782b0e0f377c2d234d6a5&callback=geetest_{int(time.time() * 1000)}"
    res = S.get(url_version, headers=headers).text
    c_s_url = f"https://api.geetest.com/get.php?gt={gt}&challenge={challenge}&lang=zh-cn&pt=0&client_type=web&w={w1}&callback=geetest_{int(time.time() * 1000)}"
    res = S.get(url=c_s_url, headers=headers).text
    res_data = json.loads(re.search("geetest_\d+\((.*?)\)", res).group(1))
    key_c = res_data['data']['c']
    key_s = res_data['data']['s']
    w2 = js_compile.call("OLqi", gt, challenge, key_c, key_s, encrypt_key)
    ajax_url = f"https://api.geetest.com/ajax.php?gt={gt}&challenge={challenge}&lang=zh-cn&pt=0&client_type=web&w={w2}&callback=geetest_{int(time.time() * 1000)}"
    res = S.get(url=ajax_url, headers=headers).text
    php_url = f"https://api.geetest.com/get.php?is_next=true&type=slide3&gt={gt}&challenge={challenge}&lang=zh-cn&https=true&protocol=https%3A%2F%2F&offline=false&product=embed&api_server=api.geetest.com&isPC=true&autoReset=true&width=100%25&callback=geetest_{int(time.time() * 1000)}"
    res = S.get(url=php_url, headers=headers).text
    res_data = json.loads(re.search("geetest_\d+\((.*?)\)", res).group(1))

    c = res_data['c']
    s = res_data['s']
    challenge = res_data['challenge']

    fullbg = res_data['fullbg']
    bg = res_data['bg']
    a1 = "https://static.geetest.com/" + fullbg
    a1_con = requests.get(url=a1, timeout=10, headers=headers).content
    a2 = "https://static.geetest.com/" + bg
    a2_con = requests.get(url=a2, timeout=10, headers=headers).content
    open("Image/fullbg.jpg", "wb").write(a1_con)
    open("Image/bg.jpg", "wb").write(a2_con)

    img_process = ImgProcess()
    img1 = img_process.get_merge_image('Image/fullbg.jpg')
    img2 = img_process.get_merge_image('Image/bg.jpg')
    # os.remove("Image/fullbg.jpg")
    # os.remove("Image/bg.jpg")

    distance = int(img_process.get_gap(img1, img2) - 7)
    arr = get_trace_normal(distance)

    devarr = list()
    t = arr[-1][0]
    n = arr[-1][2]
    for i in range(len(arr) - 1):
        devarr.append([arr[i + 1][0] - arr[i][0], arr[i + 1][1] - arr[i][1], arr[i + 1][2] - arr[i][2]])

    w3 = js_compile.call("w3", arr, devarr, c, s, t, n, gt, challenge, encrypt_key)
    last_url = f"https://api.geetest.com/ajax.php?gt={gt}&challenge={challenge}&lang=zh-cn&pt=0&client_type=web&w={w3}&callback=geetest_{int(time.time() * 1000)}"
    res = S.get(url=last_url, headers=headers).text
    print(res)

if __name__ == '__main__':
    for i in range(10):
        geetest()
