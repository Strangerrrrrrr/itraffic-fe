<template>
  <el-row>
    <el-card>
      <el-form label-position="left" label-width="120px" v-model="dlInfo">
          <el-form-item label="车主姓名">
            <el-tag id="name" name="name">{{ dlInfo.	real_name }}</el-tag>
          </el-form-item>
          <el-form-item label="身份证">
            <el-tag>{{ dlInfo.identity }}</el-tag> 
          </el-form-item>
          <el-form-item label="牌照号码">
            <el-tag>{{ dlInfo.vehicle_type }}</el-tag>
          </el-form-item>
          <el-form-item label="车辆类型">
            <el-tag>{{ receivetime() }}</el-tag>
          </el-form-item>
          <el-form-item label="发动机号">
            <el-tag>{{ deadline() }}</el-tag>
          </el-form-item>
          <el-form-item label="车架号">
            <el-tag>{{ updatetime() }}</el-tag>
          </el-form-item>
          <el-form-item label="初次登记日期">
            <el-tag>{{ dlInfo.grade }}</el-tag>
          </el-form-item>          
          <el-form-item label="领证日期" prop="address">
            <el-input v-model="dlInfo.address"></el-input>
          </el-form-item>
          <el-form-item label="是否通过安检" prop="address">
            <el-input v-model="dlInfo.address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button plain name="submit" @click="onSubmit">
              修改
            </el-button>            
          </el-form-item>
      </el-form>
    </el-card>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      dlInfo: ''
    }
  },
  middleware: 'auth',
  mounted () {
    this.dlshow()
  },
  methods: {
    dlshow () {
      let self = this
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.get('/api/driverslicense/show')
      .then(function(res){
        self.dlInfo = res.data
      })
    },
    onSubmit () {
      let self = this
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.post('/api/driverslicense/address', this.dlInfo)
      .then(function(res){
        self.$message({
          message: '更新成功',
          type: 'success'
        })
      })
    },
     receivetime () {
      let receivetime = new Date(this.dlInfo.created_at)
      let date = (receivetime.getFullYear()) + '年' + (receivetime.getMonth() + 1) + '月' + receivetime.getDate() + '日'
      return date
    },
    deadline () {
      let deadline = new Date(this.dlInfo.created_at)
      let date = (deadline.getFullYear() + this.dlInfo.effective_time) + '年' + (deadline.getMonth() + 1) + '月' + deadline.getDate() + '日'
      return date
    },
    updatetime () {
      let updatetime = new Date(this.dlInfo.updated_at)
      let date = (updatetime.getFullYear()) + '年' + (updatetime.getMonth() + 1) + '月' + updatetime.getDate() +'日'
      return date
    }
  }
}
</script>

<style>

</style>