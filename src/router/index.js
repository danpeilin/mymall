import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import chakanquanbu from '../views/mukuai2/chakanquanbu'
import quanbu from '../views/mukuai2/wodedingdan/quanbu'
import daifukuang from '../views/mukuai2/wodedingdan/daifukuang'
import daifahuo from '../views/mukuai2/wodedingdan/daifahuo'
import daishouhuo from '../views/mukuai2/wodedingdan/daishouhuo'
import yituikuan from '../views/mukuai2/wodedingdan/yituikuan'
import yituihuo from '../views/mukuai2/wodedingdan/yituihuo'
import jiaoyichengong from '../views/mukuai2/wodedingdan/jiaoyichengong'
import jiaoyiguanbi from '../views/mukuai2/wodedingdan/jiaoyiguanbi'
import dingdanxiangqing from '../views/mukuai2/wodedingdan/dingdanxiangqing/dingdanxiangqing'
import querendingdanxinxi from '../views/mukuai2/querendingdanxinxi'
import gerenzhongxin from '../views/mukuai2/gerenzhongxin'
import guanlishouhuodizhi from '../views/mukuai2/gerenzhongxin/guanlishouhuodizhi'
import xiugaigerenxinxi from '../views/mukuai2/gerenzhongxin/xiugaigerenxinxi'
import xiugaimima from '../views/mukuai2/gerenzhongxin/xiugaimima'
import payment from '../views/mukuai2/wodedingdan/dingdanxiangqing/payment'
import pay from '../views/mukuai2/wodedingdan/dingdanxiangqing/pay'
import NewGooods from '../views/newgoods/index'
import HotGoods from '../views/hotgoods/index'



Vue.use(VueRouter)

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const routes = [
  {
    //主页
    path: '/',
    name: 'home',
    meta:{index:0,name:'home'},
    component: Home,
  },
  {
    //新到商品
    path: '/newgoods',
    name: 'newgoods',  
    meta:{index:1,name:'newgoods'},
    component: NewGooods, 
  },
  {
    //精选商品
    path: '/hotgoods',
    name: 'hotgoods',  
    meta:{index:1,name:'hotgoods'},
    component: HotGoods, 
  },
  {
    path: '/categoods/:id',
    name: 'categoods',
    component: () => import('@/views/goods/categoods'),
    children: [
      { 
         path: '', 
         name:'goods',
         component: () => import('@/views/goods/cates/goods') 
      },  
    ]
  },
  {
    path: '/goodsdetail/:id',
    name: 'goodsdetail',
    component: () => import('@/views/goodsdetail/index'),
  },
  {
    path: '/cart/:id',
    name: 'cart',
    component: () => import('@/views/cart/index'),
  },
  {
    path: '/checkout/:id',
    name: 'checkout',
    component: () => import('@/views/checkout/index'),
  },
  {
    path: '/order/:id',
    name: 'order',
    component: () => import('@/views/order/index'),
  },
  {
    //个人中心
    path: '/gerenzhongxin',
    name: 'gerenzhongxin',
    component:gerenzhongxin,
    redirect: '/xiugaigerenxinxi',
    children: [
      {
        //修改个人信息
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/xiugaigerenxinxi',
        component: xiugaigerenxinxi
      },
      {
        //修改密码
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/xiugaimima',
        component: xiugaimima
      },
      {
        //管理收货地址
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/guanlishouhuodizhi',
        component: guanlishouhuodizhi
      }
    ],
  },
  {
    //确认订单信息
    path: '/querendingdanxinxi',
    name: 'querendingdanxinxi',
    component: querendingdanxinxi,
  },
  {
    //去支付
    path: '/payment',
    name: 'payment',
    component: payment,
  },
  {
    //支付成功
    path: '/pay',
    name: 'pay',
    component: pay,
  },
  
  {
    //我的订单
    path: '/allorders',
    name: 'allorders',
    component: chakanquanbu,
    redirect: '/quanbu',
    children: [
      {
        //全部订单
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/quanbu',
        component: quanbu
      },
      {
        //待付款
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/daifukuang',
        component: daifukuang
      },
      {
        //待发货
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: '/daifahuo',
        component: daifahuo
      },
      {
        //待收货
        path: '/daishouhuo',
        component: daishouhuo
      },
      {
        //已退款
        path: '/yituikuan',
        component: yituikuan
      },
      {
        //已退货
        path: '/yituihuo',
        component: yituihuo
      },
      {
        //交易成功
        path: '/jiaoyichengong',
        component: jiaoyichengong
      },
      {
        //交易关闭
        path: '/jiaoyiguanbi',
        component: jiaoyiguanbi
      }
    ],
  }
  ,
  {
    //订单详情
    path: '/dingdanxiangqing/:id',
    name: 'dingdanxiangqing',
    component: dingdanxiangqing,
  },
  {
    path: '*',
    name: 'error',
    component: () => import('@/views/error'),
  },
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
