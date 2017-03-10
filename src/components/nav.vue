<template>
  <nav class="nav">
    <div class="l">
      <ul>
        <router-link tag="li" to="/addstyle"><i class="iconfont icon-style"></i>首页</router-link>
        <router-link tag="li" to="/test"><i class="iconfont icon-style"></i>测试页面</router-link>
        <router-link tag="li" to="/hello"><i class="iconfont icon-style"></i>关于Vue</router-link>

      </ul>
    </div><div class="r">
      <ul>
        <li>菜单菜单</li>
        <li class="active">菜单菜单</li>
      </ul>
    </div>
  </nav>
</template>


<script>
import {mapState } from 'vuex'

export default {
  name: 'nav',
  computed: {
    ...mapState({
      path: state => state.route.path
    })
  },
}
</script>
<style lang="less">
.nav{
  width: 193px;
  min-height: 100%;
  border-right: 1px solid #ddd;
  overflow: hidden;
  .l{
    float: left;
    width: 80px;
    background: #363d47;
    color: #fff;
    min-height: 100%;
    text-align: center;
    padding-top: 20px;
    li{
      height: 78px;
      padding-top: 10px;
      cursor: pointer;
      &.router-link-active{
        background: #d63e5a;
        position: relative;
        &:after{
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          margin: auto;
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-right: 8px solid #f0f0f0;
          border-bottom: 8px solid transparent;
        }
      }
    }
    i{
      display: block;
      font-size: 30px;
    }
  }
  .r{
    float: left;
    width: 112px;
    background: #f0f0f0;
    min-height: 100%;
    text-align: center;
    padding-top: 20px;
    line-height: 32px;
    color: #333;
    li{
      margin-bottom: 15px;
      &.active{
        background: #d63e5a;
        color: #fff;
      }
    }
  }
}
</style>
