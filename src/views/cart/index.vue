<template>
    <div class="main">
        <div class="container">
            <div class="header">
                <div class="text">
                    购物车
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
                        width="50">
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
                        align="center"
                        width="400">
                        <template slot-scope="scope">
                            <el-input-number size="mini" @change="handleChange" :min="1" :max="99" v-model="scope.row.cartCount"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="cartTotalprice"
                        label="小计">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <div @click="deltecart(scope.row.cartId)" class="cartdelete">
                                <i class="el-icon-delete"></i>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="cart-bottom">
                <div class="deleteall">
                    <span class="clearall" @click="clearsall">清空购物车</span>
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
                        <el-button class="totalbut" @click="tosum" :disabled="totalcount == 0" type="primary">现在结算</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {cartgetall, clearall, deletecartbyid} from '@/api/cart'
import {savetobuy} from '@/api/tobuy'
export default {
    data(){
        return {
            tableData: [],
            userId: 0,
            total: 0,
            totalcount: 0,
            totalfee: 0,
        }
    },
    methods: {
        getuserid(){
            this.userId = this.$route.params.id
        },
        getall() {
            cartgetall(this.userId).then((res)=>{
                if(res.code == 200) {
                    this.tableData = res.data.list
                    this.totalcount = res.data.list.length
                    this.changetotalfee()
                }
            })
        },
        changetotal() {
            this.tableData.forEach((item) =>{
                item.cartTotalprice = item.cartCount * item.cartDiscount
            })
        },
        changetotalfee() {
            this.totalfee = 0
            this.tableData.forEach((item) => {
                this.totalfee += item.cartTotalprice
            })
        },
        handleChange() {
            this.changetotal()
            this.changetotalfee()
        },
        clearsall(){
            clearall(this.userId).then((res) => {
                if(res.code == 200) {
                    this.$notify({
                        title: '成功',
                        message: res.data.msg,
                        offset: 100,
                        type: 'success'
                    });
                    this.changetotalfee()
                    this.getall()
                    this.$store.commit('carttrue')
                }
            })
        },
        deltecart(id) {
            deletecartbyid(id).then((res)=>{
                this.$notify({
                    title: '成功',
                    message: res.data.msg,
                    offset: 100,
                    type: 'success'
                });
                this.changetotalfee()
                this.getall()
                this.$store.commit('carttrue')
            })
        },
        tosum() {
            savetobuy(this.tableData).then((res)=>{
                if(res.code == 200) {
                    clearall(this.userId).then((res) => {
                        if(res.code == 200) {
                            this.changetotalfee()
                            this.getall()
                            this.$store.commit('carttrue')
                        }
                    })
                    this.$router.push({path: `/checkout/${this.userId}`})
                }
            })
        }
    },
    created() {
        this.getuserid()
        this.getall()
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
</style>