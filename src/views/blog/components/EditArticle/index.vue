<template>
  <div>
    <div class="item">
      <div class="lable-container">文章标题</div>
      <div class="input-container">
        <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
      </div>
    </div>
    <div class="item">
      <div class="lable-container">文章编辑</div>
      <div class="input-container">
        <editor
          ref="toastuiEditor"
          :initialValue="form.editorText"
          height="600px"
          :options="editorOptions"
        />
      </div>
    </div>
    <div class="item">
      <div class="lable-container">文章描述</div>
      <div class="input-container">
        <el-input
          type="textarea"
          v-model="form.description"
          :rows="5"
        ></el-input>
      </div>
    </div>
    <!-- 文章头图 -->
    <div class="item">
      <Upload uploadTitle="文章头图" v-model="form.thumb" />
    </div>
    <div class="item">
      <div class="lable-container">文章分类</div>
      <div class="input-container">
        <el-select
          v-model="form.select"
          placeholder="请选择文章分类"
          @change="changeHandle"
        >
          <el-option
            v-for="type in blogType"
            :key="type.id"
            :label="type.name"
            :value="type.id"
          />
        </el-select>
      </div>
    </div>
    <div class="item">
      <el-button class="btn-blog" type="primary" @click="articleHandle">{{
        mode === "add" ? "发布文章" : "确认修改"
      }}</el-button>
    </div>
  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn";
import { Editor } from "@toast-ui/vue-editor";
import Upload from "@/components/Upload";
import { getBlogType } from "@/api/blogType";
import { findOneBlog, addBlog, editBlog } from "@/api/blog";
export default {
  props: ["mode"],
  components: {
    Editor,
    Upload,
  },
  data() {
    return {
      form: {
        id: "", // 文章id
        title: "", // 文章标题
        editorText: "", // 用户编辑的内容
        description: "", // 文章描述
        thumb: "", // 文章头图
        select: "", // 选择分类
      },
      blogType: [], // 文章分类
      editorOptions: {
        language: "zh-CN",
      },
    };
  },
  created() {
    this.fetchBlogType();
    if (this.mode === "edit") {
      this.fetchBlogById();
    }
  },
  methods: {
    async fetchBlogType() {
      const resp = await getBlogType();
      this.blogType = resp.data;
    },
    async fetchBlogById() {
      this.form.id = this.$route.params.id;
      const { data, code } = await findOneBlog(this.form.id);
      this.form = data;
      this.form.select = data.category?.id || "";
      this.$refs.toastuiEditor.invoke("setHTML", data.htmlContent);
    },
    changeHandle() {
      this.$forceUpdate();
    },
    // 添加修改文章
    async articleHandle() {
      const html = this.$refs.toastuiEditor.invoke("getHTML");
      const markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      const params = {
        title: this.form.title,
        description: this.form.description,
        createDate: Date.now(),
        categoryId: this.form.select,
        // toc 服务器会通过传递的 markdown 来生成 toc 目录
        toc: [],
        htmlContent: html,
        markdown: markdown,
        thumb: this.form.thumb,
      };
      const { code } =
        (await this.mode) === "add"
          ? addBlog(params)
          : editBlog({ id: this.form.id, data: params });
      if (!code) {
        this.$message.success(
          this.mode === "add" ? "文章添加成功" : "修改文章成功"
        );
        this.$router.push("/blog");
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