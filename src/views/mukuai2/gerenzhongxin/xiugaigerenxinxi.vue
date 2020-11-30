<template>
  <div class="main">
    <div class="wrapper">
      <div class="header">
        账户资料
      </div>
      <div class="userinfo">
        <div class="useravatar"> 
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8002/fileoss"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="formdata.userAvatar" :src="formdata.userAvatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="formwrapper">
          <el-form ref="form" :model="formdata" label-width="80px">
          <el-form-item  label="用户名">
            <el-input :disabled="true" v-model="formdata.userUsername"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input v-model="formdata.userNickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱">
            <el-input v-model="formdata.userEmail"></el-input>
          </el-form-item>
          <el-form-item label="用户性别">
            <el-radio-group v-model="formdata.userSex">
              <el-radio v-model="formdata.userSex" :label="0">男</el-radio>
              <el-radio v-model="formdata.userSex" :label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="formdata.userMobile"></el-input>
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
import {getmyuser, savemyuser} from '@/api/user'
export default {
  data() {
    return {
      formdata: {
          userId: '',
          userUsername: '',
          userNickname: '',
          userEmail: '',
          userSex: '',
          userMobile: '',
          userAvatar: ''
      },
      userId: 0,
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
        this.formdata.userAvatar = res.data.url
      },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    onSubmit() {
      this.formdata.userId = this.userId
        savemyuser(this.formdata).then((res) => {
          if(res.code == 200) {
            this.$notify({
                title: '成功',
                message: res.data.msg,
                offset: 100,
                type: 'success'
            });
            this.$store.commit('usertrue')
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
    getall(){
      getmyuser(this.userId).then((res)=>{
        if(res.code == 200) {
          console.log(res.data.user)
          this.formdata = res.data.user
        }
      })
    }
  },
  created() {
    this.getuserId()
    this.getall()
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
  height: 800px;
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
.avatar-uploader .el-icon-plus{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-icon-plus:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.useravatar {
  margin: 50px;
}
.formwrapper {
  width: 500px;
}
</style>
