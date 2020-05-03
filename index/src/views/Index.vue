<template>
  <div>
    <el-radio-group v-model="choose">
      <el-radio-button label="top" border></el-radio-button>
      <el-radio-button label="list" border></el-radio-button>
    </el-radio-group>
    <div v-if="choose_type=='top'" class="title">置顶文章</div>
    <div v-if="choose_type=='list'" class="title">分页文章</div>
    <div class="blog_list">
      <el-row :gutter="40">
        <el-col :span="8" v-for="blog in blogs" :key="blog._id">
          <div style="height:320px">
            <Card :blog="blog"></Card>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="foot_pages">
      <el-pagination
        v-if="choose_type=='list'"
        @current-change="curPage"
        background
        layout="prev, pager, next"
        :total="totalPage*10"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
export default {
  components: {
    Card
  },
  data() {
    return {
      choose_type: "top", //选择置顶或者分页
      blogs: [], //文章列表
      totalPage: undefined, //总页数
      currentPage: 1 //当前页数
    };
  },
  computed: {
    choose: {
      // computed监听选择
      get: function() {
        return this.choose_type || "top";
      },
      set: function(new_choose) {
        // console.log(new_choose);
        this.choose_type = new_choose;
        if (new_choose == "top") {
          this.getTop(); //获取置顶文章
        } else {
          this.getList(this.currentPage); //获取分页文章列表
        }
      }
    }
  },

  methods: {
    // 根据页数获取文章列表
    async getList(page) {
      const res = await this.$http.get(`/articles/${page}`);
      // console.log(res.data);
      this.$message({
        type: "success",
        message: "已获取分页列表"
      });
      this.blogs = res.data.list;
      this.totalPage = res.data.totalPage;
      this.currentPage = parseInt(res.data.currentPage);
    },
    // 获取置顶文章列表
    async getTop() {
      const res = await this.$http.get("/articles/top");
      // console.log(res.data);
      this.$message({
        type: "success",
        message: "已获取置顶列表"
      });
      this.blogs = res.data;
    },
    // 改变页数，获取列表
    async curPage(e) {
      console.log(e);
      await this.getList(e);
    }
  },

  mounted() {
    this.getTop();
  }
};
</script>

<style>
.title {
  margin-top: 10px;
  color: #3162aa;
  width: 100%;
  text-align: center;
}
.foot_pages {
  width: 100%;
  text-align: center;
}
.blog_list {
  margin: 30px;
}
</style>