<template>
<div style="height:35vw">
    <span class="span">请选择付款方式：</span>
    <el-button @click="payment">去网银付款</el-button>
    <el-button @click="back">返回订单列表</el-button>
</div>
</template>

<script>
export default {
data(){
return {};
},
methods: {
    payment(){
        this.$router.push({path: '/pay'})
    },
    back(){
        this.$router.push({path: '/quanbu'})
    }
},
};
</script>
<style scoped>
.span{
    font-family: '微雅软黑';
    font-weight: 600;
    font-size: 20px;
    position: absolute;
    top:5vw;
    left: 1vw;
}

.el-button{
    background-color: rgb(92, 173, 206);
    color: white;
    position: relative;
    top: 6.5vw;
    left: 10vw;
}
</style>