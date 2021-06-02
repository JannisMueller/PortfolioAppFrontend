import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import ProgressBar from 'vuejs-progress-bar'

Vue.use(ProgressBar)


Vue.config.productionTip = false



new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
