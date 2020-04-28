<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <el-tooltip content placement="bottom" style="float:left">
          <div slot="content">回到上一页</div>
          <i class="el-icon-d-arrow-left" @click="goback"></i>
        </el-tooltip>
        <el-tooltip content placement="bottom" style="float:right">
          <div slot="content">了解一下</div>
          <i class="el-icon-view" @click="notice"></i>
        </el-tooltip>
        <span>Welcome To Carfied Blog</span>
      </el-header>
      <el-container>
        <el-aside width="150px">
          <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
          <el-menu default-active :collapse="isCollapse">
            <el-menu-item index="1" @click="golink">
              <i class="el-icon-menu"></i>
              <span slot="title">主页</span>
            </el-menu-item>
            <el-menu-item index="2" @click="golink">
              <i class="el-icon-s-data"></i>
              <span slot="title">分类</span>
            </el-menu-item>
            <el-menu-item index="3" @click="golink">
              <i class="el-icon-date"></i>
              <span slot="title">时间</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    golink(event) {
      //console.log(event.index);
      switch (parseInt(event.index)) {
        case 1:
          this.$router.push("/");
          break;
        case 2:
          this.$router.push("/tags");
          break;
        case 3:
          this.$router.push("/archive");
          break;
        default:
          this.$message({
            type: "info",
            message: "路由错误"
          });
      }
    },
    goback() {
      this.$router.back(-1);
    },
    notice() {
      this.$notify.info({
        title: "carfield 信息",
        dangerouslyUseHTMLString: true,
        duartion: 0,
        message:
          '<ul><li>wechat:carfiedfeifei</li><li>qq:1073490398</li><li><a href="https://github.com/li-car-fei">github:li-car-fei</a></li></ul>'
      });
    }
  }
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

.header {
  text-align: center;
  font-size: 30px;
  color: #3162aa;
  text-shadow: 0px 1px 0px #332d85, 0px 1px 0px #332d85, 0px 1px 0px #332d85,
    0px 2px 0px #332d85, 0px 2px 4px rgba(255, 255, 255, 1);
}
</style>
