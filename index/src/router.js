import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Archive from '@/views/Archive'
import Article from '@/views/Article'
import Tags from '@/views/Tags'
import Mine from '@/views/Mine'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Index,
            name: 'index'
        },
        {
            path: '/article/:id',
            component: Article,
            name: 'article'
        },
        {
            path: '/archive',
            component: Archive,
            name: "archive"
        },
        {
            path: '/tags',
            component: Tags,
            name: 'tags'
        },
        {
            path: '/mine',
            component: Mine,
            name: 'mine'
        }
    ]
});

router.beforeEach((to, from, next) => {
    window.document.title = to.name;
    next();
})

export default router