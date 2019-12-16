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
              <el-button
                      type="text"
                      style="color: red;"
                      size="mini"
                      @click="() => delTreeItem(data)"
              >
                删除
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
            <el-form-item label="前端路由" v-show="showFormRouteItem">
              <el-input v-model="updateForm.url"></el-input>
            </el-form-item>
            <el-form-item label="后端接口" v-show="showFormApiItem">
              <el-input v-model="updateForm.api"></el-input>
            </el-form-item>
            <el-form-item label="菜单类型">
              <el-select v-model="updateForm.menuType" placeholder="请选择菜单类型" @change="changeMenuType" >
                <el-option
                        v-for="(item, index) in menuTypes"
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
          <el-form-item label="前端路由" v-show="showFormRouteItem">
            <el-input v-model="addForm.url"></el-input>
          </el-form-item>
          <el-form-item label="后端接口" v-show="showFormApiItem">
            <el-input v-model="addForm.api"></el-input>
          </el-form-item>
          <el-form-item label="菜单类型">
            <el-select v-model="addForm.menuType" placeholder="请选择菜单类型" @change="changeMenuType" >
              <el-option
                      v-for="(item, index) in menuTypes"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用状态">
            <el-select v-model="addForm.enableStatus" placeholder="请选择启用状态" >
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
import { menuAdd, menuTreeList, menuUpdate, menuDel } from "@/api/menu";
import { MessageBox } from 'element-ui'
export default {
  data() {
    return {
      menuTypes:[
        {id:'0',name:'前端路由'},
        {id:'2',name:'后端接口'}
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
        url:'',// 菜单URL路径
        api:'',// 后端接口
        menuType:'0',
        enableStatus: "1",
      },
      addForm:{
        id: "",
        parentId: 0,
        menuName:'',// 菜单名称
        url:'',// 菜单URL路径
        api:'',// 后端接口
        menuType:'0',
        enableStatus: "1",
      },
      // endregion
      menuTreeData: [],
      menuTreeItemChoose: null,
      showFormRouteItem: true,// 是否显示路由表单项
      showFormApiItem: false, // 是否显示后端接口表单项
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
      let that = this
      const loading = that.$loading({
        lock: true,
        text: '正在加载数据，请稍候',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      menuTreeList({onlyShowEnable: this.onlyShowEnable}).then(res => {
        loading.close()
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
      this.updateForm.url = data.url
      this.updateForm.api = data.api
      this.changeMenuType(this.updateForm.menuType)
    },
    appendTreeItem(data) {
      this.menuTreeItemChoose = data;
      this.dialogVisible = true;
      // 清空添加表单
      this.addForm.id = ""
      this.addForm.menuName = ""
      this.addForm.url = ""
      this.addForm.api = ""
      this.addForm.enableStatus = "1"
      this.addForm.menuType = "0"
      this.showFormApiItem = false
      this.showFormRouteItem = true
    },
    changeMenuType(row) {
        if( row === "2" ){
            this.showFormApiItem = true
            this.showFormRouteItem = false
        }else{
            this.showFormApiItem = false
            this.showFormRouteItem = true
        }
        console.info(row)
    },
    delTreeItem(data) {
      let that = this
      MessageBox.confirm('确定要删除【' + data.menuName + '】以及所有下级菜单吗？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        menuDel({menuIds:data.id}).then(res => {
          if (res != null && res.code === 200) {
            that.$message({
              message: '删除成功',
              type: 'success'
            })
            that.searchTreeList()
          }
        });
      })
    },
    affirm(){
      let that = this;
      menuAdd({
        menuName:this.addForm.menuName,
        parentId: this.menuTreeItemChoose == null ? 0 : this.menuTreeItemChoose.id,
        url:this.addForm.url,
        api:this.addForm.api,
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
          that.$message({
              message: '添加成功',
              type: 'success'
          })
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
        parentId: this.updateForm.parentId,
        url: this.updateForm.url,
        api: this.updateForm.api,
        menuType: this.updateForm.menuType,
        enableStatus: this.updateForm.enableStatus
      }).then(res => {
        loading.close()
        if (res != null && res.code === 200) {
          that.menuTreeItemChoose.menuName = that.updateForm.menuName
          that.menuTreeItemChoose.url = that.updateForm.url
          that.menuTreeItemChoose.api = that.updateForm.api
          that.menuTreeItemChoose.menuType = that.updateForm.menuType
          that.menuTreeItemChoose.enableStatus = that.updateForm.enableStatus
          that.$message({
              message: '保存成功',
              type: 'success'
          })
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
  .tip{
    width: 100%;
    margin-bottom: 15px;
  }
</style>
