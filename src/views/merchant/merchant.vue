<template>
  <div class="app-container">
    <div class="treeHead">
    <div>
      <h2>百货入驻列表</h2>
    </div>
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
    <!-- 表格 -->
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="店铺名称">
          <template slot-scope="scope">
            <span style="margin-left: 12px">{{ scope.row.shopName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="开户账号">
          <template slot-scope="scope">
            <span style="margin-left: 12px">{{ scope.row.accountNumber }}</span>
          </template>
        </el-table-column>

        <el-table-column label="手机号码">
          <template slot-scope="scope">
            <span style="margin-left: 12px">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="法人姓名">
          <template slot-scope="scope">
            <span style="margin-left: 12px">{{
              scope.row.nameOfLegalPerson
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态">
          <template slot-scope="scope">
            <span style="margin-left: 12px">{{ scope.row.toExamineDisPlay }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核时间">
          <template slot-scope="scope">
            <span style="margin-left: 12px">{{ scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <!-- <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->

            <el-button
              size="mini"
              type="primary"
              @click="handleExamine(scope.row)"
            >编辑审核</el-button>
            <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            > -->
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 分页 -->
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
      title="详情审核"
      :visible.sync="checkModle"
      width="750px"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="编号：">
          <div>{{ form.numberId }}</div>
        </el-form-item>
        <el-form-item label="商家编号：">
          <div>{{ form.mcNumberId }}</div>
        </el-form-item>
        <el-form-item label="店铺名称：">
          <div>{{ form.shopName }}</div>
        </el-form-item>
        <el-form-item label="商家姓名：">
          <div>{{ form.nameOfLegalPerson }}</div>
        </el-form-item>
        <el-form-item label="手机号码：">
          <div>{{ form.phone }}</div>
        </el-form-item>
         <el-form-item label="营业执照注册号：">
          <div>{{ form.businessLicenseNumber }}</div>
        </el-form-item>
         <el-form-item label="创建时间：">
          <div>{{ form.createTime }}</div>
        </el-form-item>
        <el-form-item label="身份证号码：">
          <div>{{ form.idCard }}</div>
        </el-form-item>
        <el-form-item label="身份证件照片：">
          <div class="demo-image__preview">
            <el-image
              style="width: 200px; height: 150px"
              :src="imghead + form.idcardImgx"
              @click="srcListimg(form)"
              :preview-src-list="srcList"
            >
            </el-image>
          </div>
          <div class="demo-image__preview">
            <el-image
              style="width: 200px; height: 150px"
              :src="imghead + form.idcardImgy"
              @click="srcListimgy(form)"
              :preview-src-list="srcList"
            >
            </el-image>
          </div>
        </el-form-item>
        <el-form-item label="营业执照：">
          <div class="demo-image__preview">
            <el-image
              style="width: 200px; height: 150px"
              :src="imghead + form.licensePositive"
              @click="business(form)"
              :preview-src-list="srcList"
            >
            </el-image>
          </div>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="region" placeholder="请选择审核状态">
            <el-option
              v-for="(item, index) in choose"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
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
import { merchantList, merchantcheck, merchantDetail } from '@/api/merchant'
import { formatDate } from '@/utils/date'
import * as config from '@/api/config'
export default {
  filters: {
    formatDate(time) {
      time = time
      const date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  data() {
    return {
      membername: '',
      membermobile: '',
      currentPage: 1,
      page: 10,
      tableData: [],
      name: '1231231',
      sreachs: false,
      box: false,
      checkModle:false,
      form:'',
      total: 0,
      region:'', // 审核状态
     imghead: "",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg"
      ],
      choose: [
        { id: "1", name: "审核中" },
        { id: "2", name: "审核通过" },
        { id: "3", name: "审核不通过" }
      ],
      numberId:'',
    }
  },
  created() {
     this.imghead= config.module_basic_prefix
    this.fangfa()
  },
  mounted() {},
  methods: {

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
        const params = new URLSearchParams()
        params.append('pageSize', this.page)
        params.append('phone', this.membermobile)
        params.append('shopname', this.membername)
        merchantList(params).then(res => {
          this.total = res.total
          this.tableData = res.data.datas
        })
        this.sreachs = true
      }
    },
    comback() {
      this.box = false
    },
    // 取消搜索
    cancel() {
      const params = new URLSearchParams()
      params.append('pageSize', this.page)
      params.append('pageSize', this.currentPage)
      merchantList(params).then(res => {
        this.total = res.data.total
        this.tableData = res.data.datas
      })
      this.sreachs = false
      this.membername = ''
      this.membermobile = ''
    },
    handleCurrentChange(val) {
      console.log(this.page,val)
      const params = new URLSearchParams()
      params.append('pageSize', this.page)
      params.append('pageNum', val)
      merchantList(params).then(res => {
        this.total = res.data.total
        this.tableData = res.data.datas
        console.log(this.tableData)
        // this.fangfa()
      })
    },
    handleExamine(row) {
      const params = new URLSearchParams()
      params.append('numberId', row.numberId)
      merchantDetail(params).then(res => {
        console.log(res.data)
        this.form = res.data
        this.checkModle = true
        this.region = row.toExamine + "";
        this.numberId=res.numberId
      })

    },
    // handleDelete(index, row) {
    //   this.$message({
    //     message: '此功能暂未开放',
    //     type: 'error'
    //   })
    // },
    fangfa() {
      const params = new URLSearchParams()
      params.append('pageSize', this.page)
      params.append('pageNum', this.currentPage)
      merchantList(params).then(res => {
        console.log(res.data)
        this.total = res.data.total
        this.tableData = res.data.datas
      })
    },
     handleClose(done) {
      //关闭模态框按钮
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    confirm(){
       const params = new URLSearchParams()
      params.append('numberId', this.numberId)
      params.append('toExamine', this.region)
      merchantcheck(params).then(res => {
        if(res.code===200){
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.checkModle=false
          this.fangfa()
        }
      })
    },
    srcListimg(form) {
      // 身份证正面
      this.srcList[0] = this.imghead + form.idcardImgx;
    },
    srcListimgy(form) {
      // 身份证背面
      this.srcList[0] = this.imghead + form.idcardImgy;
    },
    business(form) {
      // 营业执照
      this.srcList[0] = this.imghead + form.licensePositive;
    },
  }
}
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.rows {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
.rows p {
  width: 20%;
  margin: 0;
}
.rows div {
  width: 75%;
}

.rows div > img {
  width: 100px;
  height: 100px;
}
.box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.box .modelbox {
  width: 800px;
  border-radius: 6px;
  background: #fff;
  padding: 10px 20px;
  box-sizing: border-box;
}
.auto {
  width: 100%;
  height: 760px;
  overflow-y: auto;
}
.buttonBottom {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  margin-right: 10px;
}
.demo-image__preview{
  display: inline-block;
  margin-right: 20px;
}
.treeHead {
  display: flex;
  align-items: center;
}
.treeHead > div {
  margin-right: 20px;
}
</style>
