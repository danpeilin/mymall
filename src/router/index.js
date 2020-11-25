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






Vue.use(VueRouter)

const routes = [
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
    //主页
    path: '/',
    name: 'Home',
    component: Home,
  }
  ,
  {
    //我的订单
    path: '/chakanquanbu',
    name: 'chakanquanbu',
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
