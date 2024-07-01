<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="data" border style="width: 100%">
      <el-table-column align="center" label="序号">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="中图预览">
        <template slot-scope="scope">
          <el-image style="width: 100px" :src="scope.row.midImg"></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="大图预览">
        <template slot-scope="scope">
          <el-image style="width: 100px" :src="scope.row.bigImg"></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              @click="openEditDialog(scope.row)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑首页标语 -->
    <el-dialog title="请编辑信息" top="15vh" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <!-- 中图 -->
            <Upload uploadTitle="首页中图" v-model="form.midImg" />
          </el-col>
          <el-col :span="12">
            <!-- 大图 -->
            <Upload uploadTitle="首页大图" v-model="form.bigImg" />
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeEditDialog">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, setBanner } from "@/api/banner";
import { SERVER_URL } from "@/urlConfig";
import Upload from "@/components/Upload";
import fetchDataAndEdit from "@/mixins/fetchDataAndEdit";
export default {
  mixins: [fetchDataAndEdit],
  components: {
    Upload,
  },
  data() {
    return {
      SERVER_URL,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 获取标语数据
    async fetchList() {
      return await getBanner();
    },
    async editBannerConfirm() {
      const arr = [...this.tableData];
      const index = arr.findIndex((it) => it.id === this.form.id);
      arr[index] = this.form;
      const resp = await setBanner(arr);
      if (!resp.code) {
        this.$message.success("修改成功");
        this.dialogFormVisible = false;
        this.fetchData();
      }
    },
  },
};
</script>

<style>
</style>