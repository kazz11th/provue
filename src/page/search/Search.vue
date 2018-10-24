<template>
  <div id="search">
    <div class="SearchBox"><input type="text" placeholder="搜索" class="search"></div>
    <nav class="fillter">
    <ul class="item layui-row filterSort">
         	<li class="filterItem layui-col-xs4" @click="toggleFilerMenue">
					<span>{{ filterMenueChecked }}</span>
					<i class="icon arrow" :class="{checked: filterMenueShow}"></i>
				</li>
     	<li class="filterItem layui-col-xs4" @click="toggleClassMenue">
					<span>{{ classMenueChecked }}</span>
					<i class="icon arrow" :class="{checked: MenueShow}"></i>
				</li>
       <li class="layui-col-xs4">销量</li>
    </ul>
     <transition name="fade">
                <!-- 综合排序菜单 -->
                <ul class="comSort" v-show="filterMenueShow">
                    <li v-for="(btn, index) in filterMenue" :key="btn.id" @click="sortSeller(...filterMenueEvent[index], index)">{{ btn }}</li>
                </ul>
            </transition>
              <transition name="fade">
                    <ul class="comSort" v-show="MenueShow">
                    <li v-for="(btn, index) in classMenue" :key="btn.id" @click="ClassSeller(btn,index)">{{ btn }}</li>
                </ul>
                </transition>
            <!-- 遮罩层 -->
            <div 
                class="maskLayer" 
                v-show="filterMenueShow" 
                @click="filterMenueShow = false"
            ></div>
            <div 
                class="maskLayer" 
                v-show="MenueShow" 
                @click="MenueShow = false,filterMenueShow = false"
            ></div>
    </nav>
        <div class=" plantContent layui-container" v-show="contentshow" ref="content" >
               <ul>
                    <div class="layui-row">
                 <li v-for="(plant,index) in plantInfo"   @click="plantData(index)">
                
                     <div class="layui-col-xs6">
                  <img :src="plant.images" class="plantImg">
                  <div class="shade">
                    <p class="price">{{plant.price | currency}}</p>
                    <p class="plantTitle">{{plant.title | title}}</p>
                  </div>
                     </div>
                 </li>
                 </div>
               </ul>
        </div>
        <div class="searchContent " >
          <ul>
               <div class="layui-row">
                 <li v-for="(plant,index) in search"  :key="plant.id" @click="plantData(index)">
                
                     <div class="layui-col-xs6">
                  <img :src="plant.images" class="plantImg">
                  <div class="shade">
                    <p class="price">{{plant.price | currency}}</p>
                    <p class="plantTitle">{{plant.title | title}}</p>
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
export default {
  name: 'Search',
  data(){
    return{
    filterMenueChecked: '综合排序',
    classMenueChecked:"全部",
    plantInfo:'',
    search:"",
    srotdata:"",
    contentshow:true,
    filterMenueEvent: [
       ['sales', 'desc'],
       ['price', 'asc'],
       ['price', 'desc']
        ],
      Menue:['plantInfo','search'],  
    // 排序菜单
    filterMenue:['综合排序','价格升序','价格降序'],
    // 分类
    classMenue:['全部','百合科','菊科','番杏科','景天科'],
     // 筛选二级导航显示状态
        filterMenueShow: false,
        MenueShow:false,
  }},
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
      },
     toggleFilerMenue() {
            this.filterMenueShow = !this.filterMenueShow;
        },
                sortSeller(sortType, order, index) {
            // 根据传入的值对商家进行排序
            if(this.search !==""){
              this.srotdata=this.search
            }
            else{
              this.srotdata=this.plantInfo;
            }
            this.srotdata.sort((item1,item2) => {
                // 升序排序
                if(order === "asc") {
                    return item1[sortType] - item2[sortType];
                }
                // 降序排序
                else if(order === "desc") {
                    return item2[sortType] - item1[sortType];
                }
                else {
                    throw new Error('参数传入错误，请检查！');
                }
            });
            if(typeof index !== "undefined" )  {
                // 设置菜单栏第一个按钮显示排序选中项
                this.filterMenueChecked = this.filterMenue[index];
            }
            else {
                this.filterMenueChecked = '综合排序';
            }
            // 滚动条置顶
            this.$refs.content.scrollTop = 0;
            // 隐藏菜单
            this.filterMenueShow = false;
        },
        toggleClassMenue(){
          this.MenueShow = !this.MenueShow;
        },
        ClassSeller(item,index){
           if(typeof index !== "undefined" )  {
                // 设置菜单栏第一个按钮显示排序选中项
                this.classMenueChecked = this.classMenue[index];
            }
            else {
                this.classMenueChecked = '全部';
            }
              // 滚动条置顶
            this.$refs.content.scrollTop = 0;
            // 隐藏菜单
            this.MenueShow = false;
            console.log(item);
            if(item=="全部")
            {
             this.search = this.plantInfo;
            }
            else{
               const arrByZM =[];
              // console.log(arr)
              for (var i=0;i<this.plantInfo.length;i++){
                //for循环数据中的每一项（根据name值）            console.log(this.SearchVal)
                if(this.plantInfo[i].class.toLowerCase().indexOf(item) != -1){   
                    //判断输入框中的值是否可以匹配到数据，如果匹配成功
                    arrByZM.push(this.plantInfo[i]);
                    this.contentshow=false
                    console.log(arrByZM)
                    
                    //向空数组中添加数据
                }
            }
            this.search=arrByZM;
        }
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
},
title(value){
  // console.log(typeof value)
  value = value.slice(0,10);
  return value;
}
}
}
</script>

