<template>
    <div class="main">
        <div class="wrapper">
            <h1 class="goods_title">新到商品</h1>
            <div class="goodsdiv">
                <div class="goods" v-for="item in goods" :key="item.goodsId" @click="todetail(item.goodsId)">
                    <div class="goodsimg">
                        <img class="myimg" :src="item.goodsPic" alt="">
                    </div>
                    <div class="goodstitle">
                        {{item.goodsName}}
                    </div>
                    <div class="price">
                        原价 ¥{{item.goodsPrice}}
                    </div>
                    <div class="disprice">
                        现售 <span class="discss">¥{{item.goodsDiscount}}</span>
                    </div>
                    <div class="xiaoliang">
                        共售出{{item.goodsSales}}件
                    </div>
                </div>
            </div>
        </div>

        <div class="block">
            <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
import {getNewGoods} from '@/api/newGoods'
export default {
    data(){
        return {
            currentPage: 0,
            pageSize: 10,
            total: 0,
            cateId: '',
            goods:[]
        }
    },
    methods:{
        uptop() {
            window.scrollTo(0,0);
        },
        getall(currentPage, pageSize){
            getNewGoods(currentPage, pageSize).then((res)=>{
                if(res.code == 200) {
                    this.goods = res.data.data
                    this.total = res.data.total
                }
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getall(this.currentPage, this.pageSize)
        },
        todetail(id){
            this.$router.push({path: `/goodsdetail/${id}`})
        }
    },
    beforeRouteUpdate (to, from, next) {
            this.cateId = to.params.id
            this.getall(this.currentPage, this.pageSize)
            next()
    },
    created() {
        this.uptop()
        this.getall(this.currentPage, this.pageSize)
    }
}
</script>
<style scoped>
.main {
    display: flex;
    flex-direction: column;
}
.myimg {
    width: 100%;
    height: 100%;
    vertical-align: middle;
}
.goods_title{
    font-family: 'youyuan';
    height: 50px;
}
.wrapper {
    margin-top: 100px;
    padding-left: 240px;
    padding-right: 240px;
    height: 880px;
}
.goodsdiv {
    width: 100%;
    height: 800px;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
}
.goods {
    margin-left: 25px;
    width: 300px;
    height: 350px;
    box-shadow: 0 15px 30px rgba(0,0,0,.1);
    transition: transform .5s linear;
}
.goods:hover {
    transform:translateY(-20px);
    transition: transform .5s linear;
}
.goodsimg {
    height: 200px;
    width: 200px;
    margin: 0 auto;
    margin-top: 10px;
}
.goodstitle {
    font-weight: 700;
    font-family: YouYuan;
    margin-top: 10px;
}
.price {
    margin-top: 10px;
    font-family: YouYuan;
}
.discss {
    font-size: 25px;
    font-family: 700;
    color: tomato;
}
.xiaoliang {
    margin-top: 10px;
    font-family: YouYuan;
}
.block {
    margin-top: 30px;
    text-align: center;
    height: 100px;
}
</style>