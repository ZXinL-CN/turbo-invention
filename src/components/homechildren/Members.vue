<template>
  <div>
    <!-- 遍历循环tableData，其中index为每个卡片的索引值 -->
    <el-card class="box-card" v-for="(item,index) in tableData" :key="index" style="cursor: pointer;margin-bottom: 15px; margin-left: 80px;width: 500px;display: inline-block;">
      <div @click="selectData(index)">
        <div slot="header" class="clearfix">
        <span>{{item.user_name}}</span>
        <!-- 通过substring来对字符串进行切割 -->
        <el-avatar style ="float: right; margin-top: -8px;" shape="square" >{{item.user_name.substring(0,1)}}</el-avatar>
        </div>
        <el-divider></el-divider>
        <div>
          <span v-if="item.gender === '男'"><i class="el-icon-male" style="color:blue; font-size: 25px"></i></span>
          <span v-else-if="item.gender === '女'"><i class="el-icon-female" style="color:pink; font-size: 25px"></i></span>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 初始化列表数据
    return {
      tableData: []
    }
  },
  // created已经将data和methods初始化好
  // 并且执行getTableData
  created () {
    this.getTableData()
    document.title = 'Member information'
  },
  methods: {
    getTableData () {
      // 发起axios请求
      this.$http.get('members')
        .then(res => {
          // 判断如果成功，则将获取到的数据添加到页面上，函数执行中止
          if (res.data.meta.success === true) {
            this.tableData = res.data.data
            // console.log(this.tableData)
            return
          }
          // 否则显示 '获取成员信息失败'
          this.$message.error('获取成员信息失败')
        })
        // eslint-disable-next-line handle-callback-err
        .catch(error => {
          // console.log(error)
        })
    },

    // 查询某位成员的详细信息
    selectData (index) {
      // console.log(index)
      this.$http.get('members')
        .then(res => {
          this.$router.push('memberinfo/' + res.data.data[index].id)
        })
    }
  }
}
</script>

<style scoped>
</style>
