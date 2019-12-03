<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>商家入驻列表</h2></div>
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
            !search || data.createTime.toLowerCase().includes(search.toLowerCase())
            || data.shopName.toLowerCase().includes(search.toLowerCase())
            || data.phone.toLowerCase().includes(search.toLowerCase())
            || data.toExamineDisPlay.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称">
        <template slot-scope="scope">
            <span>{{ scope.row.shopName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="真实姓名">
        <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.realName }}</el-tag>
        </template>
      </el-table-column>
       <el-table-column label="店铺手机号码">
        <template slot-scope="scope">
            <el-tag size="medium">{{ scope.row.phone }}</el-tag>
        </template>
      </el-table-column>
       <el-table-column label="地址">
        <template slot-scope="scope">
            <span>{{ scope.row.detailAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.toExamineDisPlay}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150">
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
        <el-form-item label="店铺名称：">
          <div>{{ form.shopName }}</div>
        </el-form-item>
        <el-form-item label="真实姓名：">
          <div>{{ form.realName }}</div>
        </el-form-item>
        <el-form-item label="店铺手机号码：">
          <div>{{ form.phone }}</div>
        </el-form-item>
        <el-form-item label="身份证号码：">
          <div>{{ form.idCard }}</div>
        </el-form-item>
        <el-form-item label="身份证件照片：">
          <div class="demo-image__preview">
            <el-image
              style="width: 200px; height: 150px"
              :src="form.idcardImgx"
              @click="srcListimg(form)"
              :preview-src-list="srcList"
            >
            </el-image>
          </div>
          <div class="demo-image__preview">
            <el-image
              style="width: 200px; height: 150px"
              :src="form.idcardImgy"
              @click="srcListimgy"
              :preview-src-list="srcList"
            >
            </el-image>
          </div>
        </el-form-item>
        <el-form-item label="法人姓名：">
          <div>{{ form.nameOfLegalPerson }}</div>
        </el-form-item>
        <el-form-item label="执照名称：">
          <div>{{ form.businessName }}</div>
        </el-form-item>
        <el-form-item label="营业执照：">
          <div class="demo-image__preview">
            <el-image
              style="width: 200px; height: 150px"
              :src="form.licensePositive"
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
import { McLocalList,McLocalDetail,McLocalCheck,McLocalChange,McLocalDelete } from "@/api/McLocal";
export default {
  data() {
    return {
      form: "",
      region: "",
      numberId:'',
      choose: [
        { id: "1", name: "审核中" },
        { id: "2", name: "审核通过" },
        { id: "3", name: "审核不通过" }
      ],
      memberStatus: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      search: "",
      checkModle: false,
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg"
      ]
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
      McLocalList({
        pageNum:this.currentPage,
        pageSize:this.pageSize
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
           this.tableData = res.data.datas;
           this.total = res.data.total;
        }
      });
    },
    handleEdit(index, row) {
      //审核按钮
      //console.log(index, row);
        this.numberId=row.numberId
      let params = new URLSearchParams();
      params.append("numberId", row.numberId);
      McLocalDetail(params).then(res => {
        console.log(res)
        if(res.code==200){
           this.form = res.data;
        //   //console.log(this.form.createDate)
           this.checkModle = true;
           this.region=row.toExamine+''
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
      params.append("numberId", this.numberId);
      params.append("toExamine", this.region);
      McLocalCheck(params).then(res => {
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
    },
    srcListimg(form) {
      console.log(form.idcardImgx);
      // this.srcList[0] = item;
    },
    srcListimgy(item) {
      //console.log(item);
      //this.srcList[0] = item;
    },
    business(){

    },
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
.demo-image__preview{
    display: inline-block;
    margin-left: 10px;
}
</style>
