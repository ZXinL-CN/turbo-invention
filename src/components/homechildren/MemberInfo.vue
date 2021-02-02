<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/members' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/members">成员信息</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><b>成员</b>：{{member.user_name}}</span>
      </div>
      <div class="infoClass">
        <span><b>学号：</b>{{member.account_number}}</span><br>
        <span><b>性别：</b>{{member.gender}}</span><br>
        <span><b>邮箱：</b>{{member.email}}</span><br>
        <span><b>年级：</b>{{member.grade}}</span><br>
        <span><b>班级：</b>{{member.class}}</span><br>
      </div>
    </el-card>
    <div @click="goBack" style="width: 100%;height: 265px;"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 初始化member数据
      member: []

      // 初始化v-show为true
      // hideInfo: false
    }
  },
  created () {
    document.title = 'Member details'
  },
  methods: {
    // 使用async await 对promise进行优化
    async selectData (index) {
      const res = await this.$http.get(`members/${index}`)

      const { data } = res.data

      if (data) {
        this.member = data
      }

      // 将通过id获取到的数据渲染到详细信息下
      // this.member = [res.data]
      // console.log(`res`, data)
    },

    // 调用goBack函数，点击
    async goBack () {
      await this.$router.push('/members')
    }
    // 点击查看信息
    // showInfo() {
    //   this.hideInfo = true
    // }
  },
  // 在生命周期函数mouted上声明一个函数
  mounted () {
    // this.$route.params.id表示当前活动页面的id
    this.selectData(this.$route.params.id)
  }
}
</script>
<style scoped>
.infoClass span {
  display: block;
}
</style>
