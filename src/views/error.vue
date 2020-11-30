<template>
    <div class="main">
        <div class="top">
            <h1 class="title animate__animated animate__fadeInUp" >404</h1>
            <h3 class="text animate__animated animate__fadeInUp">早就告诉过你不要离飞船太远</h3>
            <div class="wrapper">
                <div class="pic">
                    <img class="myimg" src="@/assets/man.png"/>
                </div>
            </div>
        </div>
        <div class="bottom">
            <img class="myimg" src="@/assets/earth.png">
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.main {
    padding-top: 60px;
    height: 1000px;
    background: white;
}
.myimg {
    height: 100%;
    width: 100%;
    vertical-align: middle;
}
.top {
    height: 650px;
    background: black;
    border: 1px solid black;
}
.title {
    margin: 0;
    margin-top: 100px;
    font-size: 150px;
    color: white;
    text-align: center;
}
.text {
    margin: 0;
    font-size: 30px;
    color: white;
    text-align: center;
}
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 280px;
}
.pic {
    width: 200px;
    height: 200px;
    animation: myfirst 3s linear infinite;
}
.bottom {
    height: 350px;
}

@keyframes myfirst
{
0%   {margin-top: 0px;}
25%  {margin-top: 35px;}
50%  {margin-top: 0px;}
75%  {margin-top: -35px;}
100% {margin-top: 0px;}
}
</style>