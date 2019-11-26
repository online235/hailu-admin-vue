<template>
  <div class="app-container">
    <div>
      <el-input
        placeholder="请输入店铺名称"
        v-model="membername"
        style="width:20%;min-width:150px;"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-input
        placeholder="请输入手机号码"
        v-model="membermobile"
        style="width:20%;min-width:150px;"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="sreach"
        >搜索</el-button
      >
      <el-button @click="cancel" v-if="sreachs">重置</el-button>
    </div>
    <!-- 表格 -->
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="手机号码" width="250">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.memberMobile }}</span>
          </template>
        </el-table-column>

        <el-table-column label="会员名称" width="250">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.memberName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="注册时间" width="250">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.registTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="商户类型" width="250">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.merchantType==0? '无':(scope.row.merchantType==1? '区域代理':'服务商') }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->

            <el-button
              size="mini"
              type="primary"
              @click="handleExamine(scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
      title="详情审核"
      :visible.sync="checkModle"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="会员名称：">
          <div>{{ form.memberName }}</div>
        </el-form-item>
        <el-form-item label="登陆名称：">
          <div>{{ form.loginName }}</div>
        </el-form-item>
        <el-form-item label="手机号码：">
          <div>{{ form.memberMobile }}</div>
        </el-form-item>
        <el-form-item label="用户编号：">
          <div>{{ form.memberId }}</div>
        </el-form-item>
        <el-form-item label="商户类型：">
          <div>{{ form.merchantType==0? '无':(form.merchantType==1? '区域代理':'服务商') }}</div>
        </el-form-item>
        <el-form-item label="是否为海露会员：">
          <div>{{ form.hlMember==0? '否' : '是' }}</div>
        </el-form-item>
        <!-- <el-form-item label="说明：">
          <div>{{ form.idcardImgx }}</div>
        </el-form-item> -->
        <el-form-item label="证件照片">
          <div class="demo-image__preview">
            <el-image
              style="width: 200px; height: 150px"
              :src="prefix+form.idcardImgx"
              @click="srcListimg(form)"
              :preview-src-list="srcList"
            >
            </el-image>
          </div>
          <div class="demo-image__preview">
            <el-image
              style="width: 200px; height: 150px"
              :src="prefix+form.idcardImgy"
              @click="srcListimgy"
              :preview-src-list="srcList"
            >
            </el-image>
          </div>
        </el-form-item>
        <el-form-item label="日期：">
          <div>{{ form.registTime }}</div>
        </el-form-item>
        <!-- <el-form-item label="状态：">
          <div>{{ form.examine }}</div>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkModle = false">取 消</el-button>
        <el-button type="primary" @click="checkModle = false">确定</el-button>
        <!-- <el-button type="danger" @click="failure">审核不通过</el-button> -->
      </span>
    </el-dialog>
    </template>

    <!-- 分页 -->
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
import { getList } from '@/api/table'
import { particulars } from '@/api/table'
export default {
  data() {
    return {
      membername: "",
      membermobile: "",
      currentPage: 1,
      page: 10,
      tableData: [],
      name: "1231231",
      sreachs: false,
      total: 0,
      xiangqing: [],
      checkModle:false,
       form: "",
       prefix:'http://192.168.10.165:8082/api/v1',
       url: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg"
      ]
    };
  },

  created() {
    this.fangfa();
  },
  mounted() {},
  methods: {
    fangda(params, num) {
      console.log(num);
      if (num == 1) {
        this.$alert(
          `<img src="` + params + `" style="width: 500px;height:250px;">`,
          {
            dangerouslyUseHTMLString: true
          }
        );
      } else {
        this.$alert(
          `<img src="` + params + `" style="width: 500px;height:650px;">`,
          {
            dangerouslyUseHTMLString: true
          }
        );
      }
    },
    sreach() {
      if (
        (this.membername.length == 0 || this.membername == "") &&
        (this.membermobile.length == 0 || this.membermobile == "")
      ) {
        this.$message({
          type: "warning",
          message: "请输入搜索内容"
        });
      } else {
        let params = new URLSearchParams();
        params.append("limit", this.page);
        params.append("membermobile", this.membermobile);
        params.append("membername", this.membername);
        getList(params).then(res => {

       console.log(res.data.data);
          this.total = res.data.total;
          this.tableData = res.data.datas;
      })
        this.sreachs = true;
      }
    },
    // 取消搜索
    cancel() {
      let params = new URLSearchParams();
      params.append("limit", this.page);
      params.append("page", this.currentPage);
      getList(params).then(res => {

       console.log(res.data.data);
          this.total = res.data.total;
          this.tableData = res.data.datas;
      })
      this.sreachs = false;
      this.membername=''
      this.membermobile=''
    },
    //审核通过

    //审核不通过
    handleCurrentChange(val) {//分页
      console.log(val);
      let params = new URLSearchParams();
      params.append("limit", this.page);
      params.append("page", val);
      getList(params).then(res => {

       console.log(res.data.data);
          this.total = res.data.total;
          this.tableData = res.data.datas;
      })
    },
    handleExamine(row) {
      //console.log(row);
      let params = new URLSearchParams();
      params.append("memberid", row.memberId);
      particulars(params).then(res => {
       this.form=res.data
       console.log(res.data);
          this.checkModle = true;
         console.log(Date(parseInt(res.data.registTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '))
      })
    },
    fangfa() {
      let params = new URLSearchParams();
      params.append("limit", this.page);
      params.append("page", this.currentPage);
      getList(params).then(res => {

       console.log(res.data.data);
          this.total = res.data.total;
          this.tableData = res.data.datas;
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
    srcListimg(form) {
      console.log(form.idcardImgx);
      // this.srcList[0] = item;
    },
    srcListimgy(item) {
      //console.log(item);
      //this.srcList[0] = item;
    },
  }
};
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
.el-message-box {
  width: 530px;
}
.demo-image__preview{
    display: inline-block;
    margin-left: 10px;
}
.el-form-item label{
  width: 150px;
}
</style>
