// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import { AjaxPlugin, ToastPlugin, cookie, LoadingPlugin } from 'vux'
import App from './App'
import Home from './view/Home'
import Product from './view/product/Product'
import List from './components/List'
import Open from './components/OpenIfram'
import Login from './components/Login'
import Vuex from 'Vuex'
import vuexI18n from 'vuex-i18n'
import javaApi from './common/js/config'
import { sync } from 'vuex-router-sync'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(vuexI18n)
Vue.use(AjaxPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)


Vue.prototype.javaApi=javaApi

const routes = [{
  path: '/',
  component: Home,
  name: 'Home',
  children: [
  	{ path: 'login', component: Login },
  ]
  },
  {
  path: '/product',
  component: Product,
  name: 'product',
  },
  {
  	path: '/login',
    component: Login,
    name: 'login'
  },
  {
  path: '/list',
  component: List,
  name: 'list',
  meta: {
    keepAlive: false // 不需要被缓存
  }
  },
  {
  path: '/open',
  component: Open,
  name: 'open',
  meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        }
  }
]

const router = new VueRouter({
  routes
})
const store = new Vuex.Store({}) // 这里你可能已经有其他 module

/*i18n*/
Vue.use(vuexI18n.plugin, store)
const translationsEn = {
  'content': 'This is some {type} content'
}
const translationsDe = {
  'My nice title': 'Ein schöner Titel',
  'content': 'Dies ist ein toller Inhalt'
}
Vue.i18n.add('en', translationsEn)
Vue.i18n.add('de', translationsDe)

// set the start locale to use
Vue.i18n.set('en')
/*状态创建*/
store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    }
  }
})
/*同步状态和路由*/
Vue.use(router)
sync(store, router)

FastClick.attach(document.body)

Vue.config.productionTip = false

/*路由跳转前*/
router.beforeEach(function (to, from, next) {
	console.log(1)
  store.commit('updateLoadingStatus', {isLoading: true})
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (cookie.get('tokenssss')) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
        	console.log(to.params.id)
            next({
                path: '/login',
                query: {redirect: to.fullPath,redirecturl: to.params.id}
                  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
  }else {
 		next()
  }
})
/*路由跳转后*/
router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
  console.log(2)
})

/* eslint-disable no-new */
new Vue({
	store,
  router,
  render: h => h(App)
}).$mount('#app-box')