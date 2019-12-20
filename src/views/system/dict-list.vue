<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>字典列表</h2></div>
      <div>
        <el-select
          v-model="queryForm.code"
          filterable
          clearable
          placeholder="请选择字典分类"
          style="width:30%;min-width:200px;"
        >
          <el-option
            v-for="item in category"
            :key="item.code"
            :label="item.desc"
            :value="item.code"
          />
        </el-select>
      </div>
      <div>
        <el-button
          size="medium"
          type="success"
          @click="fetchData"
        >查询
        </el-button>
        <el-button
          size="medium"
          type="primary"
          @click="showAddDialog"
        >添加字典
        </el-button>
        <el-button
          size="medium"
          @click="reCacheToRedis"
        >缓存字典到Redis
        </el-button>
      </div>
    </div>
    <el-table
      border
      :data="tableData"
      style="width: 100%"
      :span-method="queryTableSpanMethod"
    >
      <el-table-column label="分类">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="分类描述">
        <template slot-scope="scope">
          {{ scope.row.desc }}
        </template>
      </el-table-column>
      <el-table-column label="字典名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="字典值">
        <template slot-scope="scope">
          {{ scope.row.value }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="showUpdateDialog(scope.$index, scope.row)"
          >编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="delDict(scope.$index, scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加字典"
      :visible.sync="addDialogVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="40%"
    >
      <el-form ref="addForm" label-width="120px">
        <el-form-item>
          <el-radio-group v-model="addForm.editType">
            <el-radio :label="1">选择已存在的分类</el-radio>
            <el-radio :label="2">添加新分类</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="addForm.editType === 1" label="分类code：">
          <el-select
            v-model="addForm.code"
            filterable
            clearable
            placeholder="请选择字典分类"
            style="width:100%;"
            @change="chooseAddFormCategory"
            @clear="clearAddFormCategory"
          >
            <el-option
              v-for="item in category"
              :key="item.code"
              :label="item.desc"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-show="addForm.editType === 2" label="分类code：">
          <el-input v-model="addForm.code" />
        </el-form-item>
        <el-form-item v-show="addForm.editType === 2" label="分类描述：">
          <el-input v-model="addForm.desc" />
        </el-form-item>
        <el-form-item label="字典名称：">
          <el-input v-model="addForm.name" />
        </el-form-item>
        <el-form-item label="字典值：">
          <el-input v-model="addForm.value" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDict">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑字典"
      :visible.sync="updateDialogVisible"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="40%"
    >
      <el-form ref="updateForm" label-width="120px">
        <el-form-item>
          <el-radio-group v-model="updateForm.editType">
            <el-radio :label="1">选择已存在的分类</el-radio>
            <el-radio :label="2">添加新分类</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="updateForm.editType === 1" label="分类code：">
          <el-select
            v-model="updateForm.code"
            filterable
            clearable
            placeholder="请选择字典分类"
            style="width:100%;"
            @change="chooseUpdateFormCategory"
            @clear="clearUpdateFormCategory"
          >
            <el-option
              v-for="item in category"
              :key="item.code"
              :label="item.desc"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-show="updateForm.editType === 2" label="分类code：">
          <el-input v-model="updateForm.code" />
        </el-form-item>
        <el-form-item v-show="updateForm.editType === 2" label="分类描述：">
          <el-input v-model="updateForm.desc" />
        </el-form-item>
        <el-form-item label="字典名称：">
          <el-input v-model="updateForm.name" />
        </el-form-item>
        <el-form-item label="字典值：">
          <el-input v-model="updateForm.value" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateDict">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { dictAdd, dictCategory, dictList, dictUpdate, dictDelete, dictReCacheRedis } from '@/api/dict'
import { MessageBox } from 'element-ui'

export default {
  data() {
    return {
      addForm: {
        code: '',
        editType: 1,
        desc: '',
        name: '',
        value: ''
      },
      updateForm: {
        id: '',
        editType: 1,
        code: '',
        desc: '',
        name: '',
        value: ''
      },
      queryForm: {
        code: ''
      },
      category: [],
      tableData: [],
      addDialogVisible: false,
      updateDialogVisible: false,
      // 存储单元格合并信息
      spanArr: []
    }
  },
  created() {
    this.fetchData() // 列表数据加载
    this.getCategory()
  },

  methods: {
    fetchData() {
      dictList({
        code: this.queryForm.code
      }).then(res => {
        this.getSpanArr(res.data)
        this.tableData = res.data
      })
    },
    // 获取分类列表
    getCategory() {
      dictCategory().then(res => {
        this.category = res.data
      })
    },
    chooseAddFormCategory(val) {
      const select = this.category.find(item => {
        return item.code === val
      })
      if (select !== undefined) {
        this.addForm.desc = select.desc
      }
    },
    clearAddFormCategory() {
      this.addForm.code = ''
      this.addForm.desc = ''
    },
    chooseUpdateFormCategory(val) {
      const select = this.category.find(item => {
        return item.code === val
      })
      if (select !== undefined) {
        this.updateForm.desc = select.desc
      }
    },
    clearUpdateFormCategory() {
      this.updateForm.code = ''
      this.updateForm.desc = ''
    },
    getSpanArr(data) {
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同,因合并第一个所以[0]
          if (data[i].code === data[i - 1].code) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
    },
    queryTableSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    showAddDialog() {
      this.addDialogVisible = true
      this.addForm.code = ''
      this.addForm.desc = ''
      this.addForm.name = ''
      this.addForm.value = ''
    },
    reCacheToRedis() {
      dictReCacheRedis().then(res => {
        this.$message({
          message: '缓存成功',
          type: 'success'
        })
      })
    },
    showUpdateDialog(index, row) {
      this.updateDialogVisible = true
      this.updateForm.id = row.id
      this.updateForm.code = row.code
      this.updateForm.desc = row.desc
      this.updateForm.name = row.name
      this.updateForm.value = row.value
      this.updateForm.editType = 1
    },
    addDict() {
      if (this.code === '') {
        this.$message.error('分类code不能为空')
        return
      } else if (this.desc === '') {
        this.$message.error('分类描述不能为空')
        return
      } else if (this.name === '') {
        this.$message.error('字典名称不能为空')
        return
      } else if (this.value === '') {
        this.$message.error('字典值不能为空')
        return
      }
      const that = this
      dictAdd({
        code: this.addForm.code,
        desc: this.addForm.desc,
        name: this.addForm.name,
        value: this.addForm.value
      }).then(res => {
        this.addDialogVisible = false
        this.$message({
          message: '新增成功',
          type: 'success'
        })
        that.fetchData()
      })
    },
    updateDict() {
      // 确认添加
      if (this.code === '') {
        this.$message.error('分类code不能为空')
        return
      } else if (this.desc === '') {
        this.$message.error('分类描述不能为空')
        return
      } else if (this.name === '') {
        this.$message.error('字典名称不能为空')
        return
      } else if (this.value === '') {
        this.$message.error('字典值不能为空')
        return
      }
      const that = this
      dictUpdate({
        id: this.updateForm.id,
        code: this.updateForm.code,
        desc: this.updateForm.desc,
        name: this.updateForm.name,
        value: this.updateForm.value
      }).then(res => {
        this.updateDialogVisible = false
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        that.fetchData()
      })
    },
    delDict(index, row) {
      const that = this
      MessageBox.confirm('确定要删除【' + row.code + ' - ' + row.name + '】吗？删除可能会引起数据状态字段的显示异常。', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        dictDelete({
          id: row.id
        }).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          that.fetchData()
        })
      })
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
</style>
