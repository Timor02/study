# -*- coding: utf-8 -*-
import requests, execjs, time, json

'''
https://www.hongshu.com/content/96732/168485-14767423.html   key:74021191
'''
headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
}

api = 'https://www.hongshu.com/bookajax.do'


def get_key():
    data = {
        'method': 'getchptkey',
        'bid': '96731',
        'cid': '14755942',

    }
    reponse = requests.post(url=api, data=data, verify=False).content
    key = json.loads(reponse)['key']
    return key


def get_content(key):
    data = {
        'method': 'getchpcontent',
        'bid': '96731',
        'jid': '168483',
        'cid': '14755942',
    }

    response = requests.post(url=api, data=data, headers=headers, verify=False).content
    content = json.loads(response)['content']
    other = json.loads(response)['other']

    test_js = execjs.compile(open('test.js', 'r').read())
    i = test_js.call('get_other', content, key)
    j = test_js.call('get_other', other, key)

    with open('test.txt', 'w')as p:
        p.write(i.encode('utf-8'))
    # with open('other.js', 'w')as f_a:
    #     f_a.write(document + j.encode('utf-8') + word_js)


def get_words():
    other_js = execjs.compile(open('other.js', 'r').read(), cwd=r'C:\Users\xiang.cao\AppData\Roaming\npm\node_modules')
    words = other_js.call('my_fun')
    for i in words:
        print i


if __name__ == '__main__':
    key = get_key()
    get_content(key)
    get_words()
