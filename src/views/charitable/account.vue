<template>
  <div class="app-container">
    <div class="treeHead">
        <div>
            <h2>账号公益信息</h2>
        </div>
    </div>
  </div>
</template>

<script>
import { UploadSingle } from "@/api/FileUpload";
import {
  charityList,
  PublicAdd,
  ArticleAdd,
  charityDetails,
  article,
  modify,
  detailedInfor,
  govern
} from "@/api/Charitable";
import EditorBar from '@/components/editur/index'
export default {
  components: { EditorBar },
  data() {
    return {
     
    };
  },
  created() {
    // this.imghead = axios.defaults.baseURL + "/basic";
     
  },
  methods: {
    
  },
  mounted() {
    
  }
};
</script>
<style scoped>

</style>

