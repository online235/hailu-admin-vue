<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h3>服务商列表</h3></div>
      <div>
        <el-input v-model="serviceName" placeholder="服务商名称" style="width:30%;min-width:200px;" />
        <el-select v-model="isService" placeholder="请选择是否服务商" style="width:30%;min-width:200px;">
          <el-option
            v-for="item in isServiceChoose"
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
      <el-button v-if="sreachs" @click="cancel">重置</el-button>
    </div>
    <el-table
      border
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="服务商名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务商号码">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.phone }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="礼品名称">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.goodsName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否服务商">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.isService == 1
              ? "是"
              : scope.row.isService == 2
                ? "否"
                : ""
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="服务商地址">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.provinceIdStr + scope.row.cityIdStr+scope.row.areaIdStr+scope.row.address }}</span>
          </div>
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
  </div>
</template>

<script>
import { serviceProvidersList } from '@/api/serviceProviders'
export default {
  data() {
    return {
      isServiceChoose: [
        { value: '1', label: '是' },
        { value: '2', label: '否' }
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      serviceName: '',
      isService: '',
      sreachs: false
    }
  },
  created() {
    this.sreach() // 列表数据加载
  },
  methods: {
    // 搜索
    sreach() {
      console.log(this.serviceName)
      // eslint-disable-next-line eqeqeq

      serviceProvidersList({
        page: this.currentPage,
        size: this.pageSize,
        name: this.serviceName,
        isService: this.isService
      }).then(res => {
        this.total = res.data.total
        this.tableData = res.data.datas
      })
    },
    cancel() {
      this.sreach()
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
  .treeHead {
    display: flex;
    align-items: center;
  }
  .treeHead > div {
    margin-right: 20px;
  }
</style>
