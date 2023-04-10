import asyncio
import time
from ws_huya_danmu_client import WsDanmuClient

# room = 645588
area_id = 0


async def test_danmu_client(client,Q,room):
    connection = client(room, area_id,Q)
    print(connection.run_forever)
    asyncio.ensure_future(connection.run_forever())
    await asyncio.sleep(15)
    await connection.reset_roomid(room)
    print('RESTED')
    connection.pause()
    await asyncio.sleep(0)
    print('resume')
    connection.resume()
    await asyncio.sleep(0)
    print('close')
    # await connection.close()
    await connection.close_and_clean()
    print('END')


async def test_tcp_danmu_client():
    await test_danmu_client(0)
    
    
async def test_ws_danmu_client(Q,room):
    await test_danmu_client(WsDanmuClient,Q,room)



def test(Q,room):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(test_ws_danmu_client(Q,room))
    loop.close()
