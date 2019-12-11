<template>
  <div class="app-container">
    <div class="treeHead">
      <div><h2>心安救助历史案例</h2></div>
      <div>
        <el-input placeholder="可根据关键字查询" v-model="search" clearable>
        </el-input>
      </div>
      <div>
        <el-button
          size="medium"
          type="success"
          @click="addUser"
          >插入案例</el-button
        >
      </div>
    </div>
   
  </div>
</template>

<script>

export default {
  data() {
    return {
      search:'',
    };
  },
  created() {
    // this.imghead = axios.defaults.baseURL + "/basic";
    // this.fetchData(); //列表数据加载
  },
  methods: {
    addUser(){

    }
  },
  mounted() {}
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
<style>
/* .el-table td div{
    overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
  } */
</style>
