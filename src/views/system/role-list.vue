<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>角色列表</h2></div>
      <div>
        <el-input v-model="search" placeholder="可根据关键字查询" clearable />
      </div>
      <div>
        <el-button
          size="medium"
          type="success"
          @click="addUser"
        >添加角色</el-button>
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
          <span style="margin-left: 10px">{{ scope.row.enableStatusDisplay }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="270px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="changeState(scope.$index, scope.row)"
          >更变状态</el-button>
          <el-button
            size="mini"
            type="success"
            @click="linkMenus(scope.$index, scope.row)"
          >关联菜单</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="delRole(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      title="添加角色"
      :visible.sync="dialogVisible"
      width="40%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form ref="form" label-width="150px">
        <el-form-item label="角色名称：">
          <el-input v-model="roleName" />
        </el-form-item>
        <el-form-item label="启用类型：">
          <el-select v-model="region" placeholder="请选择启用类型">
            <el-option
              v-for="(item, index) in choose"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="affirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="关联菜单"
      :visible.sync="linkMenuDialogVisible"
      width="50%"
      z-index="1000"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <div class="dialog-body-max-height">
        <el-form label-width="150px">
          <el-tree
            ref="menuTree"
            class="menu-tree"
            :data="menuTreeData"
            show-checkbox
            :check-strictly="true"
            node-key="id"
            :expand-on-click-node="false"
            default-expand-all
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ data.menuName }}</span>
            </span>
          </el-tree>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="linkMenuDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="bindRoleMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { roleList, roleAdd, roleCheck, changeMenus, deleteRole } from '@/api/role'
import { menuTreeList } from '@/api/menu'
import { MessageBox } from 'element-ui'
export default {
  data() {
    return {
      region: '1',
      choose: [
        { id: '0', name: '禁用' },
        { id: '1', name: '启用' }
      ],
      dialogVisible: false,
      linkMenuDialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      search: '',
      enableStatus: '',
      id: '',
      roleName: '', // 菜单名称
      permissionCode: '', // 菜单权限编码
      url: '', // 菜单URL路径

      menuTreeData: [],
      menuTreeItemChoose: null,
      // 当前选中的角色数据
      chooseRole: null
    }
  },
  created() {
    this.fetchData() // 列表数据加载
  },

  methods: {
    fetchData() {
      // 列表数据加载
      roleList({
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.datas
          this.total = res.data.total
        }
      })
    },
    delRole(index, row) {
      const that = this
      MessageBox.confirm('确定要删除【' + row.roleName + '】吗？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole({
          id: row.id
        }).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            that.fetchData()
          }
        })
      })
    },
    modify() {
      roleCheck({
        id: this.id,
        enableStatus: this.enableStatus
      }).then(res => {
        if (res.code === 200) {
          this.fetchData()
        }
      })
    },
    changeState(index, row) {
      // 变更按钮
      this.id = row.id
      if (row.enableStatus == 0) {
        this.enableStatus = 1
      } else {
        this.enableStatus = 0
      }
      this.modify()
    },
    searchMenuTreeList() {
      this.linkMenuDialogVisible = true
      const that = this
      const loading = that.$loading({
        lock: true,
        text: '正在处理，请稍候',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      menuTreeList({ onlyShowEnable: this.onlyShowEnable }).then(res => {
        if (res.code === 200) {
          this.menuTreeData = res.data
          if (this.chooseRole.menuIds) {
            setTimeout(function() {
              loading.close()
              that.$refs.menuTree.setCheckedKeys(that.chooseRole.menuIds, true)
            }, 200)
          }
        } else {
          loading.close()
        }
      })
    },
    linkMenus(index, row) {
      this.chooseRole = row
      this.searchMenuTreeList()
    },
    addUser() {
      // 添加账号
      this.dialogVisible = true
    },
    // 绑定角色与菜单关联
    bindRoleMenu() {
      const that = this
      const checkList = this.$refs.menuTree.getCheckedNodes(false, true)
      const menuIds = []
      checkList.forEach(item => {
        menuIds.push(item.id)
      })
      changeMenus({
        id: this.chooseRole.id,
        menuIds: menuIds.join(',')
      }).then(res => {
        if (res.code === 200) {
          that.$message({
            message: '关联成功',
            type: 'success'
          })
          that.linkMenuDialogVisible = false
          this.fetchData()
        }
      })
    },
    affirm() {
      roleAdd({
        roleName: this.roleName,
        enableStatus: this.region
      }).then(res => {
        if (res.code === 200) {
          this.dialogVisible = false
          this.fetchData()
        }
      })
    },
    handleCurrentChange(val) {
      // 分页
      this.currentPage = val
      this.fetchData()
    }
  }
}
</script>
<style scoped>
.treeHead {
  display: flex;
  align-items: center;
}
.treeHead > div {
  margin-right: 20px;
}
.dialog-body-max-height{
  height: 40vh;
  overflow-x: auto;
}
  .el-loading-mask{
    z-index: 2006;
  }
</style>
