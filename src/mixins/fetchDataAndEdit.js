// 获取数据，分页，编辑

export default {
    data() {
        return {
            data: [], // 数据列表
            loading: false, // 数据加载状态
            page: 1, // 当前页
            limit: 10, // 每页显示条数
            total: 0, // 总条数
            dialogFormVisible: false, // 控制编辑框展示
            form: {}, // 存储当前编辑的数据
        }
    },
    methods: {
        // 数据列表
        async fetchData() {
            this.loading = true;
            const { data, total } = await this.fetchList();
            this.loading = false;
            this.total = total;
            this.data = data;
        },
        // 页码改变
        handleCurrentChange(page) {
            this.page = page;
            this.fetchData();
        },
        // 每页展示条数改变
        handleSizeChange(limit) {
            this.page = 1;
            this.limit = limit;
            this.fetchData();
        },
        // 打开编辑弹窗
        openEditDialog(row) {
            this.dialogFormVisible = true;
            this.form = { ...row };
        },
        // 关闭编辑弹窗
        closeEditDialog() {
            this.dialogFormVisible = false;
        },
    }
}