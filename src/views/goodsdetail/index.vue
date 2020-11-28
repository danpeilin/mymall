<template>
    <div class="main">
        <div class="contanier">
            <div class="goodsdetail">
                <div class="gallery">
                    <div class="smallpic">
                        <div v-for="(item, index) in smallpics" :key="index" :class="activeid == index ? 'picactive': ''" @click="togglepic(index, item.picUrl)" class="smallpic-item">
                            <div class="imgstyle">
                                <img class="myimg" :src="item.picUrl">
                            </div>
                        </div>
                    </div>
                    <div class="bigpic">
                        <div class="bigpic-item">
                            <img class="myimg" :src="activesrc">
                        </div>
                    </div>
                </div>
                <div class="select">
                    <div class="select-wrapper">
                        <div class="select-title">
                            {{this.goods.goodsName}}
                        </div>
                        <div class="postfee">
                            原价：¥ {{this.goods.goodsPrice}} 现售：<span class="pricenow">¥ {{this.goods.goodsDiscount}}</span>
                        </div>
                        <div class="postfee">
                            运费：¥{{this.goods.goodsPostalfee}}
                        </div>
                        <div class="postfee">
                            共售出{{this.goods.goodsSales}}件
                        </div>
                        <div class="postfee">
                            尺寸选择：
                        </div>
                        <el-select v-model="sizeId" placeholder="请选择">
                            <el-option
                            v-for="item in sizes"
                            :key="item.sizeId"
                            :label="item.sizeName"
                            :value="item.sizeId">
                            </el-option>
                        </el-select>
                        <div class="postfee">
                            颜色选择：
                        </div>
                        <el-select v-model="colorId" placeholder="请选择">
                            <el-option
                            v-for="item in colors"
                            :key="item.colorId"
                            :label="item.colorName"
                            :value="item.colorId">
                            </el-option>
                        </el-select>
                        <div class="postfee">
                            数量：<el-input-number size="mini" v-model="num" :min="1" :max="99" label="描述文字"></el-input-number>
                        </div>
                        <div class="postfee">
                            产地：{{this.goods.goodsOrigin}}
                        </div>
                        <div class="postfee">
                            材质：{{this.goods.goodsMaterial}}
                        </div>
                        <div class="but">
                            <el-button class="buttons" @click=addcart() type="primary">加入购物车</el-button>
                            <el-button class="buttons" @click="tobuy()">立即购买</el-button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="goodspics">
                <div class="goodspics-header">
                    产品信息
                </div>
                <div class="goodsdescrip">
                    {{this.goods.goodsDisc}}
                </div>
                <div class="pics">
                    <div class="center">
                        <img class="myimg" :src="this.goods.goodsPic" alt="">
                    </div>
                </div>
                <div class="pics" v-for="(item, index) in allpics" :key="index">
                    <div class="center">
                        <img class="myimg" :src="item.picUrl" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getgoodsbyid} from '@/api/goods'
