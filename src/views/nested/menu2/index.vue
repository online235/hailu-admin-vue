<template>
  <div style="padding:30px;">
    <div class="demo-image__preview">
      <el-image 
        style="width: 100px; height: 100px"
        :src="url" >
      </el-image>
    </div>
  </div>
</template>
<script>
export default {
   data() {
      return {
url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      }
   }
}
</script>