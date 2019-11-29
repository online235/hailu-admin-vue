<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>菜单列表</h2></div>
      <div>
        <el-input placeholder="可根据名称查询" v-model="search" clearable>
        </el-input>
      </div>
      <div>
        <el-button size="medium" type="success" @click="addUser"
          >添加菜单</el-button
        >
      </div>
    </div>
    <el-table
      border
      :data="
        tableData.filter(
          data =>
            !search || data.menuName.toLowerCase().includes(search.toLowerCase()) ||
            data.menuTypeDisplay.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="菜单名称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.menuName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="菜单类型">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.menuTypeDisplay }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.enableStatusDisplay
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作"width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >更变状态</el-button
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
      title="添加菜单"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="150px">
        <el-form-item label="菜单名称：">
          <el-input v-model="menuName"></el-input>
        </el-form-item>
        <el-form-item label="菜单权限编码：">
          <el-input v-model="permissionCode"></el-input>
        </el-form-item>
        <el-form-item label="菜单URL路径：">
          <el-input v-model="url"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型：">
          <el-select v-model="region" placeholder="请选择菜单类型">
            <el-option
              v-for="(item, index) in choose"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="启用类型：">
          <el-select v-model="regions" placeholder="请选择启用类型">
            <el-option
              v-for="(item, index) in chooses"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="affirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { menuList, menuAdd, menuCheck } from "@/api/menu";
export default {
  data() {
    return {
      region:'0',
      choose:[
        {id:'0',name:'菜单'},
        {id:'1',name:'按钮'}
      ],
      regions:'1',
      chooses:[
        {id:'0',name:'禁用'},
        {id:'1',name:'启用'}
      ],
      dialogVisible:false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      search: "",
      enableStatus: "",
      id: "",
      menuName:'',// 菜单名称
      permissionCode:'',// 菜单权限编码
      url:'',// 菜单URL路径
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
      menuList({
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.tableData = res.data.datas;
          this.total = res.data.total;
          // for (var i = 0; i < this.tableData.length; i++) {
          //   var dataee = new Date(this.tableData[i].createDate).toJSON();
          //   var date = new Date(+new Date(dataee) + 8 * 3600 * 1000)
          //     .toISOString()
          //     .replace(/T/g, " ")
          //     .replace(/\.[\d]{3}Z/, "");
          //   this.tableData[i].createDate = date;
          // }
        }
      });
    },
    modify(){
      menuCheck({
        id: this.id,
        enableStatus: this.enableStatus
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.fetchData();
        }
      });
    },
    handleEdit(index, row) {
      //变更按钮
      //console.log(index, row);
      this.id=row.id
      if(row.enableStatus==0){
        this.enableStatus=1
      }else{
        this.enableStatus=0
      }
      this.modify()
    },
    addUser() {
      // 添加账号
      this.dialogVisible = true;
    },
    affirm(){
      menuAdd({
        menuName:this.menuName,
        permissionCode:this.permissionCode,
        url:this.url,
        menuType:this.region,
        enableStatus:this.regions
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.dialogVisible=false
          this.fetchData();
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
    handleCurrentChange(val) {
      //分页
      this.currentPage = val;
      this.fetchData();
    }
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
