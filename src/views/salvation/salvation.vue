<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>救助列表</h2></div>
      <div>
        <el-input v-model="search" clearable placeholder="可根据名称查询" />
      </div>
      <div>
        <el-button
          size="medium"
          type="success"
          @click="addUser"
        >添加</el-button>
      </div>
    </div>
    <el-table
      border
      :data="
        tableData.filter(
          data =>
            !search || data.title.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.updatedat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.title }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.examine==2?'审核通过':'审核不通过' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >审核</el-button>
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
      title="提示"
      :visible.sync="dialogVisible"
      width="40%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="详情审核"
      :visible.sync="checkModle"
      width="40%"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="标题：">
          <div>{{ form.title }}</div>
        </el-form-item>
        <el-form-item label="救助类型：">
          <div>{{ form.rescueType }}</div>
        </el-form-item>
        <el-form-item label="救助编号：">
          <div>{{ form.numberId }}</div>
        </el-form-item>
        <el-form-item label="救助次数：">
          <div>{{ form.helpTimes }}</div>
        </el-form-item>
        <el-form-item label="目标金额：">
          <div>{{ form.targetAmount }}</div>
        </el-form-item>
        <el-form-item label="现金额：">
          <div>{{ form.cash }}</div>
        </el-form-item>
        <el-form-item label="说明：">
          <div>{{ form.instructions }}</div>
        </el-form-item>
        <el-form-item label="详情图片">
          <div v-for="item in url" :key="item" class="demo-image__preview">
            <el-image
              :preview-src-list="srcList"
              style="width: 100px; height: 100px"
              :src="imghead+item"
              @click="srcListimg(item)"
            />
          </div>
        </el-form-item>
        <el-form-item label="日期：">
          <div>{{ form.createdat }}</div>
        </el-form-item>
        <el-form-item label="状态：">
          <!-- <div>{{ form.examine==2?'审核通过':'审核不通过' }}</div> -->
          <el-select v-model="form.examine" placeholder="请选择审核状态：">
            <el-option label="审核通过" value="2" />
            <el-option label="审核不通过" value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkModle = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
        <!-- <el-button type="danger" @click="failure">审核不通过</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  salvationList,
  salvationDetail,
  salvationStatus
} from '@/api/salvation'
import EditorBar from '@/components/editur/index'
import axios from 'axios'
export default {
  components: { EditorBar },
  data() {
    return {
      form: '',
      currentPage: 1, // 页数
      pageSize: 10, // 每页数据量
      tableData: [], // 列表数据
      search: '', // 搜索框
      checkModle: false, // 模态框
      dialogVisible: false, // 添加模态框
      examine: '', // 审核(2-审核通过、3-审核不通过)
      numberId: '',
      total: 0, // 总数
      imghead: '',
      url: [

      ],
      srcList: []
    }
  },
  created() {
    this.imghead = axios.defaults.baseURL + '/basic'
    this.fetchData() // 列表数据加载
  },

  methods: {
    // 列表数据加载
    // *
    // *
    fetchData() {
      // let params = new URLSearchParams();
      // params.append("page", this.currentPage);
      // params.append("size", this.pageSize);
      salvationList({
        page: this.currentPage,
        size: this.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.datas
          this.total = res.data.total
          // for (var i = 0; i < this.tableData.length; i++) {
          //   var dataee = new Date(this.tableData[i].updatedat).toJSON()
          //   var date = new Date(+new Date(dataee) + 8 * 3600 * 1000)
          //     .toISOString()
          //     .replace(/T/g, ' ')
          //     .replace(/\.[\d]{3}Z/, '')
          //   this.tableData[i].updatedat = date
          // }
        }
      })
    },
    // *
    // *
    // 列表数据加载
    // 审核按钮
    // *
    // *
    handleEdit(index, row) {
      this.numberId = row.numberId
      // let params = new URLSearchParams();
      // params.append("numberId", this.numberId);
      salvationDetail({
        numberId: this.numberId
      }).then(res => {
        if (res.code === 200) {
          this.form = res.data
          this.url = res.data.imageList
        }
      })
      this.checkModle = true
    },
    confirm() {
      // 详情审核通过按钮
      this.checkModle = false
      this.examine = this.form.examine

      this.audit()
      this.fetchData()
    },
    // failure() {
    //   // 详情审核不通过按钮
    //   this.examine = '3'
    //   this.checkModle = false
    //   this.audit()
    // },
    audit() {
      // 审核
      salvationStatus({
        numberId: this.numberId,
        examine: this.examine
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '审核操作成功',
            type: 'success'
          })
          this.fetchData()
        }
      })
    },
    // *
    // *
    // 审核按钮
    srcListimg(item) {
      this.srcList[0] = item
    },
    handleCurrentChange(val) {
      // 分页
      this.currentPage = val
      this.fetchData()
    },
    addUser() {
      this.dialogVisible = true
    }
  }
}
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
.demo-image__preview {
  display: inline-block;
  margin-left: 10px;
}
</style>
