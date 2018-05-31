<template>
  <el-row>
    <el-card>
      <template v-if="dlInfo">
        <el-form label-position="left" label-width="100px" v-model="dlInfo">
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
            <el-form-item label="家庭住址" prop="address">
              <el-input v-model="dlInfo.address"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button plain name="submit" @click="onSubmit">
                修改
              </el-button> 
              <el-button plain name="submit" @click="onChange">
                预约换证
              </el-button>
              <el-button plain name="submit" @click="onConfirm">
                预约考试
              </el-button>  
            </el-form-item>
        </el-form>
      </template>
      <template v-else>
      <h3>您当前还没有驾驶证，暂时无法为您提供服务哦~</h3>
      </template>
    </el-card>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      dlInfo: '',
      title: '驾驶证'
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
      let deadline = new Date(this.dlInfo.updated_at)
      let date = (deadline.getFullYear() + this.dlInfo.effective_time) + '年' + (deadline.getMonth() + 1) + '月' + deadline.getDate() + '日'
      return date
    },
    updatetime () {
      let updatetime = new Date(this.dlInfo.updated_at)
      let date = (updatetime.getFullYear()) + '年' + (updatetime.getMonth() + 1) + '月' + updatetime.getDate() +'日'
      return date
    },
    onConfirm () {
      let self = this
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.get('/api/admission/show')
      .then(function(res){
        if(!res.data) {
          self.$router.push({path:'/driverslicense/confirm'})
        } else {
          self.$message.warning('你当前已有预约信息，请前往个人中心查看！')
        }
      })
    },
    onChange () {
      this.$router.push({path:'/driverslicense/change'})
    }
  }
}
</script>

<style>

</style>
