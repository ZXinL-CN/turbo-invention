<template style="overflow-x:hidden">
  <div style="width:90%;margin:0 auto;height: 700px;">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/drafts' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>更新日志草稿</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :data="draftmessage">
      <el-form-item label="修改标题:">
        <el-col :span="6">
          <el-input v-model="draftmessage.title"></el-input>
        </el-col>
      <el-form-item style="float: right;">
        <el-button
          type="primary"
          @click="updatedraft"
        >保存</el-button>
        <el-button @click="cancel">取 消</el-button>
      </el-form-item>
      </el-form-item>
      <el-form-item>
        <mavon-editor
          v-model="draftmessage.content"
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
      draftmessage: [],
      //   接收到的id
      detaildraftid: ''
    }
  },
  mounted () {
    // 接收日志草稿详情页传过来的id
    this.detaildraftid = this.$route.query.id
    // console.log(this.detaillogid)
    // 根据id获取日志草稿信息
    this.getdraftcontent(this.detaildraftid)
  },
  methods: {
    handle (value, render) {
      this.draftmessage.html_content = render
    },
    // 获取日志草稿信息
    getdraftcontent (id) {
      this.$http.get('logs/draft/' + id)
        .then(res => {
          this.draftmessage = res.data.data
          if (res.data.meta.success !== true) {
            return this.$message.error('获取日志草稿信息失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 点击修改按钮，发送请求
    updatedraft () {
      this.$http.put('logs/draft/' + this.detaildraftid, this.draftmessage)
        .then(res => {
          if (res.data.meta.success !== true) {
            this.$message.error('修改日志草稿信息失败')
          } else {
            this.$message.success('修改日志草稿信息成功')
            // 发布成功后跳转到日志草稿列表页
            this.$router.push('drafts')
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
<style  scoped>
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
