<template>
  <fullscreen class="map-box" ref="fullscreen" @change="fullscreenChange">
    <baidu-map
      class="map"
      :center="{ lng: 118.937284, lat: 32.119823 }"
      :zoom="16"
      :scroll-wheel-zoom="true"
      :map-click="false"
    >
      <div v-for="(marker, index) of markers" :key="index">
        <bm-marker
          :position="{lng: marker.lng,lat: marker.lat}"
          :title="marker.name"
          :mass-clear="false"
          :dragging="false"
          animation="BMAP_ANIMATION_DROP"
          @click="infoWindowOpen(marker)"
          @mouseover="infoWindowOpen(marker)"
          :icon="
            marker.showFlag
              ? { url: marker.iconOn, size: { width: 40, height: 40 } }
              : { url: marker.icon, size: { width: 40, height: 40 } }
          "
        >
          <bm-info-window
            title="人员信息"
            :position="{ lng: marker.lng, lat: marker.lat }"
            :show="marker.showFlag"
            @close="infoWindowClose(marker)"
            @open="infoWindowOpen(marker)"
          >
            <ul class="info">
              <li>
                工号：
                <span>{{ marker.number }}</span>
              </li>
              <li>
                姓名：
                <span>{{ marker.name }}</span>
              </li>
              <li>
                设备：
                <span>{{ marker.eq }}</span>
              </li>
              <li>
                所在区域：
                <span>{{ marker.area }}</span>
              </li>
              <li>
                <button style="float:right;margin-top:5px;font-size:14px;width:70px;height:20px" @click="Path">
                  {{Pathhistory.following?"停止跟踪":"开始跟踪"}}
                </button>
              </li>
            </ul>
          </bm-info-window>
          <bm-label
            :content="marker.nameInfo"
            :position="{ lng: marker.lng, lat: marker.lat }"
            :labelStyle="{
              color: '#282828',
              fontSize: '12px',
              border: 'none',
              background: 'none',
              marginTop: '40px',
              textAlign: 'center',
              display: 'block',
              left: '50%',
              transform: 'translateX(-14%)',
              textShadow: '0px 2px 14px rgba(0, 0, 0, 0.1)'
            }"
          />
        </bm-marker>
        <bm-polyline
              :path="Pathhistory.flag==1?Pathhistory.paths1:Pathhistory.paths2"
              stroke-color="red"
              :stroke-opacity="0.5"
              :stroke-weight="2"
              :editing="false"
        >
        </bm-polyline>
        <bml-lushu
            :path="Pathhistory.flag==1?Pathhistory.paths1:Pathhistory.paths2"
            :play="true"
            :speed="500"
            :icon="lushuicon"
        >
        </bml-lushu>
      </div>
    </baidu-map>
    <!-- 控件 -->
    <div :class="btnShow ? 'control-box' : 'control-box active'">
      <el-button icon="iconfont icon-huidaodingbu" @click="putUp"></el-button>
      <el-button icon="iconfont icon-quanping" @click="toggle"></el-button>
      <el-button icon="iconfont icon-tubiaoku-" @click="reduction"></el-button>
      <el-button icon="el-icon-plus" @click="enlarge"></el-button>
      <div class="num">100</div>
      <el-button icon="el-icon-minus" @click="narrow"></el-button>
    </div>
    <!-- 悬浮框 -->
    <div class="pop-box">
      <div :class="isActive ? 'item-pop' : 'item-pop active'">
        <div class="pop" v-if="showModal">
          <header class="hd-title">
            <div class="text">
              人员统计
              <div class="total">
                总人数
                <span class="t-num">5656</span>
              </div>
            </div>
            <div class="iconfont icon-guanbi" @click="closeShowModal"></div>
          </header>
          <section class="sec">
            <el-table :data="tableData" style="width: 100%" class>
              <el-table-column
                prop="areaName"
                label="区域名"
                width
              ></el-table-column>
              <el-table-column prop="pNum" label="人数" width></el-table-column>
            </el-table>
          </section>
        </div>
        <button @click="MshowModal" v-if="!showModal" class="btn">
          人员统计
        </button>
      </div>
      <div :class="isActive ? 'item-pop' : 'item-pop active'">
        <div class="pop" v-if="showModal2">
          <header class="hd-title">
            <div class="text">报警历史</div>
            <div class="iconfont icon-guanbi" @click="closeShowModal2"></div>
          </header>
          <section class="list-wrap">
            <ul class="his-list imp-his-list">
              <li class="h-item">
                <div class="content">
                  <div class="title">关于省领导即将来视察的注意事项...</div>
                  <div class="time">2020/08/09</div>
                </div>
                <article class="det">
                  集团各部门（中心）、分（子）公司：2020年五一劳动节即将来临，根据国家相关规定，现将放假事官安排如下：放假时间安排2020年
                </article>
              </li>
            </ul>
            <ul class="his-list of-his-list">
              <li class="h-item">
                <div class="content">
                  <div class="title">关于省领导即将来视察的注意事项...</div>
                  <div class="time">2020/08/09</div>
                </div>
              </li>
              <li class="h-item">
                <div class="content">
                  <div class="title">关于省领导即将来视察的注意事项...</div>
                  <div class="time">2020/08/09</div>
                </div>
              </li>
              <li class="h-item">
                <div class="content">
                  <div class="title">关于省领导即将来视察的注意事项...</div>
                  <div class="time">2020/08/09</div>
                </div>
              </li>
              <li class="h-item">
                <div class="content">
                  <div class="title">关于省领导即将来视察的注意事项...</div>
                  <div class="time">2020/08/09</div>
                </div>
              </li>
            </ul>
          </section>
        </div>
        <button @click="showModal2 = true" v-if="!showModal2" class="btn">
          报警历史
        </button>
      </div>
    </div>
  </fullscreen>
