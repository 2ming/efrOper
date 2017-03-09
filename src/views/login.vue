<template lang="html">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="userName">
    <el-input type="text" v-model="ruleForm.userName" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import * as types from '@/store/mutation-types'
import Login from '@/api/login'

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }
        callback();
      };
      var userName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        callback();
      };
      return {
        //token: '',
        ruleForm: {
          pass: '',
          userName: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          userName: [
            { validator: userName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
      //  alert(1)
      var thiz = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Login.login(this.ruleForm).then(function(data){
              //debugger;
              if(data.data.success){
                //debugger;
                localStorage.setItem('token',true);
                localStorage.setItem('user',JSON.stringify(data.data.value));
                thiz.$store.commit(types.LOGIN, data.data.value)
                let redirect = decodeURIComponent(thiz.$route.query.redirect || '/');
                thiz.$router.push({
                  path: redirect
                })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.axios.post('/op/info').then(function(data){
          console.log(data)
        })
        //this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="css">
</style>
