const payConf = require('./payConf')
App({
  getConf() {
    return payConf
  },
  getDomain() {
    return `http://${payConf.domain}:${payConf.port}`
  },
  login() {
    return new Promise((resolve, reject) => {
      tt.login({
        success: res => {
          tt.request({
            url: 'https://microapp.bytedance.com/feedbacks/invoke/cp_pay_get_user',
            data: {
              code: res.code
            },
            success: (res) => {
              tt.showToast({
                title: '登录成功！'
              });
              resolve(res.data)
            }
          });
        },
        fail: err => {
          reject(err)
        }
      });
    })
  },
  post(path, data, query) {

    return new Promise((resolve, reject) => {
      tt.request({
        method: 'POST',
        url: `${this.getDomain()}${path}`, // 目标服务器url
        data,
        success: (res) => {
          resolve(res);
        },
        fail: (res) => {
          reject(res)
        }
      });
    })
  },
  onLaunch: function () {
    console.log('当前服务地址::', this.getDomain())
    console.log('问题提交格式');
  }
})