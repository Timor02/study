
from array import array
from typing import Optional
import re

from aiohttp import ClientSession

from danmu_abc import WsConn, Client
from utils import Reg, WSUserInfo, WebSocketCommand, EWebSocketCommandType, WSPushMessage, MessageNotice
from tars.core import tarscore
import asyncio
import requests
import json

class WsDanmuClient(Client):
    def __init__(self, room: str, area_id: int,Q=None,session: Optional[ClientSession] = None, loop=None,):
        heartbeat = 60.0
        conn = WsConn(
            url='wss://cdnws.api.huya.com',
            #url = 'wss://3d809125-ws.va.huya.com/?APPSRC=HUYA%26ZH%262052',
            receive_timeout=heartbeat+10,
            session=session)
        super().__init__(
            area_id=area_id,
            conn=conn,
            heartbeat=heartbeat,
            loop=loop)
        self.Q = Q
        self._room = room
        self._ayyuid = None
        self._topsid = None
        self._subsid = None
        self.level = 0        

        
        # _packarr = [0,3,29,0,1,2,0,0,2,16,3,44,60,64,86,6,108,105,118,101,117,105,102,13,103,101,116,86,105,112,66,97,114,76,105,115,116,125,0,1,2,8,0,1,6,4,116,82,101,113,29,0,1,2,10,10,2,5,10,0,120,22,32,48,97,100,98,50,102,57,101,100,48,101,100,97,52,53,102,54,55,48,50,54,100,55,55,54,101,55,55,53,101,99,50,38,0,54,26,119,101,98,104,53,38,50,48,49,49,48,57,49,53,53,51,38,119,101,98,115,111,99,107,101,116,71,0,0,2,39,118,112,108,97,121,101,114,95,115,98,97,110,110,101,114,95,49,52,51,48,57,55,50,52,55,49,95,49,52,51,48,57,55,50,52,55,49,61,49,59,32,83,111,117,110,100,86,97,108,117,101,61,48,46,53,48,59,32,95,95,121,97,109,105,100,95,116,116,49,61,48,46,49,56,53,57,48,57,54,57,49,52,48,53,51,53,49,53,50,59,32,95,95,121,97,109,105,100,95,110,101,119,61,67,56,70,50,65,51,65,70,70,56,65,48,48,48,48,49,65,70,70,66,69,55,53,48,54,53,49,48,56,69,55,48,59,32,97,108,112,104,97,86,97,108,117,101,61,48,46,56,48,59,32,117,100,98,95,103,117,105,100,100,97,116,97,61,101,54,56,53,52,100,53,57,53,57,54,49,52,99,51,49,56,49,102,100,101,53,54,100,99,50,100,54,52,101,98,49,59,32,103,117,105,100,61,48,97,100,98,50,102,57,101,100,48,101,100,97,52,53,102,54,55,48,50,54,100,55,55,54,101,55,55,53,101,99,50,59,32,115,100,105,100,61,59,32,117,100,98,95,112,97,115,115,100,97,116,97,61,51,59,32,95,95,121,97,115,109,105,100,61,48,46,49,56,53,57,48,57,54,57,49,52,48,53,51,53,49,53,50,59,32,95,121,97,115,105,100,115,61,95,95,114,111,111,116,115,105,100,37,51,68,67,57,50,49,52,56,51,48,68,67,66,48,48,48,48,49,66,50,67,65,68,55,49,70,54,50,66,48,66,49,49,48,59,32,80,72,80,83,69,83,83,73,68,61,49,110,97,118,102,98,118,52,116,113,54,105,101,48,53,117,53,113,51,52,107,114,111,106,104,48,59,32,105,115,73,110,76,105,118,101,82,111,111,109,61,116,114,117,101,59,32,72,109,95,108,118,116,95,53,49,55,48,48,98,54,99,55,50,50,102,53,98,98,52,99,102,51,57,57,48,54,97,53,57,54,101,97,52,49,102,61,49,54,48,53,48,48,55,55,51,55,59,32,72,109,95,108,112,118,116,95,53,49,55,48,48,98,54,99,55,50,50,102,53,98,98,52,99,102,51,57,57,48,54,97,53,57,54,101,97,52,49,102,61,49,54,48,53,48,48,55,55,51,55,59,32,104,117,121,97,95,119,101,98,95,114,101,112,95,99,110,116,61,50,56,59,32,104,117,121,97,95,102,108,97,115,104,95,114,101,112,95,99,110,116,61,50,50,92,102,6,67,104,114,111,109,101,11,28,44,60,76,82,85,74,55,108,11,12,12,44,54,33,99,97,53,97,97,102,49,50,56,53,99,54,57,56,57,57,45,99,97,53,97,97,102,49,50,56,53,99,54,57,56,57,57,76,92]

        # _packarr = [0,16,29,0,0,37,9,0,2,6,14,108,105,118,101,58,51,54,55,49,51,56,54,51,50,6,14,99,104,97,116,58,51,54,55,49,51,56,54,51,50,22,0,44,54,0,76,92]

        # data = bytearray(_packarr)
        # stream = tarscore.TarsInputStream(data)
        # command = WebSocketCommand()
        # command.readFrom(stream)

        # stream = tarscore.TarsInputStream(command.vData)
        # print(command.vData)
        # msg = MessageNotice()
        # msg.readFrom3(stream)
 
        
        self._pack_heartbeat = b'\x00\x03\x1d\x00\x00\x69\x00\x00\x00\x69\x10\x03\x2c\x3c\x4c\x56\x08\x6f\x6e\x6c\x69\x6e\x65\x75\x69\x66\x0f\x4f\x6e\x55\x73\x65\x72\x48\x65\x61\x72\x74\x42\x65\x61\x74\x7d\x00\x00\x3c\x08\x00\x01\x06\x04\x74\x52\x65\x71\x1d\x00\x00\x2f\x0a\x0a\x0c\x16\x00\x26\x00\x36\x07\x61\x64\x72\x5f\x77\x61\x70\x46\x00\x0b\x12\x03\xae\xf0\x0f\x22\x03\xae\xf0\x0f\x3c\x42\x6d\x52\x02\x60\x5c\x60\x01\x7c\x82\x00\x0b\xb0\x1f\x9c\xac\x0b\x8c\x98\x0c\xa8\x0c'
        #self._pack_heartbeat = b'\00\x03\x1D\x00\x01\x02\xE2\x00\x00\x02\xE2\x10\x03\x2C\x3C\x40\xFF\x56\x06\x6C\x69\x76\x65\x75\x69\x66\x13\x67\x65\x74\x4C\x69\x76\x69\x6E\x67\x53\x74\x72\x65\x61\x6D\x49\x6E\x66\x6F\x7D\x00\x01\x02\xB1\x08\x00\x01\x06\x04\x74\x52\x65\x71\x1D\x00\x01\x02\xA3\x0A\x0A\x03\x00\x00\x00\x00\xA1\xFA\x01\xE0\x16\x20\x30\x61\x64\x62\x32\x66\x39\x65\x64\x30\x65\x64\x61\x34\x35\x66\x36\x37\x30\x32\x36\x64\x37\x37\x36\x65\x37\x37\x35\x65\x63\x32\x26\x00\x36\x1A\x77\x65\x62\x68\x35\x26\x32\x30\x31\x31\x30\x39\x31\x35\x35\x33\x26\x77\x65\x62\x73\x6F\x63\x6B\x65\x74\x47\x00\x00\x02\x3F\x76\x70\x6C\x61\x79\x65\x72\x5F\x73\x62\x61\x6E\x6E\x65\x72\x5F\x38\x31\x33\x35\x33\x35\x34\x38\x33\x5F\x38\x31\x33\x35\x33\x35\x34\x38\x33\x3D\x31\x3B\x20\x53\x6F\x75\x6E\x64\x56\x61\x6C\x75\x65\x3D\x30\x2E\x35\x30\x3B\x20\x5F\x5F\x79\x61\x6D\x69\x64\x5F\x74\x74\x31\x3D\x30\x2E\x31\x38\x35\x39\x30\x39\x36\x39\x31\x34\x30\x35\x33\x35\x31\x35\x32\x3B\x20\x5F\x5F\x79\x61\x6D\x69\x64\x5F\x6E\x65\x77\x3D\x43\x38\x46\x32\x41\x33\x41\x46\x46\x38\x41\x30\x30\x30\x30\x31\x41\x46\x46\x42\x45\x37\x35\x30\x36\x35\x31\x30\x38\x45\x37\x30\x3B\x20\x61\x6C\x70\x68\x61\x56\x61\x6C\x75\x65\x3D\x30\x2E\x38\x30\x3B\x20\x75\x64\x62\x5F\x67\x75\x69\x64\x64\x61\x74\x61\x3D\x65\x36\x38\x35\x34\x64\x35\x39\x35\x39\x36\x31\x34\x63\x33\x31\x38\x31\x66\x64\x65\x35\x36\x64\x63\x32\x64\x36\x34\x65\x62\x31\x3B\x20\x67\x75\x69\x64\x3D\x30\x61\x64\x62\x32\x66\x39\x65\x64\x30\x65\x64\x61\x34\x35\x66\x36\x37\x30\x32\x36\x64\x37\x37\x36\x65\x37\x37\x35\x65\x63\x32\x3B\x20\x73\x64\x69\x64\x3D\x3B\x20\x75\x64\x62\x5F\x70\x61\x73\x73\x64\x61\x74\x61\x3D\x33\x3B\x20\x5F\x5F\x79\x61\x73\x6D\x69\x64\x3D\x30\x2E\x31\x38\x35\x39\x30\x39\x36\x39\x31\x34\x30\x35\x33\x35\x31\x35\x32\x3B\x20\x5F\x79\x61\x73\x69\x64\x73\x3D\x5F\x5F\x72\x6F\x6F\x74\x73\x69\x64\x25\x33\x44\x43\x39\x32\x31\x34\x38\x33\x30\x44\x43\x42\x30\x30\x30\x30\x31\x42\x32\x43\x41\x44\x37\x31\x46\x36\x32\x42\x30\x42\x31\x31\x30\x3B\x20\x48\x6D\x5F\x6C\x76\x74\x5F\x35\x31\x37\x30\x30\x62\x36\x63\x37\x32\x32\x66\x35\x62\x62\x34\x63\x66\x33\x39\x39\x30\x36\x61\x35\x39\x36\x65\x61\x34\x31\x66\x3D\x31\x36\x30\x34\x36\x34\x34\x32\x39\x38\x2C\x31\x36\x30\x34\x39\x30\x33\x31\x34\x37\x2C\x31\x36\x30\x34\x39\x30\x35\x33\x34\x39\x3B\x20\x50\x48\x50\x53\x45\x53\x53\x49\x44\x3D\x31\x6E\x61\x76\x66\x62\x76\x34\x74\x71\x36\x69\x65\x30\x35\x75\x35\x71\x33\x34\x6B\x72\x6F\x6A\x68\x30\x3B\x20\x69\x73\x49\x6E\x4C\x69\x76\x65\x52\x6F\x6F\x6D\x3D\x74\x72\x75\x65\x3B\x20\x48\x6D\x5F\x6C\x70\x76\x74\x5F\x35\x31\x37\x30\x30\x62\x36\x63\x37\x32\x32\x66\x35\x62\x62\x34\x63\x66\x33\x39\x39\x30\x36\x61\x35\x39\x36\x65\x61\x34\x31\x66\x3D\x31\x36\x30\x34\x39\x39\x30\x35\x38\x31\x3B\x20\x68\x75\x79\x61\x5F\x66\x6C\x61\x73\x68\x5F\x72\x65\x70\x5F\x63\x6E\x74\x3D\x31\x36\x33\x32\x3B\x20\x68\x75\x79\x61\x5F\x77\x65\x62\x5F\x72\x65\x70\x5F\x63\x6E\x74\x3D\x34\x33\x39\x31\x5C\x66\x06\x43\x68\x72\x6F\x6D\x65\x0B\x1C\x2C\x32\x30\x7D\x90\xFB\x46\x00\x0B\x8C\x98\x0C\xA8\x0C\x2C\x36\x21\x65\x37\x30\x30\x65\x66\x33\x66\x64\x31\x62\x33\x32\x37\x38\x64\x2D\x65\x37\x30\x30\x65\x66\x33\x66\x64\x31\x62\x33\x32\x37\x38\x64\x4C\x5C'
        #self._pack_heartbeat = bytearray(_packarr)
        #self._pack_heartbeat = b'\00'
    async def _prepare_client(self) -> bool:
        url = f'https://m.huya.com/{self._room}'
        headers = {
            'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) '
                          'AppleWebKit/537.36 (KHTML, like Gecko) '
                          'Chrome/79.0.3945.88 Mobile Safari/537.36'
        }
        async with ClientSession() as session:
            flag = True
            async with session.get(url, headers=headers) as resp:
                room_page = await resp.text()

                # self._ayyuid = 367138632
                # self._topsid = 367138632
                # self._subsid = 367138632

                #这里发包有时候不稳定，自己优化

                self._ayyuid = int(re.search(r"ayyuid: +'([0-9]+)'", room_page, re.MULTILINE).group(1))
                try:
                    self._topsid = int(re.search(r"TOPSID += +'([0-9]+)'", room_page, re.MULTILINE).group(1))
                except:
                    self._topsid = self._ayyuid
                    flag = False
                try:
                    self._subsid = int(re.search(r"SUBSID += +'([0-9]+)'", room_page, re.MULTILINE).group(1))
                except:
                    self._subsid = self._ayyuid

                url = 'https://q.huya.com/yy/?m=ProfileLevel&do=getPresenterGrowRank&pid=' + str(self._topsid)
                rsp = requests.get(url,headers=headers)
                html = rsp.text

                jsondata = json.loads(html)

                self.level = jsondata['data']['tGrowItem']['iLevel']
                if not flag:
                    self.Q.put({'levle':self.level})
                print("等级：" + str(self.level))
                

        return True

    async def _one_hello(self) -> bool:
        # ws_user_info = WSUserInfo()
        # ws_user_info.lUid = self._ayyuid
        # ws_user_info.lTid = self._topsid
        # ws_user_info.lSid = self._subsid

        # output_stream = tarscore.TarsOutputStream()
        # ws_user_info.writeTo(output_stream)

        # ws_command = WebSocketCommand()
        # ws_command.iCmdType = EWebSocketCommandType.EWSCmd_RegisterReq
        # ws_command.vData = output_stream.getBuffer()
        # output_stream = tarscore.TarsOutputStream()
        # ws_command.writeTo(output_stream)
        
        # senddata = output_stream.getBuffer()
        
        ws_user_info = Reg()
        ws_user_info.vGroupId = ["live:" + str(self._topsid),"chat:" + str(self._subsid)]
        ws_user_info.sToken = ""
        

        output_stream = tarscore.TarsOutputStream()
        ws_user_info.writeTo(output_stream)
        
        #print(output_stream.getBuffer())

        ws_command = WebSocketCommand()
        ws_command.iCmdType = EWebSocketCommandType.EWSCmdC2S_RegisterGroupReq  #注册发组的请求才会有贵宾返回
        ws_command.vData = output_stream.getBuffer()
        output_stream = tarscore.TarsOutputStream()
        ws_command.writeTo(output_stream)
        
        senddata = output_stream.getBuffer()

       
        #最后一个字节没解出来，目前看来固定不变
        senddata = senddata + b',6\x00L\\'
        
        
        #核心请求数据，前面的封装有可能拿不到贵宾数，把下面这行数据的注释打开再试试，自己去写逻辑判断
        #senddata = b"\x00\x10\x1d\x00\x00%\t\x00\x02\x06\x0elive:" + bytes(str(self._topsid), encoding = "utf8") +b"\x06\x0echat:"+ bytes(str(self._topsid), encoding = "utf8") +b"\x16\x00,6\x00L\\"
        # print('首次请求')
        # print(senddata)

        return await self._conn.send_bytes(senddata)

    async def _one_heartbeat(self) -> bool:
        return await self._conn.send_bytes(self._pack_heartbeat)
        
    async def _one_read(self) -> bool:
        pack = await self._conn.read_bytes()
        
        if pack is None:
            return False

        return self.handle_danmu(pack)

    def handle_danmu(self, pack):
        # print(f'{self._area_id} 号数据连接:', pack)
        
        stream = tarscore.TarsInputStream(pack)
        command = WebSocketCommand()
        command.readFrom(stream)
        #print(command.iCmdType)
        if command.iCmdType == EWebSocketCommandType.EWSCmdS2C_MsgPushReq:
            stream = tarscore.TarsInputStream(command.vData)
            msg = WSPushMessage()
            msg.readFrom(stream)
           
            
            if msg.iUri == 1400:  #弹幕
                stream = tarscore.TarsInputStream(msg.sMsg)
                msg = MessageNotice()
                msg.readFrom(stream)
                #print(f'{self._area_id} 号数据连接:' f' [{msg.tUserInfo.sNickName.decode("utf-8")}]: {msg.sContent.decode("utf-8")}')
            elif msg.iUri == 6210: #贵宾

                pass
            elif msg.iUri == 6211: #贵宾
               
                # print(command.vData)
                stream = tarscore.TarsInputStream(msg.sMsg)
                msg2 = MessageNotice()
                msg2.readFrom2(stream)
                self.Q.put({"vipNum":msg2.vvipnum,"levle":self.level})
                # todo close
                # print(f"Q:{self.Q.qsize()}")

                print('贵宾总数：' + str(msg2.vvipnum))



            else:
                #print(pack)
                #print(msg.iUri) 
                pass
        return True

    async def reset_roomid(self, room):
        async with self._opening_lock:
            # not None是判断是否已经连接了的(重连过程中也可以处理)
            await self._conn.close()
            if self._task_main is not None:
                await self._task_main
            # 由于锁的存在，绝对不可能到达下一个的自动重连状态，这里是保证正确显示当前监控房间号
            self._room = room
            # print(f'{self._area_id} 号数据连接已经切换房间（{room}）')


