<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>广告管理</h2></div>
      <!-- <div>
        <el-input placeholder="可根据关键字查询" v-model="search" clearable>
        </el-input>
      </div> -->
      <div>
        <el-button size="medium" type="success" @click="addUser"
          >添加广告</el-button
        >
      </div>
    </div>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column label="标题">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.title }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="副标题">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.subtitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="广告位">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.space == 1 ? '首页banner' : '首页内容广告' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属版块">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.bannerSpace == 1
              ? "心安"
              : scope.row.bannerSpace == 2
              ? "商城" : "美食"
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
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
      :title="modeltype == false? '添加广告' : '编辑广告'"
      :visible.sync="checkModle"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="850px"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
      <el-form-item label="广告位置" prop="spaceContent">
          <el-select v-model="ruleForm.spaceContent" placeholder="请选择广告位置">
            <el-option label="首页banner" value="1"></el-option>
            <el-option label="首页内容广告" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="副标题" prop="subtitle">
          <el-input v-model="ruleForm.subtitle"></el-input>
        </el-form-item>
        <el-form-item label="所属版块" prop="bannerSpace">
          <el-select v-model="ruleForm.bannerSpace" placeholder="请选择所属版块">
            <el-option label="心安" value="1"></el-option>
            <el-option label="商城" value="2"></el-option>
            <el-option label="美食" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题图片" prop="titleImage">
           <el-upload
  class="avatar-uploader"
  :action="imghead+upSite"
  :show-file-list="false"
  :on-success="upTitleImage"
  :before-upload="beforeAvatarUpload">
  <img v-if="ruleForm.titleImage" :src="imghead+ruleForm.titleImage" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
        </el-form-item>
        <el-form-item label="广告图片" prop="bannerImage">
           <el-upload
  class="avatar-uploader"
  :action="imghead+upSite"
  :show-file-list="false"
  :on-success="upImage"
  :before-upload="beforeAvatarUpload">
  <img v-if="ruleForm.bannerImage" :src="imghead+ruleForm.bannerImage" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
        </el-form-item>
        <el-form-item label="广告时间" required>
          <el-col :span="11">
            <el-form-item prop="startTime">
              <div class="block">
                <el-date-picker
                  v-model="ruleForm.startTime"
                  type="datetime"
                  placeholder="选择开始时间"
                >
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <!-- <el-col class="line" :span="2">-</el-col> -->
          <el-col :span="11">
            <el-form-item prop="endTime">
              <div class="block">
                <el-date-picker
                  v-model="ruleForm.endTime"
                  type="datetime"
                  placeholder="选择结束时间"
                >
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择类型">
            <el-option label="链接" value="1"></el-option>
            <el-option label="图文详情" value="2"></el-option>
            <el-option label="商品详情" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="ruleForm.type==1" label="外部链接" prop="bannerUrl">
          <el-input v-model="ruleForm.bannerUrl"></el-input>
        </el-form-item>
        <el-form-item v-if="ruleForm.type==2" label="图文详情" prop="content">
          <editor-bar v-model="ruleForm.content" :is-clear="isClear"/>
        </el-form-item>
        <!-- <el-form-item v-if="ruleForm.type==3" label="商品详情" prop="bannerUrl">
          <el-input v-model="ruleForm.bannerUrl"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >{{modeltype==false? '立即创建' : '修改'}}</el-button
          >
          <el-button @click="resetForm('ruleForm')">{{modeltype==false? '重置' : '取消'}}</el-button>
        </el-form-item>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="checkModle = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
// import { BannerList,insuredDetail,insuredCheck } from "@/api/insured";
import {
  BannerList,
  BannerDel,
  BannerAdd,
  BannerAlter
} from "@/api/advertising";
import * as config from '@/api/config'
import EditorBar from '@/components/editur/index'
export default {
    components: { EditorBar },
  data() {
    return {
      form: "",
    //   bannerSpace: "",
      insuredId: "",
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
      checkModle: false,
      //1111
      //
      //
      //
      //
      imghead:'', // 图片上传请求前缀
      upSite:'/upload/single/goods', // 请求地址
      dialogImage:false, // 查看大图model
      isClear: false,       // 富文本
      modeltype:false,
      ruleForm: {
        //表单
        id:'',
        title: "",
        subtitle: "",
        spaceContent: "",
        bannerSpace: "",
        startTime: "",
        endTime: "",
        type: '',
        bannerImage:'',
        titleImage:'',
        bannerUrl:'',
        content:'',
        targetName:''
      },
      rules: {
        // 表单验证
        title: [
          { required: true, message: "请输入广告标题", trigger: "blur" }
        ],
        subtitle: [
          { required: true, message: "请输入副标题", trigger: "blur" }
        ],
        spaceContent: [
          { required: true, message: "请选择广告位置", trigger: "change" }
        ],
         bannerSpace: [
          { required: true, message: "请选择所属版块", trigger: "change" }
        ],
         type: [
          { required: true, message: "请选择类型", trigger: "change" }
        ],
         bannerImage: [
          { required: true, message: "请上传一张广告图片", trigger: "change" }
        ],
        titleImage: [
          { required: true, message: "请上传一张标题图片", trigger: "change" }
        ],
        startTime: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        endTime: [
          {
            type: "string",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.imghead = config.module_basic_prefix;
    this.fetchData(); //列表数据加载
  },

  methods: {
    fetchData() {
      BannerList({
        page: this.currentPage,
        size: this.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.datas;
        console.log(res.data.datas)
          this.total = res.data.total;
        }
      });
    },
    handleEdit(index, row) {
      //详情按钮
        this.modeltype=true
        this.checkModle=true
        this.ruleForm.id=row.id
      let params = new URLSearchParams();
      params.append("id", row.id);
      BannerDel(params).then(res => {
        if (res.code == 200) {
            this.ruleForm.title = res.data.title,
            this.ruleForm.subtitle = res.data.subtitle,
            this.ruleForm.spaceContent = res.data.spaceContent+'',
            this.ruleForm.bannerSpace = res.data.bannerSpace+'',
            this.ruleForm.startTime = res.data.startTime,
            this.ruleForm.endTime = res.data.endTime,
            this.ruleForm.type = res.data.type+'',
            this.ruleForm.bannerImage = res.data.bannerImage,
            this.ruleForm.titleImage = res.data.titleImage,
            this.ruleForm.bannerUrl = res.data.bannerUrl,
            this.ruleForm.content = res.data.content,
            this.ruleForm.targetName = res.data.targetName
        }
      });
    },
    handleCurrentChange(val) {
      // 分页
      this.currentPage = val;
      this.fetchData();
    },
    addUser() {
      // 添加广告
      this.modeltype = false
      this.checkModle = true;
    //   console.log(77);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            if(this.modeltype==false){
                BannerAdd(this.ruleForm).then(res => {
                if (res.code === 200) {
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                    this.checkModle = false;
                    this.fetchData()
                    }
                });
            }else{
                BannerAlter(this.ruleForm).then(res => {
                if (res.code === 200) {
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                    this.checkModle = false;
                    this.fetchData()
                    }
                });
            }

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
        if(this.modeltype == false){
            this.$refs[formName].resetFields();
        }else{
            this.checkModle=false
            this.$refs[formName].resetFields();
        }
    },
    beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
      },
       upImage(res,file){
        //  console.log(file.response.data)
        this.ruleForm.bannerImage=file.response.data
        // console.log(fileList)
        // this.album.push(file.data)
        console.log(this.ruleForm.bannerImage)
      },
      upTitleImage(res,file){
          this.ruleForm.titleImage=file.response.data
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
<style>
/* .el-table td div{
    overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
  } */
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
