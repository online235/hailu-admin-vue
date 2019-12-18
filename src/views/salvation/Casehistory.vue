<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>心安救助历史案例</h2></div>
      <div>
      <el-input
        v-model="periodsNumber"
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
          >插入案例</el-button
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
      <el-table-column label="姓名">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="病名">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.disease }}</span>
        </template>
      </el-table-column>
      <el-table-column label="期数">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.periodsNumber }}</span>
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
      :title='decide == false ? "插入救助案例" : "详情"'
      :visible.sync="insert"
      width="600px"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
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
        <el-form-item label="分摊次数" prop="shareTimes">
          <el-input v-model="ruleForm.shareTimes"></el-input>
        </el-form-item>
        <el-form-item label="已经分摊金钱" prop="shareTimes">
          <el-input v-model="ruleForm.apportionmentMoney"></el-input>
        </el-form-item>
        <el-form-item label="互助天数" prop="helpDays">
          <el-input v-model="ruleForm.helpDays"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
  class="avatar-uploader"
  :action="imghead+upSite"
  :show-file-list="false"
  :on-success="upImage"
  :before-upload="beforeAvatarUpload">
  <img v-if="ruleForm.imageUrl" :src="imghead+ruleForm.imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
          <!-- <el-upload
  :action="imghead+upSite"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-success="upImage"
  :limit='3'
  :file-list='fileList'
  :multiple='true'
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="upModel" append-to-body>
  <img width="100%" :src="imghead+imageUrl" alt="">
</el-dialog> -->
<el-dialog :visible.sync="upModel" append-to-body>
  <img width="100%" :src="imghead+ruleForm.imageUrl" alt="">
</el-dialog>
<el-button v-if="decide==true&&!ruleForm.imageUrl==''" size="mini" type="primary" @click="examines">查看大图</el-button>
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
  caseHistoryList,
  caseHistoryDel,
  caseHistoryAdd,
  caseHistoryAlter
} from "@/api/caseHistory";
import * as config from '@/api/config'
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
      album:[],
      fileList:[],
      imghead:'',
      upSite:'/upload/single/goods', // 请求地址
      sreachs:false,
      decide: false, // 判断插入还是修改
      tableData: [], // 列表数据
      insert: false, // 模态框
      periodsNumber: '', // 名称查询
      timeDate: '',// 手机号码查询
      page: 1,
      size: 10,
      total: 0,
      ruleForm: {
        id:'',
        name: "",
        sex: "",
        age: "",
        disease: "",
        gainMoney: "",
        periodsNumber: "",
        shareTimes: "",
        apportionmentMoney:'',
        helpDays: "",
        province: "",
        timeDate: "",
        imageUrl:''
      },
      upModel: false,
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
        timeDate: [
          {
            type: "string",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        shareTimes: [
          { required: true, message: "请输入分摊次数", trigger: "blur" }
        ],
        apportionmentMoney: [
          { required: true, message: "已经分摊金钱", trigger: "blur" }
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
    this.imghead = config.module_basic_prefix;
    this.fetchData(); //列表数据加载
  },
  methods: {
    fetchData() {
      caseHistoryList({
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          // console.log(1)
           this.ruleForm.imageUrl = ''
        })
        .catch(_ => {
            console.log(2)
        });
    },
    submitForm(formName) {
      if (this.decide == false) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            // this.ruleForm.imageUrl = this.imageUrl
            caseHistoryAdd(this.ruleForm).then(res => {
              console.log(res);
              if (res.code === 200) {
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
                this.insert=false
                this.fetchData();
              }
            });
          } else {
            return false;
          }
        });
      } else {
          caseHistoryAlter(this.ruleForm).then(res =>{
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
            this.ruleForm.imageUrl=''
        }else{
            this.insert = false
            this.$refs[formName].resetFields();
            this.ruleForm.id = ''
            this.ruleForm.imageUrl = ''
        }
    },
    handleEdit(index, row) {
      // 详情修改
      this.decide = true;
      this.insert = true;
      this.ruleForm.id = row.id
      // console.log(row.id)
      caseHistoryDel({
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
        (this.periodsNumber.length === 0 || this.periodsNumber === '') &&
        (this.timeDate.length === 0 || this.timeDate === '')
      ) {
        this.$message({
          type: 'warning',
          message: '请输入搜索内容'
        })
      } else {
        caseHistoryList({
        page: this.page,
        size: this.size,
        periodsNumber:this.periodsNumber,
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
      this.periodsNumber = ''
      this.timeDate = ''
    },
    //  handleRemove(file, fileList) {
    //    this.album=[]
    //     // console.log(file, fileList);
    //     for(var i=0;i<fileList.length;i++){
    //       this.album.push(fileList[i].response.data)
    //     }
    //     console.log(this.album)
    //   },
      // handlePictureCardPreview(file) {
      //   // console.log(file)
      //   this.imageUrl = file.response.data;
      //   this.upModel = true;
      // },
      // handleAvatarSuccess(res, file) {
      //   this.imageUrl = URL.createObjectURL(file.raw);
      // },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
      },
       upImage(res,file){
        //  console.log(file.response.data)
         this.ruleForm.imageUrl=file.response.data
        // console.log(fileList)
        // this.album.push(file.data)
        console.log(this.ruleForm.imageUrl)
      },
       examines(){
        this.upModel = true
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
