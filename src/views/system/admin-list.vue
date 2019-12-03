<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>管理员列表</h2></div>
      <div>
        <el-input placeholder="可根据关键字查询" v-model="search" clearable>
        </el-input>
      </div>
      <div>
        <el-button size="medium" type="success" @click="addUser"
          >添加账号</el-button
        >
      </div>
    </div>
    <el-table
      border
      :data="
        tableData.filter(
          data =>
            !search ||
            data.nickName.toLowerCase().includes(search.toLowerCase()) ||
            data.enableStatusDisplay
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            data.account.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="账号昵称">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.account }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.phone }}</el-tag>
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

      <el-table-column label="操作" width="420">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button
            size="mini"
            type="primary"
            @click="amend(scope.$index, scope.row)"
            >变更状态</el-button
          >
          <el-button
            size="mini"
            type="primary"
            @click="amendRole(scope.$index, scope.row)"
            >分配角色</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="resetPwd(scope.$index, scope.row)"
            >重置密码</el-button
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
  title="分配角色"
  :visible.sync="roleAmend"
  width="30%"
  :before-close="handleClose">
  <el-form ref="form" label-width="80px">
  <el-form-item label="角色选择">
    <el-checkbox-group v-model="type">
      <el-checkbox label="1" name="type"></el-checkbox>
      <el-checkbox label="2" name="type"></el-checkbox>
      <el-checkbox label="3" name="type"></el-checkbox>
      <el-checkbox label="4" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>

</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="roleAmend = false">取 消</el-button>
    <el-button type="primary" @click="roleAmend = false">确 定</el-button>
  </span>
</el-dialog>
    <el-dialog
      title="重置密码"
      :visible.sync="resetModal"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="120px">
        <el-form-item label="新密码：">
          <el-input v-model="resepwd" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetModal = false">取 消</el-button>
        <el-button type="primary" @click="pwdReset">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加账号"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="120px">
        <el-form-item label="账号：">
          <el-input v-model="account"></el-input>
        </el-form-item>
        <el-form-item label="账号昵称：">
          <el-input v-model="nickName"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="phone"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="pwdss" type="password"></el-input>
        </el-form-item>
        <el-form-item label="启用状态：">
          <el-select v-model="region" placeholder="请选择启用状态">
            <el-option
              v-for="(item, index) in choose"
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

    <el-dialog
      title="查看详情"
      :visible.sync="checkModle"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="账号昵称：">
          <div>{{ form.nickName }}</div>
        </el-form-item>
        <el-form-item label="账号：">
          <div>{{ form.account }}</div>
        </el-form-item>
        <el-form-item label="手机号：">
          <div>{{ form.phone }}</div>
        </el-form-item>
        <el-form-item label="状态：">
          <div>{{ form.enableStatusDisplay }}</div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkModle = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  adminList,
  adminDetail,
  adminCheck,
  adminAdd,
  adminRoles,
  adminModify,
  adminReset
} from "@/api/admin";
export default {
  data() {
    return {
      form: [],
      type:'',
      region: "1",
      choose: [
        { id: "0", name: "禁用" },
        { id: "1", name: "启用" }
      ],
      insuredId: "",
      memberStatus: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      search: "",
      roleAmend:false,
      resetModal: false,
      checkModle: false, // 详情模态框
      zhId: "", // 账号id
      enableStatus: "", // 状态0禁用，1启用
      dialogVisible: false, // 添加模态框
      account: "", // 账号
      nickName: "", // 账号昵称
      phone: "", // 手机号
      pwdss: "", // 密码
      resepwd: "" // 重置密码
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
      adminList({
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.tableData = res.data.datas;
          this.total = res.data.total;
        }
      });
    },
    handleEdit(index, row) {
      //审核按钮
      console.log(index, row);

      //   let params = new URLSearchParams();
      //   params.append("id", row.account);
      adminDetail({
        account: row.account,
        enableStatus: row.enableStatus
      }).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.form = res.data;
          this.checkModle = true;
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
    confirm() {
      //详情审核确认按钮
    },
    state() {
      // 修改状态接口
      adminCheck({
        id: this.zhId,
        enableStatus: this.enableStatus
      }).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.fetchData();
        }
      });
    },
    amendRole(index, row) {
        this.roleAmend=true
    },
    amend(index, row) {
      // 修改状态
      console.log(index, row);
      this.zhId = row.id;
      if (row.enableStatus == 0) {
        this.enableStatus = 1;
      } else {
        this.enableStatus = 0;
      }
      //this.enableStatus = row.enableStatus;
      this.state();
    },
    addUser() {
      // 添加账号
      this.dialogVisible = true;
    },
    affirm() {
      // 确认添加
      //!(/^1[3456789]\d{9}$/.test(phone))
      if (this.account == "") {
        this.$message.error("账号不能为空");
      } else if (this.nickName == "") {
        this.$message.error("账号昵称不能为空");
      } else if (this.phone == "") {
        this.$message.error("手机号不能为空");
      } else if (this.pwdss == "") {
        this.$message.error("密码不能为空");
      } else {
        adminAdd({
          account: this.account, // 账号
          nickName: this.nickName, // 账号昵称
          phone: this.phone, // 手机号
          pwd: this.pwdss, // 密码
          enableStatus: this.region // 启用状态
        }).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.dialogVisible = false;
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.fetchData();
            this.account == "";
            this.nickName == "";
            this.phone == "";
            this.pwdss == "";
          }
        });
      }
    },
    handleCurrentChange(val) {
      //分页
      this.currentPage = val;
      this.fetchData();
    },
    // alterPwd(){// 修改密码

    // },
    resetPwd(index, row) {
      // 重置密码
      this.resetModal = true;
      this.zhId = row.id;
    },
    pwdReset() {
      // 确认密码重置
      adminReset({
        id: this.zhId,
        newPwd: this.resepwd
      }).then(res => {
        //console.log(res);
        if (res.code === 200) {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.resetModal = false;
        }
      });
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
