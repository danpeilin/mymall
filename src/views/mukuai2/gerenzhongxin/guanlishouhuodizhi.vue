<template>
  <div class="main">
    <div class="wrapper">
      <div class="header">
        收货地址列表
      </div>
      <div class="userinfo">
        <el-button type="success" @click="dialogVisible = true" style="margin: 20px">添加地址</el-button>
        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="addrReceiver"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="addrTel"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="addrProvince"
          label="省份">
        </el-table-column>
        <el-table-column
          prop="addrCity"
          label="市">
        </el-table-column>
        <el-table-column
          prop="addrArea"
          label="区">
        </el-table-column>
        <el-table-column
          prop="addrContent"
          label="地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="addrIsdefault"
          :formatter="defaultformatter"
          label="默认地址">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200"
          align="center">
          <template slot-scope="scope">
            <el-button @click="editadrr(scope.row.addrId)" type="text" size="small">编辑</el-button>
            <el-button type="text" @click="deleteaddr(scope.row.addrId)" size="small">删除</el-button>
            <el-button type="text" @click="setdefualt(scope.row.addrId)" size="small">设为默认</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="收件人">
                    <el-input v-model="form.addrReceiver"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="form.addrTel"></el-input>
                </el-form-item>
                收货地址
                 <el-form-item label="省">
                    <el-input class="area" v-model="form.addrProvince"></el-input>
                </el-form-item>
                 <el-form-item  label="市">
                    <el-input class="area" v-model="form.addrCity"></el-input>
                </el-form-item>
                <el-form-item  label="区">
                    <el-input class="area" v-model="form.addrArea"></el-input>
                </el-form-item>
                <el-form-item  label="街道">
                    <el-input v-model="form.addrContent"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                </el-form-item>
                </el-form>
        </el-dialog>

         <el-dialog
            title="修改内容"
            :visible.sync="editVisible"
            width="30%"
            :before-close="edithandleClose">
            <el-form ref="editform" :model="editform" label-width="80px">
                <el-form-item label="收件人">
                    <el-input v-model="editform.addrReceiver"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="editform.addrTel"></el-input>
                </el-form-item>
                收货地址
                 <el-form-item label="省">
                    <el-input class="area" v-model="editform.addrProvince"></el-input>
                </el-form-item>
                 <el-form-item  label="市">
                    <el-input class="area" v-model="editform.addrCity"></el-input>
                </el-form-item>
                <el-form-item  label="区">
                    <el-input class="area" v-model="editform.addrArea"></el-input>
                </el-form-item>
                <el-form-item  label="街道">
                    <el-input v-model="editform.addrContent"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="editsubmit">立即修改</el-button>
                </el-form-item>
                </el-form>
        </el-dialog>


      </div>
    </div>
  </div>
</template>
<script>
import {getaddress, myaddaddress, myupdateaddress, mygetoneaddr, mydelete, setdefault} from '@/api/address'
export default {
  data() {
    return {
      tableData: [],
      form: {
        userId: '',
        addrReceiver: '',
        addrTel: '',
        addrProvince: '',
        addrCity: '',
        addrArea: '',
        addrContent: ''
      },
      editform: {
        addrId:'',
        userId: '',
        addrReceiver: '',
        addrTel: '',
        addrProvince: '',
        addrCity: '',
        addrArea: '',
        addrContent: ''
      },
      userId: 0,
      dialogVisible: false,
      editVisible: false,
    }
  },
  methods: {
    onSubmit() {
      this.form.userId = this.userId
       myaddaddress(this.form).then((res)=>{
         if(res.code == 200) {
           this.$notify({
              title: '成功',
              message: res.data.msg,
              offset: 100,
              type: 'success'
            });
            this.dialogVisible = false
            this.form = {}
            this.getall()
         }
       })
    },
    deleteaddr(id) {
      this.$confirm('确认删除？')
          .then(_ => {
              mydelete(id).then((res)=>{
                if(res.code == 200) {
                  this.$notify({
                    title: '成功',
                    message: res.data.msg,
                    offset: 100,
                    type: 'success'
                  });
                  this.getall()
                }
              })
          })
      .catch(_ => {});
    },
    handleClose(done) {
      this.form = {}
      done()
    },
    edithandleClose(done) {
      this.editform = {}
      done()
    },
    editsubmit() {
        myupdateaddress(this.editform).then((res)=>{
          if(res.code == 200) {
            this.$notify({
              title: '成功',
              message: res.data.msg,
              offset: 100,
              type: 'success'
            });
            this.editVisible = false
            this.getall()
          }
        })
    },
    editadrr(id) {
      mygetoneaddr(id).then((res)=>{
        this.editform = res.data.address
      })
      this.editVisible = true
    }, 
    setdefualt(id) {
      setdefault(this.userId, id).then((res)=>{
        if(res.code == 200) {
          this.getall()
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
    defaultformatter(row, column) {
        return row.addrIsdefault == 1?'默认地址':''
      },
    getall() {
      getaddress(this.userId).then((res)=>{
        this.tableData = res.data.list
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
.userinfo {
  height: 760px;
}
</style>
