<template>
  <div class="app-container">
    <div class="item">
      <div class="lable-container">项目名称</div>
      <div class="input-container">
        <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lable-container">项目描述（每一项描述以英文逗号分隔）</div>
      <div class="input-container">
        <el-input
          type="textarea"
          v-model="form.description"
          placeholder="请输入项目描述"
          :rows="5"
        ></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lable-container">项目链接</div>
      <div class="input-container">
        <el-input v-model="form.url" placeholder="请输入项目链接"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lable-container">Github 地址</div>
      <div class="input-container">
        <el-input
          v-model="form.github"
          placeholder="请输入github地址"
        ></el-input>
      </div>
    </div>
    <!-- 文章头图 -->
    <div class="item">
      <Upload uploadTitle="预览图" v-model="form.thumb" />
    </div>
    <div class="item">
      <div class="lable-container">排序等级</div>
      <div class="input-container">
        <el-select
          v-model="form.order"
          placeholder="请选择排序等级"
          @change="changeHandle"
        >
          <el-option label="1" :value="1"></el-option>
          <el-option label="2" :value="2"></el-option>
          <el-option label="3" :value="3"></el-option>
          <el-option label="4" :value="4"></el-option>
          <el-option label="5" :value="5"></el-option>
        </el-select>
      </div>
    </div>
    <div class="item">
      <el-button class="btn-blog" type="primary" @click="addProjectHandle">{{
        "发布项目"
      }}</el-button>
    </div>
  </div>
</template>

<script>
import { addProject } from "@/api/project";
import Upload from "@/components/Upload";
export default {
  components: {
    Upload,
  },
  data() {
    return {
      form: {
        name: "", // 项目名称
        description: "", // 项目描述
        url: "", // 项目链接
        github: "", // Github 地址
        thumb: "", // 预览图
        order: null, // 排序等级
      },
    };
  },
  methods: {
    // 发布项目
    async addProjectHandle() {
      const params = {
        ...this.form,
        description: this.form.description.split(","),
      };
      const { code } = await addProject(params);
      if (!code) {
        this.$message.success("发布成功");
        this.$router.push("/projectsList");
        return;
      }
    },
    changeHandle() {
      this.$forceUpdate();
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