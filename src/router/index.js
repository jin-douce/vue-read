import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/store'
    },
    {
      path: '/ebook',
      component: () => import('../views/ebook/index.vue'),
      children: [
        {
          path: ':bookId',
          component: () => import('../components/ebook/EbookReader.vue')
        }
      ]
    },
    {
      path: '/store',
      component: () => import('../views/store/index.vue'),
      redirect: '/store/home',
      children: [
        {
          path: 'personal',
          component: () => import('../views/store/Personal.vue')
        },
        {
          path: 'shelf',
          component: () => import('../views/store/StoreShelf.vue')
        },
        {
          path: 'category',
          component: () => import('../views/store/StoreCategory.vue')
        },
        {
          // 不加/表示使用相对路径，会拼接在父级路径后面
          path: 'home',
          component: () => import('../views/store/StoreHome.vue'),
        },
        {
          path: 'list',
          component: () => import('../views/store/StoreList.vue')
        },
        {
          path: 'detail',
          component: () => import('../views/store/StoreDetail.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('../views/user/Login.vue')
    },
    
  ]
})

