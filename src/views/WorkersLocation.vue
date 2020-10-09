<template>
  <div class="pathQuery">
    <div class="header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="formInline.overall" clearable placeholder="全局展示">
            <el-option label="全局一" value="全局一"></el-option>
            <el-option label="全局二" value="全局二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.region" clearable placeholder="区域查看">
            <el-option label="区域一" value="区域一"></el-option>
            <el-option label="区域二" value="区域二"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-right:0">
          <el-input
              class="input-text"
              v-model="formInline.person"
              placeholder="请搜索人员(英文名须严格大小写)"
              @keyup.enter.native="onSubmit"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
              type="primary"
              icon="el-icon-search"
              class="cx-btn"
              @click="onSubmit"
          >搜索</el-button
          >
        </el-form-item>
      </el-form>
      <div class="time-box">
        <now-time></now-time>
        <div class="time-tips" ref="timeTips">{{ hoursTip }}</div>
      </div>
    </div>
    <!-- 地图 -->
    <div class="map-wrap">
      <Workers ref="MAP"></Workers>
    </div>
  </div>
</template>

<script>
import nowTime from "../components/Timer"; //时间
import Workers from "../components/Workers"; //地图
export default {
  name: "WorkersLocation",
  components: { nowTime, Workers },
  data() {
    return {
      formInline: {
        overall: "",
        region: "",
        person: ""
      },
      hoursTip: "AM",
    };
  },
  methods: {
    // 搜索
    onSubmit() {
      let flag=false; //判断员工是否找到
      //console.log(this.$refs.MAP.markers[0].name);
      /*Vue组件间的调用*/
      for(let i=0;i<this.$refs.MAP.markers.length;i++){
        if(this.$data.formInline.person==this.$refs.MAP.markers[i].name){
          this.$refs.MAP.markers[i].showFlag=true;
          flag=true;
        }
      }
      if(!flag){
        alert("未找到此员工!!!");
      }
    },
    // 判断时间
    getMycount: function() {
      let self = this;
      let date = new Date();
      if (date.getHours() >= 0 && date.getHours() < 12) {
        self.hoursTip = "AM";
      } else if (date.getHours() >= 12 && date.getHours() < 18) {
        self.hoursTip = "PM";
      } else {
        self.hoursTip = "PM";
      }
    }
  },
  created() {     //在计时器生命周期内执行
    this.getMycount();
  }
};
</script>
<style lang="scss">
.pathQuery {
  .header {
    display: flex;
    justify-content: space-between;
    .el-form-item {
      margin-right: 20px;
    }
    .el-form-item__content {
      line-height: 30px;
      .el-input__inner {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        width: 100px;
      }
      .input-text {
        .el-input__inner {
          width: 220px;
        }
      }
      .el-input {
        display: flex;
      }
      .el-input__icon {
        line-height: 30px;
        font-size: 12px;
      }
      .cx-btn {
        height: 30px;
        line-height: 30px;
        padding: 0;
        margin-left: -8px;
        width: 70px;
        background: linear-gradient(-270deg, #239679, #01664f);
        border-radius: 4px;
        border: none;
        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
}
.item-pop {
  .pop {
    padding: 20px 18px;
  }
  .hd-title {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    .text {
      font-size: 18px;
      display: flex;
      align-items: center;
      .total {
        padding-left: 24px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 14px;
        display: flex;
        .t-num {
          color: #ff8a00;
          padding-left: 12px;
        }
      }
    }
  }
  .icon-guanbi {
    font-size: 12px;
    cursor: pointer;
  }

  .el-table {
    &::before {
      display: none;
    }

    background: transparent;
    th {
      border: none;
      color: #fff;
      background: rgba(250, 250, 250, 0.1);
      padding: 9px 14px;
    }
    tr {
      background: transparent;
      &:hover {
        td {
          background: rgba(250, 250, 250, 0.2);
        }
      }
      &:nth-child(2n) {
        background: rgba(250, 250, 250, 0.1);
      }

      td {
        padding: 9px 14px;
        color: #fff;
        border: none;

        &:nth-child(2) {
          color: #ff8a00;
        }
      }
    }
  }
}
.pop-box {
  position: absolute;
  top: 20px;
  bottom: 60px;
  right: 45px;
  z-index: 2;
  .item-pop {
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
    &.active {
      height: 50%;
    }

    .pop {
      height: 100%;
      border-radius: 4px;
      width: 280px;
      background: rgba(0, 0, 0, 0.8);
    }
    .sec {
      height: calc(100% - 40px);
      overflow: auto;

      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-track {
        background-color: transparent;
        border-radius: 2em;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #50565b;
        border-radius: 2em;
      }
    }
    .btn {
      width: 110px;
      height: 40px;
      background: rgba(0, 0, 0, 0.8);
      box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.1);

      border-radius: 4px;
      font-size: 18px;
      font-weight: bold;
      color: #ffffff;
      border: none;
      cursor: pointer;
      transition: 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.9);
      }
    }
  }
}
.list-wrap {
  height: calc(100% - 40px);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 2em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #50565b;
    border-radius: 2em;
  }
  .his-list {
    .h-item {
      .content {
        display: flex;
        justify-content: space-between;
        line-height: 24px;
      }
      .title {
        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        color: #fff;
        position: relative;
        padding-left: 16px;

        &::before {
          content: "";
          position: absolute;
          top: 50%;
          margin-top: -8px;
          left: 0;
          width: 14px;
          height: 16px;
          background: url("../assets/img/tongzhi-red.png") no-repeat;
          background-size: contain;
        }
      }
      .time {
        color: #fff;
        opacity: 0.4;
        font-weight: 500;
        font-size: 14px;
      }
      .det {
        font-size: 12px;
        font-weight: 500;
        color: #ffffff;
        line-height: 18px;
        opacity: 0.6;
        padding-left: 16px;
        margin-top: 10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
  }
  .of-his-list {
    margin-top: 20px;
    .h-item {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }
      .title {
        &::before {
          width: 4px;
          height: 4px;
          background: #fff;
          border-radius: 50%;
          margin-top: -3px;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.pathQuery {
  width: 100%;
  padding: 20px 20px 10px 20px;
  background: #fff;
  height: calc(100% - 20px);
  margin-top: 10px;
}
.time-box {
  display: flex;
  .nowDate {
    font-size: 40px;
    font-weight: bold;
    color: #01664f;
  }
  .time-tips {
    color: #01664f;
    font-size: 14px;
    position: relative;
    top: 4px;
    margin-left: 5px;
  }
}
.map-wrap {
  background: #ccc;
  height: calc(100% - 52px);
  position: relative;
  overflow: hidden;
}

</style>