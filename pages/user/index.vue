<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-tabs type="border-card" tab-position="left">
          <el-tab-pane label="基本信息">
            <user-info></user-info>
          </el-tab-pane>
          <el-tab-pane label="驾驶证信息">
            
          </el-tab-pane>
          <el-tab-pane label="行驶证信息">
            
          </el-tab-pane>
          <el-tab-pane label="修改密码">
            
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UserInfo from '~/components/user/UserInfo'

export default {
  data () {
    return {
      // userInfo: {
      //   pass: false
      // }
    }
  },
  components: {
    UserInfo
  }
}
</script>

<style>

</style>
