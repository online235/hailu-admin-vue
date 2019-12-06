<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>救助列表</h2></div>
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
            !search || data.title.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.updatedat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.title }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.examine }}</span>
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
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="标题：">
          <div>{{ form.title }}</div>
        </el-form-item>
        <el-form-item label="救助类型：">
          <div>{{ form.rescueType }}</div>
        </el-form-item>
        <el-form-item label="救助编号：">
          <div>{{ form.numberId }}</div>
        </el-form-item>
        <el-form-item label="救助次数：">
          <div>{{ form.helpTimes }}</div>
        </el-form-item>
        <el-form-item label="目标金额：">
          <div>{{ form.targetAmount }}</div>
        </el-form-item>
        <el-form-item label="现金额：">
          <div>{{ form.cash }}</div>
        </el-form-item>
        <el-form-item label="说明：">
          <div>{{ form.instructions }}</div>
        </el-form-item>
        <el-form-item label="详情图片">
          <div class="demo-image__preview" v-for="item in url" :key="item">
            <el-image
              style="width: 100px; height: 100px"
              :src="imghead+item"
              @click="srcListimg(item)"
              :preview-src-list="srcList"
            >
            </el-image>
          </div>
        </el-form-item>
        <el-form-item label="日期：">
          <div>{{ form.createdat }}</div>
        </el-form-item>
        <el-form-item label="状态：">
          <div>{{ form.examine }}</div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkModle = false">取 消</el-button>
        <el-button type="primary" @click="confirm">审核通过</el-button>
        <el-button type="danger" @click="failure">审核不通过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  salvationList,
  salvationDetail,
  salvationStatus
} from "@/api/salvation";
import qs from "qs";
import axios from "axios";
export default {
  data() {
    return {
      form: "",
      currentPage: 1, //页数
      pageSize: 10, //每页数据量
      tableData: [], //列表数据
      search: "", //搜索框
      checkModle: false, //模态框
      examine: "", //审核(2-审核通过、3-审核不通过)
      numberId: "",
      total: 0, //总数
      imghead:'',
      url: [

      ],
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg"
      ]
    };
  },
  created() {
    this.imghead=axios.defaults.baseURL+'/basic'
    this.fetchData(); //列表数据加载
  },

  methods: {
    //列表数据加载
    //*
    //*
    fetchData() {
      // let params = new URLSearchParams();
      // params.append("page", this.currentPage);
      // params.append("size", this.pageSize);
      salvationList({
        page: this.currentPage,
        size: this.pageSize
      }).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.tableData = res.data.datas;
          this.total = res.data.total;
          for (var i = 0; i < this.tableData.length; i++) {
            var dataee = new Date(this.tableData[i].updatedat).toJSON();
            var date = new Date(+new Date(dataee) + 8 * 3600 * 1000)
              .toISOString()
              .replace(/T/g, " ")
              .replace(/\.[\d]{3}Z/, "");
            this.tableData[i].updatedat = date;
          }
        }
      });
    },
    //*
    //*
    //列表数据加载
    //审核按钮
    //*
    //*
    handleEdit(index, row) {
      //console.log(index, row);
      this.numberId = row.numberId;
      // let params = new URLSearchParams();
      // params.append("numberId", this.numberId);
      salvationDetail({
        numberId: this.numberId
      }).then(res => {
        console.log(1,res);
        if (res.code == 200) {
           this.form = res.data[0];
           this.url=res.data[0].imageList
          console.log(2,res.data[0].imageList);
        }
      });
      this.checkModle = true;
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
      //详情审核通过按钮
      this.checkModle = false;
      this.examine = "2";

      this.audit();
      this.fetchData();
      // this.$message({
      //     message: '操作成功',
      //     type: 'success'
      //   });
    },
    failure() {
      //详情审核不通过按钮
      this.examine = "3";
      this.checkModle = false;
      this.audit();
    },
    audit() {
      //审核
      // let params = new URLSearchParams();
      // params.append("examine", this.examine);
      // params.append("numberId", this.numberId);

      // let params = qs.stringify({
      //   numberId: this.numberId,
      //   examine: this.examine
      // });
      salvationStatus({
        numberId: this.numberId,
        examine: this.examine
      }).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.$message({
            message: "审核操作成功",
            type: "success"
          });
          this.fetchData();
        }
      });
    },
    //*
    //*
    //审核按钮
    srcListimg(item) {
      //console.log(item);
      this.srcList[0] = item;
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
.demo-image__preview {
  display: inline-block;
  margin-left: 10px;
}
</style>
