<template>
  <div>
    <div>
      <span style="margin-right:80px">{{info.username}}</span>
      <span>
        <el-button @click="loginout" type="text">退出登录</el-button>
      </span>
      <div>
        <img :src="info.imgUrl" width="100px" height="100px" style="border-radius:50px" />
      </div>
      <el-divider content-position="left">你好，许久未见，甚是想念</el-divider>
    </div>
    <el-button type="primary">收藏文章</el-button>
    <div class="blog_list">
      <el-row :gutter="40">
        <el-col :span="8" v-for="blog in info.fav" :key="blog._id">
          <div style="height:320px">
            <Card :blog="blog"></Card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
export default {
  components: { Card },
  data() {
    return {
      info: {} //用户信息
    };
  },
  methods: {
    // 获取用户信息
    async fetchinfo() {
      //const user_id = sessionStorage.getItem("user_id");
      const res = await this.$http.get(`/userinfo`);
      //console.log(res.data);
      this.info = res.data;
    },
    // 退出登录
    loginout() {
      sessionStorage.removeItem("token"); //清空sessionStorage
      this.$message({
        type: "info",
        message: "退出登录"
      });
      // 刷新页面
      this.$router.go(0);
    }
  },

  created() {
    this.fetchinfo();
  }
};
</script>

<style>
</style>