<template>
  <div
    v-webTitle="{ title: textTitle }"
    class="contrain-pub award-contrain"
    :class="{ 'award-hidden': !awardShow }"
  >
    <!-- <img src="../../assets/image/2.png" /> -->

    <div class="main">
      <div class="main-img">
        <img src="../../assets/image/3.png" />

        <div class="main-img-tit">{{ awardTile }}</div>
      </div>
      <div class="main-cen" v-if="awardShow">
        <p class="title">请填写您的可邮寄地址，如抽奖时已填写请不必再填。</p>
        <div class="address-f-m">
          <van-form label-align="right" label-width="4.2em">
            <van-field
              v-model="fromData.participantName"
              name="姓名 "
              label="姓名 "
              placeholder="请输入您的真实姓名"
              autocomplete="off"
            />

            <van-field
              v-model="fromData.mobile"
              type="tel"
              name="手机号码 "
              label="手机号码 "
              placeholder="请输入您的手机号"
              autocomplete="off"
            />
            <van-field
              v-model="fromData.verify"
              center
              clearable
              label=" "
              placeholder="请输入验证码"
            >
              <template #button>
                <van-button size="mini" type="default" @click="gainClick">{{
                  sendCodeText
                }}</van-button>
              </template>
            </van-field>
            <van-field
              readonly
              clickable
              name="area"
              :value="fromData.area"
              label="所在省份"
              placeholder="请选择所在省市区"
              right-icon="arrow"
              @click="showArea = true"
            />
            <van-popup
              v-model="showArea"
              position="bottom"
              get-container=".award-contrain"
            >
              <van-area
                :area-list="areaList"
                :value="fromData.companyDistrict"
                @confirm="onConfAirmA"
                @cancel="showArea = false"
              />
            </van-popup>
            <van-field
              v-model="fromData.companyAddressDetail"
              name="详细地址 "
              label="详细地址 "
              placeholder="请输入可邮寄的详细地址"
              autocomplete="off"
            />
            <!-- <van-field
              v-model="fromData.postal"
              name="邮政编码 "
              label="邮政编码 "
              placeholder="请输入邮编"
              autocomplete="off"
            /> -->
          </van-form>
        </div>
        <div class="contrain-footer" v-show="!showArea">
          <p class="title">提交后不能二次修改，每周一公布中奖结果！</p>
          <van-button
            :disabled="disabled"
            round
            block
            type="info"
            @click="submitClik()"
          >
            提交
          </van-button>
        </div>
      </div>
      <div class="main-cen" v-else>
        <div class="address-f-m main-cen-h">
          <div class="main-cen-tit">
            <p>感谢您的支持！后续我们会</p>
            <p>推出更多有奖活动期待您的参加！</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AreaList from "@/utils/area";
import utils from "@/utils/index";

import http from "@/api/http";

