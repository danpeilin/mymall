<template>
  <div id="app">
    <div class="header" :style="{background:headerback,boxShadow:headershadow}" :class="show == true ? 'show' : ''" >
      <span class="myband">良品服装店</span>

      <div class="tags">
        <div v-for="(item, index) in lis" :key="index" :class="$route.meta.name == item.name ? 'lis active': 'lis'"  @click="toggletag(index)">
          {{item.title}}
        </div>
        <div :class="$route.meta.name == null ? 'lis active' : 'lis'">
          <el-dropdown>
            <span class="el-dropdown-link" :class="$route.meta.name == null ? 'lis active' : 'lis'">
              商品分类<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in cates" :class="itemactive == item.cateId ? 'itemactive': ''" :key="item.cateId" @click.native="togoods(item.cateId)">{{item.cateName}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <el-dialog
          :visible.sync="centerDialogVisible"
          width="30%"
          class="dialog"
          :modal="false"
          :before-close="handleBeforeClose"
          center>
            <el-tabs v-model="activeName">
              <el-tab-pane label="用户登录" name="first">
                <el-form :model="loginForm" :rules="loginrules" ref="loginForm" label-width="100px" class="login-ruleForm">
                      <el-form-item label="用户名" prop="username">
                        <el-input style="width:90%" v-model="loginForm.username"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" prop="password">
                        <el-input style="width:90%" v-model="loginForm.password"></el-input>
                      </el-form-item>
                    <el-button class="loginbtn" type="primary" @click="submitloginForm('loginForm')">登 录</el-button>
                  </el-form>
                </el-tab-pane>
              <el-tab-pane label="用户注册" name="second">

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="用户名" prop="username">
                    <el-input style="width:90%" v-model="ruleForm.username"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input style="width:90%" v-model="ruleForm.password"></el-input>
                  </el-form-item>
                  <el-form-item label="昵称" prop="nickname">
                    <el-input style="width:90%" v-model="ruleForm.nickname"></el-input>
                  </el-form-item>
                  <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="ruleForm.sex">
                      <el-radio label="0">男</el-radio>
                      <el-radio label="1">女</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input style="width:90%" v-model="ruleForm.email"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>
                </el-form>
               <el-button class="loginbtn" type="success" @click="submitForm('ruleForm')">注 册</el-button>
              </el-tab-pane>
            </el-tabs>
        </el-dialog>

      <div class="searchbar">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </div>
      
      <div class="rightarea">
        <div class="avatar" v-if="userNickname != ''"> 
          <img class="myavatar" :src="userAvatar" />
        </div>
        <div class="up">
          <el-button type="text" v-if="userNickname == ''" @click="changeVisible">您好！请登录</el-button>

      
          <el-dropdown  v-if="userNickname != ''" > 
            <span class="el-dropdown-link">
              {{this.userNickname}}，您好！<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toorders">我的订单</el-dropdown-item>
              <el-dropdown-item >个人中心</el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>


        <el-dropdown>
          <div @click="tocart()" class="cart">
          <i class="el-icon-shopping-cart-full"></i>
          <el-badge v-if="this.totalcount != 0" :value="totalcount" class="item">
          </el-badge>
          </div>
          <el-dropdown-menu v-if="this.totalcount == 0" slot="dropdown" class="drop">
            <div class="carttip">
              您的购物车竟然是空的!
            </div>
          </el-dropdown-menu>
          <el-dropdown-menu v-if="this.totalcount != 0" slot="dropdown" class="drop">
            <div class="cartwrapper">
            <div class="cartitem" v-for="item in carts" :key="item.cartId">
              <div class="cartpic">
                <div class="cartimg">
                  <img class="myimg" :src="item.cartPic" />
                </div>
              </div>
              <div class="cartdetail">
                <div class="detail"> 
                    <div class="carttitle">
                      {{item.cartName}}
                    </div>
                    <div class="cartprice">
                      <span class="detailprice">¥ {{item.cartDiscount}}</span><span class="detailcount">x{{item.cartCount}}</span>
                    </div>
                </div>
                <div @click="deltecart(item.cartId)" class="cartdelete">
                  <i class="el-icon-delete"></i>
                </div>
              </div>
            </div>
            </div>
            <div class="cart-bottom">
              <div class="bottom-left">
                <div class="bottom-title">
                  共{{this.totalcount}}件商品
                </div>
                <div class="bottom-total">
                  合计：<span class="detailprice">¥ {{this.totalprice}}</span>
                </div>
              </div>
              <div class="bottom-right">
                <el-button @click="tocart()" type="primary">去购物车</el-button>
              </div>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="tooo"></div>
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

