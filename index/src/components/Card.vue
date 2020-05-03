<template>
  <div class="blog_card" @click="detail">
    <el-card shadow="hover" :body-style="{ padding: '10px',background: 'rgba(39, 129, 182, 0.4)' }">
      <h4>标题：{{blog.title}}</h4>
      <h5>简要：{{blog.summary}}</h5>
      <div>{{blog.body.slice(0,50)}}..............</div>
      <br />
      <div>
        <time>createdAt: {{blog.createdAt | date}}</time>
        <br />
        <time>updatedAt: {{blog.updatedAt | date}}</time>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    blog: Object
  },

  methods: {
    // 路由跳转到文章详情
    detail() {
      this.$router.push(`/article/${this.blog._id}`);
    }
  }
};
</script>

<style>
.blog_card {
  margin-bottom: 10%;
  /* text-align: center; */
  /* background: rgba(53, 77, 143, 0.7); */
}
</style>