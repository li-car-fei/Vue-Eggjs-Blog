<template>
  <div>
    <h2 style="color:rgb(39, 147, 219)">{{detail.title}}</h2>
    <span style="padding-right:20px" v-for="category in detail.categories" :key="category._id">
      <el-tag style="cursor:pointer">{{category.title}}</el-tag>
    </span>
    <div style="color:rgb(85, 133, 165);margin-top:8px">
      <span style="padding-right:80px">阅读: {{detail.read}}</span>
      <span>
        <el-button type="primary" size="small" @click="favin">
          点赞：
          <span v-if="fav_in">{{detail.fav}} +1</span>
          <span v-else>{{detail.fav}}</span>
        </el-button>
      </span>
    </div>
    <div style="color:rgb(85, 133, 165);margin-top:8px">
      <span style="padding-right:80px">createdAt: {{detail.createdAt|date}}</span>
      <span>updatedAt: {{detail.updatedAt|date}}</span>
    </div>
    <hr />
    <article style="color:rgb(62, 132, 179);letter-spacing:1.5px">{{detail.body}}</article>
    <hr />
    <div style="color:rgb(85, 133, 165);margin-top:8px">评论区：</div>
    <el-card
      v-for="comment in detail.comments"
      :key="comment._id"
      :body-style="{ background: 'rgba(39, 129, 182, 0.4)' }"
    >
      <time style="font-weight: 200">{{comment.createdAt|date}}</time>
      <div>{{comment.user.username}}说：</div>
      <div style="padding-left:70px">{{comment.content}}</div>
    </el-card>
    <el-divider>
      <i class="el-icon-mobile-phone"></i>
    </el-divider>
    <div>
      <el-input
        style="margin-bottom:8px"
        v-model="comment"
        placeholder="在此可输入评论"
        clearable
        @keyup.enter="post_comment"
      ></el-input>
      <el-button type="primary" @click="post_comment">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fav_in: false,
      detail: {},
      comment: ""
    };
  },

  methods: {
    async get_art_detail(id) {
      const res = await this.$http.get(`/article/${id}`);
      console.log(res.data);
      this.detail = res.data;
    },
    async favin() {
      const id = this.$route.params.id;
      const res = await this.$http.get(`/article/fav/${id}`);
      this.fav_in = true;
      console.log(res.data);
      this.$message({
        type: "info",
        message: res.data
      });
    },
    async post_comment() {
      const islogin = !!(sessionStorage.getItem("user_id") || "");
      if (islogin) {
        const post_comment = {
          user: sessionStorage.getItem("user_id"),
          article: this.$route.params.id,
          content: this.comment
        };
        const res = await this.$http.post("/comment", post_comment);
        console.log(res.data);
        this.$message({
          type: "info",
          message: res.data
        });
        this.get_art_detail(this.$route.params.id);
      } else {
        this.$message({
          type: "warning",
          message: "请先登录再发表评论"
        });
      }
    }
  },
  created() {
    this.get_art_detail(this.$route.params.id);
  }
};
</script>

<style>
</style>