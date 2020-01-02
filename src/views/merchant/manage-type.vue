<template>
  <div class="app-container">
    <div class="manage">
      <el-table
        row-key="id"
        border
        lazy
        :load="load"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :data="
          tableData.filter(
            data =>
              !search ||
              data.managementName.toLowerCase().includes(search.toLowerCase())
          )"
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          prop="sort"
        />
        <el-table-column
          label="经营类型"
          prop="managementName"
        />
        <el-table-column
          label="层级"
          prop="mcLevel"
        />
        <el-table-column
          label="项目类型"
          prop="managementType"
        />
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-if="scope"
              v-model="search"
              size="mini"
              placeholder="可根据关键字搜索"
            />
            <el-button
              size="mini"
              type="primary"
              @click="handAdd"
            >添加</el-button>
            <el-button
              v-if="grade"
              size="mini"
              type="primary"
              @click="getBack"
            >返回上一级</el-button>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button v-if="scope.row.children == undefined ? false : true" size="mini" type="primary" @click="handleAdd(scope.$index, scope.row)">添加</el-button>
            <el-button v-if="grades" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">下一级</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      title="添加类型"
      :visible.sync="addType"
      width="500px"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      class="amendcss"
    >
      <div>
        经营类型：
        <el-input v-model="modelinput" />
      </div>
      <div>
        类型备注：
        <el-input v-model="remarks" />
      </div>
      <div>
        项目类型：
        <el-select v-model="region" placeholder="请选择活动区域">
          <el-option label="生活圈百货" value="1" />
          <el-option label="百货" value="2" />
        </el-select>
      </div>
      <div>
        图标颜色：
        <el-input v-model="pictureColour" />
      </div>
      <div>
        图标代码：
        <el-input v-model="pictureCode" />
      </div>
      <div>
        链接地址：
        <el-input v-model="url" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addType = false">取 消</el-button>
        <el-button type="primary" @click="addAmend">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改类型"
      :visible.sync="dialogVisible"
      width="500px"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      class="amendcss"
    >
      <div>
        经营类型：
        <el-input v-model="modelinput" />
      </div>
      <div>
        类型备注：
        <el-input v-model="remarks" />
      </div>
      <div>
        项目类型：
        <el-select v-model="region" placeholder="请选择活动区域">
          <el-option label="生活圈百货" value="1" />
          <el-option label="百货" value="2" />
        </el-select>
      </div>
      <div>
        图标颜色：
        <el-input v-model="pictureColour" />
      </div>
      <div>
        图标代码：
        <el-input v-model="pictureCode" />
      </div>
      <div>
        链接地址：
        <el-input v-model="url" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="amend">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  ManageList,
  ManageAdd,
  ManageCheck,
  ManageMenus
} from '@/api/management'
export default {
  data() {
    return {
      grade: false,
      grades: true,
      modelinput: '', // 类目名称
      remarks: '', // 备注
      pictureColour: '', // 图标颜色
      pictureCode: '', // 图标代码
      url: '', // 链接地址
      dialogVisible: false,
      addType: false,
      children: '',
      search: '',
      parentId: '0',
      parentIds: '',
      managementId: '',
      cstableData: [],
      tableData: [],
      pageNum: 1, // 当前页
      pageSize: 10, // 每页显示数量
      mcLevel: 1,
      currentPage: 1,
      total: 0,
      region: ''
    }
  },
  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      ManageList({
        parentId: this.parentId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        mcLevel: this.mcLevel
      }).then(res => {
        if (res.code === 200) {
          console.log(res.data.datas)
          this.tableData = res.data.datas
          this.total = res.data.total
          let typeName = ''
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].managementType === '1') {
              typeName = '生活圈百货'
            } else {
              typeName = '百货'
            }
            this.tableData[i].managementType = typeName
            // console.log(1, this.tableData[i])
          }
          // console.log(this.tableData)
        }
      })
    },
    handleCurrentChange(val) {
      console.log(val)
      this.pageNum = val
      this.fetchData()
    },
    load(tree, treeNode, resolve) {
      resolve([])
    },
    handleEdit(index, row) {
      this.dialogVisible = true
      this.modelinput = row.managementName
      this.remarks = row.remarks
      this.parentId = row.parentId
      this.managementId = row.managementId
      this.pictureColour = row.pictureColour
      this.pictureCode = row.pictureCode
      this.url = row.url
      this.region = row.managementType === '生活圈百货' ? '1' : '2'
      console.log(row)
    },
    handleDelete(index, row) {
      this.parentId = row.managementId
      this.mcLevel = this.mcLevel + 1
      this.grade = true
      this.fetchData()
      if (this.mcLevel >= 3) {
        this.grades = false
      } else if (this.mcLevel == 2) {
        this.parentIds = row.managementId
      }
      console.log(this.mcLevel)
      // this.grade = true
    },
    getBack() {
      this.mcLevel = this.mcLevel - 1
      if (this.mcLevel == 1) {
        this.parentId = '0'
        this.pageNum = 1
        this.pageSize = 10
        this.grade = false
        this.grades = true
      } else if (this.mcLevel == 2) {
        this.parentId = this.parentIds
        this.pageNum = 1
        this.pageSize = 10
        this.grades = true
      }
      this.fetchData()
    },
    handleAdd(index, row) {
    },
    handAdd() {
      this.modelinput = '' // 类目名称
      this.remarks = ''
      this.pictureColour = '' // 图标颜色
      this.pictureCode = '' // 图标代码
      this.url = '' // 链接地址
      this.addType = true
    },
    addAmend() {
      if (this.modelinput === '') {
        this.$message.error('经营类型不能为空')
      } else {
        ManageAdd({
          parentId: this.parentId,
          managementName: this.modelinput,
          pictureColour: this.pictureColour,
          url: this.url,
          pictureCode: this.pictureCode,
          mcLevel: this.mcLevel,
          managementType: this.region
        }).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.fetchData()
            this.addType = false
          }
        })
      }
    },
    amend() {
      if (this.modelinput === '') {
        this.$message.error('类目名称不能为空')
      } else {
        this.dialogVisible = false
        ManageCheck({
          managementId: this.managementId,
          parentId: this.parentId,
          managementName: this.modelinput,
          remarks: this.remarks,
          url: this.url,
          pictureColour: this.pictureColour,
          pictureCode: this.pictureCode,
          mcLevel: this.mcLevel,
          managementType: this.region
        }).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.fetchData()
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.manage {
  width: 80%;
}
.el-input {
  width: 70%;
}
.el-table .cell,
.el-table th div {
  overflow: visible;
}
.amendcss div {
  margin-top: 10px;
}
</style>
