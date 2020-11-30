<template>
    <div class="main">


        <div class="topwrapper">
            <el-steps class="tips" :space="800" align-center :active="tipactive" finish-status="success">
                <el-step title="选择收货地址"></el-step>
                <el-step title="订单确认"></el-step>
                <el-step title="付款"></el-step>
            </el-steps>
        </div>

        <div class="address">
            <div class="header">
                <div class="text">
                    收货信息
                </div>
            </div>
            <div class="address-wrapper">
                <div class="itemwrpper">
                    <div class="address-itme default" @click="changeactive(item.addrId)" v-for="(item,index) in address" :key="index"  :class="adactiveid == item.addrId ? 'active': ''">
                        <div class="default-wrapper">
                            <div class="defaultline">
                                收货人：{{item.addrReceiver}}
                                <span class="confirm el-icon-check" v-if="adactiveid == item.addrId"></span>
                            </div>
                            <div class="defaultline">手机号码：{{item.addrTel}}</div>
                            <div class="defaultline">收货地址: {{item.addrProvince}}省{{item.addrCity}}市{{item.addrArea}}区{{item.addrContent}}</div>
                        </div>
                        <div class="addressbottom">
                            <span @click.stop="editaddress(item.addrId)" class="el-icon-edit-outline fonts"></span>
                            <span @click.stop="deleteaddress(item.addrId)" class="el-icon-delete fonts"></span>
                        </div>
                    </div>
                    <div @click="dialogVisible = true" class="address-itme addnew">
                        <div class="el-icon-circle-plus-outline"></div>
                        <div>添加新地址</div>
                    </div>
                </div>
            </div>
        </div>


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

        <div class="container">
            <div class="header">
                <div class="text">
                    商品清单
                </div>
            </div>
            <div class="item-wrapper">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    class="table"
                    :row-style="{height: '200px'}"
                    >
                    <el-table-column
                        prop="cartId"
                        label="#"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        label="商品图片"
                        width="150"
                        align="center">
                        <template slot-scope="scope">
                            <img slot="reference" class="myimg" :src="scope.row.cartPic">
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="商品名称"
                        width="400">
                         <template slot-scope="scope">
                            <div class="rowname">{{scope.row.cartName}}</div>
                            <span class="rowcolor">{{scope.row.cartColor}}</span>
                            <span>{{scope.row.cartSize}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="价格">
                         <template slot-scope="scope">
                            <div>原价¥ {{scope.row.cartPirce}}</div>
                            <div>现价<span class="pricenow">¥ {{scope.row.cartDiscount}}</span></div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="数量"
                        prop="cartCount"
                        align="center"
                        width="400">
                    </el-table-column>
                    <el-table-column
                        prop="cartTotalprice"
                        label="小计">
                    </el-table-column>
                </el-table>
            </div>
            <div class="cart-bottom">
                <div class="deleteall">
                    
                </div>
                <div class="rightbar">
                    <div class="totalcount">
                        共计 <span>{{this.totalcount}}</span> 件商品
                    </div>
                    <div class="totalcost">
                        <div class="totalwrapper">
                            <div class="justcenter">
                                <div class="allcost">应付总额：<span class="totalfee">¥{{this.totalfee}}</span></div>
                                <div class="totaltip">应付总额不含运费</div>
                            </div>
                        </div>
                    </div>
                    <div class="but">
                        <el-button class="totalbut" @click="tosum" :disabled="totalcount == 0" type="primary">提交订单</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getalltobuy, delteall} from '@/api/tobuy'
