<template>
  <div class="header">
    <el-row>
      <el-col :span="12">
        <div class="logo">
          VUE
        </div>
      </el-col>
      <el-col v-if="user" :span="12" class="text-right">
        <div class="user">
          <ul>
            <li>{{user.userName}}</li>
            <li @click="logOut()">退出</li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as types from '@/store/mutation-types'

export default {
  name: 'header',
  computed: {
    ...mapState({
      token: state => state.token,
      user: state => state.user
    })
  },
  methods: {
    logOut(){
      this.$store.commit(types.LOGOUT);
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style lang="less">
.header{
  height: 63px;
  background: #f0f0f0;
  border-bottom: 1px solid #d1d1d1;
}
.user{
  height: 40px;
  margin: 11px;
  line-height: 40px;
  li{
    display: inline-block;
  }
}
.logo{
  margin: 11px;
  height: 40px;
  img{
    display: block;
  }
}
</style>
