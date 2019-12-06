<template>
  <el-container>
    <el-main>
      <el-form :inline="true">
        <el-form-item label="只显示启用的菜单">
          <el-switch
                  v-model="onlyShowEnable"
                  @change="onlyShowEnableChange"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="success" @click="appendTreeItem(null)"
          >添加菜单</el-button
          >
        </el-form-item>
      </el-form>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-tree class="menu-tree"
                  :data="menuTreeData"
                  node-key="id"
                  :expand-on-click-node="false"
                  @node-click="treeItemClick"
                  default-expand-all>
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.menuName }}</span>
            <span>
              <el-button
                      type="text"
                      size="mini"
                      @click="() => appendTreeItem(data)"
              >
                添加下级
              </el-button>
            </span>
          </span>
          </el-tree>
        </el-col>
        <el-col :span="14">
          <el-form ref="form" :model="updateForm" label-width="80px" size="mini">
            <el-form-item label="菜单名称">
              <el-input v-model="updateForm.menuName"></el-input>
            </el-form-item>
            <el-form-item label="权限编码">
              <el-input v-model="updateForm.permissionCode"></el-input>
            </el-form-item>
            <el-form-item label="URL">
              <el-input v-model="updateForm.url"></el-input>
            </el-form-item>
            <el-form-item label="菜单类型">
              <el-select v-model="updateForm.menuType" placeholder="请选择菜单类型">
                <el-option
                        v-for="(item, index) in choose"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="启用状态">
              <el-select v-model="updateForm.enableStatus" placeholder="请选择启用状态">
                <el-option
                        v-for="(item, index) in chooses"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-dialog
              title="添加菜单"
              :visible.sync="dialogVisible"
              width="40%"
              :before-close="handleClose"
      >
        <el-form ref="addForm" label-width="150px">
          <el-form-item label="菜单名称">
            <el-input v-model="addForm.menuName"></el-input>
          </el-form-item>
          <el-form-item label="权限编码">
            <el-input v-model="addForm.permissionCode"></el-input>
          </el-form-item>
          <el-form-item label="URL">
            <el-input v-model="addForm.url"></el-input>
          </el-form-item>
          <el-form-item label="菜单类型">
            <el-select v-model="addForm.menuType" placeholder="请选择菜单类型">
              <el-option
                      v-for="(item, index) in choose"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用状态">
            <el-select v-model="addForm.enableStatus" placeholder="请选择启用状态">
              <el-option
                      v-for="(item, index) in chooses"
                      :key="item.id"
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
    </el-main>

  </el-container>
</template>

<script>
import { menuAdd, menuTreeList, menuUpdate } from "@/api/menu";
export default {
  data() {
    return {
      choose:[
        {id:'0',name:'菜单'},
        {id:'1',name:'按钮'}
      ],
      chooses:[
        {id:'0',name:'禁用'},
        {id:'1',name:'启用'}
      ],
      onlyShowEnable:false,
      dialogVisible:false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      search: "",
      // region 添加表单
      updateForm:{
        id: "",
        parentId: 0,
        menuName:'',// 菜单名称
        permissionCode:'',// 菜单权限编码
        url:'',// 菜单URL路径
        enableStatus: "1",
        menuType:'0',
      },
      addForm:{
        id: "",
        parentId: 0,
        menuName:'',// 菜单名称
        permissionCode:'',// 菜单权限编码
        url:'',// 菜单URL路径
        enableStatus: "1",
        menuType:'0',
      },
      // endregion
      menuTreeData: [],
      menuTreeItemChoose: null
    };
  },
  created() {
    this.searchTreeList();
  },

  methods: {
    onlyShowEnableChange(){
      this.searchTreeList();
    },
    searchTreeList(){
      menuTreeList({onlyShowEnable: this.onlyShowEnable}).then(res => {
        if (res.code === 200) {
          this.menuTreeData = res.data;
        }
      })
    },
    treeItemClick(data, node, target){
      this.menuTreeItemChoose = data
      this.updateForm.id = data.id
      this.updateForm.menuName = data.menuName
      this.updateForm.parentId = data.parentId
      this.updateForm.menuType = data.menuType + ""
      this.updateForm.enableStatus = data.enableStatus + ""
      this.updateForm.permissionCode = data.permissionCode
      this.updateForm.url = data.url
    },
    appendTreeItem(data) {
      this.menuTreeItemChoose = data;
      this.dialogVisible = true;
      // 清空添加表单
      this.addForm.id = ""
      this.addForm.menuName = ""
      this.addForm.permissionCode = ""
      this.addForm.url = ""
      this.addForm.enableStatus = "1"
      this.addForm.menuType = "0"
    },
    affirm(){
      let that = this;
      menuAdd({
        menuName:this.addForm.menuName,
        permissionCode:this.addForm.permissionCode,
        parentId: this.menuTreeItemChoose == null ? 0 : this.menuTreeItemChoose.id,
        url:this.addForm.url,
        menuType:this.addForm.menuType,
        enableStatus:this.addForm.enableStatus
      }).then(res => {
        if (res != null && res.code === 200) {
          if( that.menuTreeItemChoose == null ){
            that.menuTreeData.push(res.data)
          }else{
            that.menuTreeItemChoose.children.push(res.data)
          }
          this.dialogVisible=false
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
    save(){
      let that = this;
      if( that.menuTreeItemChoose == null ){
        this.$message({
          message: '请选择要编辑的菜单',
          type: 'warning'
        })
        return
      }
      const loading = that.$loading({
        lock: true,
        text: '正在保存',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      menuUpdate({
        id: this.updateForm.id,
        menuName: this.updateForm.menuName,
        permissionCode: this.updateForm.permissionCode,
        parentId: this.updateForm.parentId,
        url: this.updateForm.url,
        menuType: this.updateForm.menuType,
        enableStatus: this.updateForm.enableStatus
      }).then(res => {
        loading.close()
        if (res != null && res.code === 200) {
          that.menuTreeItemChoose.menuName = that.updateForm.menuName
          that.menuTreeItemChoose.permissionCode = that.updateForm.permissionCode
          that.menuTreeItemChoose.url = that.updateForm.url
          that.menuTreeItemChoose.menuType = that.updateForm.menuType
          that.menuTreeItemChoose.enableStatus = that.updateForm.enableStatus
        }
      })
    }
  }
}
</script>
<style scoped>
.menu-tree{
  height: 83vh;
  overflow-x: auto;
  border-right: 1px solid #d6d6d6
}
.treeHead > div {
  margin-right: 20px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
