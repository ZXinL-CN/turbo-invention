<template>
  <!-- 面包屑导航区 -->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/logs' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>动态</el-breadcrumb-item>
      <el-breadcrumb-item>团队动态</el-breadcrumb-item>
      <el-breadcrumb-item>日志草稿</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card shadow="hover">
      <div style="margin-top: 15px;">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input
              placeholder="请输入内容"
              v-model="queryinfo.keyword"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getdraftlist"
              ></el-button>
            </el-input>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <div class="a">
      <el-card
        class="box-card"
        style="margin-top: 15px;"
        v-for="(item,index) in getdraft"
        :key="index"
      >
        <div
          class="spanStyle"
          @click="getdraftmessage(index)"
        >
          <span style="font-weight: 600">草稿标题：{{item.title}}</span>
          <span>作者：{{item.author_name}}</span>
          <span>创建时间：{{item.creator_time}}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default {
  data () {
    return {
      queryinfo: {
        author_id: '',
        keyword: ''
      },
      // 初始化数据
      getdraft: [],
      activeNames: ['1'],
      list: []
    }
  },
  mounted () {
    this.getdraftlist()
  },
  created () {
    document.title = 'Draft List'
  },
  methods: {
    // 获取日志草稿列表
    getdraftlist () {
      //   console.log(this.queryinfo)
      this.$http.get(`logs/draft?author_id=${this.queryinfo.author_id}&keyword=${this.queryinfo.keyword}`)
        .then(response => {
          // var id = window.sessionStorage.getItem('id')
          // console.log(response)
          this.getdraft = response.data.data
        })
        // eslint-disable-next-line handle-callback-err
        .catch(function (error) { // 请求失败处理
          // console.log(error)
        })
    },
    // 点击查看日志草稿按钮跳转到日志草稿详情页,并将查看日志草稿的id传到日志草稿详情页中
    getdraftmessage (index) {
      const id = this.getdraft[index].id
      this.$router.push({
        path: '/getdraftbyid',
        query: {
          id: id,
          name: 'getdraftgbyid'
        }
      })
    },
    handleChange (val) {
      // console.log(val)
    }
  }

}
</script>
<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
.el-pagination {
  margin-top: 15px;
}
.spanStyle {
  display: flex;
  height: 50px;
}
.spanStyle span {
  flex: 1;
  font-size: 20px;
  line-height: 50px;
}
.a .el-card {
  cursor: pointer;
}
</style>
