<template>
    <div class="login_container">
      <div class="login_box">
        <!-- 头像区域 -->
        <div class="avatar_box">
          <img src="../../assets/images/logo.jpg" alt="" />
        </div>
        <!-- 登录表单区域 -->
        <el-form
          label-width="0px"
          class="login_form"
          :model="loginForm"
          :rules="loginFormrules"
          ref="loginFormref"
        >
          <!-- 用户名 -->
          <el-form-item prop="account_number">
            <el-input
              v-model="loginForm.account_number"
              prefix-icon="el-icon-user-solid"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="account_password">
            <el-input
              v-model="loginForm.account_password"
              prefix-icon="el-icon-unlock"
              type="password"
            ></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="btns">
            <el-button @click="login">登录</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
          <!-- <el-form-item class="btns">
          </el-form-item> -->
        </el-form>
        <!-- <router-link to="regist2"> -->
             <!-- <el-button @click="regist">注册</el-button> -->
        <!-- </router-link> -->
      </div>
    </div>
  </template>
  <script>
  import { initDynamicRoutes } from '../../router/index.js'
  import axios from 'axios'
  export default {
    data () {
      return {
        // 登录表单的数据绑定对象
        loginForm: {
          account_number: '',
          account_password: ''
        },
        // 验证表单用户名和密码的合法性
        loginFormrules: {
          account_number: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          account_password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ]
        },
        role_code: ''
      }
    },
    created () {
      document.title = 'Sign in'
      this.loginForm.account_number =
        window.sessionStorage.getItem('account_number')
      var _self = this
      document.onkeydown = function (e) {
        var key = window.event.keyCode
        if (key === 13) {
          _self.login('loginForm') // 自己写的登录方法，点击事件
        }
      }
    },
    methods: {
      // 注册
  
      login () {
        console.log(this.$router)
        const that = this
        console.dir(axios)
        //    登录请求
        //   1项目中除了登陆之外的其他API接口，必须在登陆之后才能访问
        this.$refs.loginFormref.validate((valid) => {
          if (!valid) return // 发起修改信息的网络请求
          axios
            .all([
              this.reqM1Service(
                'login',
                {
                  account_number: this.loginForm.account_number,
                  account_password: this.loginForm.account_password
                },
                'post'
              ),
              this.reqM1Service(
                'login',
                {
                  account_number: this.loginForm.account_number,
                  account_password: this.loginForm.account_password
                },
                'post'
              )
            ])
  
            .then(
              axios.spread(function (res, perms) {
                console.log(res, perms)
                if (res.data.meta.success === true) {
                  //  console.log(this)
                  // 提示登录成功
                  // this.$message.success("登录成功");
                  // console.log(res)
                  window.sessionStorage.setItem('id', res.data.data.id)
                  window.sessionStorage.setItem('token', res.data.data.token)
                  window.sessionStorage.setItem(
                    'account_number',
                    res.data.data.account_number
                  )
                  window.sessionStorage.setItem(
                    'account_name',
                    res.data.data.user_name
                  )
                  window.sessionStorage.setItem(
                    'role_code',
                    res.data.data.role_code
                  )
                  // 根据用户权限，动态添加路由
                  that.role_code = window.sessionStorage.getItem('role_code')
                  // console.log(this.role_code)
                  if (that.role_code > 0) {
                    initDynamicRoutes()
                  }
                  // 2、通过编程式导航跳转到后台主页，路由地址是/home
                  that.$router.push('home').catch((err) => { console.log(err) })
                } else {
                  that.$message.error('登录失败')
                }
              })
            )
        })
      },
      reset () {
        this.loginForm = []
      }
    }
  }
  </script>
  <style lang="less" scoped>
  /* body{
    background-color: #fafafa85;
  } */
  .login_container {
    background-color: #e0d9d9;
    background-size: 100% 100%;
    height: 100%;
  }
  .login_box {
    width: 450px;
    height: 300px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 1);
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
  .el-input {
    opacity: 0.65;
    border: 0;
    outline: none;
    border-style: none;
  }
  .el-input:focus-within {
    outline: none;
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
    opacity: 0.8;
  }
  .el-button {
    opacity: 0.85;
  }
  </style>
  