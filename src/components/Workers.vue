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
            :position="{ lng: marker.lng, lat: marker.lat }"
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
                经度：
                <span>{{ marker.lng }}</span>
              </li>
              <li>
                纬度：
                <span>{{ marker.lat }}</span>
              </li>
              <li>
                <button style="float:right;margin-top:5px;font-size:14px;width:70px;height:20px" @click="Path(marker)">
                  {{marker.following?"停止跟踪":"开始跟踪"}}
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
<!--        <bm-polyline-->
<!--            :path="Pathhistory.paths"-->
<!--            stroke-color="red"-->
<!--            :stroke-opacity="0.5"-->
<!--            :stroke-weight="2"-->
<!--            :editing="false"-->
<!--        >-->
<!--        </bm-polyline>-->
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
  </fullscreen>
</template>
<script>
export default {
  name: "Workers",
  data() {
    return {
      center: { lng: 118.937284, lat: 32.119823 },
      zoom: 16,
      show: false,
      btnShow: true,
      i:0,
      timer:null,
      lushuicon:{
        url: require("../assets/img/dot.png"),
        size: { width: 40, height: 40}
      },
      Pathhistory: {
        paths1:[
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
          lng: 118.940477,
          lat: 32.123612,
          icon: require("../assets/img/dot.png"),
          iconOn: require("../assets/img/dot-red.png"),
          number: "001",
          name: "admin",
          nameInfo: "admin[001]",
          eq: "adsdsfasf",
          area: "南京邮电大学仙林校区南一食堂",
          showFlag: false, //flag放在每一条数据里
          following:false
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
          showFlag: false,
          following:false
        }
      ],
      fullscreen: false,
      // 悬浮框data
      isActive: true,
      isActive2: true,
      showModal: false,
      showModal2: false,
    };
  },
  methods: {
    infoWindowClose(marker) {
      marker.showFlag = false;
    },
    infoWindowOpen(marker) {
      marker.showFlag = true;
    },
    //实时路径+越界警报
    Path(marker){
      marker.following=!marker.following;
      const that = this;
      if(!marker.following){
        clearInterval(that.timer); //停止跟踪，关闭定时器
      }
      //跟踪
      else if(marker.following){
        that.timer=setInterval(function (){
          if(that.i<that.Pathhistory.paths1.length){
            marker.lng=that.Pathhistory.paths1[that.i].lng;
            marker.lat=that.Pathhistory.paths1[that.i].lat;
            if(marker.lat<32.12){
              alert("越界！！！");
            }
            that.i++;
          }
        },2000);
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
  margin-top: 5px;
  li {
    font-size: 12px;
    line-height: 22px;
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