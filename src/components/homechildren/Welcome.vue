<template>
  <div class="container">
    <!-- <p align="center">Welcome To BarTeam</p> -->
    <!-- <el-calendar v-model="value" style="width: 100%;margin-top: -40px">
      </el-calendar> -->
    <div class="Midcontainer">
      <div id="EContent"></div>
      <div class="es2" style="backgroundcolor: blue">43534534534</div>
    </div>
  </div>
</template>
<script>
// import * as echarts from "echarts";
const echarts = require("echarts");
export default {
  data() {
    return {
      value: new Date(),
      memberData:[],
      manNum:0,
      womNum:0,
      
    };
  },
  created() {
    document.title = "Welcome to BarTeam";
  },
  mounted() {
    this.getMember().then(data=>{
      this.getChartData(data.manNum,data.womNum);
    })
  },
  methods: {
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
      var myChart = echarts.init(dom);
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
           this.$http.get('/members').then(res=>{
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
    padding-top: 40px;
    display: flex;
    align-items: center;
    // justify-content: center;
    #EContent {
      // height:100%;
      height:500px;
      // background-color: gold;
      flex: 1;
    }
    .es2{
      flex:1;
      height:500px;
      // background-color: red;
    }
  }
}
p {
  font-size: 24px;
}
</style>
