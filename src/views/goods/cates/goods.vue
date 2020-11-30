<template>
    <div class="main">
        <span class="sort-button">
            <el-button @click="onSort" :icon="sorticon">排序</el-button>
        </span>
        <div class="wrapper">
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
import {getall} from '@/api/goods'
export default {
    data(){
        return {
            sorticon: 'el-icon-caret-top',
            sort: 'asc',
            currentPage: 0,
            pageSize: 10,
            total: 0,
            cateId: '',
            goods:[]
        }
    },
    methods:{
        onSort() {
            if (this.sorticon == 'el-icon-caret-bottom') {
            this.sorticon = 'el-icon-caret-top'
            this.sort = "asc";
            } else {
            this.sorticon = 'el-icon-caret-bottom'
            this.sort = "desc";
            }
            this.getall(this.currentPage, this.pageSize, this.cateId);
        },
        uptop() {
            window.scrollTo(0,0);
        },
        getall(currentPage, pageSize, cateId){
            var sortAsc = this.sort;
            getall(currentPage, pageSize, cateId, sortAsc).then((res)=>{
                if(res.code == 200) {
                    this.goods = res.data.list
                    this.total = res.data.total
                }
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getall(this.currentPage, this.pageSize, this.cateId)
        },
        getid(){
            this.cateId = this.$route.params.id
        },
        todetail(id){
            this.$router.push({path: `/goodsdetail/${id}`})
        }
    },
    beforeRouteUpdate (to, from, next) {
            this.cateId = to.params.id
            this.getall(this.currentPage, this.pageSize, this.cateId)
            next()
    },
    created() {
        this.getid()
        this.uptop()
        this.getall(this.currentPage, this.pageSize, this.cateId)
    }
}
</script>
<style scoped>
.main {
    height: 1000px;
    display: flex;
    flex-direction: column;
}
.myimg {
    width: 100%;
    height: 100%;
    vertical-align: middle;
}
.wrapper {
    padding-left: 100px;
    padding-right: 100px;
    height: 800px;
}
.sort-button{
    margin-right: 135px;
    margin-bottom: 40px;
    align-self: flex-end;
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