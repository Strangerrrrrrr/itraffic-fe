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
            <modify-password></modify-password>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UserInfo from '~/components/user/UserInfo'
import ModifyPassword from '~/components/user/ModifyPassword'
export default {
  data () {
    return {
      // userInfo: {
      //   pass: false
      // }
    }
  },
  components: {
    UserInfo,
    ModifyPassword
  }
}
</script>

<style>

</style>
