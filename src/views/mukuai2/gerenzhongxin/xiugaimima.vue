<template>
  <div class="main">
    <div class="wrapper">
      <div class="header">
        修改密码
      </div>
      <div class="userinfo">
        <div class="formwrapper">
          <el-form ref="form" :model="formdata" label-width="80px">
          <el-form-item  label="旧密码">
            <el-input type="password" v-model="formdata.passold"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input type="password" v-model="formdata.passnew"></el-input>
          </el-form-item>
          <el-form-item label="再次输入">
            <el-input type="password" v-model="formdata.repassnew"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即修改</el-button>
          </el-form-item>
          </el-form>
        </div>
        


      </div>
    </div>
  </div>
</template>
<script>
import {updatepass} from '@/api/user'
export default {
  data() {
    return {
      formdata: {
          userId: '',
          passold:'',
          passnew: '',
          repassnew: '',
      },
      userId: 0,
    }
  },
  methods: {
    onSubmit() {
      this.formdata.userId = this.userId
        updatepass(this.formdata).then((res) => {
          if(res.code == 200) {
            this.$notify({
                message: '验证失败，请重新登录！',
                offset: 100,
                type: 'info'
            });
            this.$router.push({path: `/`})
            this.formdata.passold = ''
            this.formdata.passnew = ''
            this.formdata.repassnew = ''
            this.$store.commit('passtrue')
          }
          if(res.code == 201) {
            this.$notify({
                title: '失败',
                message: res.data.msg,
                offset: 100,
                type: 'error'
            });
          }
        })
    },
    getuserId() {
      var userinfo = localStorage.getItem('userinfo')
      if(userinfo) {
        var user = JSON.parse(userinfo)
        this.userId = user.userId
      }
    },
  },
  created() {
    this.getuserId()
  }
}

</script>
<style scoped>
.main {
  padding-top: 60px;
}
.wrapper {
  width: 70%;
  margin: 0 auto;
  height: 500px;
  background: white;
  border: 1px solid #dcdcdc;
  border-radius: 15px;
  box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
}
.header {
  height: 60px;
  position: relative;
  z-index: 10;
  line-height: 60px;
  font-size: 18px;
  padding-left: 20px;
  font-weight: 700;
  border-radius: 15px 15px 0 0;
  color: #333;
  background: linear-gradient(#fbfbfb,#ececec);
}
.userinfo {
  display: flex;
  height: 440px;
  align-items: center;
  justify-content: center;
}
.formwrapper {
  width: 500px;
}
</style>
