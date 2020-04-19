<template>
  <div class="page-cat-create">
    <h3>{{id ? "编辑" : "新建"}}分类</h3>
    <el-form label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: { require: true }
  },
  data() {
    return {
      title: ""
    };
  },
  methods: {
    async save() {
      let res;
      const model = {
        title: this.title
      };
      if (!this.id) {
        res = await this.$http.post("category", model);
      } else {
        res = await this.$http.put(`category/${this.id}`, model);
      }
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: res.data
        });

        this.$router.push("/categories/list");
      }
    },
    async fetchDetail() {
      const res = await this.$http.get(`category/${this.id}`);
      this.title = res.data.title;
    }
  },
  created() {
    this.id && this.fetchDetail();
  }
};
</script> 