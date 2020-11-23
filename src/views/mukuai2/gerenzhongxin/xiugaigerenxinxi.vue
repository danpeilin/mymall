<template>
  <div>
    <el-form ref="user" :model="formData" :rules="rules" size="medium" label-width="100px"
      label-position="top">
      <el-form-item label="用户名" prop="field101">
        <el-input v-model="formData.field101" placeholder="请输入用户名" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label="性别" prop="field102">
        <el-radio-group v-model="formData.field102" size="medium">
          <el-radio v-for="(item, index) in field102Options" :key="index" :label="item.value"
            :disabled="item.disabled">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮箱" prop="field104">
        <el-input v-model="formData.field104" placeholder="请输入邮箱(11111@qq.com)" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item size="large" style="text-align:center">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        field101: undefined,
        field102: undefined,
        field104: undefined,
      },
      rules: {
        field101: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        field102: [{
          required: true,
          message: '性别不能为空',
          trigger: 'change'
        }],
        field104: [{
          required: true,
          message: '请输入邮箱地址',
          trigger: 'blur'
        }],
      },
      field102Options: [{
        "label": "男",
        "value": 1
      }, {
        "label": "女",
        "value": 2
      }],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['user'].validate(valid => {
        if (valid) {
             // TODO 提交表单
             this.$alert('修改个人信息成功', '信息提示', {
                confirmButtonText: '返回',
                callback: action => {
                    // this.$message({
                    //     type: 'info',
                    //     message: `action: ${ action }`
                    // });
                }
            });
          } else {
           this.$alert('修改个人信息失败', '信息提示', {
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
      this.$refs['user'].resetFields()
    },
  }
}

</script>
<style>
    .el-form{
        background-color: #e8eff7;
        border:1px solid #a7c6e6;
        padding:1vw 1vw 5vw 1vw;
        border-radius: 1vw;
        font-family: '微软雅黑';
        font-weight: bold;
    }
</style>