<style lang="scss">

  .search{
  width:300px;
  height: 40px;
  border: 0px;
  border-bottom: 1px solid  #ccc;
  }
  .item>li{
    float: left;
  }
  /* 筛选排序列表 */
nav.fillter {
	position: relative;
}
ul.filterSort {
	padding: 8px 10px;
	margin: 0;
	border-bottom: 1px solid #ccc;
	overflow: hidden;
	list-style: none;
	display: flex;
	justify-content: space-around;
}
ul.filterSort > li {
	flex-basis: 26.5%;
	text-align: center;
	font-size: 0.8rem;
	line-height: 24px;
	cursor: pointer;
}
ul.filterSort > li:nth-of-type(3) {
	border-right: 1px solid #ccc;
}
ul.filterSort > li:nth-of-type(4) {
	flex-basis: 20.5%;
}
ul.filterSort > li.checked {
	font-weight: normal;
	color: #000;
}
/* 综合排序列表 */
.comSort {
	width: 100%;
	padding: 0;
	margin: 0;
	background-color: #fff;
	list-style: none;
	position: absolute;
	top: 41px; left: 0;
	z-index: 11;
}
.comSort > li {
	padding: 0 14px;
	line-height: 40px;
	border-bottom: 1px solid #ddd;
	cursor: pointer;
}
.comSort > li.checked {
	color: #ec6a07;
}
/* 筛选栏图标 */
ul.filterSort > li i.icon {
	width: 16px; height: 16px;
	margin: 0 2px;
	vertical-align: middle;
	display: inline-block;
	position: relative;
	top: -1px;
}
/* 筛选栏图标--箭头 */
ul.filterSort > li i.icon.arrow {
	width: 12px; height: 12px;
	margin-left: 4px;
	background: url(/static/images/arrow.svg) 0 0 no-repeat;
	transition: all 0.1s;
}
ul.filterSort > li i.icon.arrow.checked {
	transform: rotate(90deg);
}
  .plantContent{
    margin-top: 20px;
    padding: 0 !important;
       .price{
            color: orangered;
            font-size: 1.3rem;
       }
      .plantTitle{
        height:40px;
        overflow: hidden;
      }

    //   li{
    //     padding-left: 10px;
    //   }
  }
     img{
         width: 100%;
         height: auto;
      }
//  .searchContent{
//    width: 100%;
//    height:100%;
//    position: fixed;
//    z-index: 10;
//    top:20%;
//    background-color: #ec6a07;
//  }    

</style>