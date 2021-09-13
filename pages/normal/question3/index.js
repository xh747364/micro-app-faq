const app = getApp();
Page({
  onLoad: function (options) {
    console.error("已授权订阅消息成功，但是后台请求接口返回【该用户未订阅】")
    console.log("相关问题：1、https://forum.microapp.bytedance.com/mini-app/posts/60b88f4d1aaa24571a2c6b42 \n 2、https://forum.microapp.bytedance.com/mini-app/posts/60afc29bb4f1bf6c7194795e")
  },
  getAccessToken() {
    tt.request({
      url: 'https://microapp.bytedance.com/feedbacks/invoke/cp_pay_get_access_token',
      success: (res) => {
        tt.showToast({
          title: '请求成功',
        });
        this.setData({
          access_token: res.data.access_token
        })
      }
    });
  },
  subscribeMessage() {
    tt.requestSubscribeMessage({
      tmplIds: ["MSG123251735bc0f19005a318abdce9ad79e8b982113929"],
      success: (res) => {
        // 模拟服务端发送请求
        tt.request({
          url: 'https://developer.toutiao.com/api/apps/subscribe_notification/developer/v1/notify',
          method: "POST",
          data: {
            access_token: this.data.access_token,
            /**
             * 参数名写错了
             */
            app_id: "ttba89cc3425b1d98b01",
            tpl_id: "MSG123251735bc0f19005a318abdce9ad79e8b982113929",
            open_id: this.data.openid,
            data: {
              "查询内容": "示例",
              "查询时间": "2021-01-01",
              "备注": "备注"
            },
          },
          success: res => {
            console.error("请求成功：", res.data)
            tt.showModal({
              title: "请求成功",
              content: JSON.stringify(res.data)
            });
          },
          fail: err => {
            console.error("请求失败：", err)
            tt.showModal({
              title: "请求失败",
              content: JSON.stringify(err)
            });
          }
        });
      },
      fail(error) {
        console.log("订阅失败, 错误详情: ", error);
        tt.showToast({
          title: "订阅失败",
          icon: "fail",
        });
      },
    })
  },
  login() {
    app.login().then(res => {
      this.setData({
        openid: res.openid
      })
    }).catch(err => {
      console.error("登录失败", err)
    });
  },
})