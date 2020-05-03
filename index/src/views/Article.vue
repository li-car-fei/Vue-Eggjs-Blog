<template>
  <div>
    <h2 style="color:rgb(39, 147, 219)">{{detail.title}}</h2>
    <span style="padding-right:20px" v-for="category in detail.categories" :key="category._id">
      <el-tag style="cursor:pointer">{{category.title}}</el-tag>
    </span>
    <div style="color:rgb(85, 133, 165);margin-top:8px">
      <span style="padding-right:80px">阅读: {{detail.read}}</span>
      <span>
        <span style="padding-right:80px">
          <el-button type="primary" size="small" @click="favin">
            点赞：
            <span v-if="fav_in">{{detail.fav}} +1</span>
            <span v-else>{{detail.fav}}</span>
          </el-button>
        </span>
        <span>
          <el-button type="primary" size="small" @click="user_fav_push">
            <span v-if="user_fav_in">取消收藏</span>
            <span v-else>收藏</span>
            <i v-if="!user_fav_in" class="el-icon-star-off"></i>
          </el-button>
        </span>
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
        @change="post_comment"
      ></el-input>
      <el-button type="primary" @click="post_comment" :loading="loading">发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fav_in: false, //是否点赞
      detail: {}, //内容详情
      comment: "", //评论内容
      loading: false, //评论过程post
      user_fav_in: undefined //当前用户是否收藏了此文章
    };
  },

  computed: {
    // 是否登陆了
    islogin() {
      return !!(sessionStorage.getItem("token") || "");
    }
  },

  methods: {
    // 获取文章详情信息
    async get_art_detail(id) {
      const res = await this.$http.get(`/article/${id}`);
      //console.log(res.data);
      this.detail = res.data;
    },

    // 点赞
    async favin() {
      const id = this.$route.params.id;
      const res = await this.$http.get(`/article/fav/${id}`);
      this.fav_in = true;
      //console.log(res.data);
      this.$message({
        type: "info",
        message: res.data
      });
    },

    // 检查此文章是否被当前用户收藏了
    async check_user_fav() {
      //const islogin=!!(sessionStorage.getItem('token')||"");
      if (!this.islogin) {
        return;
      }
      const article_id = this.$route.params.id;
      const res = await this.$http.get(`/article/favinuser/${article_id}`);
      //console.log(res.data.result);
      this.user_fav_in = res.data.result;
    },

    // 收藏文章
    async user_fav_push() {
      if (!this.islogin) {
        this.$message({
          type: "info",
          message: "请先登录再收藏文章"
        });
        return;
      }
      const res = await this.$http.put(`/article/user/fav`, {
        article_id: this.$route.params.id,
        user_fav_change: !this.user_fav_in
      });
      //console.log(res.data);
      this.$message({
        type: "info",
        message: res.data.message
      });
      this.check_user_fav();
    },

    // 用户评论
    async post_comment() {
      const islogin = this.islogin;
      if (islogin) {
        const post_comment = {
          //user: sessionStorage.getItem("user_id"),
          article: this.$route.params.id,
          content: this.comment
        };
        this.loading = true;
        const res = await this.$http.post("/comment", post_comment);

        this.$message({
          type: "info",
          message: res.data.message
        });

        this.detail = res.data.data;

        this.comment = "";
        this.loading = false;

        //this.get_art_detail(this.$route.params.id);
      } else {
        this.$message({
          type: "warning",
          message: "请先登录再发表评论"
        });
      }
    }
  },
  created() {
    this.get_art_detail(this.$route.params.id); //获取详细信息
    this.check_user_fav(); //检查是否被当前用户收藏
  }
};
</script>

<style>
</style>