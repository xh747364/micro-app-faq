const app = getApp();
Page({
  data: {
  },
  onLoad: function (options) {
    console.log("相关问题：https://forum.microapp.bytedance.com/mini-app/posts/60f7f32c619c4c002cbfc475")
    console.log("相关文档：https://microapp.bytedance.com/docs/zh-CN/mini-app/develop/server/ecpay/server-doc#%E9%80%80%E6%AC%BE")
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
  getOrder() {
    tt.request({
      url: 'https://microapp.bytedance.com/feedbacks/invoke/cp_pay_order',
      method: "POST",
      data: {
        openid: this.data.openid,
        type: "list"
      },
      success: (res) => {
        console.log(res)
        this.setData({
          orderList: res.data.data
        })
      }
    });
  },
  reimburse(item) {
    let orderInfo = this.data.orderList[item.currentTarget.dataset.index]
    const params = {
      app_id: "tt07e3715e98c9aac0",
      out_order_no: orderInfo.cp_out_order_no,
      out_refund_no: `${Date.now()}`,
      reason: "退款",
      refund_amount: 1
    }
    console.log(params)
    app.post('/repay-order', {
      order: params
    }).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.error('请求失败：', err)
    })
  }
})