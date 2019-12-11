<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h3>账号列表</h3></div>
      <div>
         <el-input
        placeholder="请输入名称"
        v-model="companyName"
        style="width:20%;min-width:150px;"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="sreach"
        >搜索</el-button
      >
      <el-button @click="cancel" v-if="sreachs">重置</el-button>
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
      <el-table-column label="服务商号码">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.companyName }}</span>
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
        companyName: this.companyName,
      }).then(res => {
          if(res.code==200){
            this.total = res.data.total
            this.tableData = res.data.datas
          }
      })
    },
     cancel() {
       this.sreach()
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
