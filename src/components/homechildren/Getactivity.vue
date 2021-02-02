<template>
  <div style="width:90%;margin:0 auto;height:100%;overflow-y:scroll">
    <el-page-header
      @back="goBack"
      content="活动详情"
    ></el-page-header>
    <div class="a">
      <el-card
        class="box-card"
        v-for="(item,index) in getActivitiesManage"
        :key="index"
      >
        <div class="text">
          <span style="font-weight: 600">活动标题：{{item.title}}</span>
          <span>申请人姓名：{{item.author_name}}</span>
          <span style="color:rgb(134, 134, 134)">开始时间：
            <el-date-picker
              v-model="item.start_time"
              type="datetime"
              placeholder="修改日期时间"
              class="datatime"
              value-format="yyyy-MM-dd hh:mm:ss"
              @change="getTime(item.id,item.start_time)"
            >
            </el-date-picker>
          </span>
          <span>申请时间：{{item.creator_time}}</span>
          <span
            v-if="Date.parse(item.start_time) <= new Date()"
            style="float:right; font-size: 20px; font-weight: 600; color: #ff3300;"
          >活动已过期</span>
          <span
            v-else
            style="float:right; font-size: 20px; font-weight: 600; color: #208020;"
          >活动未开始</span>
          <p>附件信息：
            <span
              v-if="JSON.parse(item.files).length == 0"
              class="files"
            >无</span>
            <span
              v-for="file in JSON.parse(item.files)"
              @click="download(file.id,file.file_type)"
              :key="file.id"
              class="files"
            ><i class="el-icon-paperclip"></i>{{ file.original_name }}</span>
          </p>
          <p v-if="Date.parse(item.start_time) <= new Date()">活动状态：活动已过期</p>
          <p v-else-if="item.state == 1">活动状态:
            <el-switch
              v-model="item.state"
              active-color="#4751df"
              inactive-color="#62636d"
              active-text="审核已通过"
              inactive-text="审核状态中"
              :active-value="2"
              :inactive-value="1"
              @change="handleChange(item.id, item.state)"
            >
            </el-switch>
          </p>
          <p v-else>活动状态:
            <el-switch
              v-model="item.state"
              active-color="#4751df"
              inactive-color="#62636d"
              active-text="审核已通过"
              inactive-text="审核状态中"
              :active-value="2"
              :inactive-value="1"
              @change="handleChange(item.id, item.state)"
            >
            </el-switch>
          </p>
          <p>活动内容:{{item.content}}</p>
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
      // 获取得数据
      getActivitiesManage: [],
      now_time: ''
    }
  },
  created () {
    this.activitiesmanagement()
  },
  methods: {
    activitiesmanagement () {
      this.$http.get('admin/activities')
        .then(res => {
          // console.log(res)
          const list = res.data.data
          this.getActivitiesManage = list.map(item => {
            item.creator_time = moment(new Date(parseInt(item.creator_time))).format('YYYY-MM-DD HH:mm:ss')
            return item
          })
          if (res.data.meta.success !== true) {
            this.$message.error('查看失败')
          }
        })
    },
    download (id, fileType) {
      if (!id) {
        return
      }
      this.$http.get('/files/download/' + id).then(res => {
        this.$message.success('正在下载')
        // console.log(res)
        this.downloadFile(res.data, Date.parse(new Date()) + fileType)
      })
    },
    downloadFile (content, filename) {
      const blob = new Blob([content]) // 创建一个类文件对象：Blob对象表示一个不可变的、原始数据的类文件对象
      const url = window.URL.createObjectURL(blob) // URL.createObjectURL(object)表示生成一个File对象或Blob对象
      const dom = document.createElement('a') // 设置一个隐藏的a标签，href为输出流，设置download
      dom.style.display = 'none'
      dom.href = url
      dom.setAttribute('download', filename) // 指示浏览器下载url,而不是导航到它；因此将提示用户将其保存为本地文件
      document.body.appendChild(dom)
      dom.click()
    },
    // 点击返回按钮跳转到活动列表页面
    goBack () {
      this.$router.push('/activities')
    },
    // 修改活动状态
    handleChange (id, state) {
      state = ((Number(state) === 2) ? 1 : 2)
      // console.log(state)
      this.$http.put('admin/activities/' + id,
        {
          state: state
        })
        .then(res => {
          if (res.data.meta.success !== true) {
            this.$message.error('修改活动状态失败')
          }
        })
    },
    // 修改时间
    getTime (id, date) {
      // console.log(date)
      this.$http.put('admin/activities/' + id,
        {
          start_time: date
        })

        .then(res => {
          // console.log(res)
          if (res.data.meta.success !== true) {
            this.$message.error('修改日期失败')
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
.box-card {
  margin-top: 10px;
}
.text {
  font-size: 18px;
  padding: 18px 0;
}
.text span {
  margin-right: 30px;
}
.text .files {
  cursor: pointer;
}
.text .files:hover {
  color: rgb(46, 91, 212);
}
.text p {
  font-size: 18px;
}
</style>
