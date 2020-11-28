<template>
    <div class="main">
        <div class="leftbar">
                    <el-row >
                        <el-col class="cebian" :span="12">
                            <el-menu
                            :default-active="avtiveindex"
                            class="el-menu-vertical-demo">
                                <el-menu-item v-for="(item, index) in cates" :key="index" @click.native="toindex(item.cateId)" :index="item.cateId.toString()">
                                    <span slot="title" class="texts">{{item.cateName}}</span>
                                </el-menu-item>
                            </el-menu>
                        </el-col>
                    </el-row>
        </div>
        <div class="rightbar">
             <router-view></router-view>
        </div>
               
    </div>
</template>

<script>
import {getallcate} from '@/api/cate'
export default {
    data(){
        return {
            cates:[],
            avtiveindex: '',
        }
    },
    methods: {
        getallates(){
            getallcate().then((res)=>{
                if(res.code == 200){
                    this.cates = res.data.cates
                }
            })
        },
        getindex() {
            
            this.avtiveindex = this.$route.params.id
        },
        toindex(id) {
            this.$router.push({path: `/categoods/${id}`})
        },
        
    },
    beforeRouteUpdate (to, from, next) {
            this.avtiveindex = to.params.id
            next()
        },
    created(){
        this.getallates()
        this.getindex()
    }
}
</script>
<style scoped>
.el-menu-vertical-demo{
    height: 1000px;
}
.main{
    padding-top: 60px;
    display: flex;
}
.cebian {
    width: 100%;
}
.texts {
    margin-left: 20px;
}
.leftbar {
    width: 12%;
}
.rightbar {
    width: 88%;
}
</style>