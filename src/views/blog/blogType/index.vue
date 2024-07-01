<template>
  <div class="app-container">
    <!-- 添加框 -->
    <div class="input-container">
      <el-input
        placeholder="请输入要添加的分类，左侧选择分类等级"
        v-model="input"
        class="input-with-select blog-input"
      >
        <el-select v-model="select" slot="prepend">
          <el-option label="1" :value="1"></el-option>
          <el-option label="2" :value="2"></el-option>
          <el-option label="3" :value="3"></el-option>
          <el-option label="4" :value="4"></el-option>
          <el-option label="5" :value="5"></el-option>
        </el-select>
      </el-input>
      <el-button class="blog-btn" type="primary" @click="handleAddBlogType"
        >添加</el-button
      >
    </div>
    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="data" border style="width: 100%">
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="博客类别">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="文章数量">
        <template slot-scope="scope">
          <span>{{ scope.row.articleCount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
              @click="openEditDialog(scope.row)"
            />
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              @click="deleteBlogType(scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑分类 -->
    <el-dialog
      title="请编辑该分类信息"
      width="500px"
      top="15vh"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序等级" label-width="70px">
          <el-select v-model="form.order">
            <el-option label="1" :value="1"></el-option>
            <el-option label="2" :value="2"></el-option>
            <el-option label="3" :value="3"></el-option>
            <el-option label="4" :value="4"></el-option>
            <el-option label="5" :value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary" @click="editBlogTypeConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBlogType,
  delBlogType,
  addBlogType,
  updateBlogType,
} from "@/api/blogType";
import fetchDataAndEdit from "@/mixins/fetchDataAndEdit";
export default {
  mixins: [fetchDataAndEdit],
  data() {
    return {
      input: "", // 添加框数据
      select: 1, // 下拉框数据
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 获取文章类型列表
    async fetchList() {
      return await getBlogType();
    },
    // 删除文章类型
    deleteBlogType(row) {
      this.$confirm(
        "删除该分类后，该分类的所有文章将变为未分类状态",
        "是否删除该分类",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          const resp = await delBlogType(row.id);
          if (!resp.code) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.fetchData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 添加文章类型
    async handleAddBlogType() {
      if (this.input) {
        const { code } = await addBlogType({
          name: this.input,
          order: this.select,
        });
        if (!code) {
          this.input = "";
          this.$message.success("添加分类成功");
          this.fetchData();
        }
      } else {
        this.$message.error("分类不能为空");
      }
    },
    // 确定编辑
    async editBlogTypeConfirm() {
      const { code } = await updateBlogType({
        id: this.form.id,
        data: {
          name: this.form.name,
          order: this.form.order,
        },
      });
      if (!code) {
        this.dialogFormVisible = false;
        this.$message.success("更新分类信息成功");
        this.fetchData();
      }
    },
  },
};
</script>

<style lang="scss">
.input-container {
  margin: 15px 0 20px;
}

.blog-input {
  width: 500px;
  .el-select .el-input {
    width: 65px;
  }
}
.blog-btn {
  margin-left: 20px;
}
</style>