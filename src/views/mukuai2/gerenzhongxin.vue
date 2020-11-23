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
        <span slot="title">修改个人信息</span>
      </el-menu-item>
      <el-menu-item @click="changerouter1" index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">修改密码</span>
      </el-menu-item>
      <el-menu-item @click="changerouter2" index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">管理收货地址</span>
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
          this.$router.push({path:'/xiugaigerenxinxi'})
      },
       changerouter1() {
          this.$router.push({path:'/xiugaimima'})
      },
      changerouter2() {
          this.$router.push({path:'/guanlishouhuodizhi'})
      },
    }
  }
</script>
<style scoped>
.el-aside {
    
    background-color: #fff;
    color: #333;
    text-align: left;
    margin-top: 5rem;
    border: 0px;
    height: 550px;
    width: 20%;
  }
  
  .el-main {
    background-color:#E9EEF3;
    color: #333;
    text-align: left;
    margin-top: 5rem;
    height: 550px;
  }

  .el-icon-menu{
    padding-left: 2vw;
  }
</style>