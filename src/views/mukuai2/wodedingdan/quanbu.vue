<template style="background-color: #fff">
<div>
   <!-- 一部分 -->
   <el-container style="border-radius:0.5vw;border: 1px solid rgb(144, 206, 230);margin-bottom: 20px;" v-for="item in orders" :key="item.index">
      <el-header>
         <el-row>
            <el-col :span="6"><div>下单日期：{{item.gmtCreate}}</div></el-col>
            <el-col :span="6"><div>订单号：{{item.orderCode}}</div></el-col>
            <el-col :span="6"><div>订单状态：{{item.orderStatus}}</div></el-col>
            <el-col :span="6"><div><el-link :underline="false"  @click="deleteorder(item.orderId)" class="delete">删除订单</el-link></div></el-col>
         </el-row>
      </el-header>
      <el-main>
         <el-table class="table"
         show-summary
            :data="item.orderdetails"
            border
            style="width: 100%"
            :show-header="false">
            <el-table-column
               width="180">
               <template slot-scope="scope">
                  <img :src="scope.row.odetailPic" width="50vw" height="50vw"/>
               </template>
            </el-table-column>
            <el-table-column
               prop="odetailName">
            </el-table-column>
            <el-table-column
               prop="odetailNum"
               width="180">
            </el-table-column>
            <el-table-column
               prop="odetailPrice"
               width="180">
            </el-table-column>
            <el-table-column
               prop="odetailTotalprice"
               width="180">
            </el-table-column>
         </el-table>
         <div class="hr"></div> 
         <!-- 查看订单详情 -->
         <el-row style="padding-top:1vw">
            <el-button @click="details(item.orderId)">查看订单详情</el-button>
            <span style="float: right;">总金额(不含运费) : ￥{{item.total}}</span>
         </el-row>

      </el-main>
   </el-container>
</div>
</template>

<script>
import {getorderbyuser, deleteorder} from '@/api/order'
export default {
     filters: {
      keepTwoNum(value){
        value = Number(value);
        return value.toFixed(2)
      }
    },
    data() {
      return {
         s:'',
         li:'',
         userId: '',
         orders:[],
          date: '2017-08-23',
          id: '20170823125714839064',
          state: '已提交退款申请，请等待商家处理',
          date1: '2016-09-24',
          id1: '20160924132428930092',
          state1: '交易关闭',
      };
    },
    methods: {
       details(){
          this.$router.push({path:'/dingdanxiangqing'})
       },
      deleteorder(id){
         this.$confirm('确定删除这个订单吗？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
           deleteorder(id).then((res) =>{
              if(res.code == 200) {
                  this.$message({
                     type: 'success',
                     message: '删除成功!'
                  });
                  this.getall()
              }
           })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      getall() {
         getorderbyuser(this.userId).then((res)=>{
            if(res.code == 200) {
               this.orders = res.data.list
               var totalprice = 0
               this.orders.forEach(item => {
                  item.orderdetails.forEach(item => {
                     totalprice += item.odetailTotalprice
                     
                  })
                     item.total = totalprice
                     totalprice = 0
               });
            }
         })
      },
      getuserid() {
         var userinfo = localStorage.getItem('userinfo')
          if(userinfo) {
            var user = JSON.parse(userinfo)
            this.userId = user.userId
         }
      }
    },
    created() {
       this.getuserid()
       this.getall()
    }
      
  }
</script>
<style scoped>
   .el-main{
      background-color: #fff;
      border-radius:0 0 0.5vw 0.5vw;
   }

   .el-header{
      line-height: 60px;
      color: rgb(42, 146, 216);
      text-align: left;
      background-color: rgb(144, 230, 225);
      border-radius:0.5vw 0.5vw 0 0;
   }

   .hr{
      height: 1vw;
      border-bottom: 1px solid lightgrey;      
   }

   .el-button{
      float: left;
      color: white;
      background-color: rgb(92, 173, 206);
   }

   /* 删除汇总行 */
   .table /deep/ .el-table__footer-wrapper{
      display: none;
   }

   .el-link.delete{
      color: rgb(53, 125, 233);
     float: right;
   }

</style>