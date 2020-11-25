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
                    <span>订单编号：20160924115952966076</span>
                 </el-col>
                  <el-col :span="8" style="text-align:left;">创建时间：2016-09-24</el-col>
             </el-row>
             <hr>
             <el-row class="toubuyangshi">
                 <el-col :span="16" style="text-align:left;" >
                    <span>订单状态：等待付款</span>
                 </el-col>
                  <el-col :span="8" style="text-align:left;">送货地址：</el-col>
             </el-row>

             <div class="buju">
            <el-row>
               <el-col :span="24" class="biaodingbu">商品列表</el-col>
           </el-row>
             <el-table
             class="table"
             show-summary
                  :data="tableData"
                   :summary-method="getSummaries"
                    border
                style="width: 100%">
     <el-table-column
      prop="id"
      label="#"
      width="100">
    </el-table-column>
    <el-table-column
    width="120"
      label="商品图片"
      >
      <template slot-scope="scope">
          
           <img :src="scope.row.imgsrc" width="60" height="60"/>
      </template> 
    </el-table-column>
    <el-table-column
    prop="mingcheng"
    width="500"
      label="商品名称">
    </el-table-column>
    <el-table-column
      prop="amount1"
      label="商品单价">
    </el-table-column>
    <el-table-column
      prop="amount2"
      label="数量">
    </el-table-column>
    <el-table-column
     prop="amount3"
      label="小计">
       <template  slot-scope="scope">
              ￥{{ (scope.row.sum = scope.row.amount1 *scope.row.amount2)| keepTwoNum}}
        </template>
    </el-table-column>
  </el-table>
  </div>
  <hr>
  <div class="yunfei">
   <span class="yun"> 运费：￥10</span>
  </div>
  <hr>
  <div class="yunfei">
    <span class="yun2">
    订单总金额(含运费)：<span>￥{{li}}</span>
    </span>
  </div>


</div>
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
        tableData: [
          {
          id: '1',
          mingcheng:'女装 军旅式短茄克1  女式XS 黑色',
          imgsrc: require('../../../../assets/fenlei1.png'),
          amount1: '233',
          amount2: '2',
          amount3:''
        }, {
          id: '2',
          mingcheng:'女士内衣 新型收拢运动内衣  女式M  天蓝色',
          imgsrc: require('../../../../assets/fenlei1.png'),
          amount1: '100',
          amount2: '2',
          amount3:''
        }, {
          id: '3',
          mingcheng:'测试  女式S 白色',
          imgsrc: require('../../../../assets/fenlei2.png'),
          amount1: '222',
          amount2: '1',
          amount3:''
        }, {
          id: '4',
           mingcheng:'女装 军旅式短茄克2  女式XS  粉红色',
          imgsrc: require('../../../../assets/fenlei1.png'),
          amount1: '243',
          amount2: '1',
          amount3:''
        }, {
          id: '5',
           mingcheng:'女装 军旅式短茄克2  女式XS  粉红色',
          imgsrc: require('../../../../assets/fenlei1.png'),
          amount1: '300',
          amount2: '1',
          amount3:''
        }],
        li:0
      };
     
    },
    methods: {
       getSummaries(param) {
        const { columns, data } = param;
        var li = 0
        data.forEach((data, index) => {
          li += data.sum
        })
        console.log(li)
        this.li = li+10
        const sums = [];
        return sums;
      }
    }
    ,mounted(){
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