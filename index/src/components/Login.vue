<template>
  <div>
    <div>
      <el-card :body-style="{ padding: '0px' }">
        <div slot="header">
          <span>请先登录</span>
        </div>
        <!-- card body -->
        <el-form ref="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  props:['islogin'],
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      const model = {
        username: this.username,
        password: this.password
      };

      const res = await this.$http.post("/login", model);
      console.log(res);
      if (res.status === 200) {
        // 设置token以及username
        sessionStorage.setItem("token", res.data.token);
        //sessionStorage.setItem("user_id", res.data.user);
        //sessionStorage.setItem("username", res.data.username);
        // 提示信息
        this.$message({
          type: "success",
          message: "登录成功"
        });
        console.log(this.islogin);
        this.$router.go(0);
      }
    }
  }
};
</script>

<style>
</style>