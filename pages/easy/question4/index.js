Page({
  onLoad: function (options) {
    tt.request({
      url: 'https://forum.microapp.bytedance.com',
      success: (res) => {
        console.info("请求成功");
      },
      fail: (err) => {
        console.error("请求失败：", err);
        console.log("相关问题：https://forum.microapp.bytedance.com/mini-app/posts/606528b09db5832a980bb59d")
      }
    });
  }
})