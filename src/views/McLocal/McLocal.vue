<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>商家入驻列表</h2></div>
      <div>
        <el-input
          v-model="membername"
          placeholder="请输入店铺名称"
          style="width:20%;min-width:150px;"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
        <el-input
          v-model="membermobile"
          placeholder="请输入手机号码"
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
    </div>
    <el-table
      border
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称">
        <template slot-scope="scope">
          <span>{{ scope.row.shopName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="营业者姓名">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.nameOfLegalPerson }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="店铺手机号码">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.phone }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">
          <span>{{ scope.row.detailAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.toExamineDisPlay
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >审核</el-button>
          <el-button
            size="mini"
            type="warning"
            @click="alterBtn(scope.$index, scope.row)"
          >修改信息</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteBtn(scope.$index, scope.row)"
          >删除</el-button>
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
    <el-dialog
      title="修改信息"
      :visible.sync="dialogVisible"
      width="750px"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="alterForm" label-width="150px">
        <el-form-item label="店铺名称：">
          <el-input v-model="alterForm.shopName" />
        </el-form-item>
        <el-form-item label="营业者姓名：">
          <el-input v-model="alterForm.nameOfLegalPerson" />
        </el-form-item>
        <el-form-item label="店铺手机号码：">
          <el-input v-model="alterForm.phone" />
        </el-form-item>
        <el-form-item label="身份证号码：">
          <el-input v-model="alterForm.idCard" />
        </el-form-item>
        <el-form-item label="身份证照片：">
          <!-- 图片上传 -->
          <div class="Certificates">
            <div class="upImg">
              <span v-if="onesrc.length == 0">身份证正面</span>
              <img v-if="onesrc.length != 0" :src="onesrc">
              <input
                id="file"
                type="file"
                class="dsfafd"
                multiple
                accept="image/png,image/jpeg,image/gif,image/jpg"
                @change="getFile"
              >
              <label
                v-if="onesrc.length == 0"
                for="file"
                class="upImgbtn"
              >点击上传</label>
              <label v-else for="file" class="upseccs">上传成功</label>
            </div>
            <div class="upImg">
              <span v-if="trwosrc.length == 0">身份证背面</span>
              <img v-if="trwosrc.length != 0" :src="trwosrc">
              <input
                id="files"
                type="file"
                class="dsfafd"
                multiple
                accept="image/png,image/jpeg,image/gif,image/jpg"
                @change="getFiless"
              >
              <label
                v-if="trwosrc.length == 0"
                for="files"
                class="upImgbtn"
              >点击上传</label>
              <label v-else for="files" class="upseccs">上传成功</label>
            </div>
          </div>
          <!-- 图片上传 -->
        </el-form-item>
        <el-form-item label="营业执照：">
          <div class="upImg">
            <span v-if="strwisrc.length == 0">工商营业执照</span>
            <img v-if="strwisrc.length != 0" :src="strwisrc">
            <input
              id="filesss"
              type="file"
              class="dsfafd"
              multiple
              accept="image/png,image/jpeg,image/gif,image/jpg"
              @change="getFilesss"
            >
            <label
              v-if="strwisrc.length == 0"
              for="filesss"
              class="upImgbtn"
            >点击上传</label>
            <label v-else for="filesss" class="upseccs">上传成功</label>
          </div>
        </el-form-item>
        <el-form-item label="主营类目：">
          <el-select v-model="firstManagementTypeId" filterable placeholder="请选择" @change="firstSele">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.managementName"
              :value="item.managementId"
            />
          </el-select>
          <el-select v-model="secondManagementTypeId" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in secondoptions"
              :key="index"
              :label="item.managementName"
              :value="item.managementId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input v-model="alterForm.detailAddress" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="upLoad">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="详情审核"
      :visible.sync="checkModle"
      width="750px"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="店铺名称：">
          <div>{{ form.shopName }}</div>
        </el-form-item>
        <el-form-item label="营业者姓名：">
          <div>{{ form.nameOfLegalPerson }}</div>
        </el-form-item>
        <el-form-item label="店铺手机号码：">
          <div>{{ form.phone }}</div>
        </el-form-item>
        <el-form-item label="身份证号码：">
          <div>{{ form.idCard }}</div>
        </el-form-item>
        <el-form-item label="身份证件照片：">
          <div class="demo-image__preview">
            <el-image
              style="width: 200px; height: 150px"
              :src="imghead + form.idcardImgx"
              :preview-src-list="srcList"
              @click="srcListimg(form)"
            />
          </div>
          <div class="demo-image__preview">
            <el-image
              style="width: 200px; height: 150px"
              :src="imghead + form.idcardImgy"
              :preview-src-list="srcList"
              @click="srcListimgy(form)"
            />
          </div>
        </el-form-item>
        <el-form-item label="营业执照：">
          <div class="demo-image__preview">
            <el-image
              style="width: 200px; height: 150px"
              :src="imghead + form.licensePositive"
              :preview-src-list="srcList"
              @click="business(form)"
            />
          </div>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="region" placeholder="请选择审核状态">
            <el-option
              v-for="(item, index) in choose"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkModle = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  McLocalList,
  McLocalDetail,
  McLocalCheck,
  McLocalChange,
  McLocalDelete
} from '@/api/McLocal'
import { UploadSingle } from '@/api/FileUpload'
import { ManageList } from '@/api/management'
import * as config from '@/api/config'
export default {
  data() {
    return {
      membername: '', // 名称查询
      membermobile: '', // 手机号码查询
      sreachs: false, // 重置按钮
      onesrc: [], // 身份证正面
      trwosrc: [], // 身份证背面
      strwisrc: [], // 营业执照照片
      onesrcurl: '', // 身份证正面照url
      trwosrcurl: '', // 身份证背面照url
      strwisrcurl: '', // 营业执照url
      options: [], // 一级主营类目
      secondoptions: [], // 二级主营类目
      firstManagementTypeId: '', // 一级经营类型
      secondManagementTypeId: '', // 二级经营类型
      form: '',
      alterForm: '',
      region: '',
      numberId: '',
      choose: [
        { id: '1', name: '审核中' },
        { id: '2', name: '审核通过' },
        { id: '3', name: '审核不通过' }
      ],
      memberStatus: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      search: '',
      checkModle: false, // 审核模态框
      dialogVisible: false, // 修改模态框
      imghead: '',
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg'
      ]
      //   // 修改数据
      //   shopName:'',//店铺名称
      //   nameOfLegalPerson:'',//经营者姓名
      //   phone:'',// 手机号
      //   idCard:'',//身份证号
      //   detailAddress:'',// 地址
    }
  },
  created() {
    this.imghead = config.module_basic_prefix
    this.fetchData() // 列表数据加载
  },

  methods: {
    fetchData() {
      // 列表数据加载
      McLocalList({
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.datas
          this.total = res.data.total
        }
      })
    },
    handleEdit(index, row) {
      // 审核按钮
      this.numberId = row.numberId
      const params = new URLSearchParams()
      params.append('numberId', row.numberId)
      McLocalDetail(params).then(res => {
        if (res.code === 200) {
          this.form = res.data
          this.checkModle = true
          this.region = row.toExamine + ''
        }
      })
    },
    confirm() {
      // 详情审核确认按钮
      this.checkModle = false
      const params = new URLSearchParams()
      params.append('numberId', this.numberId)
      params.append('toExamine', this.region)
      McLocalChange(params).then(res => {
        if (res.code === 200) {
          this.fetchData()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }
      })
    },
    handleCurrentChange(val) {
      // 分页
      this.currentPage = val
      this.fetchData()
    },
    srcListimg(form) {
      // 身份证正面
      this.srcList[0] = this.imghead + form.idcardImgx
    },
    srcListimgy(form) {
      // 身份证背面
      this.srcList[0] = this.imghead + form.idcardImgy
    },
    business(form) {
      // 营业执照
      this.srcList[0] = this.imghead + form.licensePositive
    },
    alterBtn(index, row) {
      this.alterForm = row
      // 修改信息
      ManageList({
        parentId: '0'
      }).then(res => {
        if (res.code === 200) {
          this.options = res.data
        }
      })
      ManageList({
        parentId: this.alterForm.firstManagementTypeId
      }).then(res => {
        if (res.code === 200) {
          this.secondoptions = res.data
        }
      })

      this.dialogVisible = true
      this.numberId = row.numberId
      this.onesrc = this.imghead + this.alterForm.idcardImgx
      this.trwosrc = this.imghead + this.alterForm.idcardImgy
      this.strwisrc = this.imghead + this.alterForm.licensePositive
      this.onesrcurl = this.alterForm.idcardImgx
      this.trwosrcurl = this.alterForm.idcardImgy
      this.strwisrcurl = this.alterForm.licensePositive
      this.firstManagementTypeId = this.alterForm.firstManagementTypeId
      this.secondManagementTypeId = this.alterForm.secondManagementTypeId
    },
    deleteBtn(index, row) {
      // 删除
      McLocalDelete({
        numberId: row.numberId
      }).then(res => {
        if (res.code === 200) {
          this.fetchData()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }
      })
    },
    getFile(e) {
      const _this = this
      var files = e.target.files[0]
      const params = new FormData()
      params.append('file', files, files.name)
      UploadSingle(params).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.onesrcurl = res.data
          this.onesrc = this.imghead + res.data
        }
      })
    },
    getFiless(e) {
      const _this = this
      const filess = e.target.files[0]
      const params = new FormData()
      params.append('file', filess, filess.name)
      UploadSingle(params).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.trwosrcurl = res.data
          this.trwosrc = this.imghead + res.data
        }
      })
    },
    getFilesss(e) {
      const _this = this
      var filesss = e.target.files[0]
      const params = new FormData()
      params.append('file', filesss, filesss.name)
      UploadSingle(params).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.strwisrcurl = res.data
          this.strwisrc = this.imghead + res.data
        }
      })
    },
    upLoad() {
      McLocalCheck({
        numberId: this.numberId,
        idcardImgx: this.onesrcurl,
        idcardImgy: this.trwosrcurl,
        shopName: this.alterForm.shopName,
        realName: this.alterForm.realName,
        phone: this.alterForm.phone,
        idCard: this.idCard,
        licensePositive: this.strwisrcurl,
        firstManagementTypeId: this.firstManagementTypeId,
        secondManagementTypeId: this.secondManagementTypeId
      }).then(res => {
        if (res.code === 200) {
          this.dialogVisible = false
          this.fetchData()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }
      })
    },
    firstSele() {
      this.secondManagementTypeId = ''
      ManageList({
        parentId: this.firstManagementTypeId
      }).then(res => {
        if (res.code === 200) {
          this.secondoptions = res.data
        }
      })
    },
    sreach() {
      if (
        (this.membername.length === 0 || this.membername === '') &&
        (this.membermobile.length === 0 || this.membermobile === '')
      ) {
        this.$message({
          type: 'warning',
          message: '请输入搜索内容'
        })
      } else {
        McLocalList({
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          shopName: this.membername,
          phone: this.membermobile
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
      McLocalList({
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.datas
          this.total = res.data.total
          this.sreachs = false
          this.membername = ''
          this.membermobile = ''
        }
      })
    }
  }
}
</script>
<style scoped>
.guarantee {
  width: 60%;
}
.elInput {
  width: 200px;
}
.treeHead {
  display: flex;
  align-items: center;
}
.treeHead > div {
  margin-right: 20px;
}
.demo-image__preview {
  display: inline-block;
  margin-left: 10px;
}

.upImg {
  border: 1px solid #ddd;
  width: 200px;
  height: 125px;
  border-radius: 6px;
  position: relative;
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ddd;
  font-size: 24px;
}
.dsfafd {
  display: none;
}
.upImg img {
  width: 100%;
  height: 100%;
  border-radius: 6px;
}
.upImg.active {
  border: 1px solid #0090fa;
}
.upImgbtn {
  position: absolute;
  left: 30%;
  bottom: 5%;
  width: 35%;
  height: 15%;
  border-radius: 15px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
.upseccs {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20px;
  background: #0090fa;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 12px;
}
.Certificates {
  margin-left: 10px;
  width: 75%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
