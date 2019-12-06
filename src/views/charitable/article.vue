<template>
  <div>
    <div id="editorElem" ref="editor" style="text-align:left"></div>
    <Button shape="circle" type="primary" v-on:click="getContent"
      >submit</Button
    >
  </div>
</template>

<script>
import { UploadSingle } from "@/api/FileUpload";
import E from "wangeditor"; //引入wangeditor
import $ from "jquery"; //这里我使用了jquery
export default {
  data() {
    return {
      editor: "",
      editorContent: ""
    };
  },
  methods: {
    getContent: function() {
      this.editor.txt.clear(); //清空富文本的内容
    }
  },
  mounted() {
    var editor = new E("#editorElem");
    editor.customConfig.customUploadImg = (files, insert) => {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("path", "files/ne-icev3-dashboard/content/content/");
      this.axios({
        method: "post",
        url: "/api/v2/basic/upload/single/goods",
        headers: {
          "Content-Type": "multipart/form-data"
          // 'Access-token' : localStorage.getItem('Access_token')
        },
        data: formData
      }).then(res => {
        const result = res.data;
        if (result.code === 200) {
          //const data = result.data;
          this.editorContent = result.data;
          insert(
            "http://192.168.10.135:30000/api/v2/basic" + this.editorContent
          );
        }
      });
    };
    editor.create();
  }
};
</script>
<style>
#editorElem /deep/ .w-e-text-container {
  height: 500px !important;
}
</style>
