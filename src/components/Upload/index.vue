<template>
  <div class="upload-container">
    <!-- 上传组件标题 -->
    <div class="title">{{ uploadTitle }}</div>
    <!-- 上传控件 -->
    <el-upload
      class="avatar-uploader"
      :headers="headers"
      action="/api/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="value" :src="imgUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    uploadTitle: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
  },
  computed: {
    // 当前图片地址
    imgUrl() {
      return this.value;
    },
    // 上传图片请求头
    headers() {
      return {
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      };
    },
  },
  methods: {
    /**
     * 上传成功后的回调
     */
    handleAvatarSuccess(res) {
      if (!res.code && res.data) {
        // 上传成功
        this.$emit("input", res.data);
      }
    },
  },
};
</script>

<style>
.title {
  font-weight: 700;
  font-size: 14px;
  color: #606266;
  margin-bottom: 15px;
  margin-right: 15px;
}
.avatar-uploader {
  display: inline-block;
}
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>