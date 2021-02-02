<template>
  <!-- 面包屑导航区 -->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>动态</el-breadcrumb-item>
      <el-breadcrumb-item>团队动态</el-breadcrumb-item>
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
                @click="getlogslist"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-button
              type="primary"
              round
              @click="releaselog"
              style="float: right;"
            >发布日志</el-button>
            <el-button
              type="primary"
              round
              @click="draftlist"
            >我的草稿</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <div class="a">
      <el-card
        class="box-card"
        style="margin-top: 15px;"
        v-for="(item,index) in getlog"
        :key="index"
      >
        <div
          class="spanStyle"
          @click="getjournal(index)"
        >
          <span style="font-weight: 600; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; ">标题：{{item.title}}</span>
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
      getlog: [],
      activeNames: ['1']
    }
  },
  mounted () {
    this.getlogslist()
  },
  created () {
    document.title = 'Log List'
  },
  methods: {
    // 获取日志列表
    getlogslist () {
      // console.log(this.queryinfo)
      this.$http.get(`logs?author_id=${this.queryinfo.author_id}&keyword=${this.queryinfo.keyword}`)
        .then(response => {
          // console.log(response)
          const list = response.data.data
          this.getlog = list.map(item => {
            item.creator_time = moment(new Date(item.creator_time)).format('YYYY-MM-DD HH:mm:ss')
            return item
          })
        })
        // eslint-disable-next-line handle-callback-err
        .catch(function (error) { // 请求失败处理
          // console.log(error)
        })
    },
    // 点击查看日志按钮跳转到日志详情页,并将查看日志的id传到日志详情页中
    getjournal (index) {
      const id = this.getlog[index].id
      this.$router.push({
        path: '/getlogbyid',
        query: {
          id: id,
          name: 'getlogbyid'
        }
      })
      this.getlogslist()
    },
    // 点击发布日志按钮跳转到发布日志页面
    releaselog () {
      this.$router.push('/addlog')
    },
    handleChange (val) {
      // console.log(val)
    },
    draftlist () {
      this.$router.push('/drafts')
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
