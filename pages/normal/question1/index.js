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
          tt.showModal({
            title: "网络错误",
            content: JSON.stringify(err),
          });
        }
      });
    }, 8000)
  }
})