export default {
  data() {
    return {
      textTitle: "抽奖信息查询",
      awardTile: "暂无信息",
      awardShow: false,
      fromData: {
        openId: "",
        participantName: "",
        mobile: "", //电话
        verify: "",
        area: "",
        companyProvince: "",
        companyCity: "",
        companyDistrict: "",
        companyAddressDetail: "", //详细地址
        // postal: "",
      },
      sendCodeText: "获取验证码",
      path: "",
      showArea: false, //省市区
      areaList: AreaList,
      disabled: true,
      msgBtnDisabled: false, // 获取验证码是否可以被点击: true 不能被点击 false 可以被点击
      code: "", //用户授权后获取的code
      openId: "", //用户唯一标识
    };
  },
  watch: {
    fromData: {
      handler(val) {
        this.check();
      },
      deep: true,
    },
  },
  created() {
    this.openId = utils.getStore("openId");

    this.getOpenId();
  },
  mounted() {},
  methods: {
    async getOpenId() {
      this.fromData.openId = this.openId;
      let userObj = await this.getUserInfo();
      if (userObj.data !== null && userObj.data !== "null") {
        if (userObj.data.luckDrawStstus === 1) {
          //中奖
          this.awardTile = "恭喜您！已中奖！";
          this.awardShow = true;
          let provice =
            userObj.data.receiverProvince || userObj.data.companyProvince;

          let city = userObj.data.receiverCity || userObj.data.companyCity;
          let district =
            userObj.data.receiverDistrict || userObj.data.companyDistrict;

          this.fromData.participantName =
            userObj.data.receiverName || userObj.data.participantName;

          this.fromData.mobile =
            userObj.data.receiverMobile || userObj.data.mobile; //电话

          this.fromData.area = `${AreaList.province_list[provice]} ${AreaList.city_list[city]} ${AreaList.county_list[district]}`;
          this.fromData.companyProvince = provice;
          this.fromData.companyCity = city;
          this.fromData.companyDistrict = district;

          this.fromData.companyAddressDetail =
            userObj.data.receiverAddressDetail ||
            userObj.data.companyAddressDetail; //详细地
        }
        if (userObj.data.luckDrawStstus === 2) {
          this.awardShow = false;
          this.awardTile = "很遗憾，您未中奖";
        }
        if (userObj.data.luckDrawStstus === 0) {
          this.awardShow = false;
          this.awardTile = "抽奖信息已提交";
        }
      }
    },

    getUserInfo() {
      // 获取用户填写信息
      return http.queryLuck({ openId: this.openId }).then((res) => {
        return res;
      });
    },
    onConfAirmA(values) {
      this.fromData.companyProvince = values[0].code;
      this.fromData.companyCity = values[1].code;
      this.fromData.companyDistrict = values[2].code;
      this.fromData.area = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join(" ");
      this.showArea = false;
    },
    gainClick() {
      //获取验证码

      if (this.msgBtnDisabled) {
        this.$toast({
          message: "不能重复点击",
          className: "totast-cum ",
        });
        return;
      }
      const reg = /^1[3456789]\d{9}$/;
      if (!reg.test(this.fromData.mobile)) {
        this.$toast({
          message: "请输入正确的手机号",
          className: "totast-cum",
        });
        return;
      }
      this.getVerifyCode();
      this.setCode(90);
    },
    getVerifyCode() {
      http.sendSms({ phone: this.fromData.mobile }).then((res) => {
        this.$toast({
          message: res.data,
        });
      });
    },
    // 设置发送验证码倒计时
    setCode(num) {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        num--;
        if (num > 0) {
          this.msgBtnDisabled = true;
          this.sendCodeText = `获取验证码(${num})`;
        } else {
          clearInterval(this.timer);
          this.sendCodeText = "重新获取验证码";
          this.msgBtnDisabled = false;
        }
      }, 1000);
    },
    submitClik() {
      http.editParticipantInfo(this.fromData).then((res) => {
        this.$toast({
          message: "提交成功！",
          className: "totast-cum",
        });
      });
    },
    check() {
      this.disabled = true;
      let flag = true;
      for (const key in this.fromData) {
        let value = this.fromData[key].trim();
        if (!value) {
          flag = false;
          break;
        }
      }
      if (flag) {
        this.disabled = false;
      }
    },
  },
  destroyed() {
    utils.removeStore("openId");
    utils.removeStore("now_url");
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/common.scss";
// .van-overflow-hidden {
// .award-contrain > img {
//   height: auto !important;
// }
// }
.award-contrain {
  background: url(../../assets/image/2.png) no-repeat;
  background-size: cover;
  padding-bottom: 30px;
  // & > img {
  //   height: 100%;
  // }
}
.award-hidden {
  overflow: hidden;
}
.main-cen-h {
  height: 275px;
  position: relative;
  text-align: center;
  margin-top: 40px;
  .main-cen-tit {
    position: absolute;
    display: inline-block;
    left: 0;
    right: 0;
    top: 45%;
    bottom: 0;
    margin: 0 auto;

    line-height: 29px;
    font-size: 16px;
    text-align: center;
    color: #ff9600;
  }
}
.main-cen {
  margin-top: 16px;
}
.main-img {
  display: block;
  text-align: center;
  position: relative;
  & > img {
    display: inline-block;
    width: 84%;
  }
  .main-img-tit {
    position: absolute;
    color: #e80000;
    font-size: 21px;
    left: 48%;
    top: 45%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    font-weight: 500;
    text-align: center;
  }
}
</style>