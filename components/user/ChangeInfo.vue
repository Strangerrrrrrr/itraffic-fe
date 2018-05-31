<template>
  <div>
    <el-form label-position="left" label-width="130px" size="small">
      <el-form-item label="姓名">
        <el-tag>{{ changeInfo.name }}</el-tag>
      </el-form-item>
      <el-form-item label="身份证">
        <el-tag>{{ changeInfo.identity }}</el-tag> 
      </el-form-item>
      <el-form-item label="准驾车型">
        <el-tag>{{ changeInfo.vehicle_type }}</el-tag>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-tag>{{ changeInfo.phone }}</el-tag>
      </el-form-item>
      <el-form-item label="编号">
        <el-tag>{{ changeInfo.id }}</el-tag>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          type="textarea"
          disabled=""
          style="width: 400px"
          :autosize="{ minRows: 4, maxRows: 4}"
          placeholder="请输入内容"
          v-model="prompt">
        </el-input>
          
      </el-form-item>
    </el-form>

  </div>
</template>

<script>

export default {
  data () {
    return {
      changeInfo: '',
      prompt: "请申请换证的用户牢记自己的编号并尽快持自己有效证件前往上海市第一人民医院进行体检，在体检后的三个工作日内可自行前往当地车管所或是选择邮寄的方式取得自己新的驾驶证！"
    }
  },
  middleware: 'auth',
  mounted () {
    this.changeshow()
  },
  methods: {
    changeshow () {
      let self = this
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.get('/api/change/show')
      .then(function(res){
          self.changeInfo = res.data
          console.log(self.changeInfo)
      })
    },
  }
}
</script>

<style>

</style>