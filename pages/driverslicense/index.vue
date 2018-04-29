<template>
  <el-card>
    <el-form label-position="left" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-tag id="name" name="name">{{dlInfo.	real_name}}</el-tag>
        </el-form-item>
        <el-form-item label="身份证" prop="identity">
          <el-tag id="name" name="name" placeholder="test">{{dlInfo.identity}}</el-tag> 
        </el-form-item>
        <el-form-item label="准驾车型" prop="vehicle_type">
          <el-tag id="name" name="name" v-model="dlInfo.identity">{{dlInfo.vehicle_type}}</el-tag>
        </el-form-item>
        <el-form-item label="领证日期" prop="created_at">
          <el-tag id="name" name="name">{{dlInfo.created_at}}</el-tag>
        </el-form-item>
        <el-form-item label="更新时间" prop="updated_at">
          <el-tag id="name" name="name">{{dlInfo.updated_at}}</el-tag>
        </el-form-item>
        <el-form-item label="家庭住址" prop="address">
          <el-input id="name" name="name" v-model="dlInfo.address"></el-input>
           <el-button plain name="submit" @click="onSubmit">
                  修改
           </el-button>
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
