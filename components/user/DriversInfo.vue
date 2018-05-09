<template>
  <div>
    <el-form label-position="left" label-width="130px" size="small">
      <el-form-item label="姓名">
              <el-tag id="name" name="name">{{ dlInfo.	real_name }}</el-tag>
            </el-form-item>
            <el-form-item label="身份证">
              <el-tag>{{ dlInfo.identity }}</el-tag> 
            </el-form-item>
            <el-form-item label="准驾车型">
              <el-tag>{{ dlInfo.vehicle_type }}</el-tag>
            </el-form-item>
            <el-form-item label="领证日期">
              <el-tag>{{ receivetime() }}</el-tag>
            </el-form-item>
            <el-form-item label="到期日期">
              <el-tag>{{ deadline() }}</el-tag>           
            </el-form-item>
            <el-form-item label="更新时间">
              <el-tag>{{ updatetime() }}</el-tag>
            </el-form-item>
            <el-form-item label="剩余分数">
              <el-tag>{{ dlInfo.grade }}</el-tag>         
            </el-form-item>
    </el-form>

  </div>
</template>

<script>

export default {
  data () {
    return {
      dlInfo: '',
    }
  },
  mounted () {
    this.dlshow()
  },
  methods: {
    dlshow () {
      let self = this
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.get('/api/driverslicense/show')
      .then(function(res){
        if (res.data) {
          self.dlInfo = res.data
        } else {
          self.$message({
            showClose: true,
            message: '您当前还未获得驾驶证！',
            type: 'error'
          })
        }
      })
    },
    receivetime () {
      let receivetime = new Date(this.dlInfo.created_at)
      let date = (receivetime.getFullYear()) + '年' + (receivetime.getMonth() + 1) + '月' + receivetime.getDate() + '日'
      return date
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
    }
  }
}
</script>

<style>

</style>
