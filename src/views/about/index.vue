<template>
  <div class="app-container">
    <div class="item">
      <div class="lable-container">关于我</div>
      <div class="input-container">
        <el-input
          v-model="url"
          placeholder="请输入"
          :disabled="btnContent === '编辑'"
        ></el-input>
      </div>
    </div>
    <div class="item">
      <el-button class="btn-blog" type="primary" @click="handleEdit">{{
        btnContent
      }}</el-button>
    </div>
  </div>
</template>

<script>
import { setAbout } from "@/api/about";
export default {
  data() {
    return {
      btnContent: "编辑",
      url: "",
    };
  },
  methods: {
    async handleEdit() {
      if (this.btnContent === "编辑") {
        this.btnContent = "保存";
        return;
      }
      if (this.url === "") {
        this.$message.warning("url 不能为空！");
        return;
      }
      const { code } = await setAbout({ url: this.url });
      if (!code) {
        this.$message.success("设置成功！");
        this.btnContent = "编辑";
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  .item {
    padding: 15px 0;
  }
  .lable-container {
    font-weight: 700;
    font-size: 14px;
    color: #606266;
    margin-bottom: 15px;
  }
}
</style>