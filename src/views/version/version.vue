<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h3>版本列表</h3></div>
      <div>
        <el-input v-model="version" placeholder="版本号" style="width:30%;min-width:200px;" />
        <el-select v-model="type" placeholder="请选择设备类型" style="width:30%;min-width:200px;">
          <el-option
            v-for="item in typeChoose"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="sreach"
      >搜索</el-button>
      <el-button type="success" icon="el-icon-edit" @click="addVersion">添加</el-button>
    </div>
    <el-table
      border
      :data="
        tableData.filter(
          data =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
            || data.createDate.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="版本号">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.version }}</span>
        </template>
      </el-table-column>
      <el-table-column label="构建号">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.build }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="设备类型">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.type == 1
              ? "IOS"
              : scope.row.type == 2
                ? "安卓"
                : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新标识">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.mandatory }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="版本内容">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.content }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="更新状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.renewal == 1
              ? "强制更新"
              : scope.row.renewal == 2
                ? "非强制更新"
                : scope.row.renewal == 3
                  ? "无需更新"
                  : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.createTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="versionEdit(scope.$index, scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="versionDelete(scope.row.id)"
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
      title="操作版本"
      :visible.sync="addType"
      width="50%"
      :before-close="handleClose"
      class="amendcss"
    >
      <el-form ref="versionForm" :rules="rules" :model="versionModel" label-width="85px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="版本号:" prop="version">
              <el-input v-model="versionModel.version" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="构建号:" :span="11" prop="build">
              <el-input v-model="versionModel.build" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="标题:" :size="medium" prop="title">
          <el-input v-model="versionModel.title" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动区域:" prop="type">
              <el-select v-model="versionModel.type" placeholder="设备类型">
                <el-option
                  v-for="item in typeChoose"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="更新状态:" prop="renewal">
              <el-select v-model="versionModel.renewal" placeholder="更新状态">
                <el-option
                  v-for="item in renewalChoose"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="更新标识:" prop="mandatory">
          <el-input v-model="versionModel.mandatory" />
        </el-form-item><el-form-item label="下载地址:" :size="medium">
          <el-input v-model="versionModel.url" />
        </el-form-item>
        <el-form-item label="版本内容:" prop="content">
          <el-input v-model="versionModel.content" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('versionForm')">
            <span v-if="versionModel.id == ''">新增</span>
            <span v-else>修改</span>
          </el-button>
          <el-button @click="cancelForm('versionForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { UploadSingle } from '@/api/FileUpload'

// 这里我使用了jquery
// eslint-disable-next-line no-unused-vars
import $ from 'jquery'
// eslint-disable-next-line no-unused-vars
import { versionList, saveVersion, deleteVersion } from '@/api/version'
export default {
  data() {
    return {
      tableData: [],
      version: '',
      type: '',
      typeChoose: [
        { value: '', label: '' },
        { value: 1, label: 'IOS' },
        { value: 2, label: '安卓' }
      ],
      renewalChoose: [
        { value: '', label: '' },
        { value: 1, label: '强制更新' },
        { value: 2, label: '非强制性更新' },
        { value: 3, label: '无需更新' }
      ],
      addType: false,
      versionModel: {
        id: '',
        version: '',
        build: '',
        title: '',
        content: '',
        mandatory: '',
        renewal: '',
        url: '',
        type: ''
      },
      rules: {
        version: [
          { required: true, message: '请输入版本号', trigger: 'blur' }
        ],
        build: [
          { required: true, message: '请输入构建号', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        mandatory: [
          { required: true, message: '请输入更新表示', trigger: 'blur' }
        ],
        renewal: [
          { required: true, message: '请选择更新状态', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择设备类型', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.sreach()
  },
  methods: {
    // 搜索
    sreach() {
      versionList({
        version: this.version,
        type: this.type,
        page: this.currentPage,
        size: this.pageSize
      }).then(res => {
        this.total = res.data.total
        this.tableData = res.data.datas
      })
    },
    handleCurrentChange(val) {
      // 分页
      this.currentPage = val
      this.fetchData()
    },

    // 添加版本管理
    addVersion() {
      this.addType = true
    },
    // 保存
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          saveVersion(this.versionModel).then(res => {
            // eslint-disable-next-line eqeqeq
            if (res.code == 200) {
              // 关闭弹窗，并刷新table
              this.addType = false
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.sreach()
            }
          })
        } else {
          return false
        }
      })
    },
    // 取消
    cancelForm(formName) {
      this.$refs[formName].resetFields()
      Object.keys(this.versionModel).forEach(key => (this.versionModel[key] = ''))
      this.addType = false
    },
    // 编辑
    versionEdit(row, data) {
      this.versionModel = JSON.parse(JSON.stringify(data))
      this.addType = true
    },
    // 删除
    versionDelete(id) {
      // 关闭模态框按钮
      this.$confirm('确认删除？')
        .then(_ => {
          deleteVersion(id).then(res => {
            // eslint-disable-next-line eqeqeq
            if (res.data == true) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.sreach()
            }
          })
        })
        .catch(_ => {})
    }
  }
}
</script>
<style>

.treeHead {
   display: flex;
   align-items: center;
 }
.treeHead > div {
  margin-right: 20px;
}
</style>
