<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息</el-breadcrumb-item>
      <el-breadcrumb-item>活动信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <div style="margin-top: 15px; margin-bottom: 15px;">
      <el-row :gutter="20">
        <el-col :span="6">
        </el-col>
        <el-col :span="6">
          <el-button
            type="primary"
            round
            @click="applyactivities()"
          >申请活动</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="a">
      <el-card
        class="box-card"
        v-for="(item,index) in getactivities"
        :key="index"
      >
        <div class="text item">
          <span
            v-if="Date.parse(item.start_time) <= new Date()"
            style="float:right; font-size: 20px; font-weight: 600; color: #ff3300;"
          >活动已过期</span>
          <span
            v-else
            style="float:right; font-size: 20px; font-weight: 600; color: #208020;"
          >活动未开始</span>
          <p style="font-weight: 600">活动标题：{{item.title}}</p>
          <p>申请人姓名：{{item.author_name}}</p>
          <p style="color:  rgb(134, 134, 134)">开始时间：{{item.start_time}}</p>
          <p>附件信息：
            <span v-if="JSON.parse(item.files).length == 0">无</span>
            <span
              v-for="file in JSON.parse(item.files)"
              @click="download(file.id,file.file_type)"
              :key="file.id"
            ><i class="el-icon-paperclip"></i>{{ file.original_name }}</span>
          </p>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      getactivities: []
    }
  },
  methods: {
    getactivitieslist () {
      this.$http.get('activities')
        .then(res => {
          console.log(res)
          this.getactivities = res.data.data
          if (res.data.meta.success !== true) {
            this.$message.error('获取活动列表失败')
          }
        })
    },
    download (id, fileType) {
      if (!id) {
        return
      }
      this.$http.get('/files/download/' + id).then(res => {
        this.$message.success('正在下载')
        console.log(res)
        this.downloadFile(res.data, Date.parse(new Date()) + fileType)
      })
    },
    applyactivities () {
      this.$router.push('/applyactivities')
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
    }
  },
  mounted () {
    this.getactivitieslist()
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
.a {
  display: flex;
  flex-flow: row wrap;
}
.el-card {
  width: 24%;
  margin-right: 10px;
  margin-top: 10px;
  cursor: pointer;
}
.text {
  font-size: 18px;
}
.item {
  padding: 18px 0;
}
span {
  cursor: pointer;
}
span:hover {
  color: rgb(46, 91, 212);
}
p {
  font-size: 18px;
}
</style>
