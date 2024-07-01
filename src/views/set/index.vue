<template>
  <div class="app-container">
    <div class="block">网站信息</div>
    <div class="block2">网站标题</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.siteTitle" :disabled="isDisabled"></el-input>
    </div>
    <div class="block2">邮箱</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.mail" :disabled="isDisabled"></el-input>
    </div>
    <div class="block2">备案号</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.icp" :disabled="isDisabled"></el-input>
    </div>
    <el-divider></el-divider>
    <div class="block">网站头像信息</div>
    <div style="margin-bottom: 15px">
      <el-image
        v-if="isDisabled"
        style="width: 100px; height: 100px"
        :src="form.avatar"
      ></el-image>
      <Upload v-else v-model="form.avatar" />
    </div>
    <el-divider></el-divider>
    <div class="block">网址图标信息</div>
    <div class="block2">网址图标地址</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input
        v-model="form.favicon"
        placeholder="请输入图片地址"
        :disabled="isDisabled"
      ></el-input>
    </div>
    <div class="block2">网址图标预览</div>
    <div style="margin-bottom: 15px">
      <el-image
        v-if="isDisabled"
        style="width: 50px; height: 50px"
        :src="form.favicon"
      ></el-image>
      <Upload v-else v-model="form.favicon" />
    </div>
    <el-divider></el-divider>
    <div class="block">github 信息</div>
    <div class="block2">github 名字</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.githubName" :disabled="isDisabled"></el-input>
    </div>
    <div class="block2">github 地址</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.github" :disabled="isDisabled"></el-input>
    </div>
    <el-divider></el-divider>
    <div class="block">QQ 信息</div>
    <div class="block2">QQ 号码</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.qq" :disabled="isDisabled"></el-input>
    </div>
    <div class="block2">QQ 二维码图片预览</div>
    <div style="margin-bottom: 15px">
      <el-image
        v-if="isDisabled"
        style="width: 100px; height: 100px"
        :src="form.qqQrCode"
      ></el-image>
      <Upload v-else v-model="form.qqQrCode" />
    </div>
    <el-divider></el-divider>
    <div class="block">微信信息</div>
    <div class="block2">微信号</div>
    <div style="margin-bottom: 15px; width: 500px">
      <el-input v-model="form.weixin" :disabled="isDisabled"></el-input>
    </div>
    <div class="block2">微信二维码图片预览</div>
    <div style="margin-bottom: 15px">
      <el-image
        v-if="isDisabled"
        style="width: 100px; height: 100px"
        :src="form.weixinQrCode"
      ></el-image>
      <Upload v-else v-model="form.weixinQrCode" />
    </div>
    <el-divider></el-divider>
    <el-button type="primary" @click="handleEdit">{{ btnContent }}</el-button>
  </div>
</template>

<script>
import Upload from "@/components/Upload";
import { SERVER_URL } from "@/urlConfig";
import { getSetting, setSetting } from "@/api/setting";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      form: {},
      btnContent: "进入编辑模式",
      SERVER_URL,
    };
  },
  computed: {
    isDisabled() {
      return this.btnContent === "进入编辑模式";
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 获取数据
    async fetchData() {
      const { data } = await getSetting();
      this.form = data;
    },
    // 编辑与提交
    async handleEdit() {
      if (this.btnContent === "进入编辑模式") {
        this.btnContent = "保存";
        return;
      }
      const { code } = await setSetting(this.form);
      if (!code) {
        this.$message.success("修改成功！");
        this.btnContent = "进入编辑模式";
        return;
      }
    },
  },
};
</script>

<style scoped>
.block {
  margin: 15px 0;
  font-size: 20px;
  font-weight: 100;
}
.block2 {
  margin: 15px 0;
  font-size: 14px;
  font-weight: 100;
}
</style>