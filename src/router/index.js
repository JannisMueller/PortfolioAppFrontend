import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UpdatePortfolio from "@/views/UpdatePortfolio";




Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home

    },
    {
        path: '/updatePortfolio',
        name: 'updatePortfolio',
        component: UpdatePortfolio
    },
    {
        path: '/bar',
        name: 'Bar',
        component: () => import('../views/Bar.vue')
    }


]

const router = new VueRouter({
    routes
})

export default router
