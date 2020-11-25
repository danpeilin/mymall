<template>
  <div id="app">
    <div class="header" :class="show == true ? 'show' : ''">
      <span class="myband">良品服装店</span>

      <div class="tags">
        <div v-for="(item, index) in lis" :key="index" :class="active == index ? 'lis active': 'lis'"  @click="toggletag(index)">
          {{item.title}}
        </div>
        <div class="lis">
          <el-dropdown>
            <span class="el-dropdown-link">
              商品分类<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided >蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <div class="searchbar">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      
      <div class="rightarea">
        <div class="avatar" v-if="userNickname != ''"> 
          <img class="myavatar" src="https://picsum.photos/id/1/200/300" />
        </div>
        <div class="up">
          <el-button type="text" v-if="userNickname == ''" @click="changeVisible">您好！请登录</el-button>

      
          <el-dropdown  v-if="userNickname != ''" > 
            <span class="el-dropdown-link">
              {{this.userNickname}}，您好！<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的订单</el-dropdown-item>
              <el-dropdown-item >个人中心</el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="cart">
          <el-badge :value="12" class="item">
            <i class="el-icon-shopping-cart-full"></i>
          </el-badge>
        </div>
      </div>
    </div>
    <router-view/>
    <div class="bottom-bar">
      
      <div class="bottom-body">
        <div class="title">
          商务与合作
        </div>
        <div class="bottomtext">
          企业业务
        </div>
        <div class="bottomtext">
          开方平台
        </div>
        <div class="bottomtext">
          采购相关
        </div>
        <div class="bottomtext">
          媒体联络
        </div>
      </div>
      <div class="bottom-body">
        <div class="title">
          服务与支持
        </div>
        <div class="bottomtext">
          联系我们
        </div>
        <div class="bottomtext">
          服务政策
        </div>
        <div class="bottomtext">
          安全中心
        </div>
        <div class="bottomtext">
          客服电话
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {logout} from "./api/user"
export default {
  data() {
      return {
        input: '',
        active: 0,
        lis: [
          {title: '网站首页'},
          {title: '新到商品'},
          {title: '热销商品'}
        ],
        scrollY: 0,
        show:'false',
        user:'',
        userNickname:''
      }
      
    },
    computed: {
      userchange() {
        return this.$store.state.userchange
      }
    },
    watch: {
      userchange: function() {
        if (this.userchange == true) {
          this.getusername()
        }
      }
    },
    methods: {
        toggletag(index) {
          this.active = index
        },
        changeVisible() {
          this.$store.commit("changeTure")
        },
        getusername() {
          var userinfo = localStorage.getItem('userinfo')
          if(userinfo) {
            var user = JSON.parse(userinfo)
            this.userNickname = user.userNickname
          }
        },
        logout() {
          logout().then(res => { 
            localStorage.removeItem('Token')
            localStorage.removeItem('userinfo')
            this.$message({
                 message: '注销成功',
                 type: 'success'
              });
          })
          this.userNickname = ''
          this.$store.commit("changeUsernameFalse")
        },
        showheader() {
            window.addEventListener('scroll', e => {
              this.scrollY = window.scrollY
              if(this.scrollY > 690) {
                this.show = true
              } else {
                this.show = false
              }
            })
        }
  },
  created() {
    this.getusername()
    this.showheader()
  },
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.header {
  height: 60px;
  width: 100%;
  min-width: 1920px;
  position: fixed;
  z-index: 99;
  transition: background .5s linear 0s;
}
.myband {
  float: left;
  height: 50px;
  vertical-align: middle;
  text-align: center;
  line-height: 60px;
  margin-left: 100px;
  margin-right: 150px;
}
.show {
  background: white;
  box-shadow: 0px 3px 10px 1px #cccccc;
  transition: all .5s linear 0s;
}
.tags {
  float: left;
  height: 60px;
  width: 450px;
  display: flex;
  align-items: center;
}
.lis{
  height: 35px;
  width: 80px;
  text-align: center;
  line-height: 35px;
  font-size: 14px;
  color: black;
  margin-left: 10px;
  border-radius: 25px;
}
.active {
  background: #409EFF;
  color: white;
}
.searchbar {
  float: left;
  margin-left: 200px;
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
  margin-left: 20px;
  margin-right: 50px;
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
.bottom-bar {
  height: 300px;
  display: flex;
  align-items: center;
  background: #121212;
}
.bottom-body {
  height: 200px;
  width: 300px;
  margin-left: 100px;
}
.bottom-body:first-child {
  margin-left: 300px;
}
.title {
  font-size: 20px;
  font-weight: 700;
  color: #CBCBCB;
}
.bottomtext {
  color: #787878;
  font-size: 18px;
  margin-top: 10px;
}
</style>
