<template lang="html">
  <el-row class="page-login">
    <el-col :span="12" :offset="6">
      <el-form :label-position="'top'" label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" placeholder="admin" v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" placeholder="123456" v-model="ruleForm.pass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="el-button-block" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</template>

<script>
import * as types from '@/store/mutation-types'
import Login from '@/api/login'

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        callback();
      };
      var userName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }
        callback();
      };
      return {
        labelPosition: 'right',
        //token: '',
        ruleForm: {
          pass: '123456',
          userName: 'admin'
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
            setTimeout(() => {
              //debugger;
              //if(data.data.success){
                //debugger;
                thiz.$store.commit(types.LOGIN, {userName:'admin'})
                let redirect = decodeURIComponent(thiz.$route.query.redirect || '/');
                thiz.$router.push({
                  path: redirect
                })
              //}
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        setTimeout(() => {

        })
        //this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less">
.el-button-block{
  width: 100%;
}
.page-login{
  padding: 10%;
}
</style>
