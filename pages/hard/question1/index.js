const app = getApp();
Page({
  data: {
    params: {
      app_id: "tt07e3715e98c9aac0",
      out_order_no: `${Date.now()}`,
      total_amount: 2,
      subject: '小程序测试预下单',
      body: '测试',
      valid_time: 60 * 60 * 48,
    }
  },
  createOrder() {
    app.post('/create-order', {
      order: this.data.params
    }).then(res => {
      const {
        data
      } = res;
      console.log('创建订单成功::', data)
      console.log("相关文档：https://microapp.bytedance.com/docs/zh-CN/mini-app/develop/server/ecpay/appendix")
      tt.showModal({
        title: '创建订单成功',
        content: '请到控制台查看具体返回',
      });
      this.setData({
        orderInfo: data.data
      })
    }).catch(err => {
      console.log(err)
    })
  },
  payOrder() {
    const _this = this;
    console.log('orderInfo', this.data.orderInfo);
    this.data.orderInfo && tt.pay({
      orderInfo: _this.data.orderInfo,
      service: 5,
      _debug: true,
      success(res) {
        console.log('收到成功回调啦', res);
        if (res.code === 0) {
          console.log('支付成功啦～～')
          _this.saveOrder()
        }
      },
      fail(res) {
        console.log('支付失败了', res)
      }
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
  saveOrder() {
    console.log(`openid：${this.data.openid}\n oderid：${this.data.orderInfo.order_id}`)
    tt.request({
      url: 'https://microapp.bytedance.com/feedbacks/invoke/cp_pay_order',
      method: "POST",
      data: {
        type: "create",
        openid: this.data.openid,
        orderid: this.data.orderInfo.order_id,
        total_amount: this.data.params.total_amount,
        cp_out_order_no: this.data.params.out_order_no
      },
      success: (res) => {
        console.log("支付订单关联成功！")
      },
      fail: err => {
        console.error("请求失败，请重试", err)
      }
    });
  }
})