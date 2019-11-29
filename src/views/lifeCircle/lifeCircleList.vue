<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>生活圈-店铺列表</h2></div>
      <div>
        <el-input placeholder="可根据关键字查询" v-model="search" clearable>
        </el-input>
      </div>
    </div>
    <el-table
      border
      :data="
        tableData.filter(
          data =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="创建日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createdat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺名">
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
            >审核</el-button
          >
          <el-button
            size="mini"
            type="warning"
            @click="change(scope.$index, scope.row)"
            >更改店铺信息</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="delShop(scope.$index, scope.row)"
            >删除店铺</el-button
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="150px">
        <el-form-item label="店铺名称：">
          <el-input v-model="shopName"></el-input>
        </el-form-item>
        <el-form-item label="店铺详细地址：">
          <el-input v-model="detailAddress"></el-input>
        </el-form-item>
        <el-form-item label="店铺联系电话：">
          <el-input v-model="phone"></el-input>
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
          >
          </el-time-select>
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
          >
          </el-time-select>
        </el-form-item>
        <el-form-item label="营业状态：">
          <el-select v-model="operate" placeholder="请选择营业状态">
            <el-option
              v-for="(item, index) in business"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态：">
          <el-select v-model="region" placeholder="请选择启用状态">
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="putin">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="详情审核"
      :visible.sync="checkModle"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="店铺名：">
          <div>{{ form.shopName }}</div>
        </el-form-item>
        <el-form-item label="店家号码：">
          <div>{{ form.phone }}</div>
        </el-form-item>
        <el-form-item label="创建时间：">
          <div>{{ form.createdat }}</div>
        </el-form-item>
        <!-- <el-form-item label="审核状态：">
          <div>{{ form.toExamine }}</div>
        </el-form-item> -->
        <el-form-item label="审核状态：">
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
import {
  lifeCircleList,
  lifeCircleDetail,
  lifeCircleCheck,
  lifeCircleChange,
  lifeCircleDelete
} from "@/api/lifeCircle";
export default {
  data() {
    return {
      form: "",
      region: "",
      insuredId: "",
      choose: [
        { id: "1", name: "审核中" },
        { id: "2", name: "审核通过" },
        { id: "3", name: "审核不通过" }
      ],
      operate: "",
      business: [
        { id: "1", name: "营业中" },
        { id: "2", name: "休息中" }
      ],
      memberStatus: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      search: "",
      checkModle: false,
      id: "", // 店铺id
      toExamine: "", // 店铺审核状态
      dialogVisible: false,
      shopName: "", // 店铺名称
      detailAddress: "", // 店铺详细地址
      phone: "", // 店铺联系电话
      openingTime: "", // 开店时间
      closingTime: "", // 关闭时间
      mcNumberId: ""
    };
  },
  created() {
    this.fetchData(); //列表数据加载
  },

  methods: {
    fetchData() {
      //列表数据加载
      // let params = new URLSearchParams();
      // params.append("page", this.currentPage);
      // params.append("size", this.pageSize);
      lifeCircleList({
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.tableData = res.data.datas;
          this.total = res.data.total;
        }
      });
    },
    handleEdit(index, row) {
      this.id = row.id;
      this.toExamine = row.toExamine;
      this.region = row.toExamine + "";
      lifeCircleDetail({
        id: row.id
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.form = res.data;
          this.checkModle = true;
        }
      });
    },
    handleClose(done) {
      //关闭模态框按钮
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    confirm() {
      //详情审核确认按钮
      lifeCircleChange({
        id: this.id,
        toExamine: this.region
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.checkModle = false;
          this.fetchData();
          this.$message({
            message: "操作成功",
            type: "success"
          });
        }
      });
    },
    handleCurrentChange(val) {
      //分页
      this.currentPage = val;
      this.fetchData();
    },
    change(index, row) {
      // 修改信息
      console.log(row);
      this.id = row.id;
      this.mcNumberId = row.mcNumberId;
      this.dialogVisible = true;
      this.shopName = row.shopName;
      this.detailAddress = row.detailAddress;
      this.phone = row.phone;
      this.region = row.toExamine + "";
    },
    delShop(index, row) {
      // 删除店铺
      lifeCircleDelete({
        id: row.id
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.fetchData();
          this.$message({
            message: "操作成功",
            type: "success"
          });
        }
      });
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
        console.log(res);
        if (res.code == 200) {
          this.dialogVisible = false;
          this.fetchData();
          this.$message({
            message: "操作成功",
            type: "success"
          });
        }
      });
    }
  }
};
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
