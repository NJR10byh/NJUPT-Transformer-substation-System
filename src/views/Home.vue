<template>
  <el-container class="home">
    <!-- 头部区域 -->
    <el-header style="height:80px">
      <div class="logo-wrap">
        <a
            href="https://www.baidu.com/link?url=jZjZePVYxU7a6awQeArjN_afCrflYD5Y4ZyrWv5UV3pEU6J5HEWC3PYItLcz3Nda&wd=&eqid=a64ab72600038e92000000055f6f2870"
            target="_blank"
        >
          <img src="../assets/logo.png" class="logo" alt />
        </a>
        <div class="toggle-button" @click="toggleCollapse">
          <i class="iconfont icon-caidan2"></i>
        </div>
      </div>
      <div class="title">改扩建变电站作业区域安全管控平台</div>
      <div class="hd-btns">
        <a class="badge-item" href="#/alarmList" @click="hidbadge">
          <el-badge
              :value="alertnum"
              :max="99"
              :hidden="hid"
          >
            <img src="@/assets/img/tongzhi.png" alt />
          </el-badge>
          <div class="text">报警信息</div>
        </a>
        <a class="badge-item" href="#/location">
          <img src="@/assets/img/jiankong.png" alt />
          <div class="text" >实时监控</div>
        </a>
      </div>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '84px':'230px'">
        <!-- 一级菜单 -->
        <el-menu
          text-color="#282828"
          active-text-color="#fff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
          :default-active="$route.path"
          class="leftMenu"
        >
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本-->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/'+subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              class="subItem"
            >
              <span slot="title">{{subItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      alertnum:2,
      hid:false,
      // 菜单导航
      menuList: [
        {
          id: 1,
          authName: "首页",
          children: [
            {
              id: 10,
              authName: "员工实时位置",
              path: "location",
            }
          ]
        },
        {
          id: 2,
          authName: "人员管理",
          children: [
            {
              id: 20,
              authName: "人员信息",
              path: "manManagement"
            }
          ]
        },
        {
          id: 3,
          authName: "设备管理",
          children: [
            {
              id: 30,
              authName: "设备信息",
              path: "deviceInformation",
            }
          ]
        },
        {
          id: 4,
          authName: "报警查看",
          children: [
            {
              id: 40,
              authName: "报警列表",
              path: "alarmList"
            },
            {
              id: 41,
              authName: "告警提醒",
              path: ""
            },
            {
              id: 42,
              authName: "历史轨迹查询",
              path: "pathQuery"
            },
            {
              id: 44,
              authName: "报警设置",
              path: ""
            }
          ]
        },
        {
          id: 5,
          authName: "区域管理",
          children: [
            {
              id: 50,
              authName: "区域列表",
              path: "regionsList",
            }
          ]
        },
        {
          id: 6,
          authName: "监控视频",
          path: ""
        },
        {
          id: 7,
          authName: "系统管理",
          children: [
            {
              id: 70,
              authName: "角色管理",
              path: "roleManagement"
            }
          ]
        }
      ],
      // 导航图标
      iconsObj: {
        "1": "iconfont icon-xuanzhongshangcheng",
        "2": "iconfont icon-zu",
        "3": "iconfont icon-guanli1",
        "4": "iconfont icon-chakan",
        "5": "iconfont icon-quyucopy",
        "6": "iconfont icon-bofang",
        "7": "iconfont icon-guanli"
      },
      isCollapse: false
    };
  },
  methods: {
    // 切换菜单的折叠展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },

    //控制badge在被点击后隐藏
    hidbadge(){
      this.hid=true;
    },
  }
};
</script>
<style lang="scss">
.home {
  position: absolute;
  width: 100%;
  height:100%;
  .el-container {
    height: 100%;
  }
  .el-header {
    background-color: #fff;
    box-shadow: 1px 2px 14px 0 rgba(0, 0, 0, 0.04);
    border-bottom: 2px solid #f6f6f6;
    padding: 0 40px 0 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #026650;
    .logo-wrap {
      display: flex;
      align-items: center;
      .logo {
        max-width: 175px;
        max-height: 100%;
      }
      .toggle-button {
        text-align: center;
        cursor: pointer;
        margin-left: 50px;
        .iconfont {
          font-size: 22px;
          color: #9a9a9a;
          transition: 0.3s ease all;
        }
        &:hover {
          .iconfont {
            color: #026650;
          }
        }
      }
    }
    .title {
      font-size: 36px;
      font-weight: bold;
    }
    .hd-btns {
      display: flex;
      align-items: center;

      .badge-item {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-left: 40px;

        .el-badge__content.is-fixed {
          background: #f96c6c;
          right: 10px;
        }

        .el-badge {
          height: 26px;
        }

        img {
          height: 26px;
        }

        .text {
          margin-top: 6px;
          font-size: 12px;
          font-weight: bold;
        }
        &:hover{
          .text{
            color: #026650;
          }
        }
      }
    }
  }

  .el-aside {
    background-color: #fff;
    padding: 20px 10px;
    .el-menu {
      border-right: none;

      .el-submenu {
        .el-submenu__title {
          height: 40px;
          line-height: 40px;
        }
        .iconfont {
          margin-right: 14px;
          font-size: 26px;
        }
      }
    }
  }

  .el-main {
    background-color: #f6f6f6;
    padding: 0 10px;
  }

  .el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;
    min-width: auto;
    padding-left: 60px !important;

    &.subItem {
      background: #f1f7f6;  //二级菜单背景颜色
      &:hover{
        background: #EAEAEA;
        border-radius: 3px;
      }
    }
    &.subItem.is-active {
      span {
        color: #01664f;
        position: relative;
        font-weight: bold;
        font-size: 16px;  //选中的项目字体加粗、放大
        //text-decoration: underline;  //在选中的项目下添加下划线
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: -16px;
          margin-top: -3px;
          width: 6px;
          height: 6px;
          background: linear-gradient(-270deg, #239679, #01664f);
          border-radius: 3px;
        }
      }
    }
  }
  .el-submenu__title .el-submenu__icon-arrow {
    transform: rotate(-90deg);
    color: #b8c1c5;
  }
  .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
    transform: rotate(0deg);
  }
  .el-breadcrumb__inner.is-link {
    font-weight: normal;
    color: #666666;
    &:hover {
      color: #026650;
    }
  }
  .el-header .hd-btns .badge-item .el-badge__content.is-fixed {
    right: 15px;
  }
  .el-submenu {
    border-radius: 4px;
    margin-bottom: 20px;
    background: #fff;
    &.is-opened {
      .el-submenu__title {
        background: linear-gradient(-270deg, #24967a, #026650);
        border-radius: 4px;
        color: #fff !important;
        .iconfont {
          color: #fff;
        }
        i {
          color: #fff;
        }
      }
    }
  }
}
.el-menu--vertical {
  .el-menu--popup {
    padding: 0;
  }
  .subItem {
    background: #f1f7f6;
    padding-left: 30px !important;
  }
  .subItem.is-active {
    span {
      color: #01664f;
      position: relative;
      font-weight: bold;
      font-size: 16px;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: -16px;
        margin-top: -3px;
        width: 6px;
        height: 6px;
        background: linear-gradient(-270deg, #239679, #01664f);
        border-radius: 3px;
      }
    }
  }
}
</style>
