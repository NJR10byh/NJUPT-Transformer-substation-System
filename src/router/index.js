import Vue from "vue";
import VueRouter from "vue-router";
import AlarmList from "@/views/AlarmList";
import WorkersLocation from "@/views/WorkersLocation";
import DeviceInformation from "@/views/DeviceInformation";
import RegionsList from "@/views/RegionsList";
import RoleManagement from "@/views/RoleManagement";
import PathList from "@/views/PathList";

const Home = () => import("../views/Home.vue");
const ManManagement = () => import("../views/ManManagement.vue"); //人员信息
const PathQuery = () => import("../views/PathQuery.vue"); // 历史轨迹查询

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/location",
    children: [
      {
        path: "/location",
        component: WorkersLocation,
      },
      {
        path: "/manManagement",
        component: ManManagement,
      },
      {
        path: "/pathQuery",
        component: PathQuery,
      },
      {
        path: "/pathList",
        component: PathList,
      },
      {
        path: "/alarmList",
        component: AlarmList,
      },
      {
        path: "/deviceInformation",
        component: DeviceInformation,
      },
      {
        path: "/regionsList",
        component: RegionsList,
      },
      {
        path: "/roleManagement",
        component: RoleManagement,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
