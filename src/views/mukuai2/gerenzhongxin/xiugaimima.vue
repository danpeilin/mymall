<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
     class="demo-ruleForm" label-position="top">
      <el-form-item label="旧密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpass">
        <el-input type="password" v-model="ruleForm.newpass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
     var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value == this.ruleForm.pass) {
          callback(new Error('新密码不能与旧密码一致!'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newpass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      ruleForm: {
          pass: '',
          newpass: '',
          checkPass: ''
      },
      rules: {
        pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
        newpass: [
          { validator: validatePass1, trigger: 'blur' }
        ],
        checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['ruleForm'].validate(valid => {
        if (this.ruleForm.pass != this.ruleForm.pass) {
             // TODO 提交表单
             this.$alert('输入的旧密码不正确', '信息提示', {
                confirmButtonText: '返回',
                callback: action => {
                    // this.$message({
                    //     type: 'info',
                    //     message: `action: ${ action }`
                    // });
                }
            });
          } else{
           this.$alert('修改密码成功', '信息提示', {
                confirmButtonText: '返回',
                callback: action => {
                    // this.$message({
                    //     type: 'info',
                    //     message: `action: ${ action }`
                    // });
                }
            });
            return false;
          }
      })
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields()
    },
  }
}

</script>
<style>
</style>