import {login} from "@/api/user"
import {getuserinfo} from "@/api/user"
import {regist} from '@/api/user'
import {logout} from "@/api/user"
import {getallcate} from '@/api/cate'
import {getcartbyid, cartdelete} from '@/api/cart'
export default {
  data() {
      return {
        input: '',
        lis: [
          {title: '网站首页', name: 'home'},
          {title: '新到商品', name: 'newgoods'},
          {title: '热销商品', name: 'hotgoods'}
        ],
        cates:[],
        carts:[],
        scrollY: 0,
        headerback: '',
        headershadow: '',
        show:'false',
        user:'',
        totalcount: 0,
        totalprice: 0,
        userId: 0,
        userNickname:'',
        userAvatar: '',
        itemactive: 0,
        loginForm: {
          username: '',
          password: '',
        },
        ruleForm: {
          username: '',
          password: '',
          nickname: '',
          sex: '',
          email: ''
        },
         rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 12, message: '长度在 2 到 12个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 12, message: '长度在 3 到 12个字符', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8个字符', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur'],
            },
          ],
        },
        loginrules: {
            username: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 3, max: 12, message: '长度在 2 到 12个字符', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 3, max: 12, message: '长度在 3 到 12个字符', trigger: 'blur' }
            ],
        },
        centerDialogVisible: false,
        activeName: 'first',
      }
      
    },
    methods: {
       handleBeforeClose(done) {
        this.$store.commit("changeFlase")
        this.loginForm.username = ''
        this.loginForm.password = ''
        this.ruleForm = []
        done()
      },
      
     
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let loginParams = {
              userUsername: this.ruleForm.username,
              userPassword: this.ruleForm.password,
              userNickname: this.ruleForm.nickname,
              userSex: this.ruleForm.sex,
              userEmail: this.ruleForm.email
            };
            regist(loginParams).then(res => {
              if(res.code == 200) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                });
                this.resetForm('ruleForm')
                this.activeName = 'first'
              }
              if(res.code == 201) {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
            })
          } else {
            this.$message({
              message: res.data.msg,
              type: '请按规范提交'
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }, 
      submitloginForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.tologin()
          } else {
            this.$message({
                  message: res.data.msg,
                  type: '请按规范提交'
            });
            return false;
          }
        });
      },
      tologin() {
        login(this.loginForm.username, this.loginForm.password).then(res => {
              if(res.code == 200) {
                localStorage.setItem('Token', res.data.token)
                getuserinfo().then(res => {
                  localStorage.setItem('userinfo', JSON.stringify(res.data.userinfo))
                  this.userNickname = res.data.userinfo.userNickname
                  this.userId = res.data.userinfo.userId
                  this.userAvatar = res.data.userinfo.userAvatar
                  this.loginForm.username = ''
                  this.loginForm.password = ''
                  this.centerDialogVisible = false
                  }).catch(err => {
                        
                  })
                this.$message({
                  message: '登陆成功',
                  type: 'success'
                });
              }
              if(res.code == 201) {
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
            }).catch(err => {
            })
      },
        toggletag(index) {
          this.itemactive = ''
          if (index == 0) {
            this.$router.push({path: '/'})
          }
        },
        changeVisible() {
          this.centerDialogVisible = true
        },
        getusername() {
          var userinfo = localStorage.getItem('userinfo')
          if(userinfo) {
            var user = JSON.parse(userinfo)
            this.userId = user.userId
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
          this.userId = 0
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
        },
        getallates(){
          getallcate().then((res)=>{
            if(res.code == 200){
              this.cates = res.data.cates
            }
          })
        },
        togoods(id){
          this.itemactive = id
          this.$router.push({path: `/categoods/${id}`})
        },
        tocart(){
          var id = this.userId
          if(id != 0) {
            this.$router.push({path: `/cart/${id}`})
          } else {
            this.$notify.info({
              title: '消息',
              offset: 100,
              message: '你尚未登录请先登录!'
            });
          }
          
        },
        getcart(){
          if(this.userId != '') {
            getcartbyid(this.userId).then((res=>{
              if(res.code == 200) {
                this.carts = res.data.list
                this.totalcount = this.carts.length
                this.carts.forEach((item)=>{
                  this.totalprice += item.cartDiscount*item.cartCount
                })
              }
            }))
          }
        },
        deltecart(id) {
          cartdelete(id).then((res)=>{
            if(res.code == 200) {
              this.totalprice = 0
              this.getcart()
            }
          })
        },
        toorders() {
          this.$router.push({path: '/allorders'})
        }
  },
  watch: {
    $route (to, from) {
       if (to.meta.name != 'home'){
        this.headerback = 'white'
        this.headershadow = '0px 3px 10px 1px #cccccc'
      } else {
        this.headerback = ''
        this.headershadow = ''
      }
    },
    '$store.state.addcart': function () {
      if(this.$store.state.addcart == true){
        this.totalprice = 0
        this.getcart()
        this.$store.commit('cartfalse')
      }
    }
  },
  created() {
    this.getusername()
    this.showheader()
    this.getallates()
    this.getcart()
  },
}
</script>
<style>
  body {
    margin: 0!important;
  }
