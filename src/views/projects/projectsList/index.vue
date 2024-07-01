<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table v-loading="loading" :data="data" border style="width: 100%">
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span>{{ (page - 1) * limit + (scope.$index + 1) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="项目名称">
        <template slot-scope="scope">
          <a
            href="#"
            target="_blank"
            @click.prevent="goToTitleHand(scope.row)"
            class="propName"
            >{{ scope.row.name }}</a
          >
        </template>
      </el-table-column>
      <el-table-column align="center" label="文章描述">
        <template slot-scope="scope">
          <span>{{ scope.row.description.toString() }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="预览图" width="150">
        <template slot-scope="scope">
          <el-image
            style="width: 120px"
            :src="scope.row.thumb"
            fit="contain"
            :preview-src-list="srcList"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="github"
            placement="top"
            :hide-after="2000"
            v-if="scope.row.github"
          >
            <el-button
              type="info"
              icon="iconfont icon-github"
              size="mini"
              @click="openGitHub(scope.row)"
              circle
            />
          </el-tooltip>
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
              @click="
                openEditDialog({
                  ...scope.row,
                  description: scope.row.description.toString(),
                })
              "
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
              @click="deleteProject(scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑项目 -->
    <el-dialog
      title="请编辑该项目信息"
      top="15vh"
      :visible.sync="dialogFormVisible"
      fullscreen
    >
      <el-form :model="form">
        <el-form-item label="项目名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目描述（每一项描述以英文逗号分隔）">
          <el-input
            type="textarea"
            v-model="form.description"
            :rows="5"
          ></el-input>
        </el-form-item>
        <el-form-item label="项目链接">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="Github 地址">
          <el-input v-model="form.github"></el-input>
        </el-form-item>
        <el-form-item label="预览图">
          <Upload v-model="form.thumb" />
        </el-form-item>
        <el-form-item label="排序等级">
          <el-select v-model="form.order" placeholder="排序等级">
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
        <el-button type="primary" @click="editProjectConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findProject, delOneProject, setProject } from "@/api/project";
import { SERVER_URL, FRONTEND_URL } from "@/urlConfig";
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
  computed: {
    srcList() {
      return this.data.map((it) => it.thumb);
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 获取项目列表
    async fetchList() {
      return await findProject(this.page, this.limit);
    },
    goToTitleHand(row) {
      window.open(`${FRONTEND_URL}/project`);
    },
    // 跳转到 gitHub
    openGitHub(row) {
      window.open(row.github);
    },
    // 删除项目
    deleteProject(row) {
      this.$confirm("确定要删除此项目吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 判断当前是否只有一条数据
          if (this.data.length === 1 && this.page !== 1) {
            this.page = this.page - 1;
          }
          const resp = await delOneProject(row.id);
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
    // 确认修改
    async editProjectConfirm() {
      const id = this.form.id;
      const data = {
        ...this.form,
        description: this.form.description.split(","),
      };
      const { code } = await setProject(id, data);
      if (!code) {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        this.closeEditDialog();
        this.fetchData();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.propName:hover {
  color: rgb(163, 163, 163);
}
.dialog-footer {
  text-align: center;
  margin-top: 20px;
  button {
    margin-right: 20px;
  }
}
</style>