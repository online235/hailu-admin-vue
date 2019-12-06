<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>角色列表</h2></div>
      <div>
        <el-input placeholder="可根据关键字查询" v-model="search" clearable>
        </el-input>
      </div>
      <div>
        <el-button size="medium" type="success" @click="addUser"
          >添加角色</el-button
        >
      </div>
    </div>
    <el-table
      border
      :data="
        tableData.filter(
          data =>
            !search || data.roleName.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="角色昵称">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.enableStatusDisplay}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="changeState(scope.$index, scope.row)"
            >更变状态</el-button
          >
          <el-button
            size="mini"
            type="success"
            @click="linkMenus(scope.$index, scope.row)"
            >关联菜单</el-button
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
        <el-form-item label="角色名称：">
          <el-input v-model="roleName"></el-input>
        </el-form-item>
        <el-form-item label="启用类型：">
          <el-select v-model="region" placeholder="请选择启用类型">
            <el-option
              v-for="(item, index) in choose"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="关联菜单"
      :visible.sync="linkMenuDialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form label-width="150px">
        <el-tree class="menu-tree"
                 ref="menuTree"
                 :data="menuTreeData"
                 show-checkbox
                 :check-strictly="true"
                 node-key="id"
                 :expand-on-click-node="false"
                 default-expand-all>
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.menuName }}</span>
          </span>
        </el-tree>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="linkMenuDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="bindRoleMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { roleList,roleAdd,roleCheck,changeMenus } from "@/api/role";
import { menuTreeList } from "@/api/menu";
export default {
  data() {
    return {
       region:'1',
      choose:[
        {id:'0',name:'禁用'},
        {id:'1',name:'启用'}
      ],
      dialogVisible:false,
      linkMenuDialogVisible:false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      search: "",
      enableStatus:'',
      id:'',
      roleName:'',// 菜单名称
      permissionCode:'',// 菜单权限编码
      url:'',// 菜单URL路径

      menuTreeData: [],
      menuTreeItemChoose: null,
      // 当前选中的角色数据
      chooseRole:null
    };
  },
  created() {
    this.fetchData(); //列表数据加载
  },

  methods: {
    fetchData() {
      //列表数据加载
      roleList({
        pageNum:this.currentPage,
        pageSize:this.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.datas;
          this.total = res.data.total;
        }
      });
    },
    modify(){
      roleCheck({
        id: this.id,
        enableStatus: this.enableStatus
      }).then(res => {
        if (res.code === 200) {
          this.fetchData();
        }
      });
    },
    changeState(index, row) {
      //变更按钮
      this.id=row.id
      if(row.enableStatus==0){
        this.enableStatus=1
      }else{
        this.enableStatus=0
      }
      this.modify()
    },
    searchMenuTreeList(){
      menuTreeList({onlyShowEnable: this.onlyShowEnable}).then(res => {
        if (res.code === 200) {
          this.menuTreeData = res.data;
          if( this.chooseRole.menuIds ){
            this.$refs.menuTree.setCheckedKeys(this.chooseRole.menuIds, true)
          }
        }
      })
    },
    linkMenus(index, row) {
      this.linkMenuDialogVisible = true
      this.chooseRole = row
      this.searchMenuTreeList();
    },
    addUser() {
      // 添加账号
      this.dialogVisible = true;
    },
    // 绑定角色与菜单关联
    bindRoleMenu(){
      let that = this;
      let checkList = this.$refs.menuTree.getCheckedNodes(false, true);
      let menuIds = [];
      checkList.forEach(item=>{
        menuIds.push(item.id)
      })
      changeMenus({
        id: this.chooseRole.id,
        menuIds: menuIds.join(",")
      }).then(res => {
        if (res.code === 200) {
          that.$message({
            message: '关联成功',
            type: 'success'
          });
          that.linkMenuDialogVisible = false
          this.fetchData();
        }
      });
    },
    affirm(){
      roleAdd({
        roleName:this.roleName,
        enableStatus:this.region
      }).then(res => {
        if (res.code === 200) {
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
