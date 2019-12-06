<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>公益列表</h2></div>
      <div>
        <el-input placeholder="可根据关键字查询" v-model="search" clearable>
        </el-input>
      </div>
      <div>
        <el-button size="medium" type="success" @click="addUser">添加公益</el-button>
      </div>
    </div>
    <el-table
      border
      :data="
        tableData.filter(
          data =>
            !search || data.cratedat.toLowerCase().includes(search.toLowerCase())
            || data.commonwealTitle.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.cratedat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.commonwealTitle }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >查看详情</el-button
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
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
    <el-dialog
      title="详情"
      :visible.sync="checkModle"
      width="45%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="100px">
         <el-form-item label="标题：">
          <div>{{ form.commonwealTitle }}</div>
        </el-form-item>
        <el-form-item label="日期：">
          <div>{{ form.cratedat }}</div>
        </el-form-item>
        <el-form-item label="内容：">
          <div>{{ form.article }}</div>
        </el-form-item>
        <el-form-item label="相关图片：">
          <div class="demo-image__preview">
            <el-image
                v-for="(item,index) in srcList"
                :key="index"
                style="width: 100px; height: 100px"
                :src="imghead+item" 
                :preview-src-list="srcListimg">
            </el-image>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkModle = false">取 消</el-button>
        <el-button type="primary" @click="checkModle = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { charityList,PublicAdd,ArticleAdd,charityDetails,article,modify,detailedInfor,govern } from "@/api/Charitable";
import axios from "axios";
export default {
  data() {
    return {
      form: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      search: "",
      checkModle: false,
      dialogVisible: false,
      // 相关图片
      imghead:'',
      srcList:'',
      srcListimg:[],
    };
  },
  created() {
    this.imghead=axios.defaults.baseURL+'/basic'
    this.fetchData(); //列表数据加载
  },

  methods: {
    fetchData() {
      //列表数据加载
      let params = new URLSearchParams();
      params.append("page", this.currentPage);
      params.append("size", this.pageSize);
      charityList(params).then(res => {
        console.log(res);
        if (res.code === 200) {
         this.tableData=res.data.datas
        }
      });
    },
    handleEdit(index, row) {
      // 审核按钮
      // console.log(index, row);
      this.srcListimg=[]
      charityDetails({
          Id:row.id
      }).then(res => {
        console.log(res)
        if(res.code==200){
            this.form=res.data
            this.checkModle = true;
            //console.log(res.data.defaultPicture.split(","))
            this.srcList=res.data.defaultPicture.split(",")
            for(var i=0;i<this.srcList.length;i++){
                this.srcListimg.push(this.imghead+this.srcList[i])
            }
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
    addUser(){
        console.log(11)
        this.dialogVisible=true
    },
    // confirm() {
    //   //详情审核确认按钮
    //   this.checkModle = false;
    // //   insuredCheck(params).then(res => {
    // //     console.log(res)
    // //     if(res.code==200){

    // //     }
    // //   });
    // },
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
