<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>公益列表</h2></div>
      <div>
        <el-input v-model="search" placeholder="可根据关键字查询" clearable />
      </div>
      <div>
        <el-button
          size="medium"
          type="success"
          @click="addUser"
        >添加公益</el-button>
      </div>
    </div>
    <el-table
      border
      :data="
        tableData.filter(
          data =>
            !search ||
            data.cratedat.toLowerCase().includes(search.toLowerCase()) ||
            data.commonwealTitle.toLowerCase().includes(search.toLowerCase()) ||
            data.defaultPicture.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.cratedat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.commonwealTitle }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <div class="avatar-div-list avatar-uploader">
            <img v-if="scope.row.defaultPicture" :src="imghead+scope.row.defaultPicture" class="avatar-div-list">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 添加公益 -->
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible"
      width="850px"
      :before-close="handleClose"
    >
      <el-form :model="record" :rules="rules" ref="versionForm" label-width="110px" class="demo-ruleForm">
        <el-form-item label="政府编号：" prop="adminId">
          <el-select v-model="record.adminId" placeholder="请选择专业" ref="major">
            <el-option  v-for="(major,index) in adminList" :label="major.nickName" :value="major.id" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="公益标题：" prop="commonwealTitle">
          <el-input v-model="record.commonwealTitle"></el-input>
        </el-form-item>

        <el-form-item label="相关图片：" prop="defaultPicture">
          <el-upload class="avatar-uploader"
          :action="imghead+upSite"
          :show-file-list="false"
          :on-preview="handlePictureCardPreview"
          :on-success="upImage"
          :before-upload="beforeAvatarUpload">
          <img v-if="record.defaultPicture" :src="this.imghead+record.defaultPicture" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
        </el-upload>
        </el-form-item>

        <el-form-item label="公益文章内容：" prop="article">
          <editor-bar v-model="record.article" :is-clear="isClear"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('versionForm')">确 定</el-button>
          <el-button @click="cancelForm('versionForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="详情"
      :visible.sync="checkModle"
      width="850px"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="records" label-width="110px">
        <el-form-item label="政府编号：">
          <div>{{adminId}}</div>
        </el-form-item>
        <el-form-item label="标题：">
          <div>{{records.commonwealTitle}}</div>
        </el-form-item>
        <el-form-item label="日期：">
          <div>{{cratedat}}</div>
        </el-form-item>

        <el-form-item label="相关图片：">
          <!-- <div class="avatar-div avatar-uploader">
            <img v-if="records.defaultPicture" :src="this.imghead+records.defaultPicture" class="avatar" >
            <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
          </div> -->
          <div class="demo-image__preview">
  <el-image 
    style="width: 100px; height: 100px"
    :src="this.imghead+records.defaultPicture" 
    :preview-src-list="srcList">
  </el-image>
</div>
        </el-form-item>

        <el-form-item label="公益文章内容：">
          <div v-html="records.article"></div>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelForms()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  charityList,
  PublicAdd,
  ArticleAdd,
  charityDetails,
  article,
  modify,
  detailedInfor,
  adminList
} from '@/api/Charitable'
import axios from 'axios'
import EditorBar from '@/components/editur/index'
import qs from 'qs'
import * as config from '@/api/config'
export default {
  components: { EditorBar },
  data() {
    return {
      form: '',              // 详情数据
      currentPage: 1,       // 默认页码
      pageSize: 10,         // 默认页数
      total: 0,             // 总数
      tableData: [],        // 列表数据
      search: '',           // 查询双向绑定
      checkModle: false,    // 详情模态框
      dialogVisible: false, // 添加模态框
      // 相关图片
      imghead: '',          // 图片请求头
      upSite:'/upload/single/goods', // 请求地址
      srcList: [],
      // srcListimg: [],
      dialogImg: false,
      adminList: [],
      isClear: false,       // 富文本
      detail: '',           // 添加-富文本内容
      details: '',          // 详情-富文本内容
      cratedat: '',         // 公益创建时间
      // 富文本
      record: { // 添加post的数据
        adminId: '',          // 政府编号
        article: '',          // 公益内容
        commonwealTitle: '',  // 公益标题
        defaultPicture: ''    //图片路径
      },
      rules: {
        adminId: [
          { required: true, message: "请选择政府", trigger: 'change' }
        ],
        article: [
          { required: true, message: "内容不能为空", trigger: 'change' }
        ],
        commonwealTitle: [
          { required: true, message: "标题不能为空", trigger: 'change' }
        ],
        defaultPicture: [
          { required: true, message: "图片不能为空", trigger: 'change' }
        ]
      },
      records: { // 修改post的数据
        article: '',
        commonwealTitle: '',
        defaultPicture: ''
      }
    }
  },


  created() {
    // console.log(this.editor)
    this.imghead = config.module_basic_prefix
    this.fetchData() // 列表数据加载
  },

  methods: {
    fetchData() {
      // 列表数据加载
      const params = new URLSearchParams()
      params.append('page', this.currentPage)
      params.append('size', this.pageSize)
      charityList(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.datas
          this.total = res.data.total
        }
      })
    },
    handleEdit(index, row) {
      charityDetails({
        Id: row.id
      }).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.form = res.data
          this.checkModle = true
          this.records.article = res.data.article
          this.records.commonwealTitle = res.data.commonwealTitle
          this.records.defaultPicture = res.data.defaultPicture
          this.cratedat = res.data.cratedat
          this.adminId = res.data.adminId
          this.srcList[0] = this.imghead+res.data.defaultPicture
        }
      })
    },
    addUser() { // 添加按钮
      this.dialogVisible = true
      let params = new URLSearchParams();
      params.append("accountType", '2')
      params.append('page', 1)
      params.append('size', 200)
      adminList(params).then( res => {
        if (res.code == 200){
            this.adminList = res.data.datas
        }
      }).catch( res => {
        this.$message.error("查询政府账号产生错误")
      })
    },
    handleCurrentChange(val) {
      // 分页
      this.currentPage = val
      this.fetchData()
    },
    submitForm(formName) { // 添加确定按钮
      this.$refs[formName].validate((valid) => {
        if (valid) {
          PublicAdd(this.record).then(res => {
            console.log(res)
            if (res.code = 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              Object.keys(this.record).forEach(key => (this.record[key] = ''))
              this.dialogVisible = false
              this.fetchData()
            }
          })
        }
      })
    },
    cancelForm(formName) {  // 取消按钮
      this.$nextTick(()=>{
        this.$refs[formName].resetFields()
      })
      Object.keys(this.record).forEach(key => (this.record[key] = ''))
      this.dialogVisible = false
    },
    cancelForms() {  // 取消按钮
      this.checkModle = false
    },
    handleClose(done) { // 关闭模态框按钮
          this.$nextTick(()=>{
            this.$refs[formName].resetFields()
          })
          Object.keys(this.record).forEach(key => (this.record[key] = ''))
          done()
    },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = this.imghead+file.response.data;
        this.dialogImg= true;
      },
      upImage(file){
        this.record.defaultPicture = file.data
      },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-div  {
    width: 178px;
  }
  .avatar-div-list  {
    width: 100px;
    height: 100px;
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
