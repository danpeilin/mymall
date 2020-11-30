<template>
  <div>
      <div class="carousels">
          <el-carousel height="750px" :autoplay="true" :interval="5000">
            <el-carousel-item v-for="(item,index) in backgroundimg" :key="index">
              <img class="lunboimg" :src="item.lunbo"/>
            </el-carousel-item>
          </el-carousel>
      </div>

      

    <div class="fenlei">
      <div class="fenlei-title">
        商品分类
      </div>

      <div class="fenleis animate__animated animate__fadeInUp">
          <div class="fenleidiv" v-for="(item, index) in fenleiimg" :key="index" @click="to_view(item.cateId,'categoods')">
            <div class="fenleipic">
              <img class="myimg" :src="item.catePic"/>
            </div>
            <div class="fenleitext">
              {{item.cateName}}
            </div>
          </div>
      </div>
    </div>

    <div class="newgoods">
      <div class="fenlei-title">
        新到商品
      </div>
      <div class="swiper-button-prev swiper-button-white"></div>
      <swiper :class="show == true ? 'newcomer animate__animated animate__fadeInUp' : 'hide animate__animated animate__backOutRight'"  :options="swiperOption">
        <swiper-slide class="newcome" v-for="(item, index) in newimglist" :key="index" @click.native="to_view(item.goodsId,'goodsdetail')">
          <div class="newimg">
            <img class="myimg" :src="item.goodsPic" />
          </div>
          <div class="newname">
            {{item.goodsName}}
          </div>
          <div class="newprice">
            {{item.goodsPrice}}
          </div>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-next swiper-button-white"></div>
    </div>

    <div class="topbar">
      <div class="fenlei-title">
        官方精选
      </div>
      
      <div class="topbar-body">
        <div class="itembody">
          <div @click="to_view(featured[0].goodsId,'goodsdetail')" :class="twoshow == true ? 'itemone itemmove animate__animated animate__fadeInLeft' : 'twohide animate__animated animate__fadeOutLeft'">
            <div class="leftitem">
              <img class="myimg jinxuan" :src="featured[0].goodsPic"/>
            </div>
            <div class="topbartext">
              {{featured[0].goodsName}}
            </div>
          </div>
        </div>
        <div class="itembody">
          <div @click="to_view(featured[1].goodsId,'goodsdetail')" :class="twoshow == true ? 'itemtwo itemmove animate__animated animate__fadeInDown' : 'twohide animate__animated animate__fadeOutUp'">
            <div class="centeritem">
              <img class="myimg jinxuan" :src="featured[1].goodsPic"/>
            </div>
            <div class="topbartext">
              {{featured[1].goodsName}}
            </div>
          </div>
          <div @click="to_view(featured[2].goodsId,'goodsdetail')" :class="twothree == true ? 'itemthree itemmove animate__animated animate__fadeInUp' : 'twohide animate__animated animate__fadeOutDown'">
            <div class="centeritem-two-center">
              <img class="myimg jinxuan" :src="featured[2].goodsPic"/>
            </div>
            <div class="topbartext">
              {{featured[2].goodsName}}
            </div>
          </div>
        </div>
        <div class="itembody">
          <div @click="to_view(featured[3].goodsId,'goodsdetail')" :class="twoshow == true ? 'itemfour itemmove animate__animated animate__fadeInRight' : 'twohide animate__animated animate__fadeOutRight'">
            <div class="centeritem-two">
              <img class="myimg jinxuan" :src="featured[3].goodsPic"/>
            </div>
            <div class="kongge">
              <div class="topbartext">
                {{featured[3].goodsName}}
              </div>
            </div>
          </div>
          <div @click="to_view(featured[4].goodsId,'goodsdetail')" :class="twothree == true ? 'itemfive itemmove animate__animated animate__fadeInUp' : 'twohide animate__animated animate__fadeOutDown'">
            <div class="centeritem">
              <img class="myimg jinxuan" :src="featured[4].goodsPic"/>
            </div>
            <div class="topbartext">
              {{featured[4].goodsName}}
            </div>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import {getCategory,getNewGoods,getFeatured} from '@/api/home'
