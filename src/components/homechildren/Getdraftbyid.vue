<template>
  <div style="width:90%;margin:0 auto;height:100%;overflow-y:scroll">
    <el-page-header
      @back="goBack"
      content="日志草稿详情"
    ></el-page-header>
    <div v-show="isShow" class="btns">
      <span
      @click="updatedraft()"
      ><i class="el-icon-edit" style="font-size: 25px"></i></span>
      <span
        @click="deletedraft()"
      ><i class="el-icon-delete-solid" style="font-size: 25px"></i></span>
    </div>
    <h1>{{getdraft.title}}</h1>
    <article v-html="getdraft.html_content"></article>
  </div>
</template>
<script>
export default {
  data () {
    return {
      getdraft: {
        title: '',
        html_content: ''
      },
      detaildraftid: '',
      isShow: false
    }
  },
  methods: {
    // 获取日志草稿信息
    getdraftcontent (id) {
      this.$http.get('logs/draft/' + id)
        .then(res => {
          console.log(res)
          if (res.data.meta.success === true) {
            this.getdraft.title = res.data.data.title
            this.getdraft.html_content = res.data.data.html_content
            // console.log(typeof(res.data.data.author_id))
            // const a = window.sessionStorage.getItem('id')
            // console.log(typeof(a))
            // console.log(a)
            if ((window.sessionStorage.getItem('id')) === (res.data.data.author_id).toString()) {
              this.isShow = true
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    goBack () {
      this.$router.push('/drafts')
    },
    // 点击修改按钮跳转到修改日志草稿页面,并将修改日志草稿的id传到修改日志草稿页中
    updatedraft (id) {
      this.$router.push({
        path: '/updatedraft',
        query: {
          id: this.detaildraftid,
          name: '/updatedraft'
        }
      })
    },
    // 根据id删除日志草稿
    async deletedraft (id) {
      const res = await this.$confirm('此操作将永久删除该日志草稿, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (res === 'cancel') {
        return this.$message.info('已取消删除')
      }
      this.$http.delete('logs/draft/' + this.detaildraftid)
        .then(response => {
          console.log(response)
          if (response.data.meta.success !== true) {
            return this.$message.error('删除日志草稿失败')
          } else {
            this.$message.success('删除日志草稿成功')
            this.$router.push('/drafts')
          }
        })
    }
  },
  created () {
    // 接收日志草稿列表传过来的id
    this.detaildraftid = this.$route.query.id
    // console.log(this.detaillogid)
    this.getdraftcontent(this.detaildraftid)
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
