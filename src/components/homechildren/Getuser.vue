<template>
  <div>
    <el-card shadow="hover">
      <div style="margin-top: 15px;">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input
              placeholder="请输入内容"
              v-model="usermessage.account_number"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getUsers"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-button
              type="primary"
              round
              style="float: right;"
              @click="changedialogVisible = true"
            >添加用户</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-table
      :data="userform"
      style="width: 100%"
      :default-sort="{prop: 'id', order: 'ascending'}"
    >
      <el-table-column
        prop="id"
        label="用户id"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="account_number"
        label="用户账号"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="role_code"
        label="用户角色"
      >
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="用户名"
      >
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
      >
      </el-table-column>
      <el-table-column
        prop="register_time"
        label="注册时间"
      >
      </el-table-column>
      <el-table-column
        prop="state"
        label="用户状态"
      >
      <!-- <p v-if="userform.state == 1">
          <el-switch
            v-model="userform.state"
            active-color="#4751df"
            inactive-color="#62636d"
            :active-value="1"
            :inactive-value="0"

          >
          </el-switch>
          </p> -->
      </el-table-column>
    </el-table>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="changedialogVisible"
      width="50%"
      @close="changedialogclosed"
    >
      <el-form
        :model="adduserfrom"
        :rules="ruleFormRules"
        ref="ruleFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户账号"
          prop="account_number"
        >
          <el-input v-model="adduserfrom.account_number"></el-input>
        </el-form-item>
        <el-form-item
          label="用户名"
          prop="user_name"
        >
          <el-input v-model="adduserfrom.user_name"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="addUsers"
        >确 定</el-button>
        <el-button @click="changedialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default {
  data () {
    return {
      // 请求参数
      usermessage: {
        account_number: '',
        user_name: ''
      },
      userform: [],
      adduserfrom: {
        account_number: '',
        user_name: ''
      },
      // 控制添加用户对话框得显示与隐藏
      changedialogVisible: false,
      // 添加用户的验证规则
      ruleFormRules: {
        account_number: [
          { required: true, message: '请输入用户账号', trigger: 'blur' }
        ],
        user_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    getUsers () {
      this.$http.get(`admin/users?account_number=${this.usermessage.account_number}`)
        .then(res => {
          // console.log(res)
          const list = res.data.data
          this.userform = list.map(item => {
            item.register_time = moment(new Date(item.register_time)).format('YYYY-MM-DD HH:mm:ss')
            return item
          })
        })
    },
    // 监听添加用户对话框的关闭事件
    changedialogclosed () {
      this.$refs.ruleFormRef.resetFields()
    },
    // 点击确定按钮，发送请求，并进行预校验
    addUsers () {
      this.$refs.ruleFormRef.validate(valid => {
        if (!valid) return // 发起添加用户的网络请求
        this.$http.post('admin/users', this.adduserfrom)
          .then(res => {
            if (res.data.meta.success === true) {
              this.$message.success('添加用户成功')
              // 刷新数据
              this.getUsers()
            } else {
              this.$message.error('添加用户失败')
            }
          })
        // 点击确定关闭对话框
        this.changedialogVisible = false
      })
    }
    // 修改用户状态
    // handleChange(id,state) {
    //   state == 1 ? 0 : 1;
    //   console.log(state);
    //   this.$http.put('admin/users/' + id,
    //   {
    //     state:state
    //   })
    //   .then(res =>{
    //       if(res.data.meta.success !== true){
    //         this.$message.error('修改活动状态失败')
    //       }
    //   })
    // }
  },
  created () {
    document.title = 'Users'
    this.getUsers()
  }
}
</script>

<style lang="less" scoped>
</style>
