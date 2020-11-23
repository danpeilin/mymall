<template>
<div>
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
      <el-menu-item  @click="changerouter2" index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">待付款订单</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">待发货订单</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-document"></i>
        <span slot="title">待收货订单</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">已退款订单</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-setting"></i>
        <span slot="title">已退货订单</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-setting"></i>
        <span slot="title">交易成功订单</span>
      </el-menu-item>
      <el-menu-item index="7">
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
      }
    }
  }
</script>
<style scoped>
.el-aside {
    
    background-color: #fff;
    color: #333;
    text-align: center;
    margin-top: 5rem;
    height: 550px;
    width: 20%;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    margin-top: 5rem;
    height: 550px;
  }
</style>