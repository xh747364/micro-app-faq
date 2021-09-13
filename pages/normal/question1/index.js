Page({
  onLoad: function (options) {
    console.error("在小程序切入后台后调用 tt.request 会触发报错 request: fail app in background");
    console.log("相关问题：https://forum.microapp.bytedance.com/mini-app/posts/60b08f5feb1f447ab12d8ccd")
  },
  onHide() {
    setTimeout(() => {
      tt.request({
        url: 'https://microapp.bytedance.com',
        success: (res) => {
          console.log("请求成功：");
        },
        fail: (err) => {
          console.error("请求失败：", err);
          /**
           * 
           * 可在onShow时增加判断取消弹窗。
           * 在后台失败时，弹窗也不能被用户看到，也可取消弹窗提示。
           * 如果这个请求比较重要，可记录请求失败的状态，在onShow时重新尝试发送
           */
          // tt.showModal({
          //   title: "网络错误",
          //   content: JSON.stringify(err),
          // });
        }
      });
    }, 8000)
  }
})