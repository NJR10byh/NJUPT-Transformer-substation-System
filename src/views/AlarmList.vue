<template>
  <div class="main">
    <!-- 面包屑 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item class="pathActive">报警查看</el-breadcrumb-item>
      <el-breadcrumb-item class="active">报警列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-main class="main-con">
      <!-- 搜索 -->
      <div class="header-search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label>
            <el-input v-model="formInline.person" placeholder="请输入搜索人员"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
                type="primary"
                icon="el-icon-search"
                class="search-box"
            >搜索
            </el-button>
          </el-form-item>
          <el-form-item style="margin-left: 20px;line-height: 50px">
            <el-select v-model="formInline.model" placeholder="报警类型">
              <el-option label="类型一" value="类型一"></el-option>
              <el-option label="类型二" value="类型二"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div class="oper-btns">
          <el-button class="bigdel-btn" icon="el-icon-delete" @click="delectAll">批量删除</el-button>
          <el-button class="del-btn" icon="el-icon-delete" @click="Clear">清空</el-button>
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
        <el-table-column prop="Type" label="报警类型"></el-table-column>
        <el-table-column prop="Time" label="报警时间"></el-table-column>
        <el-table-column prop="Info" label="报警信息" style="font-weight: bold"></el-table-column>
        <el-table-column prop="Location" label="报警位置" width="210"></el-table-column>
        <el-table-column prop="Workers" label="操作人员"></el-table-column>
        <el-table-column prop="State" label="处理状态" ></el-table-column>
        <el-table-column prop="setting" label="设置" width="150">
          <template slot-scope="scope">
            <el-button
                class="edit-btn"
                icon="iconfont icon-weibiaoti2"
                @click="handleEdit(scope.$index, scope)"
            ></el-button>
            <el-button
                class="del-btn"
                icon="iconfont icon-shanchu"
                @click="handleDelete(scope.$index)"
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
    </el-main>
  </div>
</template>

<script>
export default {
  name: "AlarmList",
  components: {},
  data() {
    return {
      formInline: {
        person: "",
        model:""
      },
      //选择框
      checkedDetail:[],
      // 表格数据
      tableData: [
        {
          id: "1",
          Type: "类型一",
          Time: "17：23",
          Info: "越界",
          Location: "lng: 161.32 ,  lat: 39.34",
          Workers: "王五",
          State: "处理中"
        },
        {
          id: "2",
          Type: "类型二",
          Time: "17：26",
          Info: "越界",
          Location: "lng: 161.34 , lat: 39.44",
          Workers: "李四",
          State: "处理完成"
        }
      ],
      multipleSelection: [],
      // 分页
      currentPage4: 4,
      // 弹窗
      dialogFormVisible: false,
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
    height: 60px;
    line-height: 50px;
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
      .search-box{
        &:hover{
          opacity: 0.85;
        }
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
        &.bigdel-btn {
          width: 85px;
          border: 1px solid #f96b6c;
          color: #f96b6c;
        }
        &.bigdel-btn:hover{
          background: #ffcccc;
        }
        &.del-btn {
          width: 70px;
          border: 1px solid #f96b6c;
          color: #f96b6c;
          margin-left: 10px;
        }
        &.del-btn:hover{
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