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
          )" style="width: 100%">
        <el-table-column
          label="经营类型"
          prop="managementName"
        ></el-table-column>
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
            <el-button v-if="grade == false ? true : false" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">下一级</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="添加类型"
      :visible.sync="addType"
      width="30%"
      :before-close="handleClose"
      class="amendcss"
    >
      <div>
        经营类型：
        <el-input v-model="modelinput"></el-input>
      </div>
      <div>
        图标颜色：
        <el-input v-model="pictureColour"></el-input>
      </div>
      <div>
        图标代码：
        <el-input v-model="pictureCode"></el-input>
      </div>
      <div>
        链接地址：
        <el-input v-model="url"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addType = false">取 消</el-button>
        <el-button type="primary" @click="addAmend">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改类型"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      class="amendcss"
    >
      <div>
        经营类型：
        <el-input v-model="modelinput"></el-input>
      </div>
      <div>
        图标颜色：
        <el-input v-model="pictureColour"></el-input>
      </div>
      <div>
        图标代码：
        <el-input v-model="pictureCode"></el-input>
      </div>
      <div>
        链接地址：
        <el-input v-model="url"></el-input>
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
      modelinput: '', // 类目名称
      pictureColour: '', // 图标颜色
      pictureCode: '', // 图标代码
      url: '', // 链接地址
      dialogVisible: false,
      addType:false,
      children: '',
      search: '',
      parentId: '0',
      managementId: '',
      cstableData: [],
      tableData: []
    }
  },
  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      ManageList({
        parentId: this.parentId
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
        }
      })
    },
    load(tree, treeNode, resolve) {
      resolve([])
    },
    handleEdit(index, row) {
      this.dialogVisible = true
      this.modelinput = row.managementName
      this.parentId = row.parentId
      this.managementId = row.managementId
      this.pictureColour = row.pictureColour
      this.pictureCode = row.pictureCode
      this.url = row.url
    },
    handleDelete(index, row) {
      this.parentId = row.managementId
      this.fetchData()
      this.grade = true
    },
    getBack() {
      this.parentId = '0'
      this.fetchData()
      this.grade = false
    },
    handleAdd(index, row) {
    },
    handAdd() {
      this.modelinput= '' // 类目名称
      this.pictureColour= '' // 图标颜色
      this.pictureCode= '' // 图标代码
      this.url= '' // 链接地址
      this.addType=true
    },
    addAmend(){
      if(this.modelinput==''){
        this.$message.error('经营类型不能为空');
      }else{
        ManageAdd({
        parentId: this.parentId,
        managementName:this.modelinput,
        pictureColour:this.pictureColour,
        url:this.url,
        pictureCode:this.pictureCode
      }).then(res => {
        if (res.code === 200) {
          this.fetchData()
          this.addType=false
        }
      })
      }
      
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    amend() {
      if (this.modelinput === '') {
        this.$message.error('类目名称不能为空');
      } else {
        this.dialogVisible = false
        ManageCheck({
          managementId: this.managementId,
          parentId: this.parentId,
          managementName: this.modelinput,
          url: this.url,
          pictureColour: this.pictureColour,
          pictureCode: this.pictureCode
        }).then(res => {
          if (res.code === 200) {
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
