<template>
  <div id="header" class="home">
    <div id="header" class="header bg-white">
      <div class="navbar-container">
        <a class="navbar-logo" style="margin-top: -18px;">
          <img src="../assets/images/logo.png" />
        </a>
        <div class="navbar-menu">
          <router-link to="/">首页</router-link>
          <router-link to="/archive">归档</router-link>
          <router-link to="/tag">标签</router-link>
        </div>
        <div class="navbar-mobile-menu" onclick>
          <span class="icon-menu cross">
            <span class="middle"></span>
          </span>
          <ul>
            <li>
              <router-link to="/">首页</router-link>
            </li>
            <li>
              <router-link to="/archive">归档</router-link>
            </li>
            <li>
              <router-link to="/tag">标签</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <router-view :key="$route.path"></router-view>

    <footer class="footer bg-white">
      <div class="footer-meta">
        <div class="footer-container">
          <div class="meta-item meta-posts">
            <h3 class="meta-title">置顶文章</h3>
            <li v-for="item in modelTop" :key="item._id">
              <router-link
                :to="`/article/${item._id}`"
                :title="`${item.title}`"
                :data-hover="`${item.title}`"
              >{{item.title}}</router-link>
            </li>
          </div>
          <div class="meta-item meta-comments">
            <h3 class="meta-title">最新文章</h3>

            <li v-for="item in modelLatest.list" :key="item._id">
              <router-link
                :to="`/article/${item._id}`"
                :title="`${item.title}`"
                :data-hover="`${item.title}`"
              >{{item.title}}</router-link>
            </li>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      modelLatest: [],
      modelTop: []
    };
  },
  methods: {
    async fetchLatestArticles() {
      const res = await this.$http.get("/articles/1");
      this.modelLatest = res.data;
    },
    async fetchTopArticles() {
      const res = await this.$http.get("/articles/top");
      this.modelTop = res.data;
    }
  },
  created() {
    this.fetchLatestArticles();
    this.fetchTopArticles();
  }
};
</script>
