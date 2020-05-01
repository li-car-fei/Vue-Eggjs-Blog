<template>
  <div class="page-cat-create">
    <h3>{{id ? "编辑" : "新建"}}评论</h3>
    <el-form label-width="80px">
      <el-form-item label="评论内容">
        <el-input v-model="model.content"></el-input>
      </el-form-item>
      <el-form-item label="评论者">
        <el-select v-model="model.user" placeholder="请选择评论者">
          <el-option v-for="item in users" :key="item._id" :label="item.username" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="评论文章">
        <el-select v-model="model.article" placeholder="请选择评论的文章">
          <el-option v-for="item in articles" :key="item._id" :label="item.title" :value="item._id"></el-option>
        </el-select>
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
      model: {},
      users: [],
      articles: []
    };
  },
  methods: {
    async save() {
      let res;
      if (!this.id) {
        res = await this.$http.post("/comment", this.model);
      } else {
        res = await this.$http.put(`/comment/${this.id}`, this.model);
      }
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: res.data
        });

        this.$router.push("/comments/list");
      }
    },
    async fetchDetail() {
      const res = await this.$http.get(`/comment/${this.id}`);
      this.model = res.data;
    },
    async fetchUsers() {
      const res = await this.$http.get("/user");
      this.users = res.data;
    },
    async fetchArticles() {
      const res = await this.$http.get("/article");
      this.articles = res.data;
    }
  },
  created() {
    this.fetchUsers();
    this.fetchArticles();
    this.id && this.fetchDetail();
  }
};
</script> 