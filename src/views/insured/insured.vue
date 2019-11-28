<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>参保人列表</h2></div>
      <div>
        <el-input placeholder="可根据名称查询" v-model="search" clearable>
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
      <el-table-column label="日期" width="320">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="320">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="320">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.memberStatus == 1
              ? "代付款"
              : scope.row.memberStatus == 2
              ? "待审核"
              : scope.row.memberStatus == 3
              ? "观察期"
              : "驳回"
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >审核</el-button
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
      title="详情审核"
      :visible.sync="checkModle"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="姓名：">
          <div>{{ form.name }}</div>
        </el-form-item>
        <el-form-item label="value：">
          <div>{{ form.value }}</div>
        </el-form-item>
        <el-form-item label="创建时间：">
          <div>{{ form.createDate }}</div>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="region" placeholder="请选择会员状态">
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
import { insuredList,insuredDetail,insuredCheck } from "@/api/insured";
export default {
  data() {
    return {
      form: "",
      region: "",
      insuredId:'',
      choose: [
        { id: "1", name: "代付款" },
        { id: "2", name: "待审核" },
        { id: "3", name: "观察期" },
        { id: "4", name: "驳回" }
      ],
      memberStatus: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      search: "",
      checkModle: false
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
      insuredList({
        page:this.currentPage,
        size:this.pageSize
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.total = res.data.total;
          for (var i = 0; i < this.tableData.length; i++) {
            var dataee = new Date(this.tableData[i].createDate).toJSON();
            var date = new Date(+new Date(dataee) + 8 * 3600 * 1000)
              .toISOString()
              .replace(/T/g, " ")
              .replace(/\.[\d]{3}Z/, "");
            this.tableData[i].createDate = date;
          }
        }
      });
    },
    handleEdit(index, row) {
      //审核按钮
      //console.log(index, row);
      
      let params = new URLSearchParams();
      params.append("id", row.id);
      insuredDetail(params).then(res => {
        console.log(res)
        if(res.code==200){
          this.form = res.data;
          //console.log(this.form.createDate)
          this.checkModle = true;

            var dataee = new Date(this.form.createDate).toJSON();
            var date = new Date(+new Date(dataee) + 8 * 3600 * 1000)
              .toISOString()
              .replace(/T/g, " ")
              .replace(/\.[\d]{3}Z/, "");
            this.form.createDate = date;
              this.region=this.choose[this.form.memberStatus-1].id
              this.insuredId=row.id
          // console.log(res.data)
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
      this.checkModle = false;
      let params = new URLSearchParams();
      params.append("id", this.insuredId);
      params.append("memberStatus", this.region);
      insuredCheck(params).then(res => {
        console.log(res)
        if(res.code==200){
          this.fetchData();
           this.$message({
          message: '操作成功',
          type: 'success'
        });
        }
      });
    },
    handleCurrentChange(val) {
      //分页
      this.currentPage = val;
      this.fetchData();
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
