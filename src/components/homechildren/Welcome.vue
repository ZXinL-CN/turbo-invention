<template>
    <div class="container">
      <p align="center">Welcome To BarTeam</p>
      <el-calendar v-model="value" style="width: 100%;margin-top: -40px">
      </el-calendar>
    </div>
</template>
<script>
export default {
  data () {
    return {
      value: new Date()
    }
  },
  created () {
    document.title = 'Welcome to BarTeam'
  }
}
</script>
<style>
  .container {
    overflow-y: hidden;
  }
  p {
    font-size: 24px;
  }
</style>
