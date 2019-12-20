<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>心安期数统计</h2></div>
      <div>
      <el-input
        v-model="periods"
        placeholder="可根据期数查询"
        style="width:20%;min-width:150px;"
      >
        <i slot="prefix" class="el-input__icon el-icon-search" />
      </el-input>
      <el-input
        v-model="timeDate"
        placeholder="可根据时间查询"
        style="width:20%;min-width:150px;"
      >
        <i slot="prefix" class="el-input__icon el-icon-search" />
      </el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="sreach"
      >搜索</el-button>
      <el-button v-if="sreachs" @click="cancel">重置</el-button>
    </div>
      <div>
        <el-button size="medium" type="success" @click="addUser"
          >插入期数</el-button
        >
      </div>
    </div>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column label="时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.timeDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预筹集互助金（单位：万元）">
        <template slot-scope="scope">
          <div slot="reference" class="preMutualCapital-wrapper">
            <el-tag size="medium">{{ scope.row.preMutualCapital }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="期数">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.periodsNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分摊人数">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.apportionmentNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="全员每人预分摊">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.averageMoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="帮助会员人数">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.helpMenber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="page"
        :page-sizes="[10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="insert"
      width="600px"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="预筹集互助金" prop="preMutualCapital">
          <el-input v-model="ruleForm.preMutualCapital"></el-input>
        </el-form-item>
       <el-form-item label="期数" prop="periodsNumber">
          <el-input v-model="ruleForm.periodsNumber"></el-input>
        </el-form-item>
        <el-form-item label="全员每人预分摊" prop="averageMoney">
          <el-input v-model="ruleForm.averageMoney"></el-input>
        </el-form-item>
        <el-form-item label="分摊人数" prop="apportionmentNum">
          <el-input v-model="ruleForm.apportionmentNum"></el-input>
        </el-form-item>
        <el-form-item label="帮助会员" prop="helpMenber">
          <el-input v-model="ruleForm.helpMenber"></el-input>
        </el-form-item>
        <el-form-item label="本期时间" required>
          <el-col class="line" :span="2"></el-col>
          <el-col :span="11">
            <el-form-item prop="timeDate">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.timeDate"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">{{
            decide == false ? "立即插入" : "修改"
          }}</el-button>
          <el-button @click="resetForm('ruleForm')">{{
            decide == false ? "重置" : "取消"
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  periodsList,
  periodsDel,
  periodsAdd,
  periodsAlter
} from "@/api/periods";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };

    return {
      search: "",
      sreachs:false,
      decide: false, // 判断插入还是修改
      tableData: [], // 列表数据
      insert: false, // 模态框
      periods: '', // 名称查询
      timeDate: '',// 手机号码查询
      page: 1,
      size: 10,
      total: 0,
      ruleForm: {
        id:'',
        preMutualCapital: "",
        apportionmentNum: "",
        helpMenber: "",
        periodsNumber: "",
        averageMoney: "",
        timeDate: ""
      },
      rules: {
        preMutualCapital: [
          { required: true, message: "请输入预筹集互助金", trigger: "blur" }
        ],
        apportionmentNum: [{ required: true, message: "请输入分摊人数", trigger: "blur" }],
        helpMenber: [
          { required: true, message: "请输入帮助会员人数", trigger: "blur" }
        ],
        periodsNumber: [
          { required: true, message: "请输入期数", trigger: "blur" }
        ],
        timeDate: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        averageMoney: [{ required: true, message: "请输入预分摊金额", trigger: "blur" }],
      }
    };
  },
  created() {
    // this.imghead = axios.defaults.baseURL + '/basic';
    this.fetchData(); //列表数据加载
  },
  methods: {
    fetchData() {
      periodsList({
        page: this.page,
        size: this.size
        // timeDate: this.timeDate,
        // periodsNumber: this.periodsNumber
      }).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.tableData = res.data.datas;
          this.total = res.data.total;
        //   console.log(res.data.datas);
        }
      });
    },
    addUser() {
      // 插入模态框
      this.decide = false;
      this.insert = true;
    },
    submitForm(formName) {
      if (this.decide == false) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            periodsAdd(this.ruleForm).then(res => {
              console.log(res);
              if (res.code === 200) {
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
                this.insert=false
              }
            });
          } else {
            return false;
          }
        });
      } else {
          periodsAlter(this.ruleForm).then(res =>{
              if(res.code===200){
                  this.$message({
                  message: "操作成功",
                  type: "success"
                });
                this.insert=false
                this.fetchData();
              }
          })
        //  console.log(this.ruleForm)
      }
    },
    resetForm(formName) {
        if(this.decide==false){
            this.$refs[formName].resetFields();
        }else{
            this.insert = false
            this.$refs[formName].resetFields();
            this.ruleForm.id = ''
        }
    },
    handleEdit(index, row) {
      // 详情修改
      this.decide = true;
      this.insert = true;
      this.ruleForm.id = row.id
      // console.log(row.id)
      periodsDel({
          id:row.id
      }).then(res =>{
          console.log(res)
          if(res.code === 200){

            this.ruleForm=res.data
            this.ruleForm.sex = res.data.sex+''
          }
      })
    },

    handleCurrentChange(val) {
      this.page = val;
      this.fetchData();
    },
    sreach() {
      if (
        (this.periods.length === 0 || this.periods === '') &&
        (this.timeDate.length === 0 || this.timeDate === '')
      ) {
        this.$message({
          type: 'warning',
          message: '请输入搜索内容'
        })
      } else {
        periodsList({
        page: this.currentPage,
        size: this.pageSize,
        periodsNumber:this.periods,
        timeDate:this.timeDate
      }).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.datas;
          this.total = res.data.total;
        }
      });
        this.sreachs = true
      }
    },
    cancel() {
      this.fetchData()
      this.periods=''
      this.timeDate=''
    },
  },
  mounted() {}
};
</script>
<style scoped>
.treeHead {
  display: flex;
  align-items: center;
}
.treeHead > div {
  margin-right: 20px;
}
</style>
<style>
/* .el-table td div{
    overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
  } */
</style>
