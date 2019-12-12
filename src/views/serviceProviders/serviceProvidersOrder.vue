<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h3>城市合伙人订单</h3></div>
      <div>

        <el-input v-model="userName" placeholder="用户名称" style="width:30%;min-width:200px;" />
        <el-input v-model="goodsName" placeholder="套餐名称" style="width:30%;min-width:200px;" />
        <el-select v-model="orderStatus" placeholder="订单状态" style="width:30%;min-width:200px;">
          <el-option
            v-for="item in orderStatusChoose"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-button type = "primary" icon="el-icon-search" @click="sreach"
      >搜索</el-button
      >
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
      <el-table-column label="用户名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单号">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.orderNo }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="金额">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.money }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品名称">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.goodsName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="收件人">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
              scope.row.recipient
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{ scope.row.recipientPhone }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="收货地址" width="240">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span style="margin-left: 12px">{{  scope.row.provinceStr + scope.row.cityStr + scope.row.areaStr + scope.row.address }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
              scope.row.orderStatus == 1
                ? "待支付"
              : scope.row.orderStatus == 2
                ? "待发货"
              : scope.row.orderStatus == 3
                ? "已发货"
              : scope.row.orderStatus == 4
                ? "已完成"
              : ""
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="orderEdit(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="success"
            @click="showDetail(scope.row)"
          >查看详情</el-button>
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

    <el-dialog
      title="查看详情"
      :visible.sync="showDetailType"
      width="50%"
      :before-close="handleClose"
      class="amendcss"
    >
      <el-form ref="hlOrder" :model="form" label-width="100px">
        <el-form-item label="订单号：">
          <div>{{ hlOrder.orderNo }}</div>
        </el-form-item>
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple">
            <el-form-item label="用户名称：">
              <div>{{ hlOrder.userName }}</div>
            </el-form-item>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            <el-form-item label="商品名称：">
              <div>{{ hlOrder.goodsName }}</div>
            </el-form-item>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple">
            <el-form-item label="金额：">
              <div>{{ hlOrder.money }}</div>
            </el-form-item>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            <el-form-item label="支付方式：">
              <div>{{
                hlOrder.payType == 1
                ? "支付宝"
                : hlOrder.payType == 2
                ? "微信"
                : hlOrder.payType == 3
                ? "微信H5"
                : ""
                }}</div>
            </el-form-item>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple">
            <el-form-item label="创建时间：">
              <div>{{ hlOrder.createTime }}</div>
            </el-form-item>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            <el-form-item label="支付时间：">
              <div>{{ hlOrder.payTime }}</div>
            </el-form-item>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple">
            <el-form-item label="订单状态：">
              <div>{{
                hlOrder.orderStatus == 1
                ? "待支付"
                : hlOrder.orderStatus == 2
                ? "待发货"
                : hlOrder.orderStatus == 3
                ? "已发货"
                : hlOrder.orderStatus == 4
                ? "已完成"
                : ""
                }}</div>
            </el-form-item>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            <el-form-item label="物流状态：">
              <div>{{
                hlOrder.logisticsStatus == 1
                ? "已发货"
                : hlOrder.logisticsStatus == 2
                ? "待接收"
                : hlOrder.logisticsStatus == 3
                ? "已完成"
                : ""
                }}</div>
            </el-form-item>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple">
            <el-form-item label="快递公司：">
              <div>{{
                hlOrder.courierCompany
                }}</div>
            </el-form-item>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            <el-form-item label="快递单号：">
              <div>{{
                hlOrder.courierNumber
                }}</div>
            </el-form-item>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple">
            <el-form-item label="收件人：">
              <div>{{
                hlOrder.recipient
                }}</div>
            </el-form-item>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            <el-form-item label="联系方式：">
              <div>{{
                hlOrder.recipientPhone
                }}</div>
            </el-form-item>
          </div></el-col>
        </el-row>
        <el-form-item label="收货地址：">
          <div>{{
            hlOrder.provinceStr + hlOrder.cityStr + hlOrder.areaStr + hlOrder.address
            }}</div>
        </el-form-item>
        <el-form-item label="买家留言：">
          <div>{{
            hlOrder.remark
            }}</div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="编辑订单"
      :visible.sync="editOrderType"
      width="50%"
      :before-close="handleClose"
      class="amendcss"
    >
      <el-form :model="hlOrder" :rules="orderRules" ref="orderForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="快递公司" prop="courierCompany">
          <el-input v-model="hlOrder.courierCompany"></el-input>
        </el-form-item>
        <el-form-item label="快递单号" prop="courierNumber">
          <el-input v-model="hlOrder.courierNumber"></el-input>
        </el-form-item>
        <el-form-item label="物流状态" prop="logisticsStatus">
          <el-select v-model="hlOrder.logisticsStatus" placeholder="物流状态">
            <el-option
              v-for="item in logisticsStatusChoose"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="收货地址" >
          <div class="linkage">
            <el-select
              v-model="hlOrder.provinceId"
              @change="choseProvince"
              placeholder="省级地区">
              <el-option
                v-for="item in ProvinceList"
                :key="item.adCode"
                :label="item.name"
                :value="item.adCode">
              </el-option>
            </el-select>
            <el-select
              v-model="hlOrder.cityId"
              @change="choseCity"
              placeholder="市级地区">
              <el-option
                v-for="item in cityList"
                :key="item.adCode"
                :label="item.name"
                :value="item.adCode">
              </el-option>
            </el-select>
            <el-select
              v-model="hlOrder.areaId"
              placeholder="区级地区">
              <el-option
                v-for="item in areaList"
                :key="item.adCode"
                :label="item.name"
                :value="item.adCode">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="详细地址" prop="name">
          <el-input v-model="hlOrder.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('orderForm')">
            保存
          </el-button>
          <el-button @click="cancelForm('orderForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { serviceProvidersOrderList,serviceProvidersOrderEdit } from '@/api/serviceProviders/serviceProvidersOrder';
import { nationList } from '@/api/address';
export default {
  data() {
    return {
      logisticsStatusChoose: [
        { value: '', label: '' },
        { value: 1, label: '待发货' },
        { value: 2, label: '待接收' },
        { value: 3, label: '已完成' }
      ],
      orderStatusChoose: [
        { value: '', label: '全部' },
        { value: 1, label: '待支付' },
        { value: 2, label: '待发货' },
        { value: 3, label: '已发货' },
        { value: 4, label: '已完成' }
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      showDetailType: false,
      editOrderType: false,
      hlOrder: '',
      ProvinceList: [],
      cityList: [],
      areaList: [],
      userName: '',
      goodsName: '',
      orderStatus: '',
      orderRules: {
        courierCompany: [
          { required: true, message: '请输入物流公司', trigger: 'blur' }
        ],
        courierNumber: [
          { required: true, message: '请输入快递单号', trigger: 'blur' }
        ],
        logisticsStatus: [
          { required: true, message: '请选择物流状态', trigger: 'blur' }
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
      serviceProvidersOrderList({
        page: this.currentPage,
        size: this.pageSize,
        orderType: 1,
        userName: this.userName,
        goodsName: this.goodsName,
        orderStatus: this.orderStatus
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
    showDetail(date) {
      this.showDetailType = true
      this.hlOrder = date
    },
    orderEdit(date) {
      this.editOrderType = true
      this.hlOrder = date
      nationList({
        code: 1
      }).then(res => {
        this.ProvinceList = res.data
      })
      nationList({
        code: date.provinceId
      }).then(res => {
        this.cityList = res.data
      })
      nationList({
        code: date.cityId
      }).then(res => {
        this.areaList = res.data
      })
    },
    // 选省
    choseProvince() {
      // eslint-disable-next-line no-unused-vars
      nationList({
        code: this.hlOrder.provinceId
      }).then(res => {
        this.hlOrder.cityId = ''
        this.hlOrder.areaId = ''
        this.cityList = res.data
      })
    },
    // 选市
    choseCity() {
      nationList({
        code: this.hlOrder.cityId
      }).then(res => {
        this.hlOrder.areaId = ''
        this.areaList = res.data
      })
    },
    // 取消
    cancelForm(formName) {
      this.$refs[formName].resetFields()
      this.editOrderType = false
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          serviceProvidersOrderEdit(this.hlOrder).then(res => {
            // eslint-disable-next-line eqeqeq
            if (res.code == 200) {
              // 关闭弹窗，并刷新table
              this.editOrderType = false
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.sreach()
            }
          })
        } else {
          return false
        }
      })
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
