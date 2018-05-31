<template>
  <el-row>
    <el-col :xs='{span: 24}' :md='{span: 12, offset: 6}'>
      <el-card>
        <el-form label-position="left" label-width="100px" >
            <el-form-item label="真实姓名">
              <el-tag id="name" name="name">{{ userInfo.real_name }}</el-tag>
            </el-form-item>
            <el-form-item label="证件号码">
              <el-tag>{{ userInfo.identity }}</el-tag> 
            </el-form-item>
            <el-form-item label="联系方式">
              <el-tag>{{ userInfo.phone }}</el-tag>
            </el-form-item>
            <el-form-item label="准驾车型">
              <el-tag>{{ dlInfo.vehicle_type }}</el-tag>
            </el-form-item>
            <el-form-item label="过期时间">
              <el-tag>{{ deadline() }}</el-tag>         
            </el-form-item>  
            <el-form-item label="距离过期">
              <el-tag>{{ interval }} 天</el-tag>         
            </el-form-item>
            
            <el-form-item label="换证原因">
              <el-tag>期满换证</el-tag>         
            </el-form-item>     

             <el-form-item>
            <el-button plain name="submit" @click="open" :disabled="interval>90">
              确认预约
            </el-button> 
            </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      dlInfo: '',
      userInfo: '',
    }
  },
  middleware: 'auth',
  mounted () {
    this.getUserInfo()
    this.dlshow()
  },
  methods: {
    getUserInfo (){
      let self = this
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.get('/api/user')
      .then(function(res){
        self.userInfo = res.data
        if (self.userInfo.name) {
          self.$store.commit('SET_USERNAME', self.userInfo.name)
        }
      })
    },
    dlshow () {
      let self = this
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.get('/api/driverslicense/show')
      .then(function(res){
        self.dlInfo = res.data
      })
    },
    deadline () {
      let deadline = new Date(this.dlInfo.updated_at)
      let date = (deadline.getFullYear() + this.dlInfo.effective_time) + '年' + (deadline.getMonth() + 1) + '月' + deadline.getDate() + '日'
      return date
    },
    updatetime () {
      let updatetime = new Date(this.dlInfo.updated_at)
      let date = (updatetime.getFullYear()) + '年' + (updatetime.getMonth() + 1) + '月' + updatetime.getDate() +'日'
      return date
    },
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
    },
   open() {
        this.$confirm('距离您的驾驶证过期还有' + this.interval + '天，确认预约吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '预约成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消预约！'
          });          
        });
      }
  },
  computed: {
    interval () {
      let now = new Date()
      let updated_at = new Date(this.dlInfo.updated_at)
      console.log(now)
      console.log(updated_at)
      let interval = 10*365*24*60*60*1000 - (now - updated_at)
      let day = parseInt(interval/1000/60/60/24)
      if (day < 0) {
        day = 0
      }
      return day
    }
  }
}
</script>

<style>

</style>
