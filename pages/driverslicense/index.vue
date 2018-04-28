<template>
  <el-card>
    <el-form label-position="left" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input id="name" name="name"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input id="name" name="name" placeholder="test"></el-input> 
          <!-- 文本提示 -->
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input id="name" name="name" v-model="dlInfo.identity"></el-input>
        </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      dlInfo: ''
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
        self.dlInfo = res.data
      })
    }
  }
}
</script>

<style>

</style>
