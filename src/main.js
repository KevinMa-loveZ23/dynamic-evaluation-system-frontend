import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import * as VueRouter from 'vue-router'

// import { ElementPlus } from '@element-plus/icons-vue/dist/types'
// import '@element-plus/icons-vue/dist/index.css'
import ElementPlus from 'element-plus'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

import { store } from '@/store/store'
import PostsHeatVue from './comp/posts/PostsHeat.vue'
import PostsInfluenceVue from './comp/posts/PostsInfluence.vue'
import UsersHeatVue from './comp/users/UsersHeat.vue'
import UsersInfluenceVue from './comp/users/UsersInfluence.vue'
import InfoVue from './comp/info/info.vue'

const routes = [
    { path: '/' + store.list_names[0][1].path, component: PostsHeatVue },
    { path: '/' + store.list_names[0][2].path, component: PostsInfluenceVue },
    { path: '/' + store.list_names[1][1].path, component: UsersHeatVue },
    { path: '/' + store.list_names[1][2].path, component: UsersInfluenceVue },
    { path: '/' + store.list_names[2][1].path, component: InfoVue}
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

// createApp(App).mount('#app')

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
