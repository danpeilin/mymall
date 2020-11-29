<template>
<div class="main">
    <el-container>
        <el-aside>
           <el-row class="tac">
  <el-col :span="24">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
     <el-menu-item @click="changerouter" index="1">
        <i class="el-icon-menu"></i>
        <span slot="title" >全部订单</span>
      </el-menu-item>
      <el-menu-item @click="changerouter2" index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">待付款订单</span>
      </el-menu-item>
      <el-menu-item @click="changerouter3" index="3">
        <i class="el-icon-document"></i>
        <span slot="title">待发货订单</span>
      </el-menu-item>
      <el-menu-item @click="changerouter4" index="4">
        <i class="el-icon-document"></i>
        <span slot="title">待收货订单</span>
      </el-menu-item>
      <el-menu-item @click="changerouter5" index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">已退款订单</span>
      </el-menu-item>
      <el-menu-item @click="changerouter6" index="6">
        <i class="el-icon-setting"></i>
        <span slot="title">已退货订单</span>
      </el-menu-item>
      <el-menu-item @click="changerouter7" index="7">
        <i class="el-icon-setting"></i>
        <span slot="title">交易成功订单</span>
      </el-menu-item>
      <el-menu-item @click="changerouter8" index="8">
        <i class="el-icon-setting"></i>
        <span slot="title">交易关闭订单</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>

        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
   </el-container>
</div>
</template>

<script>
 export default {
     data() {
      return {
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
       changerouter() {
          this.$router.push({path:'/quanbu'})
      },
       changerouter2() {
          this.$router.push({path:'/daifukuang'})
      },
      changerouter3() {
          this.$router.push({path:'/daifahuo'})
      },
       changerouter4() {
          this.$router.push({path:'/daishouhuo'})
      },
      changerouter5() {
          this.$router.push({path:'/yituikuan'})
      },
       changerouter6() {
          this.$router.push({path:'/yituihuo'})
      },
      changerouter7() {
          this.$router.push({path:'/jiaoyichengong'})
      },
       changerouter8() {
          this.$router.push({path:'/jiaoyiguanbi'})
      },
    }
  }
</script>
<style scoped>
.main {
  height: 1000px;
  padding-top: 60px;
}
.el-aside {
    
    background-color: #fff;
    color: #333;
    text-align: center;
    height: 1000px;
    width: 20%;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 1000px;
  }
</style>