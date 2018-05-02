<template>
  <el-row>
    <el-card>
      <el-form label-position="left" label-width="80px" v-model="dlInfo">
          <el-form-item label="姓名" prop="name">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="车牌号" prop="plateID">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="发动机号" prop="engineID">
            <el-input></el-input>
          </el-form-item>
          <el-form-item>
            <el-button plain name="submit" @click="onSubmit">
              绑定车辆
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
      dllInfo: ''
    }
  },
  mounted () {
    this.dllshow()
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
    }
  }
}
</script>

<style>

</style>