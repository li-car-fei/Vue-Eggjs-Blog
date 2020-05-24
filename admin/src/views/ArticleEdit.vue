<template>
  <div class="page-cat-create">
    <h3>{{id ? "编辑" : "新建"}}文章</h3>
    <el-form label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input type="textarea" v-model="model.summary"></el-input>
      </el-form-item>
      <el-form-item label="阅读量">
        <el-input-number v-model="model.read"></el-input-number>
      </el-form-item>
      <el-form-item label="点赞量">
        <el-input-number v-model="model.fav"></el-input-number>
      </el-form-item>
      <el-form-item label="分类">
        <el-select multiple v-model="model.categories" placeholder="请选择文章分类">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.title"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="评论">
        <el-select multiple v-model="model.comments" placeholder="请选择评论">
          <el-option
            v-for="item in comments"
            :key="item._id"
            :label="item.content"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="置顶">
        <el-switch v-model="model.isTop" active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
      <el-form-item label="正文">
        <!-- <el-input v-model="model.body"></el-input> -->
        <mavon-editor ref="md" v-model="model.body" />
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
      categories: [],
      model: {},
      comments: []
    };
  },
  methods: {
    async save() {
      let res;
      if (!this.id) {
        res = await this.$http.post("/article", this.model);
      } else {
        res = await this.$http.put(`/article/${this.id}`, this.model);
      }
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: res.data
        });

        this.$router.push("/articles/list");
      }
    },
    async fetchDetail() {
      const res = await this.$http.get(`/article/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get("/category");
      this.categories = res.data;
    },
    async fetchComments() {
      const res = await this.$http.get("/comment");
      this.comments = res.data;
    }
  },
  created() {
    this.fetchComments();
    this.fetchCategories();
    this.id && this.fetchDetail();
  }
};
</script> 