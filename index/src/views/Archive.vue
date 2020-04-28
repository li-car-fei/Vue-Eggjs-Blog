<template>
  <div>
    <div>
      年份归类：
      <span style="padding-right:20px" v-for="item in year_list" :key="item._id">
        <el-badge :value="item.count" :max="10">
          <el-tag style="cursor:pointer">{{item._id}}</el-tag>
        </el-badge>
      </span>
    </div>
    <br />
    <div v-for="item in year_list" :key="item._id">
      <el-button type="primary">/ {{item._id}}</el-button>
      <hr />
      <el-row :gutter="20">
        <el-col :span="6" v-for="blog in item.list" :key="blog._id">
          <router-link :to="`/article/${blog._id}`" style="text-decoration: none">
            <el-card
              shadow="hover"
              :body-style="{ padding: '10px',background: 'rgba(39, 129, 182, 0.4)' }"
            >
              <h5>标题：{{blog.title}}</h5>
              <span style="padding-right:20px" v-for="tag in blog.categories" :key="tag._id">
                <el-tag style="cursor:pointer">{{tag.title}}</el-tag>
              </span>
            </el-card>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year_list: []
    };
  },

  methods: {
    async get_year_list() {
      const res = await this.$http.get("/archive");
      this.year_list = res.data;
    }
  },

  mounted() {
    this.get_year_list();
  }
};
</script>

<style>
/* .i {
  color: rgba(39, 129, 182, 0.8);
  text-decoration: none;
} */
</style>