# 需要安装websockey与websocket-client 这两个库才能使用create_connection
from websocket import create_connection
import jsonpath
import base64
import requests
import json
import time
import threading
import re

import warnings

# 忽略警告
warnings.filterwarnings("ignore")


def dict_get(obj, expr, index=False, defult=None):
    '''
    obj: 输入参数
    expr: 筛选条件
    index: 默认关闭，如果返回list，那么index为数字，index为列表下标
    defult: 未找到或者异常所返回的默认值
    '''
    try:
        ret = jsonpath.jsonpath(obj, expr)
        if ret is not False:
            if index is not False:
                return ret[index]
            else:
                return ret
        else:
            return defult

    except Exception:

        return defult


class Huya_Danmu:
    def __init__(self, roomID):
        '''初始化api所需的参数'''
        self.roomID = str(roomID)  # str
        self.appID = '155478987827019346'  # str
        self.secretld = "710cdcf9"
        self.flag = False
        self.header = {
            'Accept': '*/*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'http://www.dooccn.com',
            'Referer': 'http://www.dooccn.com/c/'
        }
        s, t = self.get_sign()
        self.ws = create_connection(
            'wss://openapi.huya.com/index.html?do=getMessageNotice&data={"roomId":%s}&appId=%s&timestamp=%s&sign=%s' % (
                self.roomID, self.appID, t, s))

    def get_sign(self):
        '''获得sign参数'''
        # 编写php代码
        php_code = '''<?php
            $data = '{"roomId":%s}';
            $time = time();
            if($data){
                $str = $data;
            }else{
                $str = '""';
            }
            $sign = md5("data={$str}&key=710cdcf9&timestamp={$time}");
            echo($sign);
            echo($time);
            ?>''' % (self.roomID)
        base64_php_code = str(base64.b64encode(php_code.encode('utf-8')), 'utf-8')
        datas = {
            'language': '18',
            'code': base64_php_code,
        }
        req = requests.post("http://runcode-api2-ng.dooccn.com/compile2", data=datas, headers=self.header).text
        req_json = json.loads(req)
        sign = req_json["output"][:32]
        t = req_json["output"][32:]
        # print(sign)
        # print(t)
        return sign, t

    def get_danmu(self):
        '''获得弹幕内容'''

        while True:
            try:
                msg = self.ws.recv()
                sendNick = json.loads(msg)["data"]["sendNick"]  # 用户名
                content = json.loads(msg)["data"]["content"]
                print(sendNick, ":", content)  # 打印弹幕

            except Exception as e:
                print(e)
                time.sleep(1)
                continue

    def keeplive(self):
        '''
        发送心跳信息，维持TCP长连接
        '''
        while self.flag:
            self.ws.send('ping')
            time.sleep(10)

    def start_danman(self):
        '''
        开始获取弹幕
        '''
        self.flag = True
        p1 = threading.Thread(target=self.get_danmu)
        p2 = threading.Thread(target=self.keeplive)
        p1.start()
        p2.start()
        pass

    def stop_danman(self):
        self.flag = False
        pass


class Huya_Spider:
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36",
        "Accept": "*/*",
        "Accept-Language": "zh-CN,zh;q=0.9"
    }

    def __init__(self, proxies):

        self.proxies = proxies
        self.pageMax = 2  # 设置页面上限
        self.cookies = requests.cookies.RequestsCookieJar()
        self.category = self.get_category()
        pass

    def get_category(self):

        '''
        得到所有分类详细信息
        '''

        url = 'https://www.huya.com/g'

        params = {

        }

        rsp = requests.get(url, headers=self.headers, params=params, cookies=self.cookies, proxies=self.proxies,
                           verify=False, allow_redirects=False, timeout=20)
        self.cookies.update(rsp.cookies)
        html = rsp.text
        print(html)
        # useful = re.findall(r'/game/([\d]+)-MS.jpg" alt=(.*?) ',html)
        useful = re.findall(r'/game/([\d]+)-MS.png" alt=(.*?) ', html)

        category = {}

        for target_list in useful:
            category.update({target_list[1]: target_list[0]})
            pass
        print(category)
        return category

    def get_room_list(self, gameid):
        '''
        通过gameid来爬取该类目下的所有主播房间信息
        如王者荣耀的gameid为2336，gameid可以通过self.category在初始化的时候获取
        '''

        page = 1

        feeds = []

        while True:

            url = 'https://www.huya.com/cache.php'

            params = {
                "m": "LiveList",
                "do": "getLiveListByPage",
                "gameId": gameid,
                "tagAll": "0",
                "page": page,
            }

            rsp = requests.get(url, headers=self.headers, params=params, cookies=self.cookies, proxies=self.proxies,
                               verify=False, allow_redirects=False, timeout=20)
            print(rsp.url)
            self.cookies.update(rsp.cookies)
            html = rsp.text

            html_json = json.loads(html)

            # TODO:所有直播摘要信息，包含房间名字，热度，主播名字，房间号。。。。自行提取

            room_id_list = dict_get(html_json, '$..profileRoom', False, [])

            feeds.extend(room_id_list)

            page += 1

            # 每页120条，小于120条时停止翻页
            if (len(room_id_list) < 120) or (page > self.pageMax):
                break

        return feeds


def dowork(proxies, input_infos):
    huya = Huya_Spider(proxies)

    # 获取王者的房间号ID,这里只演示王者荣耀。

    gameid = huya.category['王者荣耀']

    feeds = huya.get_room_list(gameid)

    for target_list in feeds:
        # 遍历
        pass

    # #这里只演示获取1个房间的弹幕，弹幕获取是长链接，IP要保持固定，同时抓取多个房间建议使用线程池

    print('房间号：' + str(feeds[0]))
    # 房间号要转成字符串
    danmu = Huya_Danmu(str(feeds[0]))
    danmu.start_danman()


if __name__ == "__main__":
    # 代理配置
    proxyip = '127.0.0.1:8088'
    proxies = {
        "http":"http://" + proxyip,
        "https":"http://" + proxyip,
    }
    proxies = None

    input_infos = {
        'total_page': 2,  # 总数页面'
    }

    dowork(proxies, input_infos)
