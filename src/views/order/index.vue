<template>
    <div class="main">
         <div class="topwrapper">
            <el-steps class="tips" :space="800" align-center :active="tipactive" finish-status="success">
                <el-step title="选择收货地址"></el-step>
                <el-step title="订单确认"></el-step>
                <el-step title="付款"></el-step>
            </el-steps>
        </div>
        <div class="orderinfo">
            <div class="ordernum">
                订单编号：{{order.orderCode}}
            </div>
            <div class="ordertime">
                创建时间：{{order.gmtCreate}}
            </div>
        </div>
        <div class="container">
            <div class="addwrapper">
                <div class="addressinfo">
                收货信息
                </div>
                <div class="info">
                    姓名：{{order.orderName}}
                </div>
                <div class="info">
                    联系电话：{{order.orderTel}}
                </div>
                <div class="info">
                    详细地址：{{order.orderAddress}}
                </div>
            </div>
        </div>
        <div class="goodsinfo">
            <div class="goodsheader">
                <div class="text">
                    商品信息
                </div>
            </div>
            <div class="smalltitle">
                <div class="text ali">
                    单价
                </div>
            </div>
            <div class="smalltitle">
                <div class="text ali">
                    数量
                </div>
            </div>
            <div class="smalltitle">
                <div class="text ali">
                    小计
                </div>
            </div>
        </div>
        <div class="goodswrapper">
            <div class="goodslist" v-for="item in goodslist" :key="item.index">
                <div class="goodsheader list">
                    <div class="listtext">
                        <div class="goodsname">
                            {{item.odetailName}}
                        </div>
                        <span class="size scsize">xl</span><span class="color scsize">{{item.odetailColor}}</span>
                    </div>
                </div>
                <div class="smalltitle list">
                <div class="listali">
                    ¥ {{item.odetailPrice}}
                </div>
                </div>
                <div class="smalltitle list">
                    <div class="listali">
                        {{item.odetailNum}}
                    </div>
                </div>
                <div class="smalltitle list">
                    <div class="listali">
                       ¥ {{item.odetailTotalprice}}
                    </div>
                </div>
            </div>
        </div>
        <div class="totaldiv">
            <div class="totalright">
                <div class="totalfee">
                    <div class="totalfee-text">
                        商品总计：
                    </div>
                    <div class="totalfee-number">
                        ¥ {{totalprice}}
                    </div>
                </div>
            </div>
        </div>
        <div class="totaldiv tobut">
            <div class="butdiv">
                <el-button type="primary but">付款</el-button>
            </div>
        </div>

    </div>
</template>
<script>
import {getallorder} from '@/api/order'
export default {
    data(){
        return {
            tipactive: 1,
            orderid: 0,
            order: {},
            goodslist:[],
            totalprice: 0,
        }
    },
    methods: {
        getorderid(){
            this.orderid = this.$route.params.id
        },
        getallorders(){
            getallorder(this.orderid).then((res)=>{
                this.order = res.data.order
                var dateee = new Date(this.order.gmtCreate).toJSON();
                var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                this.order.gmtCreate = date
                this.goodslist = res.data.list
                this.goodslist.forEach((item)=>{
                    this.totalprice += item.odetailTotalprice
                })
            })
        },

    },
    created(){
        this.getorderid()
        this.getallorders()
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
    margin-bottom: 60px;
}
.myimg {
    width: 100%;
    height: 100%;
    vertical-align: middle;
}
.container {
    width: 70%;
    margin: 0 auto;
    border-top: 1px solid #d5d5d5;
    padding-left: 50px;
    padding-top: 20px;
    padding-bottom: 20px;
}
.addressinfo {
    width: 50%;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 15px;
}
.info {
    margin-top: 5px;
}
.goodsinfo {
    width: 70%;
    margin: 0 auto;
    border-top: 1px solid #d5d5d5;
    padding-left: 50px;
    display: flex;
}
.goodsheader {
    width: 55%;
    height: 60px;
}
.smalltitle {
    width: 15%;
    height: 60px;
}
.text {
    font-weight: 700;
    line-height: 60px;
    font-size: 18px;
}
.ali {
    text-align: center;
}
.goodswrapper {
    width: 70%;
    margin: 0 auto;
    border-top: 1px solid #d5d5d5;
    padding-left: 50px;
}
.goodslist {
    height: 100px;
    display: flex;
}
.list {
    height: 100px;
}
.listali {
    line-height: 100px;
    text-align: center;
    font-weight: 700;
    color: #626262;
}
.goodsname {
    margin-top: 20px;
    font-size: 18px;
    margin-bottom: 15px;
}
.scsize {
    font-size: 15px;
}
.color {
    margin-left: 20px;
}
.totaldiv {
    height: 100px;
    width: 70%;
    margin: 0 auto;
    border-top: 1px solid #d5d5d5;
}
.totalright {
    float: right;
    margin-right: 50px;
    width: 20%;
    height: 100%;
}
.totalfee {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
}
.totalfee-text {
    font-size: 18px;
    font-weight: 700;
    color: #666;
}
.totalfee-number {
    font-size: 18px;
    color: #666;
    margin-left: 30px;
    font-weight: 700;
}
.orderinfo {
    height: 40px;
    width: 70%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}
.ordernum {
    height: 100%;
    line-height: 40px;
}
.ordertime {
    height: 100%;
    line-height: 40px;
}
.tobut {
    border: none;
    display: flex;
    justify-content: flex-end;
}
.butdiv {
    height: 100%;
    width: 10%;
    line-height: 100px;
}
.but {
    height: 60px;
    width: 150px;
    font-size: 20px;
}
</style>