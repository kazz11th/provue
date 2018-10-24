<template>
  <div id="mine">
    <div class="mine">
      <div class="portrait">
        <!-- 头像 -->
        <div class="photo"><img src="/static/images/photo.jpg"></div>
        <!-- 昵称 -->
        <dd class="nickname">小叶子</dd>
      </div>
    </div>
    <div class="menu">
      <ul>
        <li class="shopcart"><i class="iconfont"><img src="/static/images/icon/shopcart.png"></i>购物车</li>
        <li class="coupon"><i class="iconfont"><img src="/static/images/icon/coupon.png"></i>优惠券</li>
      </ul>
    </div>
    <div class="items">
      <ul>
        <li >个人信息<i class="icon_font"><img src="/static/images/icon/arrow.png"></i></li>
        <li>收货地址<i class="icon_font"><img src="/static/images/icon/arrow.png"></i></li>
      </ul>
      <ul>
        <li>其他<i class="icon_font"><img src="/static/images/icon/arrow.png"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default{
  name: 'mine'
}
</script>

<style lang="scss" scoped>
  $color:#e49c9d;
  #mine{
    width:100%;
    height:100%;
    background-color: #e8e8e8;
    img{
      width:100%;
      height: 100%;
    }
    .mine{
      width:100%;
      height:200px;
      background-color:$color;
      .portrait{
        width:96px;
        height: 100%;
        margin: 0 auto;
        padding-top:50px;
        box-sizing: border-box;
        // 头像
        .photo{
          width:90px;
          height: 90px;
          border-radius: 50%;
          border: 3px solid #fff;
          img{
            border-radius: 50%;
          }
        }
        // 昵称
        .nickname{
          padding-top:6px;
          color:#fff;
          font-size: 1.2rem;
        }
      }
    }
    .menu{
      height: 80px;
      li{
        float: left;
        width:50%;
        height: 80px;
        font-size:0.87rem;
        color:#515151;
        padding: 10px 0;
        box-sizing: border-box;
        .iconfont{
          width:35px;
          height:35px;
          display: block;
          margin: 0 auto;
          margin-bottom: 4px;
        }
      }
      .shopcart{
        background-color:#d88484;
      }
      .coupon{
        background-color:#d36f6f;
      }
    }

  }

  .items ul{
    margin-top:10px;
    background-color: #fff;
    border:1px solid rgb(215,215,215);
  }
  .items li{
    height: 50px;
    line-height: 50px;
    text-align: left;
    text-indent: 15px;
  }
  .items li+li{
    border-top:1px solid rgb(215,215,215);
  }
  .items .icon_font{
    position: absolute;
    right: 25px;
    margin-top:-50px;
    display: block;
    height: 25px;
    width: 25px;
  }
</style>
