<template>
  <div class="app-container">
     <div class="treeHead">
      <div><h2>文章列表</h2></div>
      <div>
        <el-input placeholder="可根据关键字查询" v-model="search" clearable>
        </el-input>
      </div>
      <div>
        <el-button size="medium" type="success" @click="addUser"
          >添加文章</el-button
        >
      </div>
    </div>
    <el-table
      border
      :data="
        tableData.filter(
          data =>
            !search ||
            data.cratedat.toLowerCase().includes(search.toLowerCase()) ||
            data.commonwealTitle.toLowerCase().includes(search.toLowerCase())
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
      <el-table-column label="内容">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.commonwealArticle }}</el-tag>
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
  </div>
</template>

<script>
import { UploadSingle } from "@/api/FileUpload";
import {
  charityList,
  PublicAdd,
  ArticleAdd,
  charityDetails,
  article,
  modify,
  detailedInfor,
  govern
} from "@/api/Charitable";
import EditorBar from '@/components/editur/index'
export default {
  components: { EditorBar },
  data() {
    return {
      search: "", // 查询双向绑定
      tableData: [], // 列表数据
      currentPage: 1, // 默认页码
      pageSize: 10, // 默认页数
      total: 0, // 总数
      commonwealArticle:'{"name":"7777"}'
    };
  },
  created() {
    console.log(this.commonwealArticle)
      console.log(JSON.parse(this.commonwealArticle))
    // this.imghead = axios.defaults.baseURL + "/basic";
     this.fetchData(); //列表数据加载
  },
  methods: {
    fetchData() {
      //列表数据加载
      let params = new URLSearchParams();
      params.append("page", this.currentPage);
      params.append("size", this.pageSize);
      article(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.datas;
          this.total = res.data.total;
          console.log(this.tableData[0].commonwealArticle)
          console.log(JSON.parse(this.tableData[0].commonwealArticle))
          // for(var i=0;i<this.tableData,length;i++){
          //   this.tableData[i].commonwealArticle=JSON.parse(this.tableData[i].commonwealArticle)
          // }
          console.log(this.tableData)
        }
      });
    },
    addUser() { // 添加按钮
      this.dialogVisible = true;
    },
    handleEdit(index, row) { // 查看详情

    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
  },
  mounted() {
    
  }
};
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
