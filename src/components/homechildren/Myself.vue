<template>
  <!-- 面包屑导航区 -->
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 个人信息内容 -->
      <el-card class="box-card">
      <div class="infoClass">
        <span><i  class="el-icon-user"></i>{{info.user_name}}<i class="el-icon-edit" @click="updatamessage()" style="margin-left: 100px;"></i></span>
        <span v-if="info.gender === '男'"><i class="el-icon-male" style="color:blue; font-size: 25px"></i>{{info.gender}}</span>
        <span v-if="info.gender === '女'"><i class="el-icon-female" style="color:pink; font-size: 25px"></i>{{info.gender}}</span>
        <span><i  class="el-icon-message"></i>{{info.email}}</span>
        <span> <i  class="el-icon-phone-outline"></i>{{info.mobile}}</span>
        <hr>
        <div class="deames">
        <i  class="el-icon-chat-dot-square"></i><br><span>学号  {{info.account_number}}</span>
        <span>年级  {{info.grade}}</span>
        <span>班级  {{info.class}}</span>
        <span>QQ  {{info.qq}}</span>
        </div>
      </div>
    </el-card>
    <!-- 修改信息对话框 -->
    <el-dialog
      title="修改信息"
      :visible.sync="changedialogVisible"
      width="50%"
      @close="changedialogclosed"
    >
      <el-form
        :model="messageform"
        :rules="ruleFormRules"
        ref="ruleFormRef"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="手机号"
          prop="mobile"
        >
          <el-input v-model="messageform.mobile"></el-input>
        </el-form-item>
        <el-form-item
          label="用户名"
          prop="user_name"
        >
          <el-input v-model="messageform.user_name"></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="messageform.email"></el-input>
        </el-form-item>
        <el-form-item
          label="年级"
          prop="grade"
        >
          <el-input v-model="messageform.grade"></el-input>
        </el-form-item>
        <el-form-item
          label="班级"
          prop="class"
        >
          <el-input v-model="messageform.class"></el-input>
        </el-form-item>
        <el-form-item
          label="性别"
          prop="gender"
        >
          <el-radio
            v-model="messageform.gender"
            label="男"
          >男</el-radio>
          <el-radio
            v-model="messageform.gender"
            label="女"
          >女</el-radio>
        </el-form-item>
        <el-form-item
          label="QQ"
          prop="qq"
        >
          <el-input v-model="messageform.qq"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changemessage">确 定</el-button>
        <el-button @click="changedialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// 导入时间格式组件
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default {
  data () {
    // 验证邮箱规则
    var checkEmail = (rule, value, cb) => {
      const regemail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (regemail.test(value)) {
        //  邮箱合法
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    // 验证手机号规则
    var checkPhone = (rule, value, cb) => {
      const regphone = /^[1][3,4,5,7,8][0-9]{9}$/
      if (regphone.test(value)) {
        //  手机号合法
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      // 初始化列表信息
      info: [],
      timer: '',
      // 控制修改信息对话框得显示与隐藏
      changedialogVisible: false,
      // 查询到的信息对象
      messageform: {
        account_number: '',
        user_name: '',
        mobile: '',
        email: '',
        grade: '',
        class: '',
        gender: '',
        qq: ''
      },
      // 修改表单的验证规则
      ruleFormRules: {
        user_name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '请输入年级', trigger: 'blur' }
        ],
        class: [
          { required: true, message: '请输入班级', trigger: 'blur' }
        ],
        gender: [
          { checked: true, message: '请输入性别', trigger: 'blur' }
        ],
        qq: [
          { required: true, message: '请输入QQ', trigger: 'blur' },
          { min: 9, max: 10, message: '长度在 9 到 10 个字符', trigger: 'blur' }
        ]

      }
    }
  },
  created () {
    this.getpersonlist()
    document.title = 'Personal information'
  },
  methods: {
    // 获取个人信息数据
    getpersonlist () {
      this.$http.get('myself')
        .then(res => {
          // 获取到的数据传递给列表
          this.info = res.data.data
          // console.log(res)
          this.timer = moment(new Date(this.info.register_time)).format('YYYY-MM-DD HH:mm:ss')
          // console.log(timer)
        })
        // eslint-disable-next-line handle-callback-err
        .catch(function (error) { // 请求失败处理
          // console.log(error)
        })
    },
    // 点击修改按钮，获取信息
    updatamessage () {
      this.changedialogVisible = true
      this.$http.get('myself')
        .then(res => {
          this.messageform.account_number = res.data.data.account_number
          this.messageform.user_name = res.data.data.user_name
          this.messageform.mobile = res.data.data.mobile
          this.messageform.email = res.data.data.email
          this.messageform.grade = res.data.data.grade
          this.messageform.class = res.data.data.class
          this.messageform.gender = res.data.data.gender
          this.messageform.qq = res.data.data.qq
          // console.log(res)
          if (res.data.meta.success !== true) {
            return this.$message.error('查询用户信息失败')
          }
        })
    },
    // 监听修改信息对话框的关闭事件
    changedialogclosed () {
      this.$refs.ruleFormRef.resetFields()
    },
    // 点击确定按钮，发送请求，并进行预校验
    changemessage () {
      this.$refs.ruleFormRef.validate(valid => {
        if (!valid) return // 发起修改信息的网络请求
        this.$http.put('myself', {
          account_number: this.messageform.account_number,
          user_name: this.messageform.user_name,
          mobile: this.messageform.mobile,
          email: this.messageform.email,
          grade: this.messageform.grade,
          class: this.messageform.class,
          gender: this.messageform.gender,
          qq: this.messageform.qq
        })
          .then(res => {
            if (res.data.meta.success === true) {
              this.$message.success('更新信息成功')
              // 刷新数据
              this.getpersonlist()
            } else {
              this.$message.error('更新信息失败')
            }
          })
        // 点击确定关闭对话框
        this.changedialogVisible = false
      })
    }
  }
}
</script>
<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.iconEdit {
  background-color: rgba(231, 135, 9, 0.452);
  margin: 0 35px;
  border-style: none;
}
.iconEdit:hover {
  background-color: gray;
}
.box-card span{
  font-size:  20px;
  font-family: '微软雅黑';
}
i {
  font-size: 25px;
  padding-top: 15px;
  padding-left: 35px;
  margin-right: 10px;
}
.infoClass span {
  display: block;
}

.deames span{
  font-size: 17px;
  font-family: '微软雅黑';
  margin-left: 70px;
}
hr{
  opacity: 0.3;
}
</style>
