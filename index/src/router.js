import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Article from './views/Article.vue'
import Archive from './views/Archive.vue'
import Tag from './views/Tag.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
            children: [
                { path: '/', component: Main, name: 'Main' },
                { path: '/main', component: Main, name: 'Main' },
                { path: '/article/:id', component: Article, props: true, name: 'Article' },
                { path: '/archive', component: Archive, name: 'Archive' },
                { path: '/tag', component: Tag, name: 'Tag' },
            ]
        }
    ]
});


router.beforeEach((to, from, next) => {
    window.document.title = to.name;
    next();
});


export default router
