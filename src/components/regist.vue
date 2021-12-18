<template>
  <div class="Re_container">
    <input type="text" placeholder="账号" name="username" id="username" />
    <input type="password" name="passwd" id="pwd" placeholder="密码" />
    <input type="button" value="提交" id="subbtn" @click="btnreg" />
    <!-- {if obj.username}
    {{obj.username}}
    {/if} -->
  </div>
</template>
<script>
// import axios from "axios";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    btnreg(e) {
      let that = this;
      e.preventDefault();
      let username = document.getElementById("username").value;
      username = username.toString();
      let passwd = document.getElementById("pwd").value;
      passwd = parseInt(passwd);
      console.log(typeof username, typeof passwd);
      // axios({
      //   url: "http://localhost:3000/regist",
      //   method: "post",
      //   data:{
      //     username,
      //     passwd
      //   },
      //   // headers: {}
      // })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      this.reqM2Service('regist',{username,passwd},"post").then(res=>{
        that.obj = res.data.data;
        console.log(that.obj)
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
  },
};
</script>
<style lang="less" scope>
</style>