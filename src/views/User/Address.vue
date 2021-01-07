<template>
  <div v-webTitle="{ title: textTitle }" class="address-contrain contrain-pub">
    <img src="../../assets/image/抽奖.png" />

    <div class="address-from">
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
            v-model="fromData.companyName"
            name="所在公司 "
            label="所在公司 "
            placeholder="请填写您的公司"
            autocomplete="off"
          />
          <van-field
            readonly
            clickable
            :value="fromData.industry"
            name="所属行业 "
            label="所属行业 "
            placeholder="请选择所属行业"
            right-icon="arrow"
            @click="showPicker = true"
          />
          <van-popup
            v-model="showPicker"
            position="bottom"
            get-container=".address-contrain"
          >
            <van-picker
              show-toolbar
              :default-index="tradeIndex"
              :columns="columnsTrade"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <van-field
            readonly
            clickable
            :value="fromData.capacity"
            name="公司规模 "
            label="公司规模 "
            placeholder="请选择所公司规模"
            right-icon="arrow"
            @click="showScale = true"
          />
          <van-popup
            v-model="showScale"
            position="bottom"
            get-container=".address-contrain"
          >
            <van-picker
              show-toolbar
              :default-index="scaleIndex"
              :columns="columnsScale"
              @confirm="onConfirmS"
              @cancel="showScale = false"
            />
          </van-popup>
          <van-field
            v-model="fromData.deptment"
            name="所在部 "
            label="所在部门 "
            placeholder="请填写所在部门"
            autocomplete="off"
          />
          <van-field
            v-model="fromData.job"
            name="职务 "
            label="职务 "
            placeholder="请填写您的职务"
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
            get-container=".address-contrain"
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
          提交并抽奖
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
import AreaList from "@/utils/area";
import utils from "@/utils/index";
import info from "@/utils/info";
import http from "@/api/http";

export default {
  data() {
    return {
      textTitle: "抽奖信息登录",
      fromData: {
        openId: "",
        participantName: "",
        companyName: "", //所属公司
        industry: "",
        capacity: "",
        deptment: "", //所在部门
        job: "", //职务
        mobile: "", //电话
        verify: "", //验证码
        area: "",
        companyProvince: "",
        companyCity: "",
        companyDistrict: "",
        companyAddressDetail: "", //详细地址
        // postal: "",
      },
      tradeIndex: 0, //所属行业选中值的索引
      scaleIndex: 0, //公司规模选中值的索引
      // areaValue: "230803", //地址选中值的code码
      columnsTrade: info.clientIndustry, //所属行业下拉值
      columnsScale: info.clientCapacityType, //公司规模下拉值
      sendCodeText: "获取验证码",
      showPicker: false, //行业
      showScale: false, //公司规模
      showArea: false, //省市区
      areaList: AreaList, //省市区
      disabled: true, //提交按钮是否可点击
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
  methods: {
    async getOpenId() {
      this.fromData.openId = this.openId;
      let userObj = await this.getUserInfo();
      if (userObj.data !== null && userObj.data !== "null") {
        this.fromData.participantName = userObj.data.participantName;
        this.fromData.companyName = userObj.data.companyName; //所属公司
        this.fromData.industry = userObj.data.industry; //"建筑业",
        this.fromData.capacity = userObj.data.capacity; //"300-599",
        this.fromData.deptment = userObj.data.deptment; //所在部门
        this.fromData.job = userObj.data.job; ////职务
        this.fromData.mobile = userObj.data.mobile; //电话
        // this.fromData.verify = userObj.data.participantName; //验证码
        this.fromData.area = `${
          AreaList.province_list[userObj.data.companyProvince]
        } ${AreaList.city_list[userObj.data.companyCity]} ${
          AreaList.county_list[userObj.data.companyDistrict]
        }`;
        this.fromData.companyProvince = userObj.data.companyProvince;
        this.fromData.companyCity = userObj.data.companyCity;
        this.fromData.companyDistrict = userObj.data.companyDistrict;
        this.fromData.companyAddressDetail = userObj.data.companyAddressDetail; //详细地址
        this.setTradeIndex(userObj.data.industry); //所属行业
        this.setScaleIndex(userObj.data.capacity); //公司规模
        // this.$toast({
        //   message: "您的抽奖信息已录入",
        //   className: "totast-cum toast-yellow",
        // });
      }
      // this.fromData.username = userObj.nickname;
    },

    getUserInfo() {
      // 获取用户填写信息
      return http.queryLuck({ openId: this.openId }).then((res) => {
        return res;
      });
    },
    onConfirm(obj) {
      //所属行业
      this.fromData.industry = obj.text;
      this.setTradeIndex(obj.text);
      this.showPicker = false;
    },
    setTradeIndex(text) {
      this.columnsTrade.forEach((element, index) => {
        if (element.text == text) {
          this.tradeIndex = index;
        }
      });
    },
    onConfirmS(value) {
      //公司规模
      this.fromData.capacity = value.text;
      this.setScaleIndex(value.text);
      this.showScale = false;
    },
    setScaleIndex(text) {
      this.columnsScale.forEach((item, index) => {
        if (item.text === text) {
          this.scaleIndex = index;
        }
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
      //获取省市区编号，用于选中后的渲染
      // let len = values.length;
      // this.areaValue = values[len - 1].code;
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
      http.addParticipantInfo(this.fromData).then((res) => {
        this.$toast({
          message: "提交成功！",
          className: "totast-cum",
        });
      });
    },
    check() {
      //提交按钮是否可点击
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
</style>