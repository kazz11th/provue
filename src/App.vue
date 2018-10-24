<template>
  <div id="app">
     <header>
         <span class="title">{{title}}</span>
     </header>
     <div class="content">
    <router-view @getIndex="getIndex" :plant="plantInfo"/>
     </div>
     <footer>
                   <nav class="main-nav">
            <ul>
                <router-link tag="li" to="/home" exact><i class="iconfont">&#xe605;</i></router-link>
                <router-link tag="li" to="/search"><i class="iconfont">&#xe627;</i></router-link>
                <router-link tag="li" to="/cart"><i class="iconfont">&#xe67d;</i></router-link>
                <router-link tag="li" to="/mine"><i class="iconfont">&#xe618;</i></router-link>
            </ul>
        </nav> 
     </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
      return{
      title:'',
      navItem:['首页','搜索','购物车','个人中心'],
      plantInfo:""
      }
  },
  created(){
     this.title=this.navItem[0];
  },
    methods:{
      getIndex (inx){
          this.plantInfo=inx;
      }
    },
        // 货币符号
filters: {
    currency(value){
       value=parseInt(value);
       console.log(typeof value)
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
<style rel="stylesheet" href="http://at.alicdn.com/t/font_529560_ubrx1wx6io.css"></style>
<style lang="scss">
@font-face {
  font-family: 'iconfont';  /* project id 529560 */
  src: url('//at.alicdn.com/t/font_529560_cu2hdvscuz5.eot');
  src: url('//at.alicdn.com/t/font_529560_cu2hdvscuz5.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_529560_cu2hdvscuz5.woff') format('woff'),
  url('//at.alicdn.com/t/font_529560_cu2hdvscuz5.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_529560_cu2hdvscuz5.svg#iconfont') format('svg');
}
html,body{
    height: 100%;
    font-size: 16px;
}
.iconfont {  
  font-family:"iconfont" !important;  
  font-size:26px;  
  font-style:normal;  
  -webkit-font-smoothing: antialiased;  
  -moz-osx-font-smoothing: grayscale;  
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
    height: 100%;
}
header{
    height: 50px;
    background-color: pink;
}
footer{
    height: 60px;
    line-height: 60px;
    // position: fixed;
}
.content{
    height:calc(100% - 110px) ;
    // padding: 12px;
    overflow-x: hidden;
    overflow-y: auto;
    // display: none;
}
.title{
    line-height: 50px;
    display: inline-block;
    height: 50px;
    color:#fff;
    font-size: 1.2rem;
}
.main-nav {
    $nav-color: #2369fd;
    ul {
        list-style: none;
        display: flex;
        // background-color: $nav-color;
        color: #000;
        margin: 0;
        padding: 0;
        height: 50px;
        li {
            padding: 10px 20px;
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.6s;
            width: 25%;
            line-height: 30px;
         &:hover{
             color: pink;
         }
         &.active{
             color: pink;
         }
        }
    }
}
</style>
