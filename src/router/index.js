import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UpdatePortfolio from "@/views/UpdatePortfolio";
import UpdatePensionPortfolio from "@/views/UpdatePensionPortfolio";




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
        path: '/updatePensionPortfolio',
        name: '/updatePensionPortfolio',
        component: UpdatePensionPortfolio
    },




]

const router = new VueRouter({
    routes
})

export default router