</style>
<style scoped>
.myimg {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
.header {
  height: 60px;
  width: 100%;
  position: fixed;
  z-index: 99;
  min-width: 1920px;
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
.item {
  margin-left: -10px;
  margin-top: -20px;
}
.lis{
  height: 35px;
  width: 90px;
  text-align: center;
  line-height: 35px;
  font-size: 14px;
  color: black;
  margin-left: 10px;
  border-radius: 25px;
}
.tagacive {
  color: white;
}
.active {
  background: #409EFF;
  color: white;
}
.itemactive {
  background: #D9ECFF;
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
  line-height: 70px;
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
.loginform {
  height: 180px;
  margin: 0 20px;
}
.dialog-footer {
  position: relative;
}
.loginbtn {
  width: 310px;
  display: block!important;;
  margin: 0 auto!important;
  margin-top: 20px;
}
.bottomfont {
  height: 30px;
  width: 310px;
  margin: 0 auto;
  text-align: end;
  line-height: 40px;
  cursor: pointer;
}
.carttip {
  width: 500px;
  height:300px;
  text-align: center;
  line-height: 300px;
  font-size: 30px;
  color: #CBCBCB;
}
.cartitem {
  height: 120px;
  width: 500px;
  display: flex;
  transition: all .15s ease-out;
}
.cartitem:hover {
  border-radius: 5px;
  background: #f8f8f8;
  transition: all .15s ease-out;
}
.cartitem:hover .cartdelete {
  display: block;
}
.cartpic{
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cartdetail {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
}
.cartimg {
  height: 80%;
  width: 70%;
}
.detail {
  height: 80%;
  width: 85%;
}
.carttitle {
  font-size: 20px;
  margin-top: 20px;
  font-family: YouYuan;
  font-weight: 700;
}
.cartprice {
  margin-top: 20px;
}
.detailprice {
  font-size: 18px;
  color: tomato;
  font-weight: 700;
}
.detailcount {
  margin-left: 20px;
}
.cart-bottom {
  height: 80px;
  width: 500px;
  display: flex;
  border-radius: 0 0 15px 15px;
  box-shadow: inset 0 -1px 0 hsla(0,0%,100%,.5), 0 -3px 8px rgba(0,0,0,.04);
  background: linear-gradient(#fafafa,#f5f5f5);
}
.drop {
  padding: 0!important;
  border-radius: 15px!important;
}
.bottom-left {
  width: 50%;
  height: 100%;
}
.bottom-right {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-title {
  font-size: 20px;
  margin-left: 20px;
  margin-top: 10px;
  color: #959595;
}
.bottom-total {
  font-size: 20px;
  margin-left: 20px;
}
.cartdelete {
  display: none;
  font-size: 20px;
}
.cartdelete:hover .el-icon-delete {
  color: #409EFF;
  cursor: pointer;
}
.cartwrapper {
  max-height: 600px;
  overflow-y: auto;
}
</style>
