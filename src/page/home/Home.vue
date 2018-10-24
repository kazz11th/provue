<template>
        <div class="home">
            <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide"><img src="/static/images/banner01.jpg"></div>
              <div class="swiper-slide"><img src="/static/images/banner02.jpg"></div>
              <div class="swiper-slide"><img src="/static/images/banner03.jpg"></div>
              <div class="swiper-slide"><img src="/static/images/banner04.jpg"></div>
            </div>
            <div class="swiper-pagination"></div>
         </div>

           <!-- 热门推荐 -->
           <div class="clssTitle"><i class="iconfont">&#xe6a6;</i><h3>热门推荐</h3></div>
             <div class=" plantContent layui-container">
               <ul>
                    <div class="layui-row">
                 <li v-for="(plant,index) in plantInfo"  :key="plant.id" @click="plantData(index)" v-if="index>=7&&index<=11">
                
                     <div class="layui-col-xs12">
                  <img :src="plant.images" class="plantImg">
                  <div class="shade">
                    <p class="plantTitle">{{plant.title}}</p>
                    <p class="plantClass">#{{plant.class}}</p>
                  </div>
                     </div>
                 </li>
                 </div>
               </ul>
             </div>
          </div>
</template>

<script>
import "layui-css";
import 'swiper-css';
import Swiper from 'swiper-js';
export default {
  name: 'home',
  data(){
    return{
     plantInfo:"",
    }
  },
     mounted(){
            var swiper = new Swiper('.swiper-container', {
        // 图片间隙
      spaceBetween: 30,
      centeredSlides: true,
    //   播放速度
      autoplay: {
        delay: 2500,
        // 
        disableOnInteraction: false,
      },
    //   
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    //   左右点击
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    },
    created() {
        axios.get('http://localhost:8080/static/plant.json').then((resp) => {
      
            this.plantInfo= resp.data;
                console.log(this.plantInfo )
        });
    },
    methods:{
      plantData(index){
         this.$emit('getIndex',this.plantInfo[index]);
            this.$router.push({name: "PlantInfo"})
      }
    }
}
</script>
<style scoped lang="scss">
  //  @import './style/home.css';
html, body {
      position: relative;
      height: 100%;
      font-size: 16px;
    }
    body {
      background: #eee;
      font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      // font-size: 0.7rem;
      color:#000;
      margin: 0;
      padding: 0;
    }
    .swiper-container {
      width: 100%;
      height: auto;
      img{
         width: 100%;
         height: auto;
      }

    }
    .swiper-slide {
      text-align: center;
      font-size: 1.2rem;
      background: #fff;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
    .clssTitle{
      font-family: "san-serif";
      padding-top:20px; 
      i{
        color: pink;
      }
      h3{
        display: inline-block;
        padding-left: 8px;
        font-size: 1.3rem;
      }
    }
       img{
        width: 100%;
      }
      .layui-col-xs6{
        padding-left: 5px;
      }
    .layui-container{
      padding-top: 20px;
    }
    .plantContent{
      position: relative;
    .layui-row{
      .layui-col-xs12{
        margin-top: 20px;
        .shade{
          width: 100%;
          height: 65px;
          background-color: white;
          position: absolute;
          bottom: 0px;
        }
      }
    }
    .plantTitle{
      // display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 50%;
    padding-left: 25%;
      font-size:1.2rem;
      padding-top:10px;
      color:#333;
    }
    .plantClass{
      // text-align: left;
      // padding-left: 5px;
      color:#808080;
    }
    }
</style>