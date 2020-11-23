import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import chakanquanbu from '../views/mukuai2/chakanquanbu'
import quanbu from '../views/mukuai2/daohangziyemian/quanbu'
import daifukuang from '../views/mukuai2/daohangziyemian/daifukuang'
import dingdanxiangqing from '../views/mukuai2/daohangziyemian/dingdanxiangqing/dingdanxiangqing'
import querendingdanxinxi from '../views/mukuai2/querendingdanxinxi'
import gerenzhongxin from '../views/mukuai2/gerenzhongxin'
import guanlishouhuodizhi from '../views/mukuai2/gerenzhongxin/guanlishouhuodizhi'
import xiugaigerenxinxi from '../views/mukuai2/gerenzhongxin/xiugaigerenxinxi'
import xiugaimima from '../views/mukuai2/gerenzhongxin/xiugaimima'
import payment from '../views/mukuai2/daohangziyemian/dingdanxiangqing/payment'
import pay from '../views/mukuai2/daohangziyemian/dingdanxiangqing/pay'




Vue.use(VueRouter)

const routes = [
  {
    path: '/gerenzhongxin',
    name: 'gerenzhongxin',
    component:gerenzhongxin,
    redirect: '/xiugaigerenxinxi',
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/xiugaigerenxinxi',
        component: xiugaigerenxinxi
      },
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/xiugaimima',
        component: xiugaimima
      },
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/guanlishouhuodizhi',
        component: guanlishouhuodizhi
      }
    ],
  },
  {
    path: '/querendingdanxinxi',
    name: 'querendingdanxinxi',
    component: querendingdanxinxi,
  },
  {
    path: '/payment',
    name: 'payment',
    component: payment,
  },
  {
    path: '/pay',
    name: 'pay',
    component: pay,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  }
  ,
  {
    path: '/chakanquanbu',
    name: 'chakanquanbu',
    component: chakanquanbu,
    redirect: '/quanbu',
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/quanbu',
        component: quanbu
      },
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/daifukuang',
        component: daifukuang
      },
    ],
  }
  ,
  {
    path: '/dingdanxiangqing',
    name: 'dingdanxiangqing',
    component: dingdanxiangqing,
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
