<template>
  <div>
      <div class="carousels">
          <el-carousel height="750px" :autoplay="true" :interval="5000">
            <el-carousel-item v-for="(item,index) in backgroundimg" :key="index">
              <img class="lunboimg" :src="item.lunbo"/>
            </el-carousel-item>
          </el-carousel>
      </div>

      <el-dialog
          :visible.sync="centerDialogVisible"
          width="30%"
          class="dialog"
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

    <div class="fenlei">
      <div class="fenlei-title">
        商品分类
      </div>

      <div class="fenleis animate__animated animate__fadeInUp">
          <div class="fenleidiv" v-for="(item, index) in fenleiimg" :key="index">
            <div class="fenleipic">
              <img class="myimg" :src="item.img"/>
            </div>
            <div class="fenleitext">
              {{item.title}}
            </div>
          </div>
      </div>
    </div>

    <div class="newgoods">
      <div class="fenlei-title">
        新到商品
      </div>
      <div class="swiper-button-prev swiper-button-white"></div>
      <swiper :class="show == true ? 'newcomer animate__animated animate__fadeInUp' : 'hide animate__animated animate__backOutRight'"  :options="swiperOption">
        <swiper-slide class="newcome" v-for="(item, index) in newimglist" :key="index">
          <div class="newimg">
            <img class="myimg" :src="item.img" />
          </div>
          <div class="newname">
            {{item.name}}
          </div>
          <div class="newprice">
            {{item.price}}
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-next swiper-button-white"></div>
    </div>

    <div class="topbar">
      <div class="fenlei-title">
        官方精选
      </div>

      <div class="topbar-body">
        <div class="itembody">
          <div :class="twoshow == true ? 'itemone itemmove animate__animated animate__fadeInLeft' : 'twohide animate__animated animate__fadeOutLeft'">
            <div class="leftitem">
              <img class="myimg jinxuan" src="../assets/jinxuan1.png"/>
            </div>
            <div class="topbartext">
              茵曼粉色印花t恤女2020夏装新款纯棉
            </div>
          </div>
        </div>
        <div class="itembody">
          <div :class="twoshow == true ? 'itemtwo itemmove animate__animated animate__fadeInDown' : 'twohide animate__animated animate__fadeOutUp'">
            <div class="centeritem">
              <img class="myimg jinxuan" src="../assets/jinxuan2.png"/>
            </div>
            <div class="topbartext">
              江南素兮设计师原创汉服汉元素女士
            </div>
          </div>
          <div :class="twothree == true ? 'itemthree itemmove animate__animated animate__fadeInUp' : 'twohide animate__animated animate__fadeOutDown'">
            <div class="centeritem-two-center">
              <img class="myimg jinxuan" src="../assets/jinxuan3.png"/>
            </div>
            <div class="topbartext">
              乐町情侣印花短袖T恤女2019年夏季
            </div>
          </div>
        </div>
        <div class="itembody">
          <div :class="twoshow == true ? 'itemfour itemmove animate__animated animate__fadeInRight' : 'twohide animate__animated animate__fadeOutRight'">
            <div class="centeritem-two">
              <img class="myimg jinxuan" src="../assets/jinxuan4.png"/>
            </div>
            <div class="kongge">
              <div class="topbartext">
                ONE MORE文墨2016秋装新品长袖
              </div>
            </div>
          </div>
          <div :class="twothree == true ? 'itemfive itemmove animate__animated animate__fadeInUp' : 'twohide animate__animated animate__fadeOutDown'">
            <div class="centeritem">
              <img class="myimg jinxuan" src="../assets/jinxuan5.png"/>
            </div>
            <div class="topbartext">
              乐町黑科技T环保白色短袖T恤
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import {login} from "../api/user"
import {getuserinfo} from "../api/user"
import {regist} from '../api/user'
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
        fenleiimg: [
          {
            img: require('../assets/fenlei1.png'),
            title: '女装'
          },
          {
            img: require('../assets/fenlei2.png'),
            title: '男装'
          },
          {
            img: require('../assets/fenlei3.png'),
            title: '女士内衣'
          },
          {
            img: require('../assets/fenlei4.png'),
            title: '男士内衣'
          },
          {
            img: require('../assets/fenlei5.png'),
            title: '女鞋'
          },
          {
            img: require('../assets/fenlei6.png'),
            title: '男鞋'
          },
          {
            img: require('../assets/fenlei7.png'),
            title: '连衣裙'
          },
          {
            img: require('../assets/fenlei8.png'),
            title: '儿童装'
          }
        ],
        newimglist:[
          {
            img: require('../assets/xindao1.jpg'),
            price: 718,
            name: '长袖'
          },
          {
            img: require('../assets/xindao2.jpg'),
            price: 718,
            name: '长袖'
          },
          {
            img: require('../assets/xindao3.jpg'),
            price: 718,
            name: '长袖'
          },
          {
            img: require('../assets/xindao4.jpg'),
            price: 718,
            name: '长袖'
          },
          {
            img: require('../assets/xindao5.jpg'),
            price: 718,
            name: '长袖'
          },
          {
            img: require('../assets/xindao6.jpg'),
            price: 718,
            name: '长袖'
          }
        ],
        swiperOption: {//swiper3
          autoplay : 2000,
          slidesPerView : 4,
          speed: 1000,
          spaceBetween : 30,
          loop : true,
          autoplayDisableOnInteraction : false,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
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
        show:'false',
        twoshow: 'false',
        twothree: 'false',
        activeName: 'first',
        loginForm: {
          username: '',
          password: '',
        },
      }
      
    },
    methods: {
      handleBeforeClose(done) {
        this.$store.commit("changeFlase")
        this.username = ''
        this.password = ''
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
                  this.getuser()
                  this.loginForm.username = ''
                  this.loginForm.password = ''
                  this.$store.commit("changeFlase")
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
      getuser() {
        this.$store.commit("changeUsername")
      }
    },
    computed: {
      centerDialogVisible: {
        get(){
            return this.$store.state.centerDialogVisible
        },
        set(v) {
            this.centerDialogVisible = v
        }
      }
    },
    created() {
      window.addEventListener('scroll', e => {
        this.scrollY = window.scrollY
        if(this.scrollY > 725) {
          this.show = true
        } else {
          this.show = false
        }
        if (this.scrollY > 1525) {
          this.twoshow = true
        } else {
          this.twoshow = false
        }
        if (this.scrollY > 1830) {
          this.twothree = true
        } else {
          this.twothree = false
        }
      })
    },
    
}
</script>
<style scoped>
.lunboimg {
  height: 100%;
  width: 100%;
}
.fenlei {
  height: 800px;
  background: #FAFAFA;
}
.fenlei-title {
  height: 100px;
  font-size: 30px;
  font-family: YouYuan;
  line-height: 100px;
  margin-left: 100px;
}
.fenleis {
  height: 650px;
  width: 1500px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: space-between;
}
.fenleidiv {
  height: 300px;
  width: 340px;
  background: white;
  box-shadow: 0 15px 30px rgba(0,0,0,.1);
  transition: transform .5s linear;
}
.fenleidiv:hover {
  	transform:translateY(-20px);
    transition: transform .5s linear;
}
.myimg {
  width: 100%;
  height: 100%;
}
.fenleipic {
  height: 200px;
  width: 200px;
  margin: 0 auto;
  margin-top: 10px;
}
.fenleitext {
  height: 50px;
  margin-top: 10px;
  line-height: 50px;
  text-align: center;
}
.newgoods {
  height: 500px;
  background:#fff2e8;
}
.newcomer {
  height: 300px;
  width: 80%;
  padding: 20px;
  margin: 0 auto;
  transition: all .5s linear
}
.hide {
  opacity: 0;
  transition: opacity 1s linear;
}
.twohide {
  opacity: 0;
  transition: all .5s linear;
}
.newcome {
  background: white;
  height: 300px;
  box-shadow: 5px 5px 10px rgba(0,0,0,.1);
  transition: transform .5s linear;
}
.newcome:hover {
  transform:translateY(-20px);
  transition: transform .5s linear;
}
.newimg {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  margin-top: 10px;
}
.newname {
  margin-top: 10px;
  text-align: center;
}
.newprice {
  width: 80px;
  margin: 0 auto;
  text-align: center;
  margin-top: 10px;
  border-radius: 15px;
  color: white;
  background: tomato;
}
.swiper-button-next {
  position: relative;
  float: right;
  top: -150px;
  right: 100px;
}
.swiper-button-prev {
  position: relative;
  float:left;
  top: 185px;
  left: 120px;
}
.topbar {
  height: 1100px;
  background: #C0A69A;
}
.topbar-body {
  height: 900px;
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
.itembody {
  width: 30%;
  height: 900px;
}
.itemone {
  height: 680px;
}
.leftitem {
  height: 600px;
  width: 100%;
  overflow: hidden;
}
.itemtwo {
  height: 400px;
  width: 100%;
  overflow: hidden;
}
.itemthree {
  height: 550px;
}
.centeritem {
  height: 300px;
  width: 100%;
  overflow: hidden;
}
.centeritem-two {
  height: 400px;
  width: 100%;
  overflow: hidden;
}
.itemfour {
  height: 500px;
}
.itemfive {
  height: 350px;
}
.centeritem-two-center {
  height: 500px;
  width: 100%;
  overflow: hidden;
}
.topbartext {
  font-size: 25px;
  margin-top: 15px;
  line-height: 20px;
  text-align: center;
  transition: all .5s linear;
}
.jinxuan {
  transition: transform .5s linear;
}
.itemmove:hover .jinxuan{
  transform: scale(1.1);
  transition: transform .5s linear;
  cursor: pointer;
}
.itemmove:hover .topbartext {
  margin-top: 30px;
  transition: all .5s linear;
  cursor: pointer;
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
  display: block;
  margin: 0 auto;
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
</style>