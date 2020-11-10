<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#ffffffff"
      text-color="black"
      active-text-color="#409EFF">
      <span class="myband">良品服装专卖店</span>
      <el-menu-item index="1">网站首页</el-menu-item>
      <el-menu-item index="2">新到商品</el-menu-item>
      <el-menu-item index="3">热销商品</el-menu-item>
      <el-submenu index="4">
        <template slot="title">商品分类</template>
        <el-menu-item index="4-1">选项1</el-menu-item>
        <el-menu-item index="4-2">选项2</el-menu-item>
        <el-menu-item index="4-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>

      <div class="searchbar">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      
      <div class="rightarea">
        <div class="avatar"> 
          <img class="myavatar" src="https://picsum.photos/id/1/200/300" />
        </div>
        <div class="up">
          <el-dropdown>
            <span class="el-dropdown-link">
              user，您好！<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的订单</el-dropdown-item>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item divided>注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="cart">
          <el-badge :value="12" class="item">
            <i class="el-icon-shopping-cart-full"></i>
          </el-badge>
        </div>
      </div>
    </el-menu>

    <div class="carousels">
      <div class="block">
        <el-carousel height="700px" :interval="3000">
          <el-carousel-item v-for="(item,index) in backgroundimg" :key="index">
            <img class="lunboimg" :src="item.lunbo"/>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
      return {
        backgroundimg: [
          {
            lunbo: require('../assets/lunbo1.jpg')
          },
          {
            lunbo: require('../assets/lunbo2.jpg')
          },
          {
            lunbo: require('../assets/lunbo3.jpg')
          }
        ],
        input: '',
        activeIndex: '1',
        activeIndex2: '1'
      }
      
    },
  methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>
<style scoped>
.myband {
  float: left;
  height: 50px;
  vertical-align: middle;
  text-align: center;
  line-height: 60px;
  margin-left: 100px;
  margin-right: 150px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}
.lunboimg {
  height: 100%;
  width: 100%;
}
.searchbar {
  margin-left: 150px;
  display: inline-block;
  width: 250px;
  height: 60px;
  line-height: 60px;
}
.rightarea {
  float: right;
  height: 60px;
  width: 450px;
  margin-right: 50px;
  display: flex;
  align-items: center;
}
.avatar {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.myavatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.up {
  margin-left: 10px;
}
.cart {
  height: 60px;
  width: 100px;
  line-height: 60px;
  margin-left: 20px;
}
.cart:hover {
  color:#409EFF;
  cursor: pointer;
}
.el-icon-shopping-cart-full {
  font-size: 30px;
  vertical-align: middle;
}
.item /deep/ .el-badge__content {
  margin-top: 15px;
}
</style>