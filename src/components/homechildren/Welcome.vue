<template>
  <div class="container">
    <!-- <p align="center">Welcome To BarTeam</p> -->
    <!-- <el-calendar v-model="value" style="width: 100%;margin-top: -40px">
      </el-calendar> -->
    <div class="Midcontainer">
      <div id="EContent"></div>
      <div class="es2">
        <h3 align="center" style="margin-top : 0">近期团队动态展示</h3>
        <el-card v-for="(item,index) in getlog" :key="index" @click.native="getrouter(index)">
          <div class="carddiv">
              <span style="font-weight: 600; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; "> 标题:{{item.title}}</span>
              <span>作者:{{item.author_name}}</span>
              <span>创建时间:{{item.creator_time}}</span>
          </div>
        </el-card>
      </div>
    </div>
    <!-- <p @click="gethobbies">我是用来获取请求的</p> -->
  </div>
</template>
<script>
import moment from 'moment';
export default {
  data() {
    return {
      value: new Date(),
      memberData:[],
      manNum:0,
      womNum:0,
      queryinfo:{
          author_id:'',
          keyword:''

      },
      // 只留前4个
      lognum:0,
      // 团队日志数组
      getlog:[]
    };
  },
  created() {
    document.title = "Welcome to BarTeam";
  },
  mounted() {
    // 获取图标数据
    this.getMember().then(data=>{
      this.getChartData(data.manNum,data.womNum);
    })
    this.getlogslist();
  },
  methods: {
    // 跳转日志详情
    getrouter(index){
      const id = this.getlog[index].id
      console.log('dddddd')
        this.$router.push({
        path: '/getlogbyid',
        query: {
          id: id,
          name: 'getlogbyid'
        }
      })
    },
    // 获取团队日志列表
    getlogslist () {
      let datalist
      // let Arraydata = [] 
      let that = this;
       let url = 'logs';
       let author_id = this.queryinfo.author_id;
       let keyword = this.queryinfo.keyword;
       let params = {
          author_id:author_id,
          keyword:keyword
       }
       console.log('23456')
      // console.log(this.queryinfo)
      this.reqM1Service(url,params,'get').then(res=>{
        console.log(this.getlog)
         datalist = res.data.data
         console.log(datalist)
          let lognum = 0;
        for(let v of datalist){
              lognum++
          if(lognum<5){
            v.creator_time = moment(v.creator_time).format('YYYY-MM-DD HH:mm:ss')
          }
        }
        this.getlog = datalist
      })
    },
    //获取爱好请求
    // gethobbies(){
    //       this.$http.get('http://42.192.152.99:3000/hobbies').then(res=>{
    //         console.log(res)
    //       }).catch(err=>{
    //         console.log(err)
    //       })
    // },
    //获取处理后的数据
    getChartData(manNum,womNum){
      console.log(manNum,womNum)
    let Tudom = document.getElementById("EContent");
          this.drawTu(Tudom,manNum,womNum)
    },
    //画饼状图
    drawTu(dom,manNum,womNum) {
      console.log(manNum,womNum)
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(dom);
      // 绘制图表
      let option = {
        title: {
          text: "bar团队人员大致分配情况",
          subtext: `共${manNum+womNum}名团队成员`,
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          top: "10%",
          data:['男生','女生']
        },
        series: [
          {
            name: "bar团队",
            type: "pie",
            radius: "50%",
            left: "5%",
            
            data: [
              { value:manNum , name: "男生" },
              { value: womNum, name: "女生" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
                shadowOffsetX: 0,
              },
            },
            lable: {
             formatter: '{b}: {d}'
            },
            labelLine: {
              show: true,
              length: 20,
              length2: 10,
            },
          },
        ],
      };
      myChart.setOption(option);
    },
    //获取成员的信息
     getMember(){
       console.log('11')
       return new Promise((resolve,reject)=>{
           this.reqM1Service('members','','get').then(res=>{
                    if(res.status === 200){
                      let data = res.data.data;
                      console.log(res)
                      data.forEach(item=>{
                            if(item.gender === '男'){
                              console.log(this)
                              this.manNum +=1
                            }else{
                              this.womNum +=1
                            }
                      })
                      // console.log(that.manNum,that.womNum)
                      let manNum = this.manNum;
                      let womNum = this.womNum;
                      resolve({manNum,womNum})
                    }
              // this.drawTu(Tudom,this.manNum,this.womNum)
            }).catch(err=>{
              console.log(err)
            })
       })
    }
  },
};
</script>
<style lang="less" scope>
.container {
  // overflow-y: hidden;
  height:100%;
  .Midcontainer {
    width:100%;
    padding-top: 40px;
    display: flex;
    align-items: center;
    // justify-content: center;
    #EContent {
      width:50%;
      // height:100%;
      height:500px;
      // background-color: gold;
      flex: 1;
    }
    .es2{
      flex:1;
      width:50%;
      height:500px;
      // background-color: red;
      .carddiv{
        display: flex;
        // margin-bottom: 15px;
        align-items: center;
        cursor: pointer;
        // justify-content:space-around;
        span{
          flex:1;
        }
      }
      .el-card{
        margin-bottom: 15px;
      }
      // .el-card{
      //   height:70px;
      //   line-height: 70px;
      //   // display: flex;
      //   // align-items: center;
      //   // justify-content: center;
      //   // span{
      //   //   line-height: 70px;
      //   // }
      //   margin-bottom:10px;
      // }
    }
  }
}
p {
  font-size: 24px;
}
</style>
