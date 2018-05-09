<template>
  <div>
    <el-form label-position="left" label-width="130px" size="small">
      <el-form-item label="姓名">
              <el-tag id="name" name="name">{{ dlInfo.	real_name }}</el-tag>
            </el-form-item>
            <el-form-item label="身份证">
              <el-tag>{{ dlInfo.identity }}</el-tag> 
            </el-form-item>
            <el-form-item label="车牌号">
              <el-tag>{{ dlInfo.license }}</el-tag>
            </el-form-item>
            <el-form-item label="发动机号">
              <el-tag>{{ dlInfo.grade }}</el-tag>         
            </el-form-item>
            <el-form-item label="车架号">
              <el-tag>{{ dlInfo.grade }}</el-tag>         
            </el-form-item>
            <el-form-item label="注册时间">
              <el-tag>{{ dlInfo.grade }}</el-tag>         
            </el-form-item>
            <el-form-item label="安检情况">
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
      this.$axios.get('/api/drivinglicense/show')
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
  }
}
</script>

<style>

</style>
