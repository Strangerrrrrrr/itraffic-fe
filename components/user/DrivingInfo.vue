<template>
  <div>
    <template v-if="dlInfos!==[]">
      <el-row :gutter="20">
        <el-col :span="8" v-for="dlInfo in dlInfos" :key="dlInfo.id">
          <el-card>
            <el-form label-position="left" label-width="130px" size="small">
              <el-form-item label="姓名">
                <el-tag>{{ dlInfo.real_name }}</el-tag>
              </el-form-item>
              <el-form-item label="身份证">
                <el-tag>{{ dlInfo.identity }}</el-tag> 
              </el-form-item>
              <el-form-item label="车牌号">
                <el-tag>{{ dlInfo.license }}</el-tag>
              </el-form-item>
              <el-form-item label="发动机号">
                <el-tag>{{ dlInfo.engineID }}</el-tag>         
              </el-form-item>
              <el-form-item label="车架号">
                <el-tag>{{ dlInfo.vin }}</el-tag>         
              </el-form-item>
              <el-form-item label="注册时间">
                <el-tag>{{ dlInfo.register_time }}</el-tag>         
              </el-form-item>
              <el-form-item label="安检情况">
                <el-tag v-if="dlInfo.safe_check==0">未通过</el-tag> 
                <el-tag v-else>已通过</el-tag>           
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
     </template>
    <template v-else>
      您当前没有绑定行驶证~
    </template>
  </div>
</template>

<script>

export default {
  data () {
    return {
      dlInfos: [],
    }
  },
  mounted () {
    if (this.$store.state.access_token) {
      this.dlshow()
    }
  },
  methods: {
    dlshow () {
      let self = this
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.get('api/drivinglicense/show')
      .then(function(res){
        if (res.data) {
          self.dlInfos = res.data
        } 
      })
    },
  }
}
</script>

<style>

</style>
