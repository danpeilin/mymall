<template style="background-color: #fff">
<div>
   <!-- 一部分 -->
   <el-container style="border-radius:0.5vw;border: 1px solid rgb(144, 206, 230);margin-bottom:20px;" v-for="item in orders" :key="item.index">
      <el-header>
         <el-row>
            <el-col :span="6"><div>下单日期：{{item.gmtCreate}}</div></el-col>
            <el-col :span="6"><div>订单号：{{item.orderCode}}</div></el-col>
            <el-col :span="6" v-if="item.orderStatus == 2"><div>订单状态：等待付款</div></el-col>
            <el-col :span="6" v-if="item.orderStatus == 3"><div>订单状态：交易关闭</div></el-col>
            <el-col :span="6">
                <div>
                    <el-link :underline="false" @click="todelete(item.orderId)" class="delete">删除订单</el-link>
                </div>
            </el-col>
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
               width="180">
               <template slot-scope="scope">
                  <div>¥{{scope.row.odetailPrice}}</div>
               </template>
            </el-table-column>
            <el-table-column
               prop="odetailNum"
               width="180">
            </el-table-column>
            <el-table-column
               width="180">
               <template slot-scope="scope">
                  <div>¥{{scope.row.odetailTotalprice}}</div>
               </template>
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
import {getorderguanbi, deletereal} from '@/api/order'
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
         orders: [],
          date: '2016-09-24',
          id: '20160924121822742071',
          state: '等待付款',
          date1: '2016-09-24',
          id1: '20160924121648823000',
          state1: '等待付款',
      };
    },
    methods: {
       details(id){
          this.$router.push({path:`/dingdanxiangqing/${id}`})
       },
       todelete(id) {
         this.$confirm('确定取消这个订单吗？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
           deletereal(id).then((res) =>{
              if(res.code == 200) {
                  this.$message({
                     type: 'success',
                     message: '成功!'
                  });
                  this.getall()
              }
           })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      getuserid() {
         var userinfo = localStorage.getItem('userinfo')
          if(userinfo) {
            var user = JSON.parse(userinfo)
            this.userId = user.userId
         }
      },
      getall() {
         getorderguanbi(this.userId).then((res)=>{
            if(res.code == 200) {
               this.orders = res.data.list

               this.orders.forEach(item=>{
                  var dateee = new Date(item.gmtCreate).toJSON();
                  var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                  item.gmtCreate = date
               })

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
      payment(){
          this.$router.push({path: '/payment'})
      },
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