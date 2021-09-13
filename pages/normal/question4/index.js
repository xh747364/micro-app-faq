Page({
  onLoad: function (options) {
    console.error("连续调用 tt.login 在 iOS 上报错 【login:fail login is in progress, please do not call again】")

    tt.login({
      success: res => console.log("==onLoad== success：", res),
      fail: err => console.log("==onLoad== fail：", err)
    });

    console.log("相关问题：https://forum.microapp.bytedance.com/mini-app/posts/608537f91e04b37e5eaf9dc4")
  },
  onShow() {
    /**
     * 没必要连续调用
     */
    // tt.login({
    //   success: res => console.log("==onShow== success：", res),
    //   fail: err => console.log("==onShow== fail：", err)
    // });
  }
})