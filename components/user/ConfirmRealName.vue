<template>
  <div>
    <hr style="margin: 20px">
    <el-form label-width="130px" label-position="left" :model="uploadForm" ref="uploadForm">
      <el-form-item label="请上传身份证照片">
        <el-upload
          ref="upload"
          name="identity_image"
          drag
          multiple
          list-type="picture"
          :data="userData"
          :model="uploadForm.identity_image"
          :file-list="fileList"
          :action="actionUrl"
          :before-remove="beforeRemove"
          :before-upload="beforeUpload"
          :limit="2"
          :on-exceed="handleExceed"
          :on-success="handleSuccess"
          :auto-upload="false"
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitUpload">确认上传</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// :http-request="onUpload"

export default {
  data () {
    return {
      userData: {
        user_id: this.$store.state.user_id
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Cookie, Accept, multipart/form-data, application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, OPTIONS',
        'Access-Control-Allow-Credentials': 'true',
        'Authorization': 'Bearer ' + this.$store.state.access_token
      },
      uploadForm: {
        'identity_image': ''
      },
      actionUrl: 'http://localhost:8000/api/user/identity/',
      fileList: [
        // {
        //   name: 'food.jpeg', 
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }, 
      ]
    }
  },
  mounted () {
    console.log(this.$store.state.user_id)
  },
  components: {

  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    submitUpload() {
      this.$refs['upload'].submit()
    },
    beforeUpload() {
      this.userData.user_id = this.$store.state.user_id
      this.headers.Authorization = 'Bearer ' + this.$store.state.access_token
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
    },
    handleSuccess (res, file, fileList) {
      this.$router.go(0)
    }
    // onUpload (val) {
    //   let self = this
    //   console.log(this.uploadForm)
    //   this.$axios.setToken(this.$store.state.access_token, 'Bearer')
    //   this.$axios.post('http://localhost:8000/api/user/identity', this.uploadForm)
    //   .then(function(res){
    //     console.log('then')
    //     self.fileList[0].name = '身份证照片'
    //     self.fileList[0].url = 'http://localhost:8000/storage' + res.substring(6)
    //   })
    // }
  }
}
</script>

<style>

</style>
