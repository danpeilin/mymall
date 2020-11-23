<template>
    <div>
        <el-row>
  <el-button type="primary" class="annvyangshi1" @click="dialogVisible = true">
    添加收货地址
  </el-button>
  </el-row>
       <el-table
    :data="tableData"
    style="width: 100%"
    max-height="450">
    <el-table-column label="#" prop="xulie" width="55">
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
      width="100"
      >
      <div slot-scope="scope">
          <span v-if="scope.row.xulie == xuanzhong">默认</span>
      </div>
    </el-table-column>
    <el-table-column
      label="操作"
      width="330">
      <template slot-scope="scope">
        <el-button type="text" size="14px" @click="dialogVisible1 = true">修改</el-button>
        |
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="14px">
          删除
        </el-button>
        |
        <el-button type="text" size="14px" @click="moren(scope.row.xulie)">
           设为默认地址
        </el-button>
        
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加收货地址对话框 -->
  <el-dialog
  title="添加收货地址"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-form ref="form" :model="form" label-width="80px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="省" prop="sheng">
            <el-input v-model="form.sheng"  placeholder="省"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
       <el-form-item label="市" prop="shi">
            <el-input v-model="form.shi" placeholder="市"></el-input>
        </el-form-item>
      </el-col>
    </el-row> 
     <el-row>
      <el-col :span="12">
        <el-form-item label="区" prop="qu">
            <el-input v-model="form.qu" placeholder="区"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
       <el-form-item label="街道" prop="jiedao">
            <el-input v-model="form.jiedao" placeholder="街道"></el-input>
        </el-form-item>
      </el-col>
    </el-row> 
    <el-row>
      <el-col :span="12">
        <el-form-item label="收件人" prop="shoujianren">
            <el-input v-model="form.shoujianren" placeholder="收件人"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
       <el-form-item label="联系电话" prop="lianxidianhua">
            <el-input v-model="form.lianxidianhua" placeholder="联系电话"></el-input>
        </el-form-item>
      </el-col>
    </el-row> 

  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    <el-button @click="dialogVisible = false">关闭窗口</el-button>
    
  </span>
</el-dialog>
<!-- 修改收货地址对话框 -->
<el-dialog
  title="修改收货地址"
  :visible.sync="dialogVisible1"
  width="30%"
  :before-close="handleClose">
  <el-form ref="form" :model="form" label-width="80px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="省" prop="sheng">
            <el-input v-model="form.sheng"  placeholder="省"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
       <el-form-item label="市" prop="shi">
            <el-input v-model="form.shi" placeholder="市"></el-input>
        </el-form-item>
      </el-col>
    </el-row> 
     <el-row>
      <el-col :span="12">
        <el-form-item label="区" prop="qu">
            <el-input v-model="form.qu" placeholder="区"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
       <el-form-item label="街道" prop="jiedao">
            <el-input v-model="form.jiedao" placeholder="街道"></el-input>
        </el-form-item>
      </el-col>
    </el-row> 
    <el-row>
      <el-col :span="12">
        <el-form-item label="收件人" prop="shoujianren">
            <el-input v-model="form.shoujianren" placeholder="收件人"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
       <el-form-item label="联系电话" prop="lianxidianhua">
            <el-input v-model="form.lianxidianhua" placeholder="联系电话"></el-input>
        </el-form-item>
      </el-col>
    </el-row> 

  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
    <el-button @click="dialogVisible1 = false">关闭窗口</el-button>
    
  </span>
</el-dialog>


    </div>
</template>
<style scoped>

</style>
<script>
export default {
    data(){
        return{
          xuanzhong:"",
          morendizhi:"默认地址",
           dialogVisible: false,
           dialogVisible1: false,
           form:{
             sheng:'',
             shi:'',
             qu:'',
             jiedao:'',
             shoujianren:'',
             lianxidianhua:'',
           },
            tableData: [{
            xulie:'1',
          name: '李四',
          province: '辽宁',
          address: '甘井子区软件园路1号220',
          dianhua: '13312345678'
        }, {
            xulie:'2',
          name: '李四',
          province: '辽宁——大连——甘井子区',
          address: '甘井子区软件园路1号220',
          dianhua: '13312345678'
        }, {
            xulie:'3',
          name: '李四',
          province: '辽宁',
          address: '甘井子区软件园路1号220',
          dianhua: '13312345678'
        }, {
            xulie:'4',
          name: '李四',
          province: '辽宁',
         
          address: '甘井子区软件园路1号220',
          dianhua: '13312345678'
        }, {
            xulie:'5',
          name: '李四',
          province: '辽宁',
          
          address: '甘井子区软件园路1号220',
          dianhua: '13312345678'
        }, {
            xulie:'6',
          name: '李四',
          province: '辽宁',
         
          address: '甘井子区软件园路1号220',
          dianhua: '13312345678'
        }, {
            xulie:'7',
          name: '李四',
          province: '辽宁',
          address: '甘井子区软件园路1号220',
          dianhua: '13312345678'
        }]
        }

    }
    ,
    methods:{
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      moren(xulie){
        this.xuanzhong = xulie
      }
    }
}
</script>