
import execjs

login_js = execjs.compile(open('login.js','r', encoding='utf-8').read())

res = login_js.call('testaa', '123456')
print(res)