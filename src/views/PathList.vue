<template>
  <div class="main">
    <!-- 面包屑 -->
    <el-breadcrumb class="breadcrumb" separator="/">
      <el-breadcrumb-item class="pathActive">报警查看</el-breadcrumb-item>
      <el-breadcrumb-item class="active">历史轨迹列表</el-breadcrumb-item>
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
          <el-button class="test" @click="test">获取测试</el-button>
          <el-button
            class="add-btn"
            icon="el-icon-circle-plus-outline"
            @click="dialogFormVisible = true"
          >新增</el-button>
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
        <el-table-column type="selection" width="42"></el-table-column>
        <el-table-column prop="id" label="ID" width="42"></el-table-column>
        <el-table-column prop="name" label="姓名" width="70"></el-table-column>
        <el-table-column prop="number" label="工号" width="90"></el-table-column>
        <el-table-column prop="sex" label="性别" width="70"></el-table-column>
        <el-table-column prop="birth" label="出生日期"></el-table-column>
        <el-table-column prop="tel" label="联系方式" width="110"></el-table-column>
        <el-table-column prop="address" label="家庭住址" width="170"></el-table-column>
        <el-table-column prop="post" label="岗位" width="110"></el-table-column>
        <el-table-column prop="onboardingtime" label="入职时间"></el-table-column>
        <el-table-column prop="settings" label="设置" width="95">
          <template slot-scope="scope">
            <!-- <a class="edit-btn" href="#/pathQuery">
                <img src="@/assets/img/path.png" alt />
            </a> -->
            <el-button
              :index="'/'+pathQuery"
              class="del-btn"
              icon="iconfont iconzhuanyiluxian"
              @click="topathQuery()"
            ></el-button>
            <el-button
              class="del-btn"
              icon="iconfont iconshanchu"
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
      <!-- 新增弹窗 -->
      <el-dialog title="新增人员" class="addManDialog" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
            <el-input v-model="form.name" placeholder="请输入" autocomplete="off" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item label="工号" prop="number" :label-width="formLabelWidth">
            <el-input v-model="form.number" placeholder="请输入" autocomplete="off" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth" :label-width="formLabelWidth">
            <el-input v-model="form.birth" placeholder="请输入" autocomplete="off" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="tel" :label-width="formLabelWidth">
            <el-input v-model="form.tel" placeholder="请输入" autocomplete="off" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item label="家庭住址" prop="address" :label-width="formLabelWidth">
            <el-input v-model="form.address" placeholder="请输入" autocomplete="off" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item label="岗位" prop="post" :label-width="formLabelWidth">
            <el-input v-model="form.post" placeholder="请输入" autocomplete="off" :clearable="true"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" prop="onboardingtime" :label-width="formLabelWidth">
            <el-input v-model="form.onboardingtime" placeholder="请输入" autocomplete="off" :clearable="true"></el-input>
          </el-form-item>
<!--          <el-form-item label="人员类型" prop="type" :label-width="formLabelWidth">-->
<!--            <el-select v-model="form.type" placeholder="请选择">-->
<!--              <el-option label="类型一" value="类型一"></el-option>-->
<!--              <el-option label="类型二" value="类型二"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="小数位数" prop="places" :label-width="formLabelWidth">-->
<!--            <el-input type="number" v-model="form.places" placeholder="1" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->

<!--          <el-form-item label="备注" prop="des" :label-width="formLabelWidth">-->
<!--            <el-input type="textarea" v-model="form.desc"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item :label-width="formLabelWidth">
            <el-button
                class="sub-btn"
                type="primary"
                @click="submitForm(form)"
            >确认提交
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "ManManagement",
  components: {},
  data() {
    return {
      formInline: {
        person: ""
      },
      //新增功能 v-model 需要的data
      form: {},
      //选择框
      checkedDetail:[],
      // 表格数据
      tableData: [
        {
          id: "1",
          number:"1001",
          name: "张三",
          sex: "男",
          birth: "1975.12.9",
          tel: "13509876543",
          address: "文苑路九号",
          post:"接线员",
          onboardingtime:"2020.2.3"
        },
        {
          id: "2",
          number:"1002",
          name: "李四",
          sex: "男",
          birth: "1973.9.9",
          tel: "13509876343",
          address: "文苑路九号",
          post:"接线员",
          onboardingtime:"2020.2.6"
        }
      ],
      multipleSelection: [],
      // 分页
      currentPage4: 4,
      // 弹窗
      dialogFormVisible: false,
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
    //页面跳转
    topathQuery(){
      this.$router.push({path:'/pathQuery'});
    },
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
      obj.name=formName.name;
      obj.number=formName.number;
      obj.sex=formName.sex;
      obj.birth=formName.birth;
      obj.tel=formName.tel;
      obj.address=formName.address;
      obj.post=formName.post;
      obj.onboardingtime=formName.onboardingtime;
      if(
          obj.id==undefined||
          obj.name==undefined||
          obj.number==undefined||
          obj.sex==undefined||
          obj.birth==undefined||
          obj.tel==undefined||
          obj.address==undefined||
          obj.post==undefined||
          obj.onboardingtime==undefined){
        this.$alert("请将信息填写完整","提示", {
          confirmButtonText: "确定",
        })
      }else {
        this.tableData.push(obj);
      }
    },
    //测试接口
    test(){
      let idnum=this.tableData.length+1;
      let obj={};
      let flag=false;
      let that=this;
        axios({
          method:'get',
          url:'http://120.26.234.200:8080/member'
        }).then(function(result){
          flag=!flag;
          console.log(result.data.data[0].fields.sex);
          if(!isNaN(result.data.data[0].fields.sex)){
            if(result.data.data[0].fields.sex.toString()=='1'){
              obj.sex='男';
            }else if(result.data.data[0].fields.sex.toString()=='0'){
              obj.sex='女';
            }
          }
          obj.id=idnum;
          obj.name=result.data.data[0].fields.name;
          obj.number=result.data.data[0].fields.number;
          obj.birth=result.data.data[0].fields.birth;
          obj.tel=result.data.data[0].fields.tel;
          obj.address=result.data.data[0].fields.address;
          obj.post=result.data.data[0].fields.post;
          obj.onboardingtime=result.data.data[0].fields.onboardingtime;
          if(
          obj.id==undefined||
          obj.name==undefined||
          obj.number==undefined||
          obj.sex==undefined||
          obj.birth==undefined||
          obj.tel==undefined||
          obj.address==undefined||
          obj.post==undefined||
          obj.onboardingtime==undefined){
        this.$alert("请将信息填写完整","提示", {
          confirmButtonText: "确定",
        })
      }else {
        that.tableData.push(obj);
      }
        }).catch(err=>{
          console.log(err);
          console.log('请求失败: '+err.status+','+err.statusText);
          //console.log(this.tableData);
        });
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
    height: 55px;
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
        padding: 0 10px;
        height: 30px;
        border-radius: 4px;
        font-size: 12px;
        &.test {
          width: 70px;
          border: 1px solid #239679;
          color: #01664f;
        }
        &.add-btn {
          width: 70px;
          border: 1px solid #239679;
          color: #01664f;
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
  .edit-btn{
      //border: 1px solid red;
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
    max-width: 500px;
    height: 660px;
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
            color: #fffdef;
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
    }
    .sub-btn {
      width: 100px;
      background: linear-gradient(-270deg, #239679, #01664f);
      border-radius: 5px;
      border: none;
      margin-left: 80px;
      margin-top: 10px;
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
