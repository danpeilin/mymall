<template>
    <div class="main">

        <div class="address">
            <div class="header">
                <div class="text">
                    收货信息
                </div>
            </div>
            <div class="address-wrapper">
                <div class="itemwrpper">
                    <div class="address-itme default" v-for="(item,index) in address" :key="index">
                        <div class="default-wrapper">
                            <div class="defaultline">收货人：{{item.addrReceiver}}</div>
                            <div class="defaultline">手机号码：{{item.addrTel}}</div>
                            <div class="defaultline">收货地址: {{item.addrProvince}}省{{item.addrCity}}市{{item.addrArea}}区{{item.addrContent}}</div>
                        </div>
                    </div>
                    <div class="address-itme addnew">
                        <div class="el-icon-circle-plus-outline"></div>
                        <div>添加新地址</div>
                    </div>
                </div>
            </div>
        </div>

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
import {getalltobuy} from '@/api/tobuy'
import {getalladdress} from '@/api/address'
export default {
    data(){
        return {
            tableData: [],
            userId: 0,
            totalcount: 0,
            totalfee: 0,
            address:[],
            adactiveid: 0,
        }
    },
    methods: {
        getuserid(){
            this.userId = this.$route.params.id
        },
        setactiveid(){
            this.address.forEach((item)=>{
                console.log(item)
                if(item.addrIsdefault == 1) {
                    this.adactiveid = item.addrId
                    console.log(this.adactiveid)
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
                    })
                }
            })
        },
        getalladdress() {
            getalladdress(this.userId).then((res)=>{
                if(res.code == 200) {
                    this.address = res.data.lists
                    
                }
            })
        },
        tosum() {
            
        }
    },
    created() {
        this.getuserid()
        this.getall()
        this.getalladdress()
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
}
.default:hover{
    background: #f3f3f3;
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
</style>