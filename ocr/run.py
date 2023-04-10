# -*- coding: utf-8 -*-
import os
import pytesseract
from PIL import Image
import random
import numpy as np
import cv2
from sklearn.svm import SVC
import joblib
import pycapt
from sklearn.model_selection import train_test_split



def getletter(fn):
    print(fn)
    fnimg = cv2.imread(fn)  # 读取图像
    img = cv2.resize(fnimg, (50, 50))
    alltz = []
    for now_h in range(0, 50):
        xtz = []
        for now_w in range(0, 50):
            b = img[now_h, now_w, 0]
            g = img[now_h, now_w, 1]
            r = img[now_h, now_w, 2]
            btz = 255 - b
            gtz = 255 - g
            rtz = 255 - r
            if btz > 0 or gtz > 0 or rtz > 0:
                nowtz = 1
            else:
                nowtz = 0
            xtz.append(nowtz)
        alltz += xtz
    return alltz


# 提取特征值
def extractLetters(path):
    x = []
    y = []
    z = {'1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7','8': '8', '9': '9'}
    # 遍历文件夹 获取下面的目录
    for root, sub_dirs, files in os.walk(path):
        # print('sub_dirs',sub_dirs)
        for dirs in sub_dirs:
            # 获得每个文件夹的图片
            for fileName in os.listdir(path + '/' + dirs + '/'):
                # 打开图片
                x.append(getletter(path + '/' + dirs + '/' + fileName))
                y.append(z.get(dirs))
    return x, y

# 进行向量机的训练SVM
def trainSVM():
    array = extractLetters('C:/Users/xiang.cao/PycharmProjects/study/ocr/CategoryImages')
    print(array)
    # 使用向量机SVM进行机器学习
    letterSVM = SVC(kernel="linear", C=1).fit(array[0], array[1])
    # # 生成训练结果
    joblib.dump(letterSVM, 'data/letter1.pkl')


# 根据返回的坐标，切割图片
def getSplitImg(b_img, v):
    imgs = []
    for i, n in enumerate(v, 1):
        temp = b_img.crop(n)  # 调用crop函数进行切割
        imgs.append(temp)
    return imgs

# 传入测试图片，进行识别测试
def ocrImg(filename):
    image = Image.open(filename)
    b_img = pycapt.two_value(image, Threshold=225)

    #  左上右下
    v = [
        (0, 0, 50, 50),
        (50, 0, 100, 50),
        (100, 0, 150, 50),
        (0, 50, 50, 100),
        (50, 50, 100, 100),
        (100, 50, 150, 100),
        (0, 100, 50, 150),
        (50, 100, 100, 150),
        (100, 100, 150, 150),
    ]
    b_imgs = getSplitImg(b_img, v)
    for i, img in enumerate(b_imgs):
        path = 'test_cut/letter_%s.jpg' % i
        img.save(path)
    clf = joblib.load('data/letter1.pkl')
    num_1 = clf.predict(np.array([getletter('test_cut/letter_0.jpg')]))[0]
    num_2 = clf.predict(np.array([getletter('test_cut/letter_1.jpg')]))[0]
    num_3 = clf.predict(np.array([getletter('test_cut/letter_2.jpg')]))[0]
    num_4 = clf.predict(np.array([getletter('test_cut/letter_3.jpg')]))[0]
    num_5 = clf.predict(np.array([getletter('test_cut/letter_4.jpg')]))[0]
    num_6 = clf.predict(np.array([getletter('test_cut/letter_5.jpg')]))[0]
    num_7 = clf.predict(np.array([getletter('test_cut/letter_6.jpg')]))[0]
    num_8 = clf.predict(np.array([getletter('test_cut/letter_7.jpg')]))[0]
    num_9 = clf.predict(np.array([getletter('test_cut/letter_8.jpg')]))[0]

    print('识别结果为',num_1, num_2,num_3,num_4,num_5,num_6,num_7,num_8,num_9)
    key = {
        1: num_1,
        2: num_2,
        3: num_3,
        4: num_4,
        5: num_5,
        6: num_6,
        7: num_7,
        8: num_8,
        9: num_9
    }
    return key


def go_img(code, path):

    img_l = ocrImg(path)

    img_2 = {
        1: str(random.randint(10, 40)) + "," + str(random.randint(10, 40)),
        2: str(random.randint(60, 90)) + "," + str(random.randint(10, 40)),
        3: str(random.randint(110, 140)) + "," + str(random.randint(10, 40)),
        4: str(random.randint(10, 40)) + "," + str(random.randint(60, 90)),
        5: str(random.randint(60, 90)) + "," + str(random.randint(60, 90)),
        6: str(random.randint(110, 140)) + "," + str(random.randint(60, 90)),
        7: str(random.randint(10, 40)) + "," + str(random.randint(110, 140)),
        8: str(random.randint(60, 90)) + "," + str(random.randint(110, 140)),
        9: str(random.randint(110, 140)) + "," + str(random.randint(110, 140))
    }

    data = ''
    for i in code:
        if i in [int(x) for x in img_l.values()]:
            weizhi = list(img_l.keys())[list(int(x) for x in img_l.values()).index(i)]
            data += img_2[weizhi]+'|'

    if data:
        print('对应的数字的坐标为：', data)
        return data
    else:
        return False

if __name__ == '__main__':
    # trainSVM()

    code = [1, 2, 3, 4]
    print('需要的点击的数字为：', code)
    path = r'C:\Users\xiang.cao\PycharmProjects\study\ocr\img\1.jpg'
    print('识别的图片地址为：', path)
    go_img(code, path)