</template>
<script>
import {BmlLushu} from "vue-baidu-map";
export default {
  name: "Map",
  components:{
    BmlLushu
  },
  data() {
    return {
      center: { lng: 118.937284, lat: 32.119823 },
      zoom: 16,
      show: false,
      btnShow: true,
      lushuicon:{
        url: require("../assets/img/dot.png"),
        size: { width: 40, height: 40}
      },
      Pathhistory: {
        following:false,
        flag:1,
        paths1: [    //数据格式必须为 { lng:   lat:  }
          {
            lng: 118.934385,
            lat: 32.122,
          },
          {
            lng: 118.933846,
            lat: 32.120776,
          },
          {
            lng: 118.934744,
            lat: 32.118727,
          },
          {
            lng: 118.935391,
            lat: 32.117198,
          },
          {
            lng: 118.935427,
            lat: 32.112856,
          },
          {
            lng: 118.937295,
            lat: 32.112764,
          }
        ],
        paths2:[
          {
            lng:118.940477,
            lat:32.123612,
          },
          {
            lng:118.938932,
            lat:32.122909,
          },
          {
            lng:118.939507,
            lat:32.121563,
          },
          {
            lng:118.939651,
            lat:32.119912,
          },
          {
            lng:118.93904,
            lat:32.11719,
          },
          {
            lng: 118.939866,
            lat: 32.115661,
          }
        ]
      },
      markers: [
        {
          //人员一:
          lng: 118.939866,
          lat: 32.115661,
          icon: require("../assets/img/dot.png"),
          iconOn: require("../assets/img/dot-red.png"),
          number: "001",
          name: "admin",
          nameInfo: "admin[001]",
          eq: "adsdsfasf",
          area: "南京邮电大学仙林校区南一食堂",
          showFlag: false //flag放在每一条数据里
        },
        //人员二:
        {
          lng: 118.937295,
          lat: 32.112764,
          icon: require("../assets/img/dot.png"),
          iconOn: require("../assets/img/dot-red.png"),
          number: "002",
          name: "王小明",
          nameInfo: "王小明[002]",
          eq: "5345466",
          area: "南京邮电大学仙林校区图书馆",
          showFlag: false
        }
      ],
      fullscreen: false,
      // 悬浮框data
      isActive: true,
      isActive2: true,
      showModal: false,
      showModal2: false,
      tableData: [
        {
          areaName: "北京三里屯",
          pNum: "5656"
        },
        {
          areaName: "北京三里屯",
          pNum: "5656"
        },
        {
          areaName: "北京三里屯",
          pNum: "5656"
        },
        {
          areaName: "北京三里屯",
          pNum: "5656"
        },
        {
          areaName: "北京三里屯",
          pNum: "5656"
        },
        {
          areaName: "北京三里屯",
          pNum: "5656"
        },
        {
          areaName: "北京三里屯",
          pNum: "5656"
        }
      ]
    };
  },
  methods: {
    infoWindowClose(marker) {
      marker.showFlag = false;
    },
    infoWindowOpen(marker) {
      marker.showFlag = true;
    },

    // 收起
    Path(){
      this.Pathhistory.following=!this.Pathhistory.following;
      if(this.Pathhistory.following) {
        this.Pathhistory.paths.push({lng: 118.939633, lat: 32.113432});
        this.markers[1].lng=this.Pathhistory.paths[this.Pathhistory.paths.length-1].lng;
        this.markers[1].lat=this.Pathhistory.paths[this.Pathhistory.paths.length-1].lat;
      }
      else{
        let Point=this.Pathhistory.paths[this.Pathhistory.paths.length-1];
        this.Pathhistory.paths=[];
        this.Pathhistory.paths.push(Point);
        console.log(this.Pathhistory.paths[this.Pathhistory.paths.length-1]);
      }
    },
    putUp() {
      this.btnShow = !this.btnShow;
    },
    addZoom(level) {
      this.zoom = level;
    },
    // 放大
    enlarge() {
      this.zoom++;
    },
    // 缩小
    narrow() {
      if (this.zoom > 2) {
        this.zoom--;
        console.log(this.zoom--);
      }
    },
    // 全屏方法
    isFullScreen() {
      return (
        document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.msFullscreenEnabled ||
        false
      );
    },
    //全屏
    toggle() {
      this.$refs.fullscreen.toggle(); // recommended
      // this.fullscreen = !this.fullscreen // deprecated
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
    },

    //退出全屏
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    },
    // 还原
    reduction() {
      this.exitFullscreen();
    },
    // 悬浮框

    // 人员统计弹框
    MshowModal() {
      this.showModal = true;
      this.isActive = false;
    },
    closeShowModal() {
      this.showModal = false;
      this.isActive = true;
    },
    MshowModal2() {
      this.showModal2 = true;
      this.isActive2 = false;
    },
    closeShowModal2() {
      this.showModal2 = false;
      this.isActive2 = true;
    }
  },
  mounted() {
    window.addEventListener("keydown", this.getKeyDown);
  },
  created() {}
};
</script>
<style lang="scss">
.map-box {
  height: 100%;
  position: relative;
}
.BMap_bubble_title {
  font-size: 14px;
  color: #444444;
  font-weight: bold !important;
}
.BMap_pop .BMap_center,
.BMap_pop .BMap_bottom,
.BMap_pop .BMap_top {
  border: none !important;
}
.BMap_pop div:nth-child(1) {
  border-radius: 4px 0 0 0;
  border: none !important;
}
.BMap_pop div:nth-child(3) {
  border-radius: 0 4px 0 0;
}

