<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h3>提现管理</h3></div>
      <div style="width:1300px">
        <el-input v-model="memberName" placeholder="用户名称" style="width:13%;" />
        <el-input v-model="phone" placeholder="用户手机号码" style="width:13%;" />
        <el-input v-model="createTimeStar" type="String" placeholder="申请提现开始时间" style="width: 20%;" />
        <el-input v-model="createTimeEnd" type="String" placeholder="申请提现结束时间" style="width: 20%;" />
        <el-input v-model="examineTime" type="String" placeholder="审核时间" style="width: 20%;" />
        <el-select v-model="state" placeholder="提现状态" style="width:10%;min-width:20px;">
          <el-option
            v-for="item in stateChoose"
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
      <el-button
        type="danger"
        icon="el-icon-search"
        @click="exportExcelData"
      >导出EXCEL
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
      <el-table-column label="用户名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.memberName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.memberMobile }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="提现金额">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.price }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="开户行名称" width="120">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.openAccountBank }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="银行名称" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.bankName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="银行卡卡号" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.bankCard }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="持卡人名称" width="100">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.cardholder }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" width="90">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.stateDisplay }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="提现时间" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.createTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审核人" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.updateBy }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审核人姓名" width="140">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.nickName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审核时间" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.examineTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.state === 0"
            type="primary"
            size="mini"
            @click="hlIncomeTransferOutListModelPass(scope.row)"
          >通过
          </el-button>
          <el-button
            v-show="scope.row.state === 0"
            type="danger"
            size="mini"
            @click="hlIncomeTransferOutListModelFail(scope.row)"
          >拒绝
          </el-button>
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
      <el-form ref="hlIncomeTransferOutListModel" :model="form" label-width="100px">
        <el-row>
          <el-form-item label="提现申请ID：">
            <div>{{ hlIncomeTransferOutListModel.id }}</div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="手机号码：">
                <div>{{ hlIncomeTransferOutListModel.memberMobile }}</div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="会员表id：">
                <div>{{ hlIncomeTransferOutListModel.memberId }}</div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="用户名称：">
                <div>{{ hlIncomeTransferOutListModel.memberName }}</div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="提现金额：">
                <div>{{ hlIncomeTransferOutListModel.price }}</div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="开户行名称：">
                <div>{{ hlIncomeTransferOutListModel.openAccountBank }}</div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="银行名称：">
                <div>{{ hlIncomeTransferOutListModel.bankName }}</div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="银行卡卡号：">
                <div>{{ hlIncomeTransferOutListModel.bankCard }}</div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="持卡人名称：">
                <div>{{ hlIncomeTransferOutListModel.cardholder }}</div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="审核状态：">
                <div>{{ hlIncomeTransferOutListModel.stateDisplay }}</div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="拒绝原因：">
                <div>{{ hlIncomeTransferOutListModel.remark }}</div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="提现时间：">
                <div>{{ hlIncomeTransferOutListModel.createTime }}</div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="审核人：">
                <div>{{ hlIncomeTransferOutListModel.updateBy }}</div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="审核人姓名：">
                <div>{{ hlIncomeTransferOutListModel.nickName }}</div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="审核时间：">
                <div>{{ hlIncomeTransferOutListModel.examineTime }}</div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog
      title="拒绝提现"
      :visible.sync="hlIncomeTransferOutListModelType"
      width="50%"
      :before-close="handleClose"
      class="amendcss"
    >
      <el-form
        ref="orderForm"
        :model="hlIncomeTransferOutListModel"
        :rules="hlIncomeTransferOutRules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row>
          <div class="grid-content bg-purple-light">
            <el-form-item label="提现金额：">
              <div>{{ hlIncomeTransferOutListModel.price }}</div>
            </el-form-item>
          </div>
        </el-row>
        <el-row>
          <div class="grid-content bg-purple-light">
            <el-form-item label="拒绝原因：" prop="remark">
              <el-input v-model="hlIncomeTransferOutListModel.remark" type="textarea" :rows="2" />
            </el-form-item>
          </div>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm(hlIncomeTransferOutListModel.id,remark)">
            确定
          </el-button>
          <el-button @click="cancelForm('orderForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <iframe style="display: none" :src="exportExcelUrl" />
  </div>
</template>

<script>
import {
  findHlIncomeTransferOutListModel,
  updateToExamine,
  exportExcel
} from '@/api/serviceProviders/withdrawalExamine'
import { MessageBox } from 'element-ui'

export default {
  data() {
    return {
      stateChoose: [
        { value: 0, label: '申请中' },
        { value: 1, label: '申请成功' },
        { value: 2, label: '已拒绝' }
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      showDetailType: false,
      hlIncomeTransferOutListModelType: false,
      hlIncomeTransferOutListModel: '',
      createTimeStar: '',
      createTimeEnd: '',
      memberName: '',
      phone: '',
      exportExcelUrl: '',
      examineTime: '',
      state: '',
      remark: '',
      hlIncomeTransferOutRules: {
        remark: [
          { required: true, message: '请输入拒绝原因', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.sreach() // 列表数据加载
  },
  methods: {
    // 搜索
    sreach() {
      findHlIncomeTransferOutListModel({
        page: this.currentPage,
        size: this.pageSize,
        orderType: 1,
        memberName: this.memberName,
        phone: this.phone,
        state: this.state,
        createTimeStar: this.createTimeStar,
        createTimeEnd: this.createTimeEnd,
        examineTime: this.examineTime
      }).then(res => {
        this.total = res.data.total
        this.tableData = res.data.datas
      })
    },
    exportExcelData() {
      MessageBox.confirm('确定是否导出Excal？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // debugger
        // this.exportExcelUrl = config.withdrawal_examine_exportExcel + '?random=' + Math.random()
        exportExcel().then(res => {
          const blob = new Blob([res], {
            type: 'application/vnd.ms-excel'
          })
          const fileName = '提现管理导出.xlsx'
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, fileName)
          } else {
            var link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = fileName
            link.click()
            // 释放内存
            window.URL.revokeObjectURL(link.href)
          }
        })
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
      this.hlIncomeTransferOutListModel = date
    },
    hlIncomeTransferOutListModelFail(date) {
      this.hlIncomeTransferOutListModelType = true
      this.hlIncomeTransferOutListModel = date
    },
    hlIncomeTransferOutListModelPass(data) {
      MessageBox.confirm('确定是否审核通过？', '提示', {
        confirmButtonText: '通过',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateToExamine({
          id: data.id,
          state: 1
        }).then(res => {
          // eslint-disable-next-line eqeqeq
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
    // 拒绝审核
    submitForm(id, remark) {
      MessageBox.confirm('确定拒绝提现？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateToExamine({
          id: id,
          state: 2,
          remark: remark
        }).then(res => {
          this.hlIncomeTransferOutListModelType = false
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
      this.hlIncomeTransferOutListModelType = false
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
