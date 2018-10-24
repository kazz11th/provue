<template>
  <!-- <div class="container"> -->
  <div id="cart">
    <div class="manage">
      <button class="manage_btn btn01" @click="show=true,hide=false">管理</button>
      <button class="manage_btn btn01" @click="show=false,hide=true">完成</button>
    </div>
    <!-- 商品栏 -->
    <ul>
      <li class="layui-row" v-for="(cdata,index) in plantInfo">
        <div class="layui-col-xs2 checkbox"><input type="checkbox"></div>
        <p class="id" >{{cdata.id}}</p>
        <div class="layui-col-xs4 photo"><img :src="cdata.images"></div>
        <div class="layui-col-xs6 ifo">
          <dd class="good_name">{{cdata.title}}</dd>
          <dd class="good_spec">{{cdata.color}}
            <span>{{cdata.flowerpot}}</span>
          </dd>
          <dd>
            <span class="good_price">￥{{price}}</span>
            <span class="good_num">x 1</span>
          </dd>
        </div>
      </li>
    </ul>
    <!-- 结算栏 -->
    <div class="layui-row bala">
      <div class="layui-col-xs2 checkall"><input type="checkbox"></div>
      <div class="layui-col-xs6 priceall">
        <span>￥{{price}}</span>
      </div>
      <div class="layui-col-xs4 checkout">
        <button v-show="hide" type="button" class="btn">结算</button>
        <button v-show="show" class="del">删除</button>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import "layui-css";
export default {
     name: "cart",
    data() {
        return {
            show: false,
            hide: true,
            plantInfo:'',
            cartdata:'',
            newInfo:[],
            plantID:[],
            price:''
        };
    },
    created() {
        axios.get('http://localhost:8080/static/plant.json').then((resp) => {
            this.plantInfo= resp.data;
            
                   const arrByZM =[];
               let  pID = this.plantID.split('');
            //    console.log(typeof pID)
             for (var i=0;i<this.plantInfo.length;i++){
                 
                 for(let x in this.plantID){
                     console.log(this.plantID[x])    
                //for循环数据中的每一项（根据name值）            console.log(this.SearchVal)
                 if(this.plantInfo[i].id==this.plantID[x]){   
                    //判断输入框中的值是否可以匹配到数据，如果匹配成功
                    this.price=parseInt(num)*parseInt(this.plantInfo[i].price)
                    arrByZM.push(this.plantInfo[i]);
                    this.contentshow=false
                    console.log(arrByZM)
                    
                    //向空数组中添加数据
                }
                }
            }
            return this.plantInfo =arrByZM;

        });
              this.plantID =window.localStorage.getItem('id');
              let num = window.localStorage.getItem('plantNum');
            //   this.plantID =plantID; 
    },
    //    mounted(){
    //     this.cartShop();
    // },
    methods:{
    }
   
};
</script>

<style lang="scss">
$color: #e49c9d;
$white: #fff;
#cart {
    height: 100%;
    background-color: #e8e8e8;
    .manage {
        width: 120px;
        position: absolute;
        top: 0;
        right: 10px;
        background-color: #e49c9d;
        .manage_btn {
            width: 50px;
        }
    }
    ul{
        height: calc(100% - 50px);
        overflow-x: hidden;
        overflow-y: auto;
        li {
            padding: 10px 0;
            margin: 10px 0 0 0;
            background-color: $white;
            box-sizing: border-box;
            .id{
                display: none;
            }
            .checkbox {
              width:50px;
              line-height: 110px;
            }
            .photo{
              width:110px;
              height:110px;
            }
            img {
                width: 100%;
                height: 100%;
            }
            .ifo {
                padding: 10px 0 0 10px;
                background: $white;
                text-align: left;
                box-sizing: border-box;
                dd {
                  padding-bottom: 10px;
              }
            }
            .good_name {
                color: #515151;
                font-size: 1.05rem;
            }
            .good_spec {
                color: #969696;
                font-size: 0.9rem;
            }
            .good_price,.good_num {
                font-size: 0.95rem;
                color: #d88484;
            }
            .good_num {
                position: absolute;
                right: 10px;
            }
        }
    }
    .bala {
        height: 50px;
        line-height: 50px;
        background-color: #f8f1eb;
        .checkout {
            background-color: #e49c9d;
        }
        .priceall {
            color: #d88484;
            text-align: right;
            padding-right: 20px;
        }
        button {
            width: 100%;
            height: 47px;
            display: inline-block;
            border: 0px;
            outline: none;
            color: $white;
            background-color: #e49c9d;
        }
    }
    input {
        width: 16px;
        height: 16px;
    }
    button {
        width: 100%;
        height: 47px;
        display: inline-block;
        border: 0px;
        outline: none;
        color: $white;
        background-color: #e49c9d;
    }
}
</style>
