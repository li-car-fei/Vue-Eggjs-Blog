<template>
  <div class="page-cat-create">
    <h3>{{id ? "编辑" : "新建"}}用户</h3>
    <el-form label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item label="收藏文章">
        <el-select multiple v-model="model.fav" placeholder="选择收藏文章">
          <el-option v-for="item in articles" :key="item._id" :label="item.title" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像图片">
        <input type="file" @change="uploadImg($event)" multiple="multiple" />
        <img :src="model.imgUrl" width="400px" height="200px" />
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
      articles: []
    };
  },
  methods: {
    async save() {
      let res;
      if (!this.id) {
        res = await this.$http.post("/user", this.model);
      } else {
        res = await this.$http.put(`/user/${this.id}`, this.model);
      }
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: res.data
        });

        this.$router.push("/users/list");
      }
    },
    async fetchDetail() {
      const res = await this.$http.get(`/user/${this.id}`);
      this.model = res.data;
    },
    async fetchArticles() {
      const res = await this.$http.get(`/article`);
      this.articles = res.data;
    },
    async uploadImg(event) {
      this.file = event.target.files[0]; //获取input的图片file值
      let param = new FormData(); // 创建form对象
      param.append("imgFile", this.file); //对应后台接收图片名
      param.append("userid", this.id);
      const res = await this.$http.post(
        "http://127.0.0.1:7001/admin/api/upload/img",
        param
      );
      console.log(res);
      this.model.imgUrl = res.data;
    }
  },
  created() {
    this.fetchArticles();
    this.id && this.fetchDetail();
  }
};
</script> 