import {getalladdress, addaddress, deletead, getadbyuserid, updateadress} from '@/api/address'
import {ordersaveadress} from '@/api/order'
export default {
    data(){
        return {
            tableData: [],
            userId: 0,
            totalcount: 0,
            totalfee: 0,
            address:[],
            adactiveid: 0,
            dialogVisible: false,
            editVisible: false,
            editid: '',
            tipactive: 0,
            tobuyid: [],
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
            }
        }
    },
    methods: {
        onSubmit() {
            this.form.userId = this.userId
            addaddress(this.form).then((res)=>{
                if(res.code == 200) {
                    this.$notify({
                        title: '成功',
                        message: res.data.msg,
                        offset: 100,
                        type: 'success'
                    });
                    this.from = {}
                    this.getalladdress()
                }
            })
            this.dialogVisible = false
        },
        handleClose(done) {
            this.form = {}
            done()
        },
        edithandleClose(done) {
            this.editform = {}
            done()
        },
        getuserid(){
            this.userId = this.$route.params.id
        },
        setactiveid(){
            this.address.forEach((item)=>{
                if(item.addrIsdefault == 1) {
                    this.adactiveid = item.addrId
                } 
            })
        },
        getall() {
            getalltobuy(this.userId).then((res)=>{
                if(res.code == 200) {
                    this.tableData = res.data.list
                    this.totalcount = res.data.list.length
                    this.tableData.forEach((item)=>{
                        this.totalfee += item.cartTotalprice
                        this.tobuyid.push(item.cartId)
                    })
                }
            })
        },
        getalladdress() {
            getalladdress(this.userId).then((res)=>{
                if(res.code == 200) {
                    this.address = res.data.list
                    if(typeof(this.address) !='undefined') {
                        this.setactiveid()
                    }
                }
            })
        },
        changeactive(id) {
            this.adactiveid = id
        },
        deleteaddress(id){
            deletead(id).then((res)=>{
                if(res.code == 200) {
                    this.getalladdress()
                }
            })
        },
        editaddress(id) {
            this.editVisible = true
            this.editid = id
            getadbyuserid(this.userId, id).then((res) => {
                if(res.code == 200) {
                    this.editform = res.data.list
                }
            })
        },
        clearall(){
            delteall(this.userId).then((res) => {

            })
        },
        editsubmit() {
           this.editform.userId = this.userId
           this.editform.addrId = this.editid
           updateadress(this.editform).then((res)=>{
               if(res.code == 200) {
                   this.$notify({
                        title: '成功',
                        message: res.data.msg,
                        offset: 100,
                        type: 'success'
                    });
                   this.getalladdress()
                   this.editVisible = false
               }
           })
        },
        tosum() {
            let data = {
                userId:this.userId,
                addrid: this.adactiveid,
                tobuyid: this.tobuyid
            }
            if(data.addrid == 0) {
                this.$notify({
                    title: '错误',
                    message: '您还没填写收货地址',
                    offset: 100,
                    type: 'error'
                });
            } else {
                ordersaveadress(data).then((res)=>{
                    if(res.code == 200) {
                        this.$router.push({path: `/order/${res.data.id}`})
                    }
                })
            }
            
        }
    },
    created() {
        this.getuserid()
        this.getall()
        this.getalladdress()
    },
    beforeRouteLeave (to, from, next) {
        if(this.totalcount > 0) {
            if(to.name != "order") {
                this.$confirm('离开本页将会取消提交订单，确认离开？')
                    .then(_ => {
                        this.clearall()
                        next()
                    })
                .catch(_ => {});
            } else {
                next()
            }
        } else {
            next()
        }
         
    },
    destroyed() {
        this.clearall()
    }
}
</script>
<style scoped>
.main {
    background:#EDEDED;
    padding-top: 60px;
    min-height: 800px;
    padding-bottom: 60px;
}
.topwrapper {
    width: 70%;
    margin: 0 auto;
    margin-top: 60px;
}
.myimg {
    width: 100%;
    height: 100%;
    vertical-align: middle;
}
.container {
    width: 70%;
    margin: 0 auto;
    margin-top: 60px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
    border: 1px solid #dcdcdc;
    border-color: rgba(0,0,0,.14);
}
.header {
    border-radius:15px 15px 0 0;
    height: 60px;
    position: relative;
    z-index: 10;
    border-bottom: 1px solid #d4d4d4;
    box-shadow: 0 1px 7px rgba(0,0,0,.06)!important;
    background: linear-gradient(#fbfbfb,#ececec);
}
.text {
    margin-left: 30px;
    font-size: 25px;
    line-height: 60px;
    font-family: YouYuan;
    letter-spacing: .1em;
}
.rowcolor {
    margin-right: 20px;
}
.rowname{
    color: #409EFF;
    font-size: 18px;
    margin-bottom: 10px;
}
.pricenow{
    font-size: 20px;
    color: tomato;
}
.cartdelete {
    height: 50px;
    font-size: 23px;
}
.el-icon-delete:hover {
    color:#409EFF;
    cursor: pointer;
}
.cart-bottom {
    height: 100px;
    position: relative;
    z-index: 10;
    background: linear-gradient(#fdfdfd,#f9f9f9);
    box-shadow: 0 -3px 8px rgba(0,0,0,.04);
    display: flex;
    border-radius: 0 0 15px 15px;
    justify-content: space-between;
}
.deleteall {
    height: 100%;
    width: 30%;
    color: #409EFF;
    font-size: 18px;
    line-height: 100px;
    padding-left: 50px;
}
.rightbar {
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: flex-end;
}
.clearall {
    cursor: pointer;
}
.totalcount {
    width: 30%;
    height: 100%;
    line-height: 100px;
    font-size: 20px;
    text-align: center;
}
.totalcost {
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
}
.but {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.totalbut {
    height: 60px;
    width: 150px;
    font-size: 20px;
}
.totalwrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    border-left: 1px solid #e1e1e1;
}
.allcost {
    font-size: 20px;
}
.totalfee {
    color: tomato;
    font-size: 25px;
}
.totaltip {
    margin-top: 5px;
    font-size: 20px;
    color: #959595;
}
.address {
    min-height: 350px;
    width: 70%;
    margin: 0 auto;
    margin-top: 60px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
    border: 1px solid #dcdcdc;
    border-color: rgba(0,0,0,.14);
}
.address-wrapper {
    min-height: 290px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.itemwrpper {
    min-height: 230px;
    width: 95%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    
}
.address-itme {
    height: 230px;
    margin-left: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    width: 23%;
}
.addnew {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fafafa;
    border: 1px solid #e5e5e5;
    cursor: pointer;
}
.addnew:hover {
    background: #f3f3f3;
}
.el-icon-circle-plus-outline {
    font-size: 50px;
    margin-bottom: 10px;
}
.default {
    background: #fafafa;
    border: 1px solid #e5e5e5;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.default:hover{
    background: #f3f3f3;
}
.default:hover .addressbottom {
    opacity: 1;
}
.default-wrapper {
    margin-left: 20px;
    margin-top: 20px;
    margin-right: 20px;
}
.defaultline {
    margin-top: 10px;
    font-size: 18px;
    line-height: 28px;
}
.active {
    border: 1px solid #6a8fe5;
}
.confirm {
    float: right;
    font-size: 25px;
    color: #409EFF;
}
.area {
    width: 200px;
}
.addressbottom {
    display: flex;
    height: 40px;
    opacity: 0;
    align-items: center;
    justify-content: space-around;
}
.fonts {
    font-size: 25px;
    cursor: pointer;
}
.el-icon-edit-outline:hover {
    color: #409EFF;
}
.el-icon-delete:hover {
    color: #409EFF;
}
</style>