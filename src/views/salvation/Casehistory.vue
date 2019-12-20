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
          v-model="timeDates"
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
        <el-button
          size="medium"
          type="success"
          @click="addUser"
        >插入案例</el-button>
      </div>
    </div>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column label="时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
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
          >详情</el-button>
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
      />
    </div>
    <el-dialog
      :title="decide == false ? &quot;插入救助案例&quot; : &quot;详情&quot;"
      :visible.sync="insert"
      width="860px"
      :before-close="handleClose"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择性别">
            <el-option label="男" value="1" />
            <el-option label="女" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="ruleForm.province" />
        </el-form-item>
        <el-form-item label="病名" prop="disease">
          <el-input v-model="ruleForm.disease" />
        </el-form-item>
        <el-form-item label="确诊病名" prop="diseaseName">
          <el-input v-model="ruleForm.diseaseName" />
        </el-form-item>
        <el-form-item label="病历图片">
          <!-- <el-input v-model="pictureImage"></el-input> -->
          <div style="display: flex;">
            <div v-if="decide">
              <div v-for="(item,index) in pictureImage" :key="index" class="thenImg">
                <img :src="imghead+item" alt="">
                <div class="conceal"><i class="el-icon-delete" @click="remove(item,index)" /></div>
              </div>
            </div>
            <el-upload
              :action="imghead+upSite"
              list-type="picture-card"
              :on-success="illImage"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <!-- <el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog> -->
          </div>
        </el-form-item>
        <el-form-item label="医院名字" prop="hospitalName">
          <el-input v-model="ruleForm.hospitalName" />
        </el-form-item>
        <el-form-item label="医院收款账号" prop="hospitalAccount">
          <el-input v-model="ruleForm.hospitalAccount" />
        </el-form-item>
        <el-form-item label="救助类型" prop="rescueType">
          <el-select v-model="ruleForm.rescueType" placeholder="请选择救助类型">
            <el-option label="助学" value="1" />
            <el-option label="助残" value="2" />
            <el-option label="助老" value="3" />
            <el-option label="疾病" value="4" />
            <el-option label="扶贫" value="5" />
            <el-option label="公益" value="6" />
            <el-option label="救灾" value="7" />
            <el-option label="医疗" value="8" />
            <el-option label="就业" value="9" />
            <el-option label="自然" value="10" />
          </el-select>
        </el-form-item>
        <el-form-item label="筹款标题" prop="title">
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="救助说明" prop="content">
          <editor-bar v-model="ruleForm.content" :is-clear="isClear" />
        </el-form-item>
        <el-form-item label="目标金额" prop="targetAmount">
          <el-input v-model="ruleForm.targetAmount" />
        </el-form-item>
        <el-form-item label="获取金额" prop="gainMoney">
          <el-input v-model="ruleForm.gainMoney" />
        </el-form-item>
        <el-form-item label="现金额" prop="cash">
          <el-input v-model="ruleForm.cash" />
        </el-form-item>
        <el-form-item label="互助者图片">
          <!-- <el-input v-model="pictureImage"></el-input> -->
          <div style="display: flex;">

            <div v-if="decide">
              <div v-for="(item,index) in pictureHelpImage" :key="index" class="thenImg">
                <img :src="imghead+item" alt="">
                <div class="conceal"><i class="el-icon-delete" @click="removes(item,index)" /></div>
              </div>
            </div>
            <el-upload
              :action="imghead+upSite"
              list-type="picture-card"
              :on-success="HelpImage"
              :on-remove="HelpRemove"
            >
              <i class="el-icon-plus" />
            </el-upload>
            <!-- <el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog> -->
          </div>
        </el-form-item>
        <el-form-item label="期数" prop="periodsNumber">
          <el-input v-model="ruleForm.periodsNumber" />
        </el-form-item>
        <el-form-item label="本期时间" required>
          <el-col class="line" :span="2" />
          <el-col :span="11">
            <el-form-item prop="timeDate">
              <el-date-picker
                v-model="ruleForm.timeDate"
                type="date"
                placeholder="选择日期"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="帮助次数" prop="helpTimes">
          <el-input v-model="ruleForm.helpTimes" />
        </el-form-item>
        <el-form-item label="分摊次数" prop="shareTimes">
          <el-input v-model="ruleForm.shareTimes" />
        </el-form-item>
        <el-form-item label="已经分摊金钱" prop="shareTimes">
          <el-input v-model="ruleForm.apportionmentMoney" />
        </el-form-item>
        <el-form-item label="互助天数" prop="helpDays">
          <el-input v-model="ruleForm.helpDays" />
        </el-form-item>
        <el-form-item label="相关图片">
          <el-upload
            class="avatar-uploader"
            :action="imghead+upSite"
            :show-file-list="false"
            :on-success="upImage"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm.imageUrl" :src="imghead+ruleForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
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
} from '@/api/caseHistory'
import * as config from '@/api/config'
import EditorBar from '@/components/editur/index'
export default {
  components: { EditorBar },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }, 1000)
    }

    return {
      search: '',
      album: [],
      fileList: [],
      imghead: '',
      upSite: '/upload/single/xinAn', // 请求地址
      sreachs: false,
      decide: false, // 判断插入还是修改
      tableData: [], // 列表数据
      insert: false, // 模态框
      periodsNumber: '', // 名称查询
      timeDates: '', // 手机号码查询
      page: 1,
      size: 10,
      total: 0,
      ruleForm: {
        id: '',
        name: '',
        sex: '',
        age: '',
        disease: '',
        gainMoney: '',
        periodsNumber: '',
        shareTimes: '',
        apportionmentMoney: '',
        helpDays: '',
        province: '',
        timeDate: '',
        imageUrl: '',
        hospitalName: '', // 医院名字
        hospitalAccount: '', // 医院收款账号
        diseaseName: '', // 确诊病名
        rescueType: '',
        title: '', // 筹款标题
        cash: '', // 现金额
        content: '', // 救助说明（富文本）
        helpTimes: '', // 帮助次数
        targetAmount: '', // 目标金额
        pictureImage: [], // 病历图片
        pictureHelpImage: [] // 互助者图片
      },
      pictureImage: [], // 病历图片
      pictureHelpImage: [], // 互助者图片
      isClear: false, // 富文本
      upModel: false,
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        disease: [{ required: true, message: '请输入病名', trigger: 'blur' }],
        gainMoney: [
          { required: true, message: '请输入获取金额', trigger: 'blur' }
        ],
        periodsNumber: [
          { required: true, message: '请输入期数', trigger: 'blur' }
        ],
        // timeDate: [
        //   {
        //     type: "string",
        //     required: true,
        //     message: "请选择时间",
        //     trigger: "change"
        //   }
        // ],
        shareTimes: [
          { required: true, message: '请输入分摊次数', trigger: 'blur' }
        ],
        apportionmentMoney: [
          { required: true, message: '已经分摊金钱', trigger: 'blur' }
        ],
        province: [{ required: true, message: '请输入省份', trigger: 'blur' }],
        helpDays: [
          { required: true, message: '请输入互助天数', trigger: 'blur' }
        ],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        age: [{ validator: checkAge, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.imghead = config.module_basic_prefix
    this.fetchData() // 列表数据加载
  },
  mounted() {},
  methods: {
    fetchData() {
      caseHistoryList({
        page: this.page,
        size: this.size
        // timeDate: this.timeDate,
        // periodsNumber: this.periodsNumber
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.tableData = res.data.datas
          this.total = res.data.total
        //   console.log(res.data.datas);
        }
      })
    },
    addUser() {
      // 插入模态框
      this.decide = false
      this.insert = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          // console.log(1)
          this.ruleForm.imageUrl = ''
        })
        .catch(_ => {
          console.log(2)
        })
    },
    submitForm(formName) {
      if (this.decide == false) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            // this.ruleForm.imageUrl = this.imageUrl
            this.ruleForm.pictureImage = this.ruleForm.pictureImage.join(',')
            this.ruleForm.pictureHelpImage = this.ruleForm.pictureHelpImage.join(',')
            console.log(this.ruleForm)
            caseHistoryAdd(this.ruleForm).then(res => {
              console.log(res)
              if (res.code === 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.insert = false
                this.fetchData()
              }
            })
          } else {
            return false
          }
        })
      } else {
        // console.log(this.pictureImage[0])
        for (var i = 0; i < this.pictureImage.length; i++) {
          // console.log(1)
          this.ruleForm.pictureImage.push(this.pictureImage[i])
        }
        for (var i = 0; i < this.pictureHelpImage.length; i++) {
          this.ruleForm.pictureHelpImage.push(this.pictureHelpImage[i])
        }
        // console.log(this.ruleForm.pictureImage)
        this.ruleForm.pictureImage = this.ruleForm.pictureImage.join(',')
        this.ruleForm.pictureHelpImage = this.ruleForm.pictureHelpImage.join(',')
        console.log(this.ruleForm.pictureImage)
        console.log(this.ruleForm.pictureHelpImage)
        caseHistoryAlter(this.ruleForm).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.insert = false
            this.fetchData()
          }
        })
        //  console.log(this.ruleForm)
      }
    },
    resetForm(formName) {
      if (this.decide == false) {
        this.$refs[formName].resetFields()
        this.ruleForm.imageUrl = ''
      } else {
        this.insert = false
        this.$refs[formName].resetFields()
        this.ruleForm.id = ''
        this.ruleForm.imageUrl = ''
      }
    },
    handleEdit(index, row) {
      // 详情修改
      this.decide = true
      this.insert = true
      this.ruleForm.id = row.id
      // console.log(row.id)
      caseHistoryDel({
        id: row.id
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.ruleForm.id = res.data.xaHelpMemberModel.id,
          this.ruleForm.name = res.data.xaHelpMemberModel.name,
          this.ruleForm.sex = res.data.xaHelpMemberModel.sex,
          this.ruleForm.age = res.data.xaHelpMemberModel.age,
          this.ruleForm.disease = res.data.xaHelpMemberModel.disease,
          this.ruleForm.gainMoney = res.data.xaHelpMemberModel.gainMoney,
          this.ruleForm.periodsNumber = res.data.xaHelpMemberModel.periodsNumber,
          this.ruleForm.shareTimes = res.data.xaHelpMemberModel.shareTimes,
          this.ruleForm.apportionmentMoney = res.data.xaHelpMemberModel.apportionmentMoney,
          this.ruleForm.helpDays = res.data.xaHelpMemberModel.helpDays,
          this.ruleForm.province = res.data.xaHelpMemberModel.province,
          this.ruleForm.timeDate = res.data.xaHelpMemberModel.timeDate,
          this.ruleForm.imageUrl = res.data.xaHelpMemberModel.imageUrl,
          this.ruleForm.hospitalName = res.data.xaHelpMemberModel.hospitalName,
          this.ruleForm.hospitalAccount = res.data.xaHelpMemberModel.hospitalAccount,
          this.ruleForm.diseaseName = res.data.xaHelpMemberModel.diseaseName,
          this.ruleForm.rescueType = res.data.xaHelpMemberModel.rescueType,
          this.ruleForm.title = res.data.xaHelpMemberModel.title,
          this.ruleForm.cash = res.data.xaHelpMemberModel.cash,
          this.ruleForm.content = res.data.xaHelpMemberModel.content,
          this.ruleForm.helpTimes = res.data.xaHelpMemberModel.helpTimes,
          this.ruleForm.targetAmount = res.data.xaHelpMemberModel.targetAmount,
          this.ruleForm.pictureImage = []
          this.ruleForm.pictureHelpImage = []
          // this.ruleForm=res.data.xaHelpMemberModel
          this.ruleForm.sex = res.data.xaHelpMemberModel.sex + ''
          this.ruleForm.rescueType = res.data.xaHelpMemberModel.rescueType + ''
          this.pictureImage = res.data.pictureImages
          this.pictureHelpImage = res.data.pictureHelpImages
        }
      })
    },

    handleCurrentChange(val) {
      this.page = val
      this.fetchData()
    },
    sreach() {
      if (
        (this.periodsNumber.length === 0 || this.periodsNumber === '') &&
        (this.timeDates.length === 0 || this.timeDates === '')
      ) {
        this.$message({
          type: 'warning',
          message: '请输入搜索内容'
        })
      } else {
        caseHistoryList({
          page: this.page,
          size: this.size,
          periodsNumber: this.periodsNumber,
          timeDate: this.timeDates
        }).then(res => {
          if (res.code === 200) {
            this.tableData = res.data.datas
            this.total = res.data.total
          }
        })
        this.sreachs = true
      }
    },
    cancel() {
      this.fetchData()
      this.periodsNumber = ''
      this.timeDates = ''
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
    upImage(res, file) {
      //  console.log(file.response.data)
      this.ruleForm.imageUrl = file.response.data
      // console.log(fileList)
      // this.album.push(file.data)
      console.log(this.ruleForm.imageUrl)
    },
    examines() {
      this.upModel = true
    },
    handleRemove(file, fileList) {
      this.ruleForm.pictureImage = []
      // console.log(file, fileList);
      for (var i = 0; i < fileList.length; i++) {
        this.ruleForm.pictureImage.push(fileList[i].response.data)
      }
    },
    handlePictureCardPreview(file) {
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
    },
    illImage(res, file) {
      this.ruleForm.pictureImage.push(file.response.data)
      console.log(this.ruleForm.pictureImage)
    },
    HelpImage(res, file) {
      this.ruleForm.pictureHelpImage.push(file.response.data)
      console.log(this.ruleForm.pictureHelpImage)
    },
    HelpRemove(file, fileList) {
      this.ruleForm.pictureHelpImage = []
      // console.log(file, fileList);
      for (var i = 0; i < fileList.length; i++) {
        this.ruleForm.pictureHelpImage.push(fileList[i].response.data)
      }
      // console.log(this.ruleForm.pictureImage);
    },
    HelpPictureCardPreview(file) {
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
      // console.log(fileList)
    },
    remove(item, index) {
      // console.log(item,index)
      this.pictureImage.splice(index, 1)
      // pictureImage:[], // 病历图片
      console.log(this.pictureImage)
    },
    removes(item, index) {
      // console.log(item,index)
      this.pictureHelpImage.splice(index, 1)
      console.log(this.pictureHelpImage)
      // this.pictureHelpImage=this.pictureHelpImage
      // pictureHelpImage:[], // 互助者图片
    }
  }
}
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
  .thenImg{
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    margin: 0 8px 8px 0;
    display: inline-block;
    position: relative;
  }
  .thenImg img{
    width: 100%;
    height: 100%;
  }
  .conceal{
    position: absolute;
    width: 146px;
    height: 146px;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0,0,0,.5);
    -webkit-transition: opacity .3s;
    transition: opacity .3s;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
  .conceal:hover{
    opacity: 1;
  }
</style>
