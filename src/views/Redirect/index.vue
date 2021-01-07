<template>
  <div class="contrain"></div>
</template>
<script>
import utils from "@/utils/index";
import info from "@/utils/info";
import http from "@/api/http";
const murl = "http://172.16.15.196:8090";

export default {
  data() {
    return {
      textTitle: "权限",
    };
  },
  created() {
    this.getCode();
  },
  mounted() {},
  methods: {
    getCode() {
      //encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
      //1、静默授权：snsapi_base，没有弹窗，只能获取用户的openId。
      //2、非静默授权：snsapi_userinfo，有弹框弹出需要用户手动点击确认授权。可以获取openId，用户的头像、昵称等

      //redirect_uri，这个的意思是：授权完成后再重新回到当前页面（又刷新了一次页面）

      const code = utils.getUrlParam("code"); // 截取路径中的code

      if (code == null || code === "") {
        // //获取当前页面路径，这就是回调的地址
        //测试地址：http://172.16.15.196:8090/Redirect
        const local = `${murl}/Redirect`;
        window.location.href =
          "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
          info.APPID +
          "&redirect_uri=" +
          encodeURIComponent(local) +
          "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
      } else {
        let mm = {
          code: code,
        };
        http.getToken(mm).then((res) => {
          let accessObj = res.data;
          utils.setStore("openId", accessObj.openId);
          let url = utils.getStore("now_url");
          //跳转

          window.location.replace(murl + url);
        });
      }
    },
  },
};
</script>