import {getallcolor} from '@/api/color'
import {getallsize} from '@/api/size'
import {getsmallpic, getallpic} from '@/api/pic'
import {addcart} from '@/api/cart'
export default {
     data () {
      return {
        colorId: '',
        sizeId:'',
        num: 1,
        goodsId: '',
        goods: {},
        colors:[],
        sizes:[],
        smallpics:[],
        allpics: [],
        activeid:0,
        activesrc: '',
        userId: ''
      };
    },
    methods: {
        getindex(){
            this.goodsId = this.$route.params.id
        },
        getgoods(){
            getgoodsbyid(this.goodsId).then((res)=>{
                if(res.code == 200) {
                    this.goods = res.data.list
                }
            })
        },
        getcolors(){
            getallcolor().then((res)=>{
                this.colors = res.data.colorlist
            })
        },
        getsize(){
            getallsize().then((res)=>{
                this.sizes = res.data.sizelist
            })
        },
        getfivepic(id) {
            getsmallpic(id).then((res)=>{
                this.smallpics = res.data.piclist
                this.activesrc = res.data.piclist[0].picUrl
            })
        },
        togglepic(index, src){
            this.activeid = index
            console.log(src)
            this.activesrc = src
        },
        getallpics(id){
            getallpic(id).then((res)=>{
                this.allpics = res.data.list
            })
        },
        tobuy() {
            this.getuserinfo()
            if(this.userId == '') {
                this.$notify.info({
                    title: '消息',
                    message: '你尚未登录请先登录!'
                });
            }
        },
        addcart(){
            this.getuserinfo()
            if(this.userId == '') {
                this.$notify.info({
                    title: '消息',
                    offset: 100,
                    message: '你尚未登录请先登录!'
                });
            }else if (this.sizeId == '' || this.colorId == ''){
               this.$notify({
                    title: '提示',
                    message: '您还未选择颜色或尺寸',
                    offset: 100,
                    type: 'warning'
                });
            } else {
                addcart(this.userId, this.goodsId, this.sizeId, this.colorId, this.num).then((res)=>{
                    if (res.code == 200) {
                        this.$notify({
                            title: '成功',
                            message: res.data.msg,
                            offset: 100,
                            type: 'success'
                        });
                        this.$store.commit('carttrue')
                    } else {
                        this.$notify({
                            title: '提示',
                            message: res.data.msg,
                            offset: 100
                        });
                    }
                })
            }
        },
        getuserinfo(){
            var userinfo = localStorage.getItem('userinfo')
            if(userinfo != null) {
                var user = JSON.parse(userinfo)
                this.userId = user.userId
            } else{
                this.userId = ''
            }
        }
    },
    created(){
        this.getindex()
        this.getgoods()
        this.getcolors()
        this.getsize()
        this.getfivepic(this.goodsId)
        this.getallpics(this.goodsId)
        this.getuserinfo()
    }
}
</script>
<style scoped>
.main {
    padding-top: 60px;
    padding-bottom: 100px;
    background: #EDEDED;
}
.contanier {
    width: 70%;
    margin: 0 auto;
}
.goodsdetail {
    background: white;
    box-shadow: 3px 3px 30px 1px #cccccc;
    margin-top: 50px;
    height: 600px;
    border-radius: 10px;
    display: flex;
}
.gallery {
    height: 100%;
    width: 50%;
    display: flex;
}
.select {
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.smallpic {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.bigpic {
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.smallpic-item {
    border: 1px solid rgba(0,0,0,.06);
    width: 100px;
    height: 100px;
    margin-top: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.imgstyle {
    width: 80%;
    height: 80%;
}
.myimg {
    width: 100%;
    height: 100%;
    vertical-align: middle;
}
.bigpic-item {
    width: 90%;
    height: 90%;
}
.select-wrapper {
    height: 90%;
    width: 90%;
}
.select-title{
    font-size: 30px;
    font-family: PingFang SC,Helvetica Neue,Helvetica,Arial,Hiragino Sans GB,Microsoft Yahei,\\5FAE\8F6F\96C5\9ED1,STHeiti,\\534E\6587\7EC6\9ED1,sans-serif;
}
.pricenow {
    font-size: 30px;
    color: tomato;
}
.postfee {
    margin-top: 14px;
    font-size: 20px;
}
.but {
    margin-top: 20px;
}
.buttons {
    height: 50px;
    width: 200px;
    font-size: 20px;
}
.goodspics {
    box-shadow: 3px 3px 30px 1px #cccccc;
    margin-top: 50px;
    border-radius: 10px;
    width: 100%;
    background: white;
    padding-bottom: 20px;
}
.goodspics-header{
    border-radius: 10px 10px 0 0;
    height: 60px;
    line-height: 60px;
    font-size: 23px;
    letter-spacing: .1em;
    padding-left: 20px;
    background: linear-gradient(#fbfbfb,#ececec);
    border-bottom: 1px solid #cccccc;
}
.pics {
    height: 500px;
}
.goodsdescrip {
    width: 90%;
    margin: 30px auto;
    font-family: YouYuan;
    font-size: 25px;
}
.picactive {
    border: 4px solid rgba(0,0,0,.2);
}
.center {
    width: 40%;
    height: 100%;
    margin: 0 auto;
}
</style>