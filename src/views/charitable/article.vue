<template>
  <div class="app-container">
     <div class="treeHead">
      <div><h2>文章列表</h2></div>
      <div>
        <el-input placeholder="可根据关键字查询" v-model="search" clearable>
        </el-input>
      </div>
      <!-- <div>
        <el-button size="medium" type="success" @click="addUser"
          >添加文章</el-button
        >
      </div> -->
    </div>
    <el-table
      border
      :data="
        tableData.filter(
          data =>
            !search ||
            data.cratedat.toLowerCase().includes(search.toLowerCase()) ||
            data.commonwealArticle.toLowerCase().includes(search.toLowerCase())
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
          <!-- <span style="margin-left: 10px" class="astrict">{{ scope.row.commonwealArticle }}</span> -->
          <div slot="reference" class="name-wrapper">
            <div class="astrict">{{ scope.row.commonwealArticle }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100px">
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
    <el-dialog
      title="添加文章"
      :visible.sync="dialogVisible"
      width="850px"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="100px">
        <el-form-item label="文章内容：">
          <editor-bar v-model="detail" :isClear="isClear" @change="change"></editor-bar>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBenefit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="详情"
      :visible.sync="checkModle"
      width="850px"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="日期：">
          <div>{{ form.cratedat }}</div>
        </el-form-item>
        <el-form-item label="内容：">
          <editor-bar v-model="details" :isClear="isClear"></editor-bar>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkModle = false">取 消</el-button>
        <el-button type="primary" @click="amend">确 定</el-button>
      </span>
    </el-dialog>
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
import axios from 'axios'
export default {
  components: { EditorBar },
  data() {
    return {
      form: "", // 详情数据
      search: "", // 查询双向绑定
      tableData: [], // 列表数据
      currentPage: 1, // 默认页码
      pageSize: 10, // 默认页数
      total: 0, // 总数
      checkModle: false, // 详情模态框
      dialogVisible: false, // 添加模态框
      // 富文本
        isClear: false,
        detail:'',//添加-富文本内容
        details:'',// 详情-富文本内容
        // 富文本
    };
  },
  created() {
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
        }
      });
    },
    // addUser() { // 添加按钮
    //   this.dialogVisible = true;
    // },
    change(val) {
      //console.log(val)
    },
    addBenefit(){
      let params = new URLSearchParams();
      params.append("commonwealArticle", this.detail);
      ArticleAdd(params).then(res => {
        if (res.code === 200) {

        }
      });
    },
    handleEdit(index, row) { // 查看详情
      this.form=row
      this.checkModle=true
      this.details=row.commonwealArticle
      // console.log(this.details)
    },
    amend(){
      let params = new URLSearchParams();
      params.append("commonwealArticle", this.details);
      modify(params).then(res => {
        console.log(res)
        if (res.code === 200) {

        }
      });
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
.astrict{
      background-color: #ecf5ff;
    border-color: #d9ecff;
    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    color: #409EFF;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap;
}
</style>
<style>
  .el-table td div{
    overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
  }
</style>
