<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>店铺-列表</h2></div>
      <div>
        <el-input
          v-model="membername"
          placeholder="请输入店铺名称"
          style="width:20%;min-width:150px;"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
        <el-input
          v-model="membermobile"
          placeholder="请输入手机号码"
          style="width:20%;min-width:150px;"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="sreach"
        >搜索</el-button>
        <el-button v-if="sreachs" @click="cancel">重置</el-button>
      </div>
    </div>
    <el-table
      border
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column label="创建日期">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.createdat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.shopName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="店家号码">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.phone }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="店铺地址">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.detailAddress }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.toExamine == 1
              ? "审核中"
              : scope.row.toExamine == 2
                ? "审核通过"
                : "审核不通过"
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >审核</el-button>
          <el-button
            size="mini"
            type="warning"
            @click="change(scope.$index, scope.row)"
          >更改店铺信息</el-button>
          <!-- <el-button
            size="mini"
            type="danger"
            @click="delShop(scope.$index, scope.row)"
            >删除店铺</el-button
          > -->
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
      title="提示"
      :visible.sync="dialogVisible"
      width="40%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form ref="form" label-width="150px">
        <el-form-item label="店铺名称：">
          <el-input v-model="shopName" />
        </el-form-item>
        <el-form-item label="店铺详细地址：">
          <el-input v-model="detailAddress" />
        </el-form-item>
        <el-form-item label="店铺联系电话：">
          <el-input v-model="phone" />
        </el-form-item>
        <el-form-item label="开店时间：">
          <!-- <el-input v-model="openingTime"></el-input> -->
          <el-time-select
            v-model="openingTime"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '24:00'
            }"
            placeholder="选择时间"
          />
        </el-form-item>
        <el-form-item label="关闭时间：">
          <!-- <el-input v-model="closingTime"></el-input> -->
          <el-time-select
            v-model="closingTime"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '24:00'
            }"
            placeholder="选择时间"
          />
        </el-form-item>
        <el-form-item label="营业状态：">
          <el-select v-model="operate" placeholder="请选择营业状态">
            <el-option
              v-for="(item, index) in business"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态：">
          <el-select v-model="region" placeholder="请选择启用状态">
            <el-option
              v-for="(item, index) in choose"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="putin">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="详情审核"
      :visible.sync="checkModle"
      width="40%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="店铺名称：">
          <div>{{ form.shopName }}</div>
        </el-form-item>
        <el-form-item label="店家号码：">
          <div>{{ form.phone }}</div>
        </el-form-item>
        <el-form-item label="创建时间：">
          <div>{{ form.dateTime }}</div>
        </el-form-item>
        <el-form-item label="营业状态：">
          <div>{{ form.businessStateDisplay }}</div>
        </el-form-item>
        <el-form-item label="营业时间：">
          <div>{{ form.weekDayDisplay }}</div>
        </el-form-item>
        <el-form-item label="店铺详细地址：">
          <div>{{ form.detailAddress }}</div>
        </el-form-item>
        <el-form-item label="标签：">
          <el-tag
            v-for="tag in tags"
            :key="tag.tagName"
            :type="tag.type"
          >
            {{ tag.tagName }}
          </el-tag>
        </el-form-item>
        <el-form-item label="审核状态：">
          <el-select v-model="region" placeholder="请选择审核状态">
            <el-option
              v-for="(item, index) in choose"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkModle = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  lifeCircleList,
  lifeCircleDetail,
  lifeCircleCheck,
  lifeCircleChange,
  lifeCircleDelete
} from '@/api/life-circle'
import { Tagshop } from '@/api/tag'
export default {
  data() {
    return {
      membername: '', // 名称查询
      membermobile: '', // 手机号码查询
      sreachs: false, // 重置按钮
      form: '',
      region: '',
      insuredId: '',
      choose: [
        { id: '1', name: '审核中' },
        { id: '2', name: '审核通过' },
        { id: '3', name: '审核不通过' }
      ],
      operate: '',
      business: [
        { id: '1', name: '营业中' },
        { id: '2', name: '休息中' }
      ],
      tags: [
        { name: '标签一', type: '' }
        // { name: '标签二', type: 'success' },
        // { name: '标签三', type: 'info' },
        // { name: '标签四', type: 'warning' },
        // { name: '标签五', type: 'danger' }
      ],
      memberStatus: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      search: '',
      checkModle: false,
      id: '', // 店铺id
      toExamine: '', // 店铺审核状态
      dialogVisible: false,
      shopName: '', // 店铺名称
      detailAddress: '', // 店铺详细地址
      phone: '', // 店铺联系电话
      openingTime: '', // 开店时间
      closingTime: '', // 关闭时间
      mcNumberId: ''
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
      lifeCircleList({
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.datas
          this.total = res.data.total
          this.sreachs = false
          this.membername = ''
          this.membermobile = ''
        }
      })
    },
    handleEdit(index, row) {
      this.id = row.id
      this.toExamine = row.toExamine
      this.region = row.toExamine + ''
      lifeCircleDetail({
        id: row.id
      }).then(res => {
        if (res.code === 200) {
          this.form = res.data
          this.checkModle = true
          console.log(res.data)
        }
      })
      Tagshop({
        storeId: row.id
      }).then(res => {
        if (res.code === 200) {
          // this.form = res.data;
          // this.checkModle = true;
          this.tags = res.data
        }
      })
    },
    confirm() {
      // 详情审核确认按钮
      lifeCircleChange({
        id: this.id,
        toExamine: this.region
      }).then(res => {
        if (res.code === 200) {
          this.checkModle = false
          this.fetchData()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }
      })
    },
    handleCurrentChange(val) {
      // 分页
      this.currentPage = val
      this.fetchData()
    },
    change(index, row) {
      // 修改信息
      this.id = row.id
      this.mcNumberId = row.mcNumberId
      this.dialogVisible = true
      this.shopName = row.shopName
      this.detailAddress = row.detailAddress
      this.phone = row.phone
      this.region = row.toExamine + ''
    },
    delShop(index, row) {
      const that = this
      that.$confirm('是否删除该店铺?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除店铺
        lifeCircleDelete({
          id: row.id
        }).then(res => {
          if (res.code === 200) {
            that.fetchData()
            that.$message({
              message: '操作成功',
              type: 'success'
            })
          }
        })
      })
    },
    putin() {
      lifeCircleCheck({
        id: this.id,
        mcNumberId: this.mcNumberId,
        shopName: this.shopName,
        detailAddress: this.detailAddress,
        phone: this.phone,
        openingTime: this.openingTime,
        closingTime: this.closingTime,
        operate: this.operate,
        region: this.region
      }).then(res => {
        if (res.code === 200) {
          this.dialogVisible = false
          this.fetchData()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        }
      })
    },
    sreach() {
      if (
        (this.membername.length === 0 || this.membername === '') &&
        (this.membermobile.length === 0 || this.membermobile === '')
      ) {
        this.$message({
          type: 'warning',
          message: '请输入搜索内容'
        })
      } else {
        lifeCircleList({
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          shopName: this.membername,
          phone: this.membermobile
        }).then(res => {
          if (res.code === 200) {
            this.tableData = res.data.datas
            this.total = res.data.total
          }
        })
        this.sreachs = true
      }
    },
    cancel() {
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
