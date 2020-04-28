<template>
  <div>
    <div>
      标签分类：
      <span style="padding-right:25px" v-for="tag_item in tags_list" :key="tag_item._id">
        <el-badge :value="tag_item.List.length" :max="10">
          <el-tag style="cursor:pointer">{{tag_item.title}}</el-tag>
        </el-badge>
      </span>
    </div>
    <br />
    <div v-for="tag_item in tags_list" :key="tag_item._id">
      <el-button type="primary">/ {{tag_item.title}}</el-button>
      <hr />
      <el-row :gutter="20">
        <el-col :span="6" v-for="blog in tag_item.List" :key="blog._id">
          <div style="height:320px">
            <Card :blog="blog"></Card>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->
  </div>
</template>

<script>
import Card from "@/components/Card";
export default {
  components: { Card },
  data() {
    return {
      tags_list: []
    };
  },

  methods: {
    async get_tags_list() {
      const res = await this.$http.get("/tags");
      // console.log(res.data);
      this.tags_list = res.data;
    }
  },

  created() {
    this.get_tags_list();
  }
};
</script>

<style>
</style>