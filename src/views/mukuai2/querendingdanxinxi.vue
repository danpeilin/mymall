<template>
    <div>
        <el-container>
            <el-main>
                <div class="buju">
                    <div class="biaogebianti">确认收货地址</div>
               <el-table
    :data="tableData"
    style="width: 100%"
    :show-header="false"
    @row-click="singleElection"
    max-height="450">
    <el-table-column label="" width="55">
        <template slot-scope="scope">
            <el-radio class="radio" v-model="templateSelection" :label="scope.$index">{{&nbsp;}}</el-radio>
        </template>
    </el-table-column>
    
    <el-table-column
      prop="province"
      label="省——市——区"
      width="240">
    </el-table-column>
    <el-table-column
      prop="address"
      label="街道"
      width="300">
    </el-table-column>
    <el-table-column
      prop="name"
      label="收件人"
      width="100">
    </el-table-column>
    <el-table-column
      prop="dianhua"
      label="联系电话"
      width="200">
    </el-table-column>
    <el-table-column
      prop="morendizhi"
      label="默认地址"
      width="100">
    </el-table-column>
    <el-table-column
      label="操作"
      width="330">
      <template slot-scope="scope">
        <el-button type="text" size="14px">修改</el-button>
        |
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="14px">
          删除
        </el-button>
        |
         <el-button type="text" size="14px">设为默认地址</el-button>
        
      </template>
    </el-table-column>
  </el-table>
  <el-row>
  <el-button type="primary" class="annvyangshi1">添加收货地址</el-button>
  </el-row> 
  <!-- 订单信息 -->
  <div class="biaogebianti">确认订单信息</div>
  <el-table
             class="table"
             show-summary
                  :data="tableData1"
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
  <el-row>
  <el-button type="primary" style="margin-left:80%">提交订单</el-button>
  </el-row> 

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
    mounted(){
    },
    methods: {
      
singleElection (row) {
    this.templateSelection = this.tableData.indexOf(row);
    this.templateRadio = row.id;
},
deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      getSummaries(param) {
        const { columns, data } = param;
        var li = 0
        data.forEach((data, index) => {
          li += data.sum
        })
        console.log(li)
        this.li = li+10;
        console.log(li)
        const sums = [];
        return sums;
      }
    },
    data() {
      return {
          templateSelection: '',
        tableData: [{
          name: '李四',
          province: '辽宁',
          address: '甘井子区软件园路1号220',
          dianhua: '13312345678'
        }, {
          name: '李四',
          province: '辽宁——大连——甘井子区',
          address: '甘井子区软件园路1号220',
          dianhua: '13312345678'
        }, {
          name: '李四',
          province: '辽宁',
          address: '甘井子区软件园路1号220',
          dianhua: '13312345678'
        }, {
          name: '李四',
          province: '辽宁',
         
          address: '甘井子区软件园路1号220',
          dianhua: '13312345678'
        }, {
          name: '李四',
          province: '辽宁',
          
          address: '甘井子区软件园路1号220',
          dianhua: '13312345678'
        }, {
          name: '李四',
          province: '辽宁',
         
          address: '甘井子区软件园路1号220',
          dianhua: '13312345678'
        }, {
          name: '李四',
          province: '辽宁',
          address: '甘井子区软件园路1号220',
          dianhua: '13312345678'
        }],
        tableData1: [
            {
          id: '1',
          mingcheng:'女装 军旅式短茄克1  女式XS 黑色',
          imgsrc: require('../../assets/fenlei1.png'),
          amount1: '233',
          amount2: '2',
          amount3:''
        }
        ],
        li: ''
      }
    }
  }
</script>
<style scoped>
.el-main {
    color: #333;
    width: 100%;
    height: 700px;
    margin-top: 5rem;
  }
.buju{
    width: 70%;
    margin-left: 15%;
    height: auto;
}
.biaogebianti{
    width: 100%;
    height: 30px;
    text-align: left;
    font-size: 20px;
    font-weight: 700;
    color: rgb(65, 64, 61);
}
.annvyangshi1{
    margin-top: 30px;
    margin-bottom: 20px;
}
.table /deep/ .el-table__footer-wrapper{
  display: none!important;
}
.yunfei{
    width: 100%;
    height: 30px;
  }
  .yun{
    padding-left: 80%;
  }
  .yun2{
    padding-left: 80%;
  }
</style>