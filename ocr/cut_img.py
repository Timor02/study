# -*- coding: utf-8 -*-

from PIL import Image
import os


def binaryImage(img):
    Img = img.convert('L')

    # 自定义灰度界限，大于这个值为黑色，小于这个值为白色
    threshold = 200

    table = []
    for i in range(256):
        if i < threshold:
            table.append(0)
        else:
            table.append(1)

    # 图片二值化
    photo = Img.point(table, '1')
    return photo


img_list = os.listdir('./img')

for IMG in img_list:
    img = Image.open(f'./img/{IMG}')
    temp = 0
    for j in range(3):
        for i in range(3):
            temp += 1
            box = (50 * i, 50 * j, 50 * (i + 1), 50 * (j + 1))
            cut_img = img.crop(box)
            cut_img = binaryImage(cut_img)
            cut_img.save('./small_img/{}.jpg'.format(IMG.replace('.jpg','_') + str(temp)))
            print('save success:{}'.format(IMG.replace('.jpg','_') + str(temp) + '.jpg'))
