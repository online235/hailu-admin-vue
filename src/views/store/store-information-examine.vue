<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h3>提现管理</h3></div>
      <div style="width:1300px">
        <el-input v-model="storeId" placeholder="店铺id" style="width:13%;" />
        <el-input v-model="storeName" placeholder="店铺名" style="width:13%;" />
        <el-input v-model="shopPhone" type="店铺电话号码" placeholder="申请提现开始时间" style="width: 20%;" />
        <el-input v-model="dateTime" type="String" placeholder="提交时间（yyyy-mm-dd）" style="width: 20%;" />
        <el-select v-model="phoneToExamine" placeholder="电话审核状态" style="width:10%;min-width:20px;">
          <el-option
            v-for="item in toExamineChoose"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="addressToExamine" placeholder="地址审核状态" style="width:10%;min-width:20px;">
          <el-option
            v-for="item in toExamineChoose"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="storeNameExamine" placeholder="店铺名审核" style="width:10%;min-width:20px;">
          <el-option
            v-for="item in toExamineChoose"
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
      >搜索
      </el-button>
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
      style="width: 100%;border-top-width: 20px;"
    >
      <el-table-column label="信息审批表id">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺id" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.storeId }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="店铺名">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.storeName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="店铺电话号码" width="120">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.shopPhone }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="店铺详细地址" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.shopAddressDetail }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺选择" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.areaCodeDisplay }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺名凭证" width="200">
        <template slot-scope="scope" class="block">
          <div slot="reference" class="name-wrapper">
            <el-image
              style="width: 100px; height: 100px"
              :src="imghead + scope.row.storeNameVoucher"
              :fit="fill">
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="电话凭证" width="100">
        <template slot-scope="scope" class="block">
          <div slot="reference" class="name-wrapper">
            <el-image
              style="width: 100px; height: 100px"
              :src="imghead + scope.row.phoneVoucher"
              :fit="fill">
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="地址凭证" width="90">
        <template slot-scope="scope" class="block">
          <div slot="reference" class="name-wrapper">
            <el-image
              style="width: 100px; height: 100px"
              :src="imghead + scope.row.addressVoucher"
              :fit="fill">
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="提交时间" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.dateTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="店铺名审核状态" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.storeNameExamineDisplay }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="电话审核状态" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.phoneToExamineDisplay }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="地区审核状态" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.addressToExamineDisplay }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleExamine(scope.row)"
          >编辑审核</el-button>
          <el-button
            size="mini"
            type="success"
            @click="showDetail(scope.row)"
          >详情
          </el-button>
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
      title="查看详情"
      :visible.sync="showDetailType"
      width="50%"
      :before-close="handleClose"
      class="amendcss"
    >
      <el-form ref="McStoreExamineModel" :model="form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="审核表id：">
                <div>{{ McStoreExamineModel.id }}</div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="提交时间：">
                <div>{{ McStoreExamineModel.dateTime }}</div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="店铺id：">
                <div>{{ McStoreExamineModel.storeId }}</div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="店铺名：">
                <div>{{ McStoreExamineModel.storeName }}</div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="店铺电话号码：">
                <div>{{ McStoreExamineModel.shopPhone }}</div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="店铺详细地址：">
                <div>{{ McStoreExamineModel.shopAddressDetail }}</div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="店铺地区选择Code值：">
                <div>{{ McStoreExamineModel.areaCode }}</div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="店铺地区：">
                <div>{{ McStoreExamineModel.areaCodeDisplay }}</div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="店铺名凭证：">
                <div slot="reference" class="name-wrapper">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="imghead + scope.row.storeNameVoucher"
                    :fit="fill">
                  </el-image>
                </div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="电话凭证：">
                <div slot="reference" class="name-wrapper">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="imghead + scope.row.phoneVoucher"
                    :fit="fill">
                  </el-image>
                </div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="地址凭证：">
                <div slot="reference" class="name-wrapper">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="imghead + scope.row.addressVoucher"
                    :fit="fill">
                  </el-image>
                </div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="地址备注：">
                <div>{{ McStoreExamineModel.addressRemarks }}</div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="店铺名备注：">
                <div>{{ McStoreExamineModel.storeNameRemarks }}</div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="电话备注：">
                <div>{{ McStoreExamineModel.phoneRemarks }}</div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="店铺名审核：">
                <div>{{ McStoreExamineModel.storeNameExamineDisplay }}</div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="电话审核：">
                <div>{{ McStoreExamineModel.phoneToExamineDisplay }}</div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="地区审核：">
                <div>{{ McStoreExamineModel.addressToExamineDisplay }}</div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      title="开始审核"
      :visible.sync="McStoreExamineModelExamine"
      width="50%"
      :before-close="handleClose"
      class="amendcss"
    >
      <el-form
        ref="orderForm"
        :model="McStoreExamineModel"
        :rules="McStoreExamineModelRules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <div class="grid-content bg-purple-light">
            <el-form-item label="店铺id：">
              <div>{{ McStoreExamineModel.storeId }}</div>
            </el-form-item>
          </div>
          <div class="grid-content bg-purple-light">
            <el-form-item label="店铺名：">
              <div>{{ McStoreExamineModel.storeName }}</div>
            </el-form-item>
          </div>
        </el-row>
        <el-row v-show="McStoreExamineModel.storeNameExamine === 1">
          <el-form-item label="店铺名审核状态：">
            <el-select v-model="storeNameExamine" placeholder="请选择店铺名审核状态">
              <el-option
                v-for="item in toExamineChoose"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row v-show="McStoreExamineModel.phoneToExamine === 1">
          <el-form-item label="电话审核状态：">
            <el-select v-model="phoneToExamine" placeholder="请选择电话审核状态">
              <el-option
                v-for="item in toExamineChoose"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row v-show="McStoreExamineModel.addressToExamine === 1">
          <el-form-item label="地址审核状态：">
            <el-select v-model="addressToExamine" placeholder="请选择地址审核状态">
              <el-option
                v-for="item in toExamineChoose"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm(McStoreExamineModel.id)">
            确定
          </el-button>
          <el-button @click="cancelForm('orderForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  selectMcStoreExamineList,
  updateStoreToExamine
} from '@/api/store-information-examine'
import { MessageBox } from 'element-ui'
import * as config from '@/api/config'
export default {
  data() {
    return {
      toExamineChoose: [
        { value: 1, label: '申请中' },
        { value: 2, label: '审核通过' },
        { value: 2, label: '审核不通过' }
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      showDetailType: false,
      McStoreExamineModelExamine: false,
      McStoreExamineModel: '',
      storeId: '',
      storeName: '',
      shopPhone: '',
      dateTime: '',
      storeNameExamine: '',
      addressToExamine: '',
      phoneToExamine: '',
      imghead: ''
    }
  },
  created() {
    this.sreach() // 列表数据加载
    this.imghead = config.module_basic_prefix
  },
  methods: {
    // 搜索
    sreach() {
      selectMcStoreExamineList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        storeId: this.storeId,
        storeName: this.storeName,
        shopPhone: this.shopPhone,
        dateTime: this.dateTime,
        phoneToExamine: this.phoneToExamine,
        addressToExamine: this.addressToExamine,
        storeNameExamine: this.storeNameExamine
      }).then(res => {
        this.total = res.data.total
        this.tableData = res.data.datas
      })
    },
    handleClose(done) {
      // 关闭模态框按钮
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.ruleForm.tagName = ''
        })
        .catch(_ => {
        })
    },
    handleCurrentChange(val) {
      // 分页
      this.currentPage = val
      this.fetchData()
    },
    showDetail(date) {
      this.showDetailType = true
      this.McStoreExamineModel = date
    },
    handleExamine(date) {
      this.McStoreExamineModelExamine = true
      this.McStoreExamineModel = date
    },
    // 编辑审核
    submitForm(id, remark) {
      MessageBox.confirm('确定本次审核结果？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateStoreToExamine({
          id: id,
          phoneToExamine: this.phoneToExamine,
          addressToExamine: this.addressToExamine,
          storeNameExamine: this.storeNameExamine
        }).then(res => {
          this.McStoreExamineModelExamine = false
          if (res.code === 200) {
            // 关闭弹窗，并刷新table
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.sreach()
          }
        })
      })
    },
    // 取消
    cancelForm(formName) {
      this.$refs[formName].resetFields()
      this.McStoreExamineModelExamine = false
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
