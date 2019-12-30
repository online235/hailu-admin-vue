<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>标签列表</h2></div>
      <div>
        <el-input v-model="search" placeholder="可根据关键字查询" clearable />
      </div>
      <div>
        <el-button
          size="medium"
          type="success"
          @click="addUser"
        >添加标签</el-button>
      </div>
    </div>
    <el-table
      border
      :data="
        tableData.filter(
          data =>
            !search || data.tagName.toLowerCase().includes(search.toLowerCase())
            || data.updateTime.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.tagName }}</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.stateDisplay
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >修改</el-button>

          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确定删除吗？"
            @onConfirm="handleDelete(scope.$index, scope.row)"
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
    <el-dialog
      :title="decide == false ? '添加': '修改'"
      :visible.sync="checkModle"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标签名称" prop="tagName">
          <el-input v-model="ruleForm.tagName" />
        </el-form-item>

        <el-form-item label="标签类型：">
          <el-select v-model="ruleForm.tagType" placeholder="请选择标签类型">
            <el-option
              v-for="(item, index) in tagTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>


        <el-form-item label="状态：" v-if="decide == true">
          <el-select v-model="ruleForm.state" placeholder="请选择状态">
            <el-option
              v-for="(item, index) in choose"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">{{ decide == false? '立即添加' : '立即修改' }}</el-button>
          <el-button @click="resetForm('ruleForm')">{{ decide == false? '重置' : '取消' }}</el-button>
        </el-form-item>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="checkModle = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import { TagList, TagDel, TagAdd, Taglter, TagDetails } from '@/api/tag'
export default {
  data() {
    return {
      ruleForm: {
        id: '',
        tagName: '',
        state: '',
        tagType: '',
        stateDisplay: ''
      },
      rules: {
        tagName: [
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      search: '',
      checkModle: false,
      decide: false, // 判断插入还是修改

      choose: [
        { id: 0, name: '禁用' },
        { id: 1, name: '启用' }
      ],
      tagTypeList: [
        { id: 1, name: '停车信息' },
        { id: 2, name: '免费wifi' },
        { id: 3, name: '环境信息' },
        { id: 4, name: '其他' },
      ],

    }
  },
  created() {
    this.fetchData() // 列表数据加载
  },

  methods: {
    fetchData() {
      // 列表数据加载
      // let params = new URLSearchParams();
      // params.append("page", this.currentPage);
      // params.append("size", this.pageSize);
      TagList({
        page: this.currentPage,
        size: this.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.datas
          this.total = res.data.total
        }
      })
    },
    addUser() { // 添加
      this.checkModle = true
      this.decide = false
    },
    handleDelete(index, row) {
      const params = new URLSearchParams()
      params.append('deleteType', '2')
      params.append('id', row.id)
      TagDel(params).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.fetchData()
        }
      })
    },
    handleEdit(index, row) {
      // this.checkModle = true;

      // 审核按钮
      const params = new URLSearchParams()
      params.append('id', row.id)
      TagDetails(params).then(res => {
        if (res.code === 200) {
          // this.form = res.data;
          this.checkModle = true
          this.decide = true
          this.ruleForm.tagName = res.data.tagName
          this.ruleForm.id = res.data.id
          this.ruleForm.state = res.data.state
          this.ruleForm.tagType = res.data.tagType
        }
      })
    },
    handleClose(done) {
      // 关闭模态框按钮
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.ruleForm.id = '';
          this.ruleForm.tagName = '';
          this.ruleForm.state = '';
          this.ruleForm.tagType = '';
        })
        .catch(_ => {})
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.decide == false) {
            const params = new URLSearchParams()
            params.append('tagName', this.ruleForm.tagName)
            params.append('tagType', this.ruleForm.tagType)
            TagAdd(params).then(res => {
              if (res.code === 200) {
                this.ruleForm.id = '';
                this.ruleForm.tagName = '';
                this.ruleForm.state = '';
                this.ruleForm.tagType = '';
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.fetchData()
                this.checkModle = false
              }
            })
          } else {
            //    let params = new URLSearchParams();
            //     params.append("tagName", this.ruleForm.tagName);
            Taglter(this.ruleForm).then(res => {
              if (res.code === 200) {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.fetchData()
                this.checkModle = false
              }
            })
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      if (this.decide == false) {
        this.$refs[formName].resetFields()
        this.ruleForm.tagName = '';
        this.ruleForm.tagType = '';
      } else {
        this.$refs[formName].resetFields()
        this.checkModle = false;
        this.ruleForm.tagName = '';
        this.ruleForm.state = '';
        this.ruleForm.tagType = '';
      }
    },
    confirm() {
      // 详情审核确认按钮
      this.checkModle = false

    //   insuredCheck(params).then(res => {
    //     if (res.code===200) {
    //       this.fetchData()
    //       this.$message({
    //         message: '操作成功',
    //         type: 'success'
    //       })
    //     }
    //   })
    },
    handleCurrentChange(val) {
      // 分页
      this.currentPage = val
      this.fetchData()
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
</style>
