<template>


    <div class="box-card">
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :close-on-click-modal='isCloseMode' @close="closeDialog">
      <el-form
        :model="pwdform"
        :rules="ruleFormRules"
        ref="ruleFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="原密码"
          prop="old_pwd"
        >
          <el-input
            v-model="pwdform.old_pwd"
            type="password"
            placeholder="请输入原密码..."
          ></el-input>
        </el-form-item>
        <el-form-item
          label="新密码"
          prop="new_pwd"
        >
          <el-input
            v-model="pwdform.new_pwd"
            type="password"
            placeholder="请输入新密码..."
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认新密码"
          prop="queren_pwd"
        >
          <el-input
            v-model="pwdform.queren_pwd"
            type="password"
            placeholder="请再次输入新密码..."
          ></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-button
            type="primary"
            @click=" ChangePassword()"
          >确定</el-button>
          <el-button @click="goback">返回</el-button>
        </el-form-item> -->
      </el-form>

      <div slot="footer" class="dialog-footer">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click=" ChangePassword()" autofocus="false">确 定</el-button>
      </div>
      </el-dialog>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCloseMode:false,
      dialogFormVisible: true,
      // 请求参数
      pwdform: {
        old_pwd: "",
        new_pwd: "",
      },
      queren_pwd: "",
      ruleFormRules: {
        new_pwd: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
        ],
        queren_pwd: [
          { required: true, message: "请再次确认密码" },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.pwdform.new_pwd) {
                callback(new Error("两次输入密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    closeDialog(){
        this.$router.go(-1)
    },
    ChangePassword() {
      if (this.pwdform.new_pwd === this.pwdform.queren_pwd) {
        this.reqM1Service("myself/password", this.pwdform,'put').then((res) => {
          // console.log(res)
          if (res.data.meta.success !== true) {
            return this.$message.error("密码修改失败");
          } else {
            this.$message.success("修改密码成功");
            const accountNum = window.sessionStorage.getItem("account_number");
            window.sessionStorage.clear();
            window.sessionStorage.setItem("account_number", accountNum);
            // 发布成功后跳转到日志列表页
            this.$router.push("/login");
          }
        });
      }
    },
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="less" scoped>
    .dialog-footer{
      .el-button{
          color:rgb(118, 118, 184)
      }
    }
</style>
