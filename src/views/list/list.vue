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
        <el-table-column label="店铺名称" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.shopName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="真实姓名" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.realName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="手机号码" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="法人姓名" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{
              scope.row.nameOfLegalPerson
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.toExamine }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createdat | formatDate}}</span>
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
              >编辑审核</el-button
            >
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
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <div class="box" v-show="box">
      <div class="modelbox">
        <p style="margin: 0;text-align: right;">
          <i class="el-icon-close" @click="comback"></i>
        </p>
        <h3 style="text-align: center;margin: 0">审核编辑</h3>
        <div class="auto">
          <div>
            <div class="rows">
              <p>编号</p>
              <div>{{ xiangqing.numberId }}</div>
            </div>
            <div class="rows">
              <p>商家编号</p>
              <div>{{ xiangqing.mcNumberId }}</div>
            </div>
            <div class="rows">
              <p>店铺名称</p>
              <div>{{ xiangqing.shopName }}</div>
            </div>
            <div class="rows">
              <p>真实姓名</p>
              <div>{{ xiangqing.realName }}</div>
            </div>
            <div class="rows">
              <p>手机号码</p>
              <div>{{ xiangqing.phone }}</div>
            </div>
            <div class="rows">
              <p>身份证号码</p>
              <div>{{ xiangqing.idCard }}</div>
            </div>
            <div class="rows">
              <p>身份证有效期</p>
              <div>{{ xiangqing.idcardtermofValidity }}</div>
            </div>
            <div class="rows">
              <p>身份证是否为长期</p>
              <div>
                <span v-show="xiangqing.longTermCertificate == false">否</span
                ><span v-show="xiangqing.longTermCertificate == true">是</span>
              </div>
            </div>
            <div class="rows">
              <p>执照名称</p>
              <div>{{ xiangqing.businessName }}</div>
            </div>
            <div class="rows">
              <p>法人姓名</p>
              <div>{{ xiangqing.nameOfLegalPerson }}</div>
            </div>
            <div class="rows">
              <p>执照有效日期</p>
              <div>{{ xiangqing.licenseDate }}</div>
            </div>
            <div class="rows">
              <p>营业执照是否为长期</p>
              <div>
                <span v-show="xiangqing.longTermLicense == false">否</span
                ><span v-show="xiangqing.longTermLicense == true">是</span>
              </div>
            </div>
            <div class="rows">
              <p>审核</p>
              <div>{{ xiangqing.toExamine }}</div>
            </div>
            <div class="rows">
              <p>创建时间</p>
              <div>{{ xiangqing.createdat }}</div>
            </div>
            <div class="rows">
              <p>跟新时间</p>
              <div>{{ xiangqing.updatedat }}</div>
            </div>
            <div class="rows">
              <p>营业执照注册号</p>
              <div>{{ xiangqing.businessLicenseNumber }}</div>
            </div>
            <div class="rows">
              <p>身份证正面</p>
              <div>
                <img
                  :src="url + xiangqing.idcardImgx"
                  @click="fangda(url + xiangqing.idcardImgx, '1')"
                />
              </div>
            </div>
            <div class="rows">
              <p>身份证背面</p>
              <div>
                <img
                  :src="url + xiangqing.idcardImgy"
                  @click="fangda(url + xiangqing.idcardImgy, '1')"
                />
              </div>
            </div>
            <div class="rows">
              <p>营业执照</p>
              <div>
                <img
                  :src="url + xiangqing.licensePositive"
                  @click="fangda(url + xiangqing.licensePositive, '2')"
                />
              </div>
            </div>

            <div class="buttonBottom">
              <el-button
                @click="cancelModify(xiangqing.numberId)"
                type="primary"
                v-if="xiangqing.toExamine == '审核中'"
                >审核通过</el-button
              >
              <el-button
                type="warning"
                @click="nocancelModify(xiangqing.numberId)"
                v-if="xiangqing.toExamine == '审核中'"
                >审核不通过</el-button
              >
              <el-button @click="comback">取消</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/list'
import { check } from '@/api/list'
import { particulars } from '@/api/list'
import {formatDate} from '@/utils/date'
export default {
  data() {
    return {
      membername: "",
      membermobile: "",
      currentPage: 1,
      page: 15,
      tableData: [],
      name: "1231231",
      sreachs: false,
      box: false,
      total: 0,
      xiangqing: [],
      url:'http://192.168.10.165:8082/api/v1'
    };
  },
  filters: {
      formatDate(time) {
        time = time
        let date = new Date(time)
        //console.log(new Date(time))
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
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
        params.append("phone", this.membermobile);
        params.append("shopname", this.membername);
        getList(params).then(res => {
       
       console.log(res.data);
          this.total = res.data.total;
          this.tableData = res.data.data;
      })
        this.sreachs = true;
      }
    },
    comback() {
      this.box = false;
    },
    // 取消搜索
    cancel() {
      let params = new URLSearchParams();
      params.append("limit", this.page);
      params.append("page", this.currentPage);
     getList(params).then(res => {
       
       console.log(res.data);
          this.total = res.data.total;
          this.tableData = res.data.data;
      })
      this.sreachs = false;
      this.membername=''
      this.membermobile=''
    },
    //审核通过
    cancelModify(numid) {
      let params = new URLSearchParams();
      params.append("numberId", numid);
      params.append("toExamine", "2");
      check(params).then(res => {
       
      if (res.data.code == 0) {
          this.$message({
            message: "审核通过成功",
            type: "success"
          });
          this.fangfa();
        }
      })
      this.box = false;
    },
    //审核不通过
    nocancelModify(numid) {
      let params = new URLSearchParams();
      params.append("numberId", numid);
      params.append("toExamine", "3");
      check(params).then(res => {
       
      if (res.data.code == 0) {
          this.$message({
            message: "审核不通过",
            type: "error"
          });
          this.fangfa();
        }
      })
      this.box = false;
    },
    handleCurrentChange(val) {
      console.log(val);
      let params = new URLSearchParams();
      params.append("limit", this.page);
      params.append("page", val);
      getList(params).then(res => {
       
       console.log(res.data);
          this.total = res.data.total;
          this.tableData = res.data.data;
      })
    },
    handleExamine(row) {
      console.log(row.numberId);
      let params = new URLSearchParams();
      params.append("numberId", row.numberId);
       particulars(params).then(res => {
       console.log(res)
       this.xiangqing = res.data;
      })
      this.box = true;
    },
    handleDelete(index, row) {
      this.$message({
        message: "此功能暂未开放",
        type: "error"
      });
    },
    fangfa() {
      let params = new URLSearchParams();
      params.append("limit", this.page);
      params.append("page", this.currentPage);
      getList(params).then(res => {
       
       console.log(res.data);
          this.total = res.data.total;
          this.tableData = res.data.data;
      })
    }
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

</style>
