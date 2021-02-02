<template>
  <div style="width:90%;margin:0 auto;height:100%;overflow-y:scroll">

    <el-page-header
      @back="goBack"
      content="日志详情"
    ></el-page-header>
    <div v-show="isShow" class="btns">
      <span
      @click="updatelog()"
      ><i class="el-icon-edit" style="font-size: 25px"></i></span>
      <span
        @click="deletejournal()"
      ><i class="el-icon-delete-solid" style="font-size: 25px"></i></span>
    </div>
    <h1>{{getlog.title}}</h1>
    <article v-html="getlog.html_content"></article>

  </div>
</template>
<script>
export default {
  data () {
    return {
      getlog: {
        title: '',
        html_content: ''
      },
      detaillogid: '',
      isShow: false
    }
  },
  methods: {
    // 获取日志信息
    getlogcontent (id) {
      this.$http.get('logs/' + id)
        .then(res => {
          console.log(res)
          if (res.data.meta.success === true) {
            this.getlog.title = res.data.data.title
            this.getlog.html_content = res.data.data.html_content
            // const a = window.sessionStorage.getItem.JSON.parse("user")
            if (window.sessionStorage.getItem('id') === (res.data.data.author_id).toString()) {
              this.isShow = true
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    goBack () {
      this.$router.push('/logs')
    },
    // 点击修改按钮跳转到修改日志页面,并将修改日志的id传到修改日志页中
    updatelog (id) {
      this.$router.push({
        path: '/updatelog',
        query: {
          id: this.detaillogid,
          name: '/updatelog'
        }
      })
    },
    // 根据id删除日志
    async deletejournal (id) {
      const res = await this.$confirm('此操作将永久删除该日志, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (res === 'cancel') {
        return this.$message.info('已取消删除')
      }
      this.$http.delete('logs/' + this.detaillogid)
        .then(response => {
          console.log(response)
          if (response.data.meta.success !== true) {
            return this.$message.error('删除日志失败')
          } else {
            this.$message.success('删除日志成功')
            this.$router.push('/logs')
          }
        })
    }
  },
  created () {
    // 接收日志列表传过来的id
    this.detaillogid = this.$route.query.id
    // console.log(this.detaillogid)
    this.getlogcontent(this.detaillogid)
  }
}
</script>
<style lang="less" scoped>
h1 {
  text-align: center;
}
article{
  word-break:break-all;
}
.btns {
  margin-top: -20px;
  float: right;
  right: 0px;
}
.btns span{
    cursor: pointer;
}
.el-icon-edit{
    margin-right: 30px;
}
</style>
