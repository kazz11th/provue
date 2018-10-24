<template>
    <div class="PlantInfo">
           <div class="swiper-container">
            <div class="swiper-wrapper">
                <p v-show="ShowState" ref="id">{{plant.id}}</p>
              <div class="swiper-slide" v-for="(item) in plant.img" :key="item.id">  <img  :src="item.img" alt="" ></div>
            </div>
            <!-- <div class="swiper-pagination"></div> -->
         </div>
       
        <p class="price">{{plant.price | currency}}</p>
        <h3 class="plantitle">{{plant.title}}</h3>
         <p class="layui-row"><span class="layui-col-xs5">库存{{plant.num}}</span><span class="layui-col-xs6">销量{{plant.sales}}</span></p>
        <!-- <img v-for="(item) in plant.img" :key="item.id" :src="item.img" alt="" > -->
       
        <div>
             <p class="layui-row"><span class="layui-col-xs2">促销</span><span v-html="plant.favourable" class="layui-col-xs10"></span></p>
             <p class="layui-row"><span class="layui-col-xs2">颜色</span><span class="layui-col-xs10">{{plant.color}}</span></p>
             <p class="layui-row"><span class="layui-col-xs2">规格</span><span class="layui-col-xs10">{{plant.flowerpot}}</span></p>
             <p class="layui-row"><span class="layui-col-xs2">分类</span><span class="layui-col-xs10">{{plant.class}}</span></p>
            
        </div>
        <!-- 加入购物车和立即购买 -->
        <div class="shop layui-row">
            <div class="layui-col-xs6">
         <button @click="ShowState=true">加入购物车</button></div>
         <div class="layui-col-xs6">
         <button>立即购买</button></div>
         <div class="model" v-show="ShowState">
             <div class="shopImg layui-row"> <img :src="plant.images" class="images layui-col-xs6"><span class="shopCon"><p class="price">{{plant.price | currency}}</p><p>库存{{plant.num}}件</p></span><span class="exit" @click="exit">&times;</span>
             </div>
             <div class="colorClass"><h3 class="plantitle">颜色分类</h3>
              <p>{{plant.color}}</p>
              <hr>
             </div>
             <div class="colorClass"><h3 class="plantitle">规格</h3>
              <p>{{plant.flowerpot}}</p>
              <hr>
             </div>
              <div class="colorClass"><h3 class="plantitle">数量</h3>
              <div class="num layui-row"><span class=" layui-col-xs4">购买数量</span><div class="count layui-col-xs8"><input type="button" value="-" class="button" @click="reduce"><input class="text" v-model="numVal"><input type="button" value="+" class="button" @click="add"></div></div>
              <hr>
             </div>
             <input @click="confirm" class="confirm" value="确认">
         </div>
        </div>
    </div>
</template>

<script>
import "layui-css";
import 'swiper-css';
import Swiper from 'swiper-js';
export default {
      name: 'PlantInfo',
      props:["plant"],
    data(){
        return {
            index:0,
            ShowState:false,
            numVal:1,
            id:[]
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
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //   },
    //   左右点击
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    },
    methods:{
        showclass (val){
            this.index=val;
        },
        exit(){
               this.ShowState=false;
        },
        add(){  
             this.numVal++  
        },  
        reduce(){  
          this.numVal--  
          if(this.numVal<=1)
          {
              this.numVal=1;
          }
     }, 
     confirm(){
    //   let id =[];
      this.id.push(this.$refs.id.innerText);
      let plantNum = this.numVal;
       let storage=window.localStorage;
        storage.setItem('id',this.id)
        console.log(this.id)
        storage.setItem('plantNum',plantNum)
        this.ShowState = false;

     }
    },
    // 货币符号
filters: {
    currency(value){
       value=parseInt(value);
    //    console.log(typeof value)
    if(typeof value === 'number') {
        value = '￥' + parseFloat(value.toFixed(2)).toLocaleString();
        // 如果有小数
        if(value.lastIndexOf('\.') !== -1) {
            // 获取小数位
            const decimalLength = value.slice(value.lastIndexOf('\.') + 1).length;
            // 只有有一位小数
            if(decimalLength === 1) {
                value += "0"
            }
        }
        // 如果没有小数
		else {
            value += ".00"
        }
    }
    return value;
}
}
    
}

</script>

<style lang="scss" scoped>
html,body{
    font-size: 16px;
    height: 100%;
}
    div{
        img{
            cursor: pointer;
            width:100%;
            margin-left: 6px;
            user-select: none;
            &.active{
                box-shadow: 0 0 0 2px white,0 0 0 4px #ddd;
                border-radius: 50%;
            }
        }
        .images{
            width:100px;
            height:100px;
            position: absolute;
            top:-10px;
            left:0px;
        }
        .shopCon{
             position: absolute;
            top:0px;
            left:120px;
        }
        .price{
            color: orangered;
            font-size: 1.3rem;
        }
        .plantitle{
            font-size: 1.1rem;
            text-align: left;
            padding-left:10px;
            margin-top: 10px;
            color: #333;
        }
    }
      p{
              text-align: left;
            padding-left: 10px;
            font-size: 1rem;
            height: auto;
            // display: inline;
             margin-top: 10px;
     
        }
        .shop{
            width: 100%;
            height: 50px;
            text-align: right;
            button{
                width:100px;
                height:40px;
                line-height:40px;
                border-radius: 10%;
                border:0px;
                outline:none;
                background-color: pink;
                color: white;
                font-weight: bolder;
                font-size: 1rem;
            }
            .model{
               height:60%;
                   background-color: white;
                   position: fixed;
                    left: 0;
                    top:40%;
                    right: 0;
                    bottom: 0;
                    z-index: 5;
                    text-align: left;
                    .shopImg{
                        height:100px;
                    }
                    .num{
                        margin-top: 10px;
                    }
                    .exit{
                        display: inline-block;
                        width:40px;
                        height:40px;
                        border-radius: 50%;
                        background-color: #ccc;
                        text-align: center;
                        font-size: 2.2rem;
                        position: absolute;
                        top:0px;
                        right: 0px;
                        color: #fff;
                    }
                    .text{
                        width: 80px;
                        height: 30px;
                        text-align: center;
                    }
                    .button{
                        width:50px;
                        height: 30px;
                    }
                    input{
                        margin-left: 10px;
                    }
            }
        }
        .confirm{
                text-align: center;
                width: 90%;
                line-height:40px;
                border-radius: 8%;
                border:0px;
                outline:none;
                background-color: pink;
                color: white;
                font-weight: bolder;
                font-size: 1rem;
        }
</style>


