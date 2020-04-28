<template>
  <div>
    <h2 style="color:rgb(39, 147, 219)">{{detail.title}}</h2>
    <span style="padding-right:20px" v-for="category in detail.categories" :key="category._id">
      <el-tag style="cursor:pointer">{{category.title}}</el-tag>
    </span>
    <div style="color:rgb(85, 133, 165);margin-top:8px">
      <span style="padding-right:80px">createdAt: {{detail.createdAt|date}}</span>
      <span>updatedAt: {{detail.updatedAt|date}}</span>
    </div>
    <hr />
    <article style="color:rgb(62, 132, 179);letter-spacing:1.5px">{{detail.body}}</article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {}
    };
  },

  methods: {
    async get_art_detail(id) {
      const res = await this.$http.get(`/article/${id}`);
      this.detail = res.data;
    }
  },
  created() {
    this.get_art_detail(this.$route.params.id);
  }
};
</script>

<style>
</style>