<template>
  <div style="width:90%; height:100%; margin:0 auto">
    <el-form :data="releaselog">
      <el-form-item
        label="发布标题:"
        prop="title"
      >
        <el-col :span="6">
          <el-input v-model="releaselog.title"></el-input>
        </el-col>
        <el-form-item style="float: right;">
          <el-button
            type="primary"
            @click="releasedraftcontent"
          >暂存草稿</el-button>
          <el-button
            type="success"
            @click="releaselogcontent"
          >发布</el-button>
          <el-button @click="cancel">取 消</el-button>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <mavon-editor
          class="content"
          v-model="releaselog.content"
          @change="handle"
          placeholder="请使用markdown语法编辑"
          style="height: 600px"
        />
      </el-form-item>
    </el-form>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span style="font-size: 20px; text-align: center;">是否保存为草稿？</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="goback">取 消</el-button>
        <el-button
          type="primary"
          @click="releasedraftcontent"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'addlog',
  data () {
    return {
      releaselog: {
        title: '',
        content: '',
        html_content: ''
      },
      dialogVisible: false
    }
  },
  methods: {
    handle (value, render) {
      this.releaselog.html_content = render
    },
    // 发送保存日志草稿请求
    releasedraftcontent () {
      this.$http.post('logs/draft', this.releaselog)
        .then(res => {
          // console.log(res)
          if (res.data.meta.success !== true) {
            this.$message.error('生成草稿失败')
          } else {
            this.$message.success('已生成草稿')
            // 发布成功后跳转到日志列表页
            this.$router.push('/logs')
          }
        })
    },
    // 发送添加日志请求
    releaselogcontent () {
      // console.log(this.this.releaselog.html_content)
      this.$http.post('logs', this.releaselog)
        .then(res => {
          // console.log(res)
          if (res.data.meta.success !== true) {
            this.$message.error('发布失败')
          } else {
            this.$message.success('发布成功')
            // 发布成功后跳转到日志列表页
            this.$router.push('/logs')
          }
        })
    },
    cancel () {
      this.dialogVisible = true
    },
    goback () {
      this.$router.push('logs')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