export default {
  data() {
      return {
        backgroundimg: [
          {
            lunbo: require('../assets/lunbo1.jpg')
          },
          {
            lunbo: require('../assets/lunbo2.jpg')
          },
          {
            lunbo: require('../assets/lunbo3.jpg')
          }
        ],
        fenleiimg: [],
        newimglist:[],
        featured: [{},{},{},{},{}],
        swiperOption: {//swiper3
          autoplay : 2000,
          slidesPerView : 4,
          speed: 1000,
          spaceBetween : 30,
          loop : true,
          autoplayDisableOnInteraction : false,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
        },
        show:'false',
        twoshow: 'false',
        twothree: 'false',
      }
      
    },
    methods: {
      to_view(id,url){
        this.$router.push({path: `/`+url+`/${id}`})
      },
      get_fenlei(){
        getCategory().then((res) => {
          if(res.code == 200){
            this.fenleiimg = res.data.category;
          }
        });
      },
      get_jingxuan(){
        getFeatured().then((res) => {
          if(res.code == 200){
            this.featured = res.data.featured;
          }
        });
      },
      get_xinpin(){
        getNewGoods().then((res) => {
          if(res.code == 200){
            this.newimglist = res.data.newGoods;
          }
        });
      },
      set_scroll(){
        window.addEventListener('scroll', e => {
        this.scrollY = window.scrollY
          if(this.scrollY > 725) {
            this.show = true
          } else {
            this.show = false
          }
          if (this.scrollY > 1525) {
            this.twoshow = true
          } else {
            this.twoshow = false
          }
          if (this.scrollY > 1830) {
            this.twothree = true
          } else {
            this.twothree = false
          }
        })
      }
    },
    created() {
      this.get_fenlei();
      this.get_xinpin();
      this.get_jingxuan();
      this.set_scroll();
    }
}
</script>
<style scoped>
.lunboimg {
  height: 100%;
  width: 100%;
}
.fenlei {
  height: 800px;
  background: #FAFAFA;
}
.fenlei-title {
  height: 100px;
  font-size: 30px;
  font-family: YouYuan;
  line-height: 100px;
  margin-left: 100px;
}
.fenleis {
  height: 650px;
  width: 1500px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: space-between;
}
.fenleidiv {
  height: 300px;
  width: 340px;
  background: white;
  box-shadow: 0 15px 30px rgba(0,0,0,.1);
  transition: transform .5s linear;
}
.fenleidiv:hover {
  	transform:translateY(-20px);
    transition: transform .5s linear;
}
.myimg {
  width: 100%;
  height: 100%;
}
.fenleipic {
  height: 200px;
  width: 200px;
  margin: 0 auto;
  margin-top: 10px;
}
.fenleitext {
  height: 50px;
  margin-top: 10px;
  line-height: 50px;
  text-align: center;
}
.newgoods {
  height: 500px;
  background:#fff2e8;
}
.newcomer {
  height: 300px;
  width: 80%;
  padding: 20px;
  margin: 0 auto;
  transition: all .5s linear
}
.hide {
  opacity: 0;
  transition: opacity 1s linear;
}
.twohide {
  opacity: 0;
  transition: all .5s linear;
}
.newcome {
  background: white;
  height: 300px;
  box-shadow: 5px 5px 10px rgba(0,0,0,.1);
  transition: transform .5s linear;
}
.newcome:hover {
  transform:translateY(-20px);
  transition: transform .5s linear;
}
.newimg {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  margin-top: 10px;
}
.newname {
  margin-top: 10px;
  text-align: center;
}
.newprice {
  width: 80px;
  margin: 0 auto;
  text-align: center;
  margin-top: 10px;
  border-radius: 15px;
  color: white;
  background: tomato;
}
.swiper-button-next {
  position: relative;
  float: right;
  top: -150px;
  right: 100px;
}
.swiper-button-prev {
  position: relative;
  float:left;
  top: 185px;
  left: 120px;
}
.topbar {
  height: 1100px;
  background: #C0A69A;
}
.topbar-body {
  height: 900px;
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
.itembody {
  width: 30%;
  height: 900px;
}
.itemone {
  height: 680px;
}
.leftitem {
  height: 600px;
  width: 100%;
  overflow: hidden;
}
.itemtwo {
  height: 400px;
  width: 100%;
  overflow: hidden;
}
.itemthree {
  height: 550px;
}
.centeritem {
  height: 300px;
  width: 100%;
  overflow: hidden;
}
.centeritem-two {
  height: 400px;
  width: 100%;
  overflow: hidden;
}
.itemfour {
  height: 500px;
}
.itemfive {
  height: 350px;
}
.centeritem-two-center {
  height: 500px;
  width: 100%;
  overflow: hidden;
}
.topbartext {
  font-size: 25px;
  margin-top: 15px;
  line-height: 20px;
  text-align: center;
  transition: all .5s linear;
}
.jinxuan {
  transition: transform .5s linear;
}
.itemmove:hover .jinxuan{
  transform: scale(1.1);
  transition: transform .5s linear;
  cursor: pointer;
}
.itemmove:hover .topbartext {
  margin-top: 30px;
  transition: all .5s linear;
  cursor: pointer;
}

</style>