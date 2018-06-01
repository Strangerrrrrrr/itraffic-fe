<template>
  <el-form label-width="80px" ref="uploadForm" :model="uploadForm">
    <el-form-item label="申诉理由">
      <el-input type="textarea" v-model="complain.content"></el-input>
    </el-form-item>
    <!-- <el-form-item label="状态">
      <template v-if="status==='待确认'">
        <el-tag>{{ status }}</el-tag>
      </template>
    </el-form-item> -->
    <el-form-item label="证明图片">
      <el-upload
        :data="complain"
        ref="upload"
        :model="uploadForm.complain_image"
        name="complain_image"
        list-type="picture"
        :action="actionUrl"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :before-upload="beforeUpload"
        :file-list="fileList"
        :on-success="handleSuccess"
        :auto-upload="false">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">上传 jpg/png 文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="danger" @click="submitUpload">确认申诉</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: ['illegalInfoId', 'status'],
  data () {
    return {
      uploadForm: {
        'identity_image': ''
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Cookie, Accept, multipart/form-data, application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, OPTIONS',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': 'Bearer ' + this.$store.state.access_token
      },
      actionUrl: 'http://localhost:8000/api/complain/store/',
      complain: {
        illegal_info_id: '',
        content: '',
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
    },
    beforeUpload() {
      this.headers.Authorization = 'Bearer ' + this.$store.state.access_token
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
    },
    submitUpload() {
      this.$refs['upload'].submit()
    },
    handleSuccess (res, file, fileList) {
      this.$message.success('上传成功！')
      this.$router.go(0)
    }
  },
  mounted () {
    this.complain.illegal_info_id = this.illegalInfoId
  }
}
</script>

<style>

</style>
