<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>心安救助历史案例</h2></div>
      <div>
        <el-input placeholder="可根据关键字查询" v-model="search" clearable>
        </el-input>
      </div>
      <div>
        <el-button size="medium" type="success" @click="addUser"
          >插入案例</el-button
        >
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="insert"
      width="600px"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="ruleForm.province"></el-input>
        </el-form-item>
        <el-form-item label="病名" prop="disease">
          <el-input v-model="ruleForm.disease"></el-input>
        </el-form-item>
        <el-form-item label="获取金额" prop="gainMoney">
          <el-input v-model="ruleForm.gainMoney"></el-input>
        </el-form-item>
        <el-form-item label="期数" prop="periodsNumber">
          <el-input v-model="ruleForm.periodsNumber"></el-input>
        </el-form-item>
        <el-form-item label="分摊次数" prop="shareTimes">
          <el-input v-model="ruleForm.shareTimes"></el-input>
        </el-form-item>
        <el-form-item label="互助天数" prop="helpDays">
          <el-input v-model="ruleForm.helpDays"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即插入</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="insert = false">取 消</el-button>
        <el-button type="primary" @click="insert = false">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import {
  caseHistoryList,
  caseHistoryDel,
  caseHistoryAdd,
  caseHistoryAlter
} from "@/api/caseHistory";
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
      insert: false, // 插入病例
      ruleForm: {
        name: "",
        sex: "",
        age: "",
        disease: "",
        gainMoney: "",
        periodsNumber: "",
        shareTimes: "",
        helpDays: "",
        province: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        disease: [{ required: true, message: "请输入病名", trigger: "blur" }],
        gainMoney: [
          { required: true, message: "请输入获取金额", trigger: "blur" }
        ],
        periodsNumber: [
          { required: true, message: "请输入期数", trigger: "blur" }
        ],
        shareTimes: [
          { required: true, message: "请输入分摊次数", trigger: "blur" }
        ],
        province: [{ required: true, message: "请输入省份", trigger: "blur" }],
        helpDays: [
          { required: true, message: "请输入互助天数", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  created() {
    // this.imghead = axios.defaults.baseURL + "/basic";
    // this.fetchData(); //列表数据加载
  },
  methods: {
    addUser() {
      this.insert = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          caseHistoryAdd({
              
          }).then(res => {
              console.log(res)
            if (res.code === 200) {
              
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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
