import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CategoryList from '../views/CategoryList.vue'
import CategoryEdit from '../views/CategoryEdit.vue'

import ArticleList from '../views/ArticleList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'

import UserList from '../views/UserList.vue'
import UserEdit from '../views/UserEdit.vue'

import CommentEdit from '@/views/CommentEdit'
import CommentList from '@/views/CommentList'

import Login from '../views/Login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  // 设置 H5 history 模式
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        { path: '/', component: CategoryList, name: 'list' },

        { path: '/categories/create', component: CategoryEdit, name: 'create' },
        { path: '/categories/list', component: CategoryList, name: 'list' },
        { path: '/categories/create/:id', component: CategoryEdit, props: true, name: 'create' },

        { path: '/articles/list', component: ArticleList, name: "articles list" },
        { path: '/articles/create', component: ArticleEdit, name: "articles create" },
        { path: '/articles/create/:id', component: ArticleEdit, props: true, name: 'articles create' },

        { path: '/users/list', component: UserList, name: 'users list' },
        { path: '/users/create', component: UserEdit, name: "users create" },
        { path: '/users/create/:id', component: UserEdit, props: true, name: "users create" },

        { path: '/comments/list', component: CommentList, name: 'comments list' },
        { path: '/comments/create', component: CommentEdit, name: "comments create" },
        { path: '/comments/create/:id', component: CommentEdit, props: true, name: "comments create" },
      ]
    },
    {
      path: '/login',
      component: Login,
      name: "login"
    },
  ]
});

//跳转前设置title
router.beforeEach((to, from, next) => {
  window.document.title = to.name;
  next();
});

export default router


