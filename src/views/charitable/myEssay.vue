<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>个人文章</h2></div>
      <!-- <div>
        <el-input placeholder="可根据关键字查询" v-model="search" clearable>
        </el-input>
      </div> -->
      <div>
        <el-button
          size="medium"
          type="success"
          @click="addUser"
          v-if="commonwealArticle == '' ? true : false"
          >添加文章</el-button
        >
      </div>
    </div>
    <div class="content" v-if="commonwealArticle == '' ? false : true">
      <editor-bar
        v-model="commonwealArticle"
        :isClear="isClear"
        @change="change"
      ></editor-bar>
      <div class="update">
      <div>
          <el-tooltip
        class="item"
        effect="dark"
        content="最近一次修改的时间"
        placement="top-start"
      >
        <!-- <el-button style="border: none;">更新时间</el-button> -->
        <div>更新时间：</div>
      </el-tooltip>
      </div>
      <div>{{tableData.updatedat}}</div>
      <div style="float: right;"><el-button type="primary" @click="amend">修改</el-button></div>
    </div>
    </div>


    <el-dialog
      title="添加文章"
      :visible.sync="dialogVisible"
      width="850px"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form ref="form" label-width="100px">
        <el-form-item label="文章内容：">
          <editor-bar
            v-model="detail"
            :isClear="isClear"
            @change="change"
          ></editor-bar>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBenefit">确 定</el-button>
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
import EditorBar from "@/components/editur/index";
import axios from "axios";
export default {
  components: { EditorBar },
  data() {
    return {
      dialogVisible: false, // 添加模态框
      tableData:'',
      // 富文本
      isClear: false,
      detail: "", //添加-富文本内容
      details: "", // 详情-富文本内容
      // 富文本
      commonwealArticle: '',
    };
  },
  created() {
    // this.imghead = axios.defaults.baseURL + "/basic";
    this.fetchData(); //列表数据加载
  },
  methods: {
    fetchData() {
      //列表数据加载
      detailedInfor().then(res => {
        console.log(res);
        if (res.code == 200) {
          this.tableData = res.data;
          this.commonwealArticle = res.data.commonwealArticle;
        }
      });
    },
    addUser() {
      // 添加按钮
      this.dialogVisible = true;
    },
    change(val) {
      //console.log(val)
    },
    addBenefit() {

      ArticleAdd(this.detail).then(res => {
          console.log(res)
        if (res.code === 200) {
            this.$message({
                message: '操作成功',
                type: 'success'
              });
            this.fetchData(); //列表数据加载
            this.dialogVisible = false;
        }
      });
    },
    amend() {
      let params = new URLSearchParams();
      modify(this.commonwealArticle).then(res => {
        console.log(res);
        if (res.code === 200) {
            this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.fetchData();
        }
      });
    },
  },
  mounted() {}
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
.content {
  width: 80%;
  /* margin: 0 auto; */
}
.update{
    margin-top: 20px;
}
.update div{
    display: inline-block;
}
/* .astrict{
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
} */
</style>
<style>
/* .el-table td div{
    overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
  } */
</style>
