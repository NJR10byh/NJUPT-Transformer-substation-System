<template>
  <div class="main">
    <!-- 面包屑 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item class="pathActive">系统管理</el-breadcrumb-item>
      <el-breadcrumb-item class="active">角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-main class="main-con">
      <!-- 搜索 -->
      <div class="header-search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label>
            <el-input
              v-model="formInline.person"
              placeholder="请输入搜索人员"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search">搜索 </el-button>
          </el-form-item>
        </el-form>

        <div class="oper-btns">
          <el-button
            class="add-btn"
            icon="el-icon-circle-plus-outline"
            @click="dialogFormVisible = true"
            >新增</el-button
          >
          <el-button class="add-btn">操作日志</el-button>
          <el-button class="add-btn">数据管理</el-button>
          <el-button class="add-btn">微信配置</el-button>
          <el-button class="bigdel-btn" icon="el-icon-delete" @click="delectAll"
            >批量删除</el-button
          >
          <el-button class="clear-btn" icon="el-icon-delete" @click="Clear"
            >清空</el-button
          >
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
        <el-table-column
          prop="company"
          label="公司"
          width="240"
        ></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别" width="80"></el-table-column>
        <el-table-column prop="number" label="工号"></el-table-column>
        <el-table-column
          prop="tel"
          label="联系电话"
          width="150"
        ></el-table-column>
        <el-table-column prop="type" label="人员类型"></el-table-column>
        <!-- <el-table-column prop="icon" label="人员图标"></el-table-column> -->
        <el-table-column prop="setting" label="设置" width="100">
          <template slot-scope="scope">
            <el-button
              class="edit-btn"
              icon="iconfont iconbianji"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
            <el-button
              class="del-btn"
              icon="iconfont iconshanchu"
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
      <el-dialog
        title="新增人员"
        class="addManDialog"
        :visible.sync="dialogFormVisible"
      >
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item
            label="公司"
            prop="company"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.company"
              placeholder="请输入"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="工号"
            prop="number"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.number"
              placeholder="请输入"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
            <el-input
              v-model="form.name"
              placeholder="请输入"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="联系电话"
            prop="tel"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.tel"
              placeholder="请输入"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="人员类型"
            prop="type"
            :label-width="formLabelWidth"
          >
            <el-select v-model="form.type" placeholder="请选择">
              <el-option label="请选择一" value="请选择一"></el-option>
              <el-option label="请选择二" value="请选择二"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="小数位数" prop="places" :label-width="formLabelWidth">
            <el-input type="number" v-model="form.places" placeholder="1" autocomplete="off"></el-input>
          </el-form-item> -->

          <el-form-item label="备注" prop="des" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <el-button class="sub-btn" type="primary" @click="submitForm(form)"
              >确认提交</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  name: "ManManagement",
  components: {},
  data() {
    return {
      formInline: {
        person: "",
      },
      // 表格数据
      tableData: [
        {
          id: 1,
          company: "东晟原绿家居建材有限公司",
          name: "admin",
          sex: "男",
          number: "112323",
          tel: "13509876543",
          type: "收取",
        },
        {
          id: 2,
          company: "东晟原绿家居建材有限公司",
          name: "admin",
          sex: "女",
          number: "112323",
          tel: "13509876543",
          type: "不收取",
        },
      ],
      multipleSelection: [],
      // 分页
      currentPage4: 4,
      // 弹窗
      dialogFormVisible: false,
      form: {
        company: "",
        number: "",
        name: "",
        sex: "",
        tel: "",
        type: "",
      },
      rules: {
        company: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
        ],
        number: [
          { required: true, message: "请输入工号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入名字", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        tel: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        places: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      formLabelWidth: "100px",
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
      this.$confirm("删除后无法更改, 是否确定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //批量删除
    delectAll() {
      for (let i = 0; i < this.tableData.length; i++) {
        const element = this.tableData[i];
        element.id = i + 1;
      }
      if (this.checkedDetail.length == 0) {
        this.$alert("请先选择要删除的数据", "提示", {
          confirmButtonText: "确定",
        });
      } else {
        this.$confirm("删除后无法更改, 是否确定?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.checkedDetail.forEach((element) => {
              this.tableData.forEach((e, i) => {
                if (element.id == e.id) {
                  this.tableData.splice(i, 1);
                }
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
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
      let idnum = this.tableData.length + 1;
      let obj = {};
      obj.id = idnum;
      obj.company = formName.company;
      obj.name = formName.name;
      obj.number = formName.number;
      obj.sex = formName.sex;
      obj.tel = formName.tel;
      obj.type = formName.type;
      if (
        obj.id == undefined ||
        obj.company == undefined ||
        obj.name == undefined ||
        obj.number == undefined ||
        obj.sex == undefined ||
        obj.tel == undefined ||
        obj.type == undefined
      ) {
        this.$alert("请将信息填写完整", "提示", {
          confirmButtonText: "确定",
        });
      } else {
        this.tableData.push(obj);
      }
    },
    //测试接口
    // test(){
    //   let idnum=this.tableData.length+1;
    //   let obj={};
    //   let flag=false;
    //   let that=this;
    //     axios({
    //       method:'get',
    //       url:'http://120.26.234.200:8080/member'
    //     }).then(function(result){
    //       flag=!flag;
    //       console.log(result.data.data[0].fields.sex);
    //       if(!isNaN(result.data.data[0].fields.sex)){
    //         if(result.data.data[0].fields.sex.toString()=='1'){
    //           obj.sex='男';
    //         }else if(result.data.data[0].fields.sex.toString()=='0'){
    //           obj.sex='女';
    //         }
    //       }
    //       obj.id=idnum;
    //       obj.name=result.data.data[0].fields.name;
    //       obj.number=result.data.data[0].fields.number;
    //       obj.birth=result.data.data[0].fields.birth;
    //       obj.tel=result.data.data[0].fields.tel;
    //       obj.address=result.data.data[0].fields.address;
    //       obj.post=result.data.data[0].fields.post;
    //       obj.onboardingtime=result.data.data[0].fields.onboardingtime;
    //       if(
    //       obj.id==undefined||
    //       obj.company==undefined||
    //       obj.name==undefined||
    //       obj.number==undefined||
    //       obj.sex==undefined||
    //       obj.tel==undefined||
    //       obj.type==undefined){
    //     this.$alert("请将信息填写完整","提示", {
    //       confirmButtonText: "确定",
    //     })
    //   }else {
    //     that.tableData.push(obj);
    //   }
    //     }).catch(err=>{
    //       console.log(err);
    //       console.log('请求失败: '+err.status+','+err.statusText);
    //       //console.log(this.tableData);
    //     });
    // },
    //清空List
    Clear() {
      this.$confirm("清空后无法恢复, 是否确定?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData = undefined;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {},
  mounted() {},
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
    line-height: 60px;
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
    margin-top: 20px;
    .demo-form-inline {
      display: flex;
      .el-form-item {
        margin-right: 0;
      }
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
        margin-left: -6px;
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
        padding: 0 8px;
        height: 30px;
        border-radius: 4px;
        font-size: 12px;
        &.add-btn {
          width: 70px;
          border: 1px solid #239679;
          color: #01664f;
          margin-left: 15px;
        }
        &.del-btn {
          width: 70px;
          border: 1px solid #f96b6c;
          color: #01664f;
          color: #f96b6c;
        }
      }
    }
  }
}
.man-table {
  height: calc(100% - 50px);
  &::before {
    display: none;
  }
  .el-table__header {
    border-left: 1px solid #e9ecf2;
    border-top: 1px solid #e9ecf2;
    th {
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
.addManDialog {
  .el-dialog {
    //max-width: 700px;
    max-height: 650px;
    background: #ecf0f1;

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
        width: 300px;
        .el-textarea__inner {
          min-height: 80px !important;
        }
      }
    }
    .sub-btn {
      background: linear-gradient(-270deg, #239679, #01664f);
      border-radius: 10px;
      border: none;

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
  background: red;
  .el-pagination {
    text-align: center;
    display: flex;
    justify-content: center;
  }
}
</style>
