<template>
  <div style="width:90%; height:100%; margin:0 auto">
    <el-form :data="activitiesform">
      <el-form-item
        label="发布活动:"
        prop="title"
      >
        <el-col :span="6">
          <el-input v-model="activitiesform.title"></el-input>
        </el-col>
        <el-form-item style="float: right;">
          <el-button
            type="primary"
            @click="releaseactivitiescontent"
          >发布</el-button>
          <el-button @click="goback">取消</el-button>
        </el-form-item>
      </el-form-item>
      <span style="margin-right: 5px; font-size: 14px; color: #606266;">开始时间:</span>
      <el-date-picker
        v-model="activitiesform.start_time"
        type="datetime"
        placeholder="选择日期时间"
        class="datatime"
        value-format="yyyy-MM-dd hh:mm:ss"
        @change="getTime"
      >
      </el-date-picker>
      <el-upload
        action=""
        class="upload-demo"
        :file-list="fileList"
        :auto-upload="false"
        :limit="1"
        :on-change="onChange"
        :on-remove="handleRemove"
      >
        <el-button
          slot="trigger"
          size="small"
          type="primary"
        >选取文件</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          type="success"
          @click="submitUpload"
        >上传到服务器</el-button>
        <div
          slot="tip"
          class="el-upload__tip"
        ></div>
      </el-upload>
      <el-input
        type="textarea"
        :rows="10"
        placeholder="请输入内容"
        v-model="activitiesform.content"
        style="margin-top: 30px"
      >
      </el-input>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activitiesform: {
        start_time: '',
        title: '',
        content: '',
        files: []
      },
      fileList: [],
      timer: ''
    }
  },
  methods: {
    releaseactivitiescontent () {
      this.reqM1Service('activities',
        {
          start_time: this.activitiesform.start_time,
          title: this.activitiesform.title,
          content: this.activitiesform.content,
          files: JSON.stringify(this.activitiesform.files)
        },'post')
        .then(res => {
          // console.log(res)
          if (res.data.meta.success !== true) {
            this.$message.error('发布失败')
          } else {
            this.$message.success('发布成功')
            // 发布成功后跳转到活动列表页
            this.$router.push('/activities')
          }
        })
    },
    // 点击返回按钮跳转到活动列表页面
    goback () {
      this.$router.push('/activities')
    },
    submitUpload: async function () {
      var formData = new FormData()
      // console.log(this.fileList)
      formData.append('file', this.fileList[0])
      var options = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      await this.$http.post('/files/upload', formData, options)
        .then(res => {
          if (res.data.meta.success !== true) {
            this.$message.error('上传失败')
          } else {
            this.$message.success('上传成功')
            // console.log(res)
            this.fileList.pop()
            this.activitiesform.files.push(res.data.data)
          }
        })
    },
    onChange (file, fileList) {
      this.fileList.push(file.raw)
    },
    handleRemove (file, fileList) {
      this.fileList.pop()
    },
    getTime (date) {
      this.activitiesform.start_time = date
    }
  }
}
</script>
<style lang="less" scoped>
.datatime {
  margin-bottom: 10px;
}
</style>
