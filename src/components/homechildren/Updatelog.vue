<template style="overflow-x:hidden">
  <div style="width:90%;margin:0 auto;height: 700px;">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/logs' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>更新日志</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :data="logmessage">
      <el-form-item label="修改标题:">
        <el-col :span="6">
          <el-input v-model="logmessage.title"></el-input>
        </el-col>
      <el-form-item style="float: right;">
        <el-button
          type="primary"
          @click="updatelog"
        >保存</el-button>
        <el-button @click="cancel">取 消</el-button>
      </el-form-item>
      </el-form-item>
      <el-form-item>
        <mavon-editor
          v-model="logmessage.content"
          :ishljs="true"
          @change="handle"
          placeholder="请使用markdown语法编辑"
          class="content"
        ></mavon-editor>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      //   获取到的信息
      logmessage: [],
      //   接收到的id
      detaillogid: ''
    }
  },
  mounted () {
    // 接收日志列表详情页传过来的id
    this.detaillogid = this.$route.query.id
    // console.log(this.detaillogid)
    // 根据id获取日志信息
    this.getlogcontent(this.detaillogid)
  },
  methods: {
    handle (value, render) {
      this.logmessage.html_content = render
    },
    // 获取日志信息
    getlogcontent (id) {
      this.$http.get('logs/' + id)
        .then(res => {
          this.logmessage = res.data.data
          if (res.data.meta.success !== true) {
            return this.$message.error('获取日志信息失败')
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          // console.log(error)
        })
    },
    // 点击修改按钮，发送请求
    updatelog () {
      this.$http.put('logs/' + this.detaillogid, this.logmessage)
        .then(res => {
          if (res.data.meta.success !== true) {
            this.$message.error('修改日志信息失败')
          } else {
            this.$message.success('修改日志信息成功')
            // 发布成功后跳转到日志列表页
            this.$router.push('/logs')
          }
        })
    },
    // 点击返回按钮跳转到日志列表页面
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.el-form {
  margin: 10px;
}
.content {
  height: 600px;
}
.hljs {
  color: #abb2bf;
  background: #282c34;
}
</style>
