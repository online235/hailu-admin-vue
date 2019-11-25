<template>
  <div class="app-container">
    <div class="manage">
      <!-- <el-table
    :data="tableData"
    style="width: 100%"
    row-key="id"
    border
    lazy
    :load="load"
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="date"
      label="日期"
      width="380">
    </el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table> -->
      <el-table
        row-key="id"
        border
        lazy
        :load="load"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :data="
          tableData.filter(
            data =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column label="经营类型" prop="name"> </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="仅限搜索主级" v-if="scope"/>
            <el-button size="mini" type="primary" @click="handAdd"
              >添加</el-button
            >
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="handleAdd(scope.$index, scope.row)"
              v-if="scope.row.children == undefined ? false : true"
              >添加</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
  title="修改类型"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span> 经营类型：
    <el-input v-model="modelinput"></el-input>
 </span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="amend">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
        modelinput:'',
        dialogVisible: false,
      children: "",
      search: "",
      tableData: [
        {
          id: 1,
          name: "美食",
          children: [
            {
              id: 11,
              name: "小吃快餐"
            },
            {
              id: 12,
              name: "烧烤烤肉"
            },
            {
              id: 13,
              name: "甜点饮品"
            },
            {
              id: 14,
              name: "日韩料理"
            }
          ]
        },
        {
          id: 2,
          name: "酒店住宿",
          children: [
            {
              id: 21,
              name: "怡红院"
            },
            {
              id: 22,
              name: "紫轩阁"
            },
            {
              id: 23,
              name: "天足堂"
            }
          ]
        },
        {
          id: 3,
          name: "旅游景点",
          children: [
            {
              id: 31,
              name: "故宫"
            },
            {
              id: 32,
              name: "圆明园"
            }
          ]
        },
        {
          id: 4,
          name: "休闲娱乐",
          children: [
            {
              id: 41,
              name: "KTV"
            },
            {
              id: 42,
              name: "网咖"
            },
            {
              id: 43,
              name: "游乐场"
            },
            {
              id: 44,
              name: "电影院"
            }
          ]
        }
      ]
    };
  },
  created() {},

  methods: {
    load(tree, treeNode, resolve) {
      //console.log(tree)
      resolve([]);
    },
    handleEdit(index, row) {
        this.dialogVisible=true
          if (row.children) {
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].id == row.id) {
            console.log(this.tableData[i]);
            this.modelinput=this.tableData[i].name
          }
        }
      } else {
        for (var i = 0; i < this.tableData.length; i++) {
          for (var j = 0; j < this.tableData[i].children.length; j++) {
            if (this.tableData[i].children[j].id == row.id) {
              console.log(this.tableData[i].children[j]);
              this.modelinput=this.tableData[i].children[j].name
            }
          }
        }
      }
      //console.log(index, row);
    },
    handleDelete(index, row) {
      //console.log(index, row);
      if (row.children) {
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].id == row.id) {
            this.tableData.splice(i, 1);
          }
        }
      } else {
        for (var i = 0; i < this.tableData.length; i++) {
          for (var j = 0; j < this.tableData[i].children.length; j++) {
            if (this.tableData[i].children[j].id == row.id) {
              console.log(this.tableData[i].children[j]);
              this.tableData[i].children.splice(j, 1);
              console.log(this.tableData[i].children);
            }
          }
        }
      }
    },
    handleAdd(index, row) {
      console.log(index, row);
    },
    handAdd() {},
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      amend(){
          this.dialogVisible=false

      },
  }
};
</script>
<style scoped>
.manage {
  width: 60%;
}
.el-input {
  width: 70%;
}
.el-table .cell,
.el-table th div {
  overflow: visible;
}
</style>
