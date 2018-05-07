<template>
  <div>
    <el-form label-position="left" label-width="130px" size="small">
      <el-form-item label="当前用户">
          <el-tag>{{ userInfo.name }}</el-tag>
      </el-form-item>
      <el-form-item label="姓名">
          <el-tag>{{ userInfo.real_name }}</el-tag>
      </el-form-item>
      <el-form-item label="联系方式">
          <el-tag>{{ userInfo.phone }}</el-tag>
      </el-form-item>
      <el-form-item label="身份证号">
          <el-tag>{{ userInfo.identity }}</el-tag>
      </el-form-item>
      <el-form-item label="实名认证">
        <template v-if="userInfo.status=='未认证'">
          <el-tag type="danger"> 未认证 </el-tag>
          &nbsp;
          <el-button plain @click="onConfirm"> 去认证 </el-button>
        </template>
        <template v-else>
          <el-tag> {{ userInfo.status }} </el-tag>
        </template>
      </el-form-item>
      <el-form-item>
          <el-button plain @click="Logout"> 注销 </el-button>
          <el-button plain > 修改信息 </el-button>
      </el-form-item>
    </el-form>

    <template v-if="isConfirm">
      <confirm-real-name></confirm-real-name>
    </template>
  </div>
</template>

<script>
import ConfirmRealName from '~/components/user/ConfirmRealName'

export default {
  data () {
    return {
      userInfo: '',
      isConfirm: false,
    }
  },
  components: {
    ConfirmRealName
  },
  mounted () {
    if (this.$store.state.access_token) {
      this.getUserInfo()
    }
  },
  methods: {
    Logout () {
      let self = this
      this.$axios.$delete('/api/authorizations/current')
      .then(function(res){
        self.$message({
          showClose: true,
          message: '注销成功',
          type: 'success'
        });
      })
      this.$axios.setToken(false)
      this.$store.commit('SET_ACCESS_TOKEN', '')
      this.$store.commit('SET_USERNAME', '')
      this.$store.commit('SET_USER_ID', '')

      this.$router.push({path: '/'})
    },
    getUserInfo (){
      let self = this
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.get('/api/user')
      .then(function(res){
        self.userInfo = res.data
        if (self.userInfo.name) {
          self.$store.commit('SET_USERNAME', self.userInfo.name)
          self.$store.commit('SET_USER_ID', self.userInfo.id)
        }
      })
    },
    onConfirm () {
      this.isConfirm = true
    }
  }
}
</script>

<style>

</style>
