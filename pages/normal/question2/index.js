function gRead(ab) {
  let str = '';
  let i8a = new Int8Array(ab);

  for (let i = 0; i < i8a.length; i++) {
    str += i8a[i] + ' ';
  }

  return str;
}
Page({
  data: {
    text: '显示消息\n'
  },
  onLoad: function (options) {
    console.error("真机调试使用 websocket 发送二进制数据，在服务端接收到的是 String 类型数据");
    console.log("相关问题：https://forum.microapp.bytedance.com/mini-game/posts/609e4788543256b0161e2f66")
    console.log("参考文档：https://microapp.bytedance.com/docs/zh-CN/mini-app/develop/api/network/web-socket/socket-task/send")

    this.openSocket();
  },
  onUnload: function () {
    this.closeSocket();
  },
  openSocket: function () {
    let that = this;
    let url = 'wss://frontier.snssdk.com/ws/v2?aid=1288&device_id=98543534&fpid=72&access_key=f075e82cde98601fc5d41302af325631';
    this.socket = tt.connectSocket({
      url,
      header: {
        'content-type': 'application/json'
      },
      protocols: [],
      success() {
        setTimeout(() => {
          that.operateData();
        }, 0);
      },
      fail(err) {
        console.error('建立 WebSocketTask 失败', err);
        tt.showToast({
          title: '建立WebSocketTask 失败',
          icon: "none"
        });
      },
      complete: res => {
        console.log(res);
      }
    });
  },

  operateData() {
    let that = this;

    that.socket.onError(error => {
      console.error('WebSocket 发生错误:', error);
      tt.showToast({
        title: 'WebSocket发生错误',
        icon: "none"
      });
    });

    that.socket.onMessage(message => {

      tt.showToast({
        title: "收到信道消息",
        icon: "success",
        duration: 1000
      });

      let data = message.data;

      if (Object.prototype.toString.call(data) === '[object ArrayBuffer]') {
        data = gRead(data);
      }

      that.setData({
        text: that.data.text + '[rec] ' + data + '\n'
      });
    });
  },
  sendMessageAB: function () {
    let that = this;
    if (this.socket) {
      /**
       * 发送的是ArraryBuffer
       */
      let ab = (new Uint8Array(10)).buffer;
      this.socket.send({
        data: ab,
        success() {
          that.setData({
            text: that.data.text + '[send] ' + gRead(ab) + '\n'
          });
        },
        fail() {
          console.error('发送失败');
        }
      });
    }
  },
  closeSocket: function () {
    if (this.socket) {
      this.socket.close({
        code: 1000,
        reason: 'pageclose'
      });
    }
  },
});