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

          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除吗？"
            @onConfirm="btnDelete(scope.$index, scope.row)"
          >
            <el-button
              slot="reference"
              type="danger"
              size="mini"
            >删除</el-button>
          </el-popconfirm>

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
      <el-form ref="versionForm" :model="record" :rules="rules" label-width="110px" class="demo-ruleForm">
        <el-form-item v-if="accountType == 1" label="政府编号：" prop="adminId">
          <el-select ref="major" v-model="record.adminId" placeholder="请选择政府">
            <el-option v-for="(major,index) in adminList" :key="index" :label="major.nickName" :value="major.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="公益标题：" prop="commonwealTitle">
          <el-input v-model="record.commonwealTitle" />
        </el-form-item>

        <el-form-item label="相关图片：" prop="defaultPicture">
          <el-upload
            class="avatar-uploader"
            :action="imghead+upSite"
            :show-file-list="false"
            :on-preview="handlePictureCardPreview"
            :on-success="upImage"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="record.defaultPicture" :src="imghead+record.defaultPicture" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

        <el-form-item label="公益文章内容：" prop="article">
          <editor-bar v-model="record.article" :is-clear="isClear" />
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
          <div>{{ adminId }}</div>
        </el-form-item>
        <el-form-item label="标题：">
          <!-- <div>{{records.commonwealTitle}}</div> -->
          <el-input v-model="records.commonwealTitle" />
        </el-form-item>
        <el-form-item label="日期：">
          <div>{{ cratedat }}</div>
        </el-form-item>

        <el-form-item label="相关图片：">
          <!-- <div class="demo-image__preview">
  <el-image
    style="width: 100px; height: 100px"
    :src="this.imghead+records.defaultPicture"
    :preview-src-list="srcList">
  </el-image>
</div> -->
          <el-upload
            class="avatar-uploader"
            :action="imghead+upSite"
            :show-file-list="false"
            :on-preview="handlePictureCardPreviews"
            :on-success="upImages"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="records.defaultPicture" :src="imghead+records.defaultPicture" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <el-button size="mini" type="primary" @click="examines">查看大图</el-button>
        </el-form-item>

        <el-form-item label="公益文章内容：">
          <!-- <div v-html="records.article"></div> -->
          <editor-bar v-model="records.article" :is-clear="isClear" />
        </el-form-item>
        <el-form-item>
          <el-button @click="cancelForms()">取消</el-button>
          <el-button v-if="accountType == 2" type="primary" @click="modification()">保存</el-button>
        </el-form-item>
        <el-dialog :visible.sync="examine" append-to-body>
          <img width="100%" :src="imghead+records.defaultPicture" alt="">
        </el-dialog>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  charityList,
  PublicAdd,
  charityDetails,
  adminList,
  ArticleDelete
} from '@/api/Charitable'
import EditorBar from '@/components/editur/index'
import * as config from '@/api/config'
import { getAccountType } from '@/utils/auth'
export default {
  components: { EditorBar },
  data() {
    return {
      accountType: '', // 账号类型
      form: '', // 详情数据
      currentPage: 1, // 默认页码
      pageSize: 10, // 默认页数
      total: 0, // 总数
      tableData: [], // 列表数据
      search: '', // 查询双向绑定
      checkModle: false, // 详情模态框
      dialogVisible: false, // 添加模态框
      // 相关图片
      imghead: '', // 图片请求头
      upSite: '/upload/single/goods', // 请求地址
      srcList: [],
      // srcListimg: [],
      dialogImg: false,
      examine: false,
      imageUrl: '',
      adminList: [],
      isClear: false, // 富文本
      detail: '', // 添加-富文本内容
      details: '', // 详情-富文本内容
      cratedat: '', // 公益创建时间
      adminId: '', // 政府编号
      // 富文本
      record: { // 添加post的数据
        adminId: '', // 政府编号
        article: '', // 公益内容
        commonwealTitle: '', // 公益标题
        defaultPicture: '' // 图片路径
      },
      rules: {
        adminId: [
          { required: true, message: '请选择政府', trigger: 'change' }
        ],
        article: [
          { required: true, message: '内容不能为空', trigger: 'change' }
        ],
        commonwealTitle: [
          { required: true, message: '标题不能为空', trigger: 'change' }
        ],
        defaultPicture: [
          { required: true, message: '图片不能为空', trigger: 'change' }
        ]
      },
      records: { // 修改post的数据
        adminId: '',
        article: '',
        commonwealTitle: '',
        defaultPicture: '',
        id: ''
      }
    }
  },

  created() {
    // console.log(this.editor)
    this.accountType = getAccountType()
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
      // console.log(row)
      this.records.id = row.id
      this.records.adminId = row.adminId
      charityDetails({
        Id: row.id
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.form = res.data
          this.checkModle = true
          this.records.article = this.appendImgPrefix(res.data.article)
          this.records.commonwealTitle = res.data.commonwealTitle
          this.records.defaultPicture = res.data.defaultPicture
          this.cratedat = res.data.cratedat
          this.adminId = res.data.adminId
          this.srcList[0] = this.imghead + res.data.defaultPicture
        }
      })
    },
    btnDelete(index, row) {
      ArticleDelete({
        id: row.id
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.fetchData()
        }
      })
    },
    addUser() { // 添加按钮
      const type = this.accountType = getAccountType()
      console.log(this.accountType)
      this.dialogVisible = true
      if (type !== 2) {
        const params = new URLSearchParams()
        params.append('accountType', '2')
        adminList(params).then(res => {
          if (res.code === 200) {
            this.adminList = res.data.datas
          }
        }).catch(res => {
          this.$message.error('查询政府账号产生错误')
        })
      }
    },
    handleCurrentChange(val) {
      // 分页
      this.currentPage = val
      this.fetchData()
    },
    cleanImgPrefix(content){
        // 清理图片前缀
        let imgPrefixReg = new RegExp(this.imghead, "g")
        return content.replace(imgPrefixReg, "").replace(/max-width/g, "width");
    },
    appendImgPrefix(content){
        // 追加图片前缀
        return content.replace(/src=\"/g, "src=\"" + this.imghead);
    },
    submitForm(formName) { // 添加确定按钮
      this.$refs[formName].validate((valid) => {
        if (valid) {
            let imgPrefixReg = new RegExp(this.imghead, "g")
            let submitObject = Object.assign({}, this.record);
            submitObject.article = this.cleanImgPrefix(submitObject.article);
          PublicAdd(submitObject).then(res => {
            console.log(res)
            if (res.code === 200) {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              Object.keys(this.record).forEach(key => (this.record[key] = ''))
              this.dialogVisible = false
              this.fetchData()
            }
          })
        }
      })
    },
    cancelForm(formName) { // 取消按钮
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
      Object.keys(this.record).forEach(key => (this.record[key] = ''))
      this.dialogVisible = false
    },
    cancelForms() { // 取消按钮
      this.checkModle = false
    },
    modification() {
      console.log(this.records)
      PublicAdd(this.records).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          // Object.keys(this.record).forEach(key => (this.record[key] = ''))
          this.checkModle = false
          this.fetchData()
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          Object.keys(this.record).forEach(key => (this.record[key] = ''))
          done()
        })
        .catch(_ => {})
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = this.imghead + file.response.data
      this.dialogImg = true
    },
    handlePictureCardPreviews(file) {
      this.dialogImageUrl = this.imghead + file.response.data
      this.dialogImg = true
    },
    upImage(file) {
      this.record.defaultPicture = file.data
    },
    upImages(file) {
      this.records.defaultPicture = file.data
    },
    examines() {
      this.examine = true
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
