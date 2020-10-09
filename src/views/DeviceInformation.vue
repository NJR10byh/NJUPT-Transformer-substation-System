<template>
  <div class="main">
    <!-- 面包屑 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item class="pathActive">设备管理</el-breadcrumb-item>
      <el-breadcrumb-item class="active">设备信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-main class="main-con">
      <!-- 搜索 -->
      <div class="header-search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label>
            <el-input v-model="formInline.person" placeholder="请输入搜索人员"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-form-item>
        </el-form>

        <div class="oper-btns">
          <el-button
              class="Add-btn"
              icon="el-icon-circle-plus-outline"
              @click="dialogFormVisible = true"
          >新增设备
          </el-button>
          <el-button class="datain-btn">导入数据</el-button>
          <el-button class="dataout-btn">导出数据</el-button>
          <el-button class="bigdel-btn" icon="el-icon-delete" @click="delectAll">批量删除</el-button>
          <el-button class="clear-btn" icon="el-icon-delete" @click="Clear">清空</el-button>
        </div>
      </div>
      <!-- table -->
      <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          stripe
          class="man-table"
          style="width: 100%"
          @selection-change="handleDetailSelectionChange"
      >
        <el-table-column type="selection" width="44"></el-table-column>
        <el-table-column prop="id" label="ID" width="44"></el-table-column>
        <el-table-column prop="deviceID" label="设备号" width="150"></el-table-column>
        <el-table-column prop="type" label="类型" width></el-table-column>
        <el-table-column prop="State" label="在线状态"></el-table-column>
        <el-table-column prop="Begin" label="开始日期"></el-table-column>
        <el-table-column prop="End" label="截止日期"></el-table-column>
        <el-table-column prop="setting" label="设置" width="150">
          <template slot-scope="scope">
            <el-button
                class="edit-btn"
                icon="iconfont icon-weibiaoti2"
                @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
            <el-button
                class="del-btn"
                icon="iconfont icon-shanchu"
                @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="sizes,total, prev, pager, next, jumper"
            :total="159"
        ></el-pagination>
      </div>
      <!-- 新增弹窗 -->
      <el-dialog title="新增设备" class="addDeviceDialog" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="设备号: " prop="deviceID" :label-width="formLabelWidth">
            <el-input v-model="form.deviceID" placeholder="请输入设备号" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设备类型: " prop="type" :label-width="formLabelWidth">
            <el-select v-model="form.type" placeholder="请选择">
              <el-option label="类型一" value="类型一"></el-option>
              <el-option label="类型二" value="类型二"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备状态: "  prop="State" :label-width="formLabelWidth">
            <el-radio-group v-model="form.State">
              <el-radio label="在线">在线</el-radio>
              <el-radio label="离线">离线</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="开始时间: " prop="Begin" :label-width="formLabelWidth">
            <el-input v-model="form.Begin" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="结束时间: " prop="End" :label-width="formLabelWidth">
          <el-input v-model="form.End" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <el-button class="sub-btn" type="primary" @click="submitForm(form)">保存并提交</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "DeviceInformation",
  components: {},
  data() {
    return {
      formInline: {
        person: "",
        model:""
      },
      radiomodel:{
        model:1
      },
      //选择框
      checkedDetail:[],
      // 表格数据
      tableData: [
        {
          id: "1",
          deviceID: "001",
          type: "类型一",
          State: "在线",
          Begin: "09：23",
          End: "10：46"
        },
        {
          id: "2",
          deviceID: "001",
          type: "类型二",
          State: "离线",
          Begin: "08：34",
          End: "11：09"
        }
      ],
      multipleSelection: [],
      // 分页
      currentPage4: 4,
      // 弹窗
      dialogFormVisible: false,
      form: {},
      rules: {
        number: [
          { required: true, message: "请输入工号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入名字", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        places: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      formLabelWidth: "100px"
    };
  },
  computed: {},
  methods: {
    // 搜索
    //单选框选中数据
    handleDetailSelectionChange(selection) {
      this.checkedDetail = selection;
    },
    // 编辑
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除单个行
    handleDelete(index) {
      this.$confirm('删除后无法更改, 是否确定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //批量删除
    delectAll(){
      for (let i = 0; i < this.tableData.length; i++) {
        const element = this.tableData[i];
        element.id = i+1;
      }
      if (this.checkedDetail.length == 0) {
        this.$alert("请先选择要删除的数据","提示",{
          confirmButtonText:"确定",
        });
      } else {
        this.$confirm('删除后无法更改, 是否确定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.checkedDetail.forEach(element => {
            this.tableData.forEach((e, i) => {
              if (element.id == e.id) {
                this.tableData.splice(i, 1);
              }
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    // 表格方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //新增人员
    submitForm(formName) {
      let idnum=this.tableData.length+1;
      let obj={};
      obj.id=idnum;
      obj.deviceID=formName.deviceID;
      obj.type=formName.type;
      obj.State=formName.State;
      obj.Begin=formName.Begin;
      obj.End=formName.End;
      //console.log(obj.type);
      if(
          obj.deviceID==undefined||
          obj.id==undefined||
          obj.type==undefined||
          obj.State==undefined||
          obj.Begin==undefined||
          obj.End==undefined){
        this.$alert("请将信息填写完整","提示", {
          confirmButtonText: "确定",
        })
      }else {
        this.tableData.push(obj);
      }
    },
    //清空List
    Clear(){
      this.$confirm('清空后无法恢复, 是否确定?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData=undefined;
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss">
.v-modal {
  opacity: 0;
}
.main {
  height: 100%;
  .breadcrumb {
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    font-size: 16px;
    .el-breadcrumb__inner {
      font-weight: bold;
    }
    .el-breadcrumb__inner.is-link {
      color: #666666;
      font-weight: normal;
    }

    .active {
      color: #026650;
      font-size: 20px;
    }
  }
  .header-search {
    display: flex;
    justify-content: space-between;
    .demo-form-inline {
      display: flex;
      .el-input__inner {
        height: 30px;
        line-height: 30px;
        background: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 4px;
        font-size: 12px;
        &:focus {
          border-color: #026650;
        }
      }
      .el-button {
        width: 70px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        padding: 0;
        background: linear-gradient(-270deg, #239679, #01664f);
        border-radius: 4px;
        margin-left: -16px;
        font-size: 12px;
        border: none;
      }
    }
    .el-form-item__content {
      line-height: 30px;
      display: flex;
      .el-input {
        display: flex;
      }
    }
    .oper-btns {
      display: flex;
      .el-button {
        padding: 0 10px;
        height: 30px;
        border-radius: 4px;
        font-size: 12px;
        &.Add-btn{
          width: 85px;
          border: 1px solid #239679;
          color: #239679;
        }
        &.datain-btn {
          width: 70px;
          border: 1px solid #239679;
          color: #239679;
          margin-left: 10px;
        }
        &.dataout-btn {
          width: 70px;
          border: 1px solid #239679;
          color: #239679;
          margin-left: 10px;
        }
        &.bigdel-btn {
          width: 85px;
          border: 1px solid #f96b6c;
          color: #f96b6c;
        }
        &.bigdel-btn:hover{
          background: #ffcccc;
        }
        &.clear-btn {
          width: 65px;
          border: 1px solid #f96b6c;
          color: #f96b6c;
          margin-left: 10px;
        }
        &.clear-btn:hover{
          background: #ffcccc;
        }
      }
    }
  }
}
.man-table {
  height: calc(100% - 128px);
  &::before {
    display: none;
  }
  .el-table__header {
    border-left: 1px solid #e9ecf2;
    border-top: 1px solid #e9ecf2;
    th {
      text-align: center;
      background-color: #fafafa;
      border-right: 1px solid #e9ecf2;
      &:first-child {
        border-right: none;
        .cell {
          padding-right: 0;
        }
      }
      &:nth-child(2) {
        .cell {
          padding-left: 0;
        }
      }
      .cell {
        padding: 0 20px;
        color: #282828;
      }
    }
  }
  .el-checkbox__inner {
    width: 16px;
    height: 16px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 4px;
  }
  .el-checkbox__inner::after {
    left: 5px;
  }
  .el-table__body {
    td {
      text-align: center;
      border-bottom: none;
      &:first-child {
        border-right: none;
        .cell {
          padding-right: 0;
          overflow: auto;
          width: 44px;
        }
      }
      &:nth-child(2) {
        .cell {
          padding-left: 0;
        }
      }
      .cell {
        padding: 0 20px;
        color: #444444;
      }
    }
    .el-button {
      border: none;
      padding: 3px;
      background: transparent;
      &:hover {
        .iconfont {
          color: #026650;
        }
      }
    }
  }
}
.addDeviceDialog {
  .el-dialog {
    max-width: 500px;

    box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    .el-dialog__header {
      background: linear-gradient(-270deg, #239679, #01664f);
      border-radius: 6px 6px 0px 0px;

      padding: 16px 20px;
      .el-dialog__title {
        color: #fff;
        font-size: 18px;
      }
      .el-dialog__headerbtn {
        &:hover {
          .el-dialog__close {
            color: #fff;
          }
        }
        .el-icon-close {
          color: #ccc;
          font-size: 18px;
        }
      }
    }
    .el-form-item__content {
      .el-input__inner {
        width: 300px;
      }
      .el-textarea {
        width: 500px;
        .el-textarea__inner {
          min-height: 120px !important;
        }
      }
    }
    .sub-btn {
      width: 110px;
      background: linear-gradient(-270deg, #239679, #01664f);
      border-radius: 4px;
      border: none;
      margin-left: 75px;
      &:hover {
        opacity: 0.9;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.main-con {
  height: calc(100% - 60px);
  background: #fff;
  .el-pagination {
    text-align: center;
    display: flex;
    justify-content: center;
  }
}
</style>