<template>
<div>
    
    <el-container>
         <el-main>
           <div class="bujuzong">
             <el-row class="toubuyangshi">
                 <el-col :span="6" style="text-align:left;">
                    <span style="font-size:19px;font-weight: 700;">订单信息</span>
                 </el-col>
                 <el-col :span="18"></el-col>
             </el-row>
             <hr>
             <el-row class="toubuyangshi">
                 <el-col :span="16" style="text-align:left;">
                    <span>订单编号：{{orders.orderCode}}</span>
                 </el-col>
                  <el-col :span="8" style="text-align:left;">创建时间：{{orders.gmtCreate}}</el-col>
             </el-row>
             <hr>
             <el-row class="toubuyangshi">
                 <el-col :span="16" style="text-align:left;" >
                    <span v-if="orders.orderStatus == 3">订单状态：交易关闭</span>
                    <span v-if="orders.orderStatus == 2">订单状态：等待付款</span>
                 </el-col>
                  <el-col :span="8" style="text-align:left;">送货地址：{{orders.orderAddress}}</el-col>
             </el-row>

             <div class="buju">
            <el-row>
               <el-col :span="24" class="biaodingbu">商品列表</el-col>
           </el-row>
             <el-table
             class="table"
              :data="list"
                border
                style="width: 100%">
                <el-table-column
                  prop="odetailId"
                  label="#"
                  width="100">
                </el-table-column>
                <el-table-column
                width="120"
                  label="商品图片"
                  >
                  <template slot-scope="scope">
                      
                      <img :src="scope.row.odetailPic" width="60" height="60"/>
                  </template> 
                </el-table-column>
                <el-table-column
                prop="odetailName"
                width="500"
                  label="商品名称">
                </el-table-column>
                <el-table-column
                  label="商品单价">
                  <template slot-scope="scope">
                      <div>¥{{scope.row.odetailPrice}}</div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="odetailNum"
                  label="数量">
                </el-table-column>
               <el-table-column
                  label="小计">
                  <template slot-scope="scope">
                      <div>¥{{scope.row.odetailTotalprice}}</div>
                  </template>
                </el-table-column>
              </el-table>
              </div>
              <hr>
              <div class="yunfei">
              <span class="yun"> 运费：￥0</span>
              </div>
              <hr>
              <div class="yunfei">
                <span class="yun2">
                订单总金额(不含运费)：<span>￥{{total}}</span>
                </span>
              </div>


</div>
         </el-main>
     </el-container>

  
</div>
</template>

<script>
import {getallorder} from '@/api/order'
  export default {
     filters: {
      keepTwoNum(value){
        value = Number(value);
        return value.toFixed(2)
      }
    },
    data() {
      return {
        orders: {},
        list: [],
        li:0,
        userId: 0,
        orderId: 0,
        total: 0,
      };
     
    },
    methods: {
      getuserid() {
         var userinfo = localStorage.getItem('userinfo')
          if(userinfo) {
            var user = JSON.parse(userinfo)
            this.userId = user.userId
        }
      },
      getorderId() {
        this.orderId = this.$route.params.id
      },
      getall() {
        getallorder(this.orderId).then((res)=>{
          this.orders = res.data.order
          var dateee = new Date(this.orders.gmtCreate).toJSON();
          var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          this.orders.gmtCreate = date
          console.log(this.orders)
          this.list = res.data.list
          this.list.forEach((item) => {
            this.total += item.odetailTotalprice
          })
        })
      }
    },
    created(){
      this.getuserid()
      this.getorderId()
      this.getall()
    },
    mounted(){
    }
  };
</script>
<style scoped>
.toubuyangshi{
height: 35px;
}
.table /deep/ .el-table__footer-wrapper{
  display: none!important;
}
.el-main {
    background-color:#fff;
    color: #333;
    text-align: center;
    width: 100%;
    height: 700px;
    margin-top: 5rem;
  }
  .bujuzong{
    width: 70%;
    height: 700px;
    margin-left: 15%;
    background-color:#fff;
    
  }
  .buju{
      width: 100%;
      height: auto;
      border: 1px solid #000;
      margin-bottom: 20px;
  }
  .biaodingbu{
    width: 100%;
    height:40px;
    background-color: aqua;
    line-height: 40px;
  }
  .yunfei{
    width: 100%;
    height: 30px;
  }
  .yun{
    padding-left: 70%;
  }
  .yun2{
    padding-left: 80%;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>