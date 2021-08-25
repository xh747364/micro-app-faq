import { questions } from "../../../config/hard/question";
Page({
  data: {
    questions, questions
  },
  questionDetail(e) {
    tt.navigateTo({
      url: e.currentTarget.dataset.path,
      fail: () => {
        tt.showModal({
          title: "跳转失败",
          content: "页面不存在！"
        });
      }
    });
  }
})