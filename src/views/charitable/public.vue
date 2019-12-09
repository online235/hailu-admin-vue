<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>公益列表</h2></div>
      <div>
        <el-input placeholder="可根据关键字查询" v-model="search" clearable>
        </el-input>
      </div>
      <div>
        <el-button size="medium" type="success" @click="addUser"
          >添加公益</el-button
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
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="100px">
        <el-form-item label="公益标题：">
          <el-input v-model="commonwealTitle"></el-input>
        </el-form-item>
        <el-form-item label="公益文章内容：">
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
      width="50%"
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
          <editor-bar v-model="details" :isClear="isClear"></editor-bar>
        </el-form-item>
        <!-- <el-form-item label="相关图片：">
          <div class="demo-image__preview">
            <el-image
              v-for="(item, index) in srcList"
              :key="index"
              style="width: 100px; height: 100px"
              :src="imghead + item"
              :preview-src-list="srcListimg"
            >
            </el-image>
          </div>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkModle = false">取 消</el-button>
        <el-button type="primary" @click="checkModle = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
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
import axios from "axios";
import EditorBar from '@/components/editur/index'
import qs from 'qs'
export default {
  components: { EditorBar },
  data() {
    return {
      form: "", // 详情数据
      currentPage: 1, // 默认页码
      pageSize: 10, // 默认页数
      total: 0, // 总数
      tableData: [], // 列表数据
      search: "", // 查询双向绑定
      checkModle: false, // 详情模态框
      dialogVisible: false, // 添加模态框
      // 相关图片
      imghead: "", // 图片请求头
      // srcList: "",
      //srcListimg: [],
      // imgList:[],
      commonwealTitle: "", // 公益标题
      article: "", // 公益内容
        dialogImg: false,
        record:{ // 添加post的数据
          adminId:'8685102477447168',
          article:'',
          commonwealTitle:'',
          defaultPicture:''
        },
        // 富文本
        isClear: false,
        detail:'',//添加-富文本内容
        details:'',// 详情-富文本内容
        // 富文本
    };
    
  },
  created() {
    // console.log(this.editor)
    this.imghead = axios.defaults.baseURL + "/basic";
    this.fetchData(); //列表数据加载
  },

  methods: {
    fetchData() {
      //列表数据加载
      let params = new URLSearchParams();
      params.append("page", this.currentPage);
      params.append("size", this.pageSize);
      charityList(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.datas;
          this.total = res.data.total;
        }
      });
    },
    handleEdit(index, row) {
      // 查看详情
      //this.srcListimg = [];
      charityDetails({
        Id: row.id
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.form = res.data;
          this.checkModle = true;
          this.details = res.data.article
          //console.log(res.data.defaultPicture.split(","))
          this.srcList = res.data.defaultPicture.split(",");
          // for (var i = 0; i < this.srcList.length; i++) {
          //   this.srcListimg.push(this.imghead + this.srcList[i]);
          // }
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
    addUser() { // 添加按钮
      this.dialogVisible = true;
    },
    handleCurrentChange(val) {
      //分页
      this.currentPage = val;
      this.fetchData();
    },
      // 富文本
      change(val) {
      //console.log(val)
      
    },
    addBenefit(){ // 添加确定按钮
      // console.log(this.record,this.record.adminId)
      if(this.commonwealTitle==''){
        this.$message.error('标题不能未空');
      }else if(this.detail==''){
        this.$message.error('内容不能未空');
      }else{
        this.record.article=this.detail
        //this.record.defaultPicture=this.imgList.join(',')
        this.record.commonwealTitle=this.commonwealTitle
        let params = qs.stringify(this.record)
        console.log(params)
      //    let params = new FormData();
      //   params.append("record", this.record);
        PublicAdd(params).then(res => {
        console.log(res);
        if (res.code === 200) {
          
        }
      });
      // let _this = this;
      // let params = new FormData();
      // params.append("record", this.record);
      // this.axios({
      //   method: "post",
      //   url: "/api/v2/admin/app/xinAn/addPublicInterest",
      //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
      //   data:params,
      // }).then(res => {
      //   console.log(res)
      // });
      }
    },
    // 富文本
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
