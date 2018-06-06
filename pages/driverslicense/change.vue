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
    open() {
      let self = this
      this.$confirm('距离您的驾驶证过期还有' + this.interval + '天，确认预约吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        self.storeBook()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消预约！'
        })
      })
    },
    storeBook () {
      let changeInfo = {
        name: this.userInfo.name,
        identity: this.userInfo.identity,
        vehicle_type: this.dlInfo.vehicle_type,
        phone: this.userInfo.phone
      }
      let self = this
      this.$axios.post('api/change/store', changeInfo)
      .then(function(res){
        self.$message({
          type: 'success',
          message: '预约成功!'
        })
      })
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
