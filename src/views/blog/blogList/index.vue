<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table
      v-loading="loading"
      element-loading-text="数据加载中"
      :data="data"
      border
      style="width: 100%"
    >
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{ (page - 1) * limit + (scope.$index + 1) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="文章名称">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title="博客预览图"
            width="230"
            trigger="hover"
            v-if="scope.row.thumb"
          >
            <el-image
              style="width: 200px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            />
            <a
              slot="reference"
              href="#"
              target="_blank"
              @click.prevent="goToTitleHand(scope.row)"
              >{{ scope.row.title }}</a
            >
          </el-popover>
          <a
            v-else
            slot="reference"
            href="#"
            target="_blank"
            @click.prevent="goToTitleHand(scope.row)"
            >{{ scope.row.title }}</a
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="文章描述">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="浏览数">
        <template slot-scope="scope">
          <span>{{ scope.row.scanNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="评论量">
        <template slot-scope="scope">
          <span>{{ scope.row.commentNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属分类">
        <template slot-scope="scope">
          <span>{{
            scope.row.category ? scope.row.category.name : "未分类"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建日期">
        <template slot-scope="scope">
          <span>{{
            formatDate(scope.row.createDate, "YYYY-MM-DD hh:mm:ss w")
          }}</span>
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
              @click="editBlog(scope.row)"
              circle
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
              @click="deleteBlog(scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 数据分页 -->
    <el-pagination
      style="margin-top: 30px"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 20]"
      :page-size="limit"
      layout="prev, pager, next, total, ->, sizes, jumper"
      :total="total"
    />
  </div>
</template>

<script>
import { findBlog, delOneBlog } from "@/api/blog";
import { formatDate } from "@/utils/tools";
import { SERVER_URL, FRONTEND_URL } from "@/urlConfig";
import fetchDataAndEdit from "@/mixins/fetchDataAndEdit";
export default {
  mixins: [fetchDataAndEdit],
  data() {
    return {
      SERVER_URL,
    };
  },
  computed: {
    srcList() {
      return this.data.map((it) => it.thumb);
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 获取文章列表
    async fetchList() {
      const { data } = await findBlog(this.page, this.limit);
      const { rows, total } = data;
      return { data: rows, total };
    },
    formatDate,
    // 跳转到具体文章
    goToTitleHand(row) {
      window.open(`${FRONTEND_URL}/article/${row.id}`);
    },
    // 删除文章
    deleteBlog(row) {
      this.$confirm(
        "删除该文章会将该文章下面的评论一并删除，是否继续",
        "是否删除此篇文章",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          // 判断当前是否只有一条数据
          if (this.data.length === 1 && this.page !== 1) {
            this.page = this.page - 1;
          }
          const resp = await delOneBlog(row.id);
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
    // 编辑文章
    editBlog(row) {
      this.$router.push(`/editBlog/${row.id}`);
    },
  },
};
</script>

<style>
</style>