import requests
import hashlib
import re
import json
import execjs


class JHASH():
    def __init__(self, ha, s):
        self.ha = ha
        self.s = s

    def md5(self):
        return hashlib.md5(self.s.encode('utf-8')).hexdigest()

    def sha1(self):
        return hashlib.sha1(self.s.encode('utf-8')).hexdigest()

    def sha224(self):
        return hashlib.sha224(self.s.encode('utf-8')).hexdigest()

    def sha256(self):
        return hashlib.sha256(self.s.encode('utf-8')).hexdigest()

    def sha384(self):
        return hashlib.sha384(self.s.encode('utf-8')).hexdigest()

    def sha512(self):
        return hashlib.sha512(self.s.encode('utf-8')).hexdigest()

    def j_hash(self):

        if self.ha == "md5":
            return self.md5()
        elif self.ha == "sha1":
            return self.sha1()
        elif self.ha == "sha224":
            return self.sha224()
        elif self.ha == "sha256":
            return self.sha256()
        elif self.ha == "sha384":
            return self.sha384()
        elif self.ha == "sha512":
            return self.sha512()
        else:
            raise Exception(f"尚未统计的加密类型:{self.ha}")


class JiaSuLe():
    def __init__(self):
        self.url = "http://bj.gsxt.gov.cn/index.html"
        self.headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Connection': 'keep-alive',
            'Host': 'bj.gsxt.gov.cn',
            'Referer': 'http://bj.gsxt.gov.cn/index.html',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36 Edg/87.0.664.66',
        }

    def get_cookies(self):
        res = requests.get(self.url, headers=self.headers)
        print(res.text)
        print(res.status_code)
        cookies_1_js = re.search("<script>document.cookie=(.*?)\+\(';'\)\+\('m'\)\+\('a'\)\+\('x'\)", res.text).group(1)
        cookie_h = dict(res.cookies).get('__jsluid_h')
        cookie_clearance = execjs.eval(cookies_1_js).replace("__jsl_clearance=", "")

        cookies = {
            '__jsluid_h': cookie_h,
            '__jsl_clearance': cookie_clearance
        }
        return cookies

    def get_go_data(self, cookie):
        res = requests.get(self.url, headers=self.headers, cookies=cookie)
        print(res.text)
        print(res.status_code)
        go_data = re.findall("go\((.*?)\)", res.text)[1]
        go_data = json.loads(go_data)
        return go_data

    def get_fin_cookies(self, go_data):
        '''
        加速乐核心逻辑
        :param go_data:
        :return:
        '''
        chars = go_data.get("chars")
        bts = go_data.get("bts")
        ct = go_data.get("ct")
        ha = go_data.get("ha")
        for i in range(len(chars)):
            for j in range(len(chars)):
                join_str = bts[0] + chars[i] + chars[j] + bts[1]
                if JHASH(ha, join_str).j_hash() == ct:
                    return join_str

    def get_index(self):
        fir_cookie = self.get_cookies()
        go_data = self.get_go_data(fir_cookie)
        cookie_clearance = self.get_fin_cookies(go_data)
        fir_cookie.update({"__jsl_clearance": cookie_clearance})
        index_res = requests.get(self.url, headers=self.headers, cookies=fir_cookie)
        return index_res

if __name__ == '__main__':
    J = JiaSuLe()
    index_res = J.get_index()
    print(index_res.status_code)
