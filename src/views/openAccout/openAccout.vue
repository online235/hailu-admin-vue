<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h3>账号列表</h3></div>
      <div>
         <el-input
        placeholder="请输入公司名称"
        v-model="search"
        style="width:20%;min-width:150px;"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="sreach"
        >搜索</el-button
      >
      <el-button @click="cancel" v-if="sreachs">重置</el-button>
      <el-button @click="addUser" type="success">添加</el-button>
      </div>
    </div>
    <el-table
      border
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接入公司名称">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.companyName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="appId">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.appId }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="appSecret">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.appSecret }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
  title="添加账号"
  :visible.sync="addAccount"
  width="30%"
  :before-close="handleClose">
  <el-form ref="form" label-width="100px">
  <el-form-item label="接入公司名称">
    <el-input v-model="companyName"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addAccount = false">取 消</el-button>
    <el-button type="primary" @click="addConfirm">确 定</el-button>
  </span>
</el-dialog>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { openlist,openApidel,openApiadd } from '@/api/openAccout';
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      companyName: '',
      sreachs: false,
      addAccount: false,
      search:'',
    }
  },
  created() {
    this.sreach() // 列表数据加载
  },
  methods: {
    // 搜索
    sreach() {
      openlist({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        companyName: this.search,
      }).then(res => {
          console.log(res)
          if(res.code==200){
            this.total = res.data.total
            this.tableData = res.data.datas
          }
      })
    },
     cancel() {
       this.sreach()
    },
    addUser(){ // 添加按钮
        this.addAccount=true
    },
    addConfirm(){ // 确认添加按钮
        openApiadd({
            companyName:this.companyName
      }).then(res => {
          console.log(res)
          if(res.code==200){
              this.$message({
            message: '添加成功',
            type: 'success'
            });
            this.addAccount=false
            this.sreach()
          }
      })
    },
    handleEdit(index,row){
        console.log(row)
         openApidel({
            id:row.id
      }).then(res => {
          console.log(res)
          if(res.code==200){
              this.$message({
            message: '删除成功',
            type: 'success'
            });
            this.sreach()
          }
      })
    },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    handleCurrentChange(val) {
      // 分页
      this.currentPage = val
      this.sreach()
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
