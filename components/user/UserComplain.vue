<template>
  <el-form label-width="80px">
    <el-form-item label="申诉理由">
      <el-input type="textarea" v-model="complain.content"></el-input>
    </el-form-item>
    <el-form-item label="证明图片">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">最多只能上传三张 jpg/png 文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="danger">确认申诉</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      complain: {
        content: ''
      },
      fileList: [
        // {
        //   name: '', 
        //   url: ''
        // }
      ]
    }
  },
  methods: {
    submitComplain () {
      let self = this
      // this.$axios.post('/api/')
      // .then
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

<style>

</style>