.BMap_pop div:nth-child(5) {
  border-radius: 0 0 0 4px;
}
.BMap_pop div:nth-child(7) {
  border-radius: 0 0 4px 0;
  border: none !important;
}
.BMap_pop > div:nth-child(8) {
  background: url("../assets/img/bd_arrow.png") no-repeat;
  background-size: contain;
  position: relative;
  img {
    display: none !important;
  }
}
.BMap_Marker {
  margin-left: 16px !important;
  margin-top: 6px !important;
}
</style>
<style lang="scss" scoped>
.map {
  height: 100%;
  div {
    height: 100%;
  }
}
.baidu-map {
  height: 100%;
}
.info {
  margin-top: 6px;
  li {
    font-size: 12px;
    line-height: 24px;
    color: #999999;
    span {
      color: #282828;
    }
  }
}
.control-box {
  position: absolute;
  width: 30px;
  bottom: 10px;
  right: 10px;
  z-index: 10;
  height: auto !important;
  background: #fff;
  font-size: 12px;
  text-align: center;
  overflow: hidden;
  &.active {
    height: 30px !important;
  }
  .num {
    height: 20px;
    line-height: 20px;
  }
  .el-button {
    width: 100%;
    margin: 0;
    padding: 0;
    height: 30px;
    border: none;
    border-radius: 0;

    .iconfont {
      font-size: 14px;
    }
    &:hover {
      background: #01664f;
      color: #fff;
    }
  }
}
</style>