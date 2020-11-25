<template style="background-color: #fff">
<div>
   <!-- 一部分 -->
   <el-container style="border-radius:0.5vw;border: 1px solid rgb(144, 206, 230)">
      <el-header>
         <el-row>
            <el-col :span="6"><div>下单日期：{{date}}</div></el-col>
            <el-col :span="6"><div>订单号：{{id}}</div></el-col>
            <el-col :span="6"><div>订单状态：{{state}}</div></el-col>
            <el-col :span="6"><div><el-link :underline="false"  @click="open" class="delete"></el-link></div></el-col>
         </el-row>
      </el-header>
      <el-main>
         <el-table class="table"
         show-summary
            :data="tableData"
            :summary-method="getSummaries"
            border
            style="width: 100%"
            :show-header="false">
            <el-table-column
               width="180">
               <template slot-scope="scope">
                  <img :src="scope.row.imgsrc" width="50vw" height="50vw"/>
               </template>
            </el-table-column>
            <el-table-column
               prop="describe">
            </el-table-column>
            <el-table-column
               prop="price"
               width="180">
            </el-table-column>
            <el-table-column
               prop="number"
               width="180">
            </el-table-column>
            <el-table-column
               width="180">
                <template slot-scope="scope">
                     <span>￥</span>
                     {{ (scope.row.sum = scope.row.price *scope.row.number)| keepTwoNum}}
                </template>
            </el-table-column>
         </el-table>
         <div class="hr"></div> 
         <!-- 查看订单详情 -->
         <el-row style="padding-top:1vw">
            <el-button @click="details">查看订单详情</el-button>
            <span style="float: right;">总金额(含运费12.0元) : ￥{{s}}</span>
         </el-row>

      </el-main>
   </el-container>

<!--二部分  -->
   <el-container style="border-radius:0.5vw;border: 1px solid rgb(144, 206, 230);margin-top:1vw">
      <el-header>
         <el-row>
            <el-col :span="6"><div>下单日期：{{date1}}</div></el-col>
            <el-col :span="6"><div>订单号：{{id1}}</div></el-col>
            <el-col :span="6"><div>订单状态：{{state1}}</div></el-col>
            <el-col :span="6"><div><el-link :underline="false" @click="open" class="delete">删除订单</el-link></div></el-col>
         </el-row>
      </el-header>
      <el-main>
         <el-table class="table"
         show-summary
            :data="tableData1"
            :summary-method="getSummarie"
            border
            style="width: 100%"
            :show-header="false">
            <el-table-column
               width="180">
               <template slot-scope="scope">
                  <img :src="scope.row.imgsrc" width="50vw" height="50vw"/>
               </template>
            </el-table-column>
            <el-table-column
               prop="describe">
            </el-table-column>
            <el-table-column
               prop="price"
               width="180">
            </el-table-column>
            <el-table-column
               prop="number"
               width="180">
            </el-table-column>
            <el-table-column
               width="180">
                <template slot-scope="scope">
                     <span>￥</span>
                     {{ (scope.row.sum = scope.row.price *scope.row.number)| keepTwoNum}}
                </template>
            </el-table-column>
         </el-table>
         <div class="hr"></div> 
         <!-- 查看订单详情 -->
         <el-row style="padding-top:1vw">
            <el-button @click="details">查看订单详情</el-button>
            <span style="float: right;">总金额(含运费12.0元)&nbsp;:&nbsp;￥{{li}}</span>
         </el-row>

      </el-main>
   </el-container>
</div>
</template>

<script>
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
        tableData: [{
          imgsrc: require('../../../assets/fenlei2.png'),
          describe: '男装 军旅式短茄克22 男式XL 黑色',
          price: '177.0',
          number: '1'
        }],
        tableData1: [{
          imgsrc: require('../../../assets/fenlei1.png'),
          describe: '女装军旅式短茄克17女式XS 浅绿色',
          price: '23.0',
          number: '1',
        },{
          imgsrc: require('../../../assets/fenlei2.png'),
          describe: '女装军旅式短茄克1女式XS 黑色',
          price: '233.0',
          number: '1',
        }],
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
       getSummaries(param) {
         const { columns, data } = param;
         var s = 0;
         data.forEach((data, index) => {
            s += data.sum;
         })
         console.log(s)
         this.s = s+12;
         const sums = [];
         return sums;
      },
      getSummarie(param) {
         const { columns, data } = param;
         var li = 0;
         data.forEach((data, index) => {
            li += data.sum;
         })
         console.log(li)
         this.li = li+12;
         const sums = [];
         return sums;
      },
      open(){
         this.$confirm('确定删除这个订单吗？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
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