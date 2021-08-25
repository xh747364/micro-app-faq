Page({
  onLoad: function (options) {
    console.error("tt.getExtConfigSync 不会执行，请修改代码！");
    console.log("相关问题：https://forum.microapp.bytedance.com/mini-app/posts/60b605e81aaa24571a2c69da");

    tt.getExtConfig({
      success: res => {
        console.log("tt.getExtConfig: ", res)
      }
    });

    tt.getExtConfigSync({
      success: res => {
        console.log("tt.getExtConfigSync：", res)
      }
    });
  }
})