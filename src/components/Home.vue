<template>
  <el-container class="container">
    <!-- 首部 -->
    <el-header style="background-color: #f5f5f5">
      <div>
        <img src="../assets/images/log.jpg" style="border-radius: 10px" />
        <!-- <span>团队</span><br> -->
        <!-- <span>{{user_name}}</span>
        <span
          style="font-size: 14px; cursor: pointer; margin-left:20px;"
          @click="updatepwd()"
        >修改密码</span>
      <el-button
        @click="loginout"
        style="margin-right: -20px;"
      >退出</el-button> -->
        
      </div>
      <div class="headright">
          <!-- <span class="demonstration">{{user_name}}</span> -->
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{user_name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="updatepwd()">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="loginout"
                >退出</el-dropdown-item
              >
              <el-dropdown-item @click.native="showper()"
                >个人信息</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <!-- 左侧内容区 -->
      <el-aside
        :width="istoggle ? '64px' : '230px'"
        style="background-color: #f5f5f5"
      >
        <div class="toggle-button" @click="togglefoldopen">|||</div>
        <!-- 侧边栏区域 -->
        <el-menu
          background-color="#f5f5f5"
          text-color="#000000"
          active-text-color="#ffd04b"
          :collapse="istoggle"
          :collapse-transition="false"
          :router="true"
          default-active="$router.path"
          unique-opened
        >
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-comment"></i>
              <span>信息</span>
            </template> -->
          <!-- <el-menu-item index="/myself">
            <i class="el-icon-user-solid"></i>
            <span slot="title">个人信息</span>
          </el-menu-item> -->
          <el-menu-item index="/activities">
            <i class="el-icon-s-grid"></i>
            <span slot="title">活动信息</span>
          </el-menu-item>
          <!-- </el-submenu> -->
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>成员</span>
            </template> -->
          <el-menu-item index="/members">
            <i class="el-icon-user-solid"></i>
            <span slot="title">成员信息</span>
          </el-menu-item>
          <!-- </el-submenu> -->
          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-message-solid"></i>
              <span>动态</span>
            </template> -->
          <el-menu-item index="/logs">
            <i class="el-icon-message"></i>
            <span slot="title">团队动态</span>
          </el-menu-item>
          <!-- </el-submenu> -->
          <!-- <el-submenu index="4"  v-show="isShow">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>管理</span>
            </template> -->
          <el-menu-item index="/getuser" v-show="isShow">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/getactivity" v-show="isShow">
            <i class="el-icon-s-grid"></i>
            <span slot="title">活动管理</span>
          </el-menu-item>
          <!-- </el-submenu> -->
        </el-menu>
      </el-aside>
      <!-- 右侧内容区 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      istoggle: false,
      // account_number: '',
      user_name: "",
      role_code: "",
      isShow: false,
    };
  },
  created() {
    document.title = "BarTeam's homepage";
    this.showNumber();
    this.role_code = window.sessionStorage.getItem("role_code");
    if (this.role_code > 0) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  },
  updated() {
    this.Activefolding();
  },
  methods: {
    showper(){
          this.$router.push('/myself')
    },
    loginout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
     showNumber() {
      // const res = await this.$http.get("myself");
      this.reqM1Service('myself','','get').then(res=>{
      this.user_name = res.data.data.user_name;
      })
      // console.log(res.data.data.account_number)
    },
    // 侧边栏菜单折叠展开
    togglefoldopen() {
      this.istoggle = !this.istoggle;
    },
    // 跳转到发布日志和修改日志，侧边栏自动隐藏
    Activefolding() {
      const routePath = this.$route.path;
      if (routePath === "/addlog" || routePath === "/updatelog") {
        this.istoggle = true;
      }
    },
    updatepwd() {
      this.$router.push("/updatepwd");
    },
  },
};
</script>
<style lang="less" scope>
.container {
  height: 0;
  min-height: 100%;
  /* background-color: #000000; */
  .headright{
    float: right;
    .el-dropdown{
      cursor: pointer;
    }
  }
}
.el-header {
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: 0 3px 0 #e5e5e5;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  > div {
    color: #000000;
    font-size: 22px;
    font-weight: 900px;
    display: flex;
    align-items: center;
    text-align: center;
    margin-left: 15px;
  }
}
.el-header img {
  width: 60px;
  height: 50px;
  margin-top: -2px;
}
.el-aside {
  background-color: #fafafa;
  border-right: none;
  > .el-menu {
    border-right: none;
  }
}
.el-main {
    background-color: #ffffff;
    border-left: 1px solid #e5e5e5;
}
.toggle-button {
  font-size: 15px;
  height: 56px;
  line-height: 56px;
  color: #746e6e;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
  /* transform: rotate(90deg); */
}
.toggle-button:hover {
  background: rgb(196, 196, 196);
}
.el-button {
  background: whitesmoke;
  outline-style: none;
}
.el-button:hover {
  color: #606266;
}
</style>
