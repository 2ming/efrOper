<template>
  <div id="app">
    <div v-if="path != '/login'" style="height:100%;">
      <m-head></m-head>
      <div class="main">
        <m-nav></m-nav>
        <div class="container">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
    <!-- <load></load> -->
  </div>
</template>

<script>
import mHead from './components/head'
import mNav from './components/nav'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'app',
  methods: {
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      isLoading: state => state.isLoading,
    })
  },
  components: {
    mHead,
    mNav
  }
}
</script>

<style lang="less">
@import './assets/styles/reset.less';

html,body,#app {
  height: 100%;
}
body{
  font-size: 14px;
}
a{
  color: #fff;
  text-decoration: none;
}
.header{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.main{
  display: flex;
  padding-top: 64px;
  width: 100%;
  min-height: 100%;
}
.container{
  flex: 1;
  padding: 15px;
}
</style>
