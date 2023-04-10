const JSEncrypt = require('jsencrypt');
const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const md5 = crypto.createHash('md5');

let b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
let b64pad = "=";

function hex2b64(h) {
//     加wx:_Teemo1202
}

function encryptByDES(message, key) {
//     加wx:_Teemo1202
}

function encryptByRsa(pubkey, str) {

//     加wx:_Teemo1202
}

function dataEncrypt(data, key) {
//     加wx:_Teemo1202
}


// sk 请求参数加密
function rsaEncrypt(pubkey, str) {

//     加wx:_Teemo1202
}

// sk 请求参数加密
function sk_aesEncrypt(word, key, iv) {

//     加wx:_Teemo1202
}

// sk base64
function skDecrypt(s) {

//     加wx:_Teemo1202
}

// sk response解密
function sk_aesDecrypt(Q, R) {
//     加wx:_Teemo1202
}

// 请求sign参数生成
function sign() {
//     加wx:_Teemo1202
};


var ht = function (t, e) {
    //     加wx:_Teemo1202
}


function payload_data(obj_r) {

    //     加wx:_Teemo1202

}

function ot_ltk(t, e, n) {
   //     加wx:_Teemo1202
}

function st_ltk(t, e, n) {
    //     加wx:_Teemo1202

}


function get_ltk(iud, obj_r) {
    //     加wx:_Teemo1202
}

/*
搜索请求参数加密
@t:请求参数
@e:请求方式
@n:平台类型 wx or qq or dy
@r:手机环境信息
 */
function Fun110_1008(t, e, n, obj_r) {

    //     加wx:_Teemo1202

}


const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true //需明确设置
}));

app.post('/sign', function (req, res) {
    // console.log(req.body)
    var data = req.body.data;
    var value = sign(JSON.parse(data))
    console.log("sign result ok");
    res.send(value)
})

app.post('/payload_data', function (req, res) {
    // console.log(req.body)
    let data = req.body;
    let obj_r = data.obj_r;
    let value = payload_data(JSON.parse(obj_r))
    console.log("payload_data result ok");
    res.send(value)

})

app.post('/get_ltk', function (req, res) {
    // console.log(req.body)
    let data = req.body;
    let iud = data.iud;
    let obj_r = data.obj_r;
    let value = get_ltk(iud, JSON.parse(obj_r))
    console.log("get_ltk result ok");
    res.send(value)

})


app.post('/sk_aesDecrypt', function (req, res) {
    // console.log(req.body)
    let data = req.body;
    let sk_key = data.sk_key;
    let text = data.text;
    let value = sk_aesDecrypt(text, sk_key)
    console.log("sk_aesDecrypt result ok");
    res.send(value)

})

app.post('/skDecrypt', function (req, res) {
    // console.log(req.body)
    let data = req.body;
    let sk_decrypt = data.sk_decrypt;
    let value = skDecrypt(sk_decrypt)
    console.log("skDecrypt result ok");
    res.send(value)

})

app.post('/Fun110_1008', function (req, res) {
    let data = req.body;
    let t = data.t;
    let e = data.e;
    let n = data.n;
    let r = data.r;
    let value = Fun110_1008(t, e, n, JSON.parse(r))
    console.log("Fun110_1008 result ok");
    res.send(value)
})

app.post('/dataEncrypt', function (req, res) {
    // console.log(req.body)
    let data = req.body;
    let text = JSON.parse(data.text);
    let key = data.key;
    let value = dataEncrypt(text, key)
    console.log("dataEncrypt result ok");
    res.send(value)
});

const port = 3000;
app.listen(port, () => {
    console.log("服务已开启，端口 : ", port);
});
