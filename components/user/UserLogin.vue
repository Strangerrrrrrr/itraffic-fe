<template>
  <el-card>
    <div slot="header" class="clearfix">
        <span>用户登录</span>
    </div>
    <el-form ref="form" label-position="left" label-width="60px" size="small">

      <template v-if="isLogin">
        <el-form-item label="用户名">
          <el-input id="username" name="username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input id="pwd" name="pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain name="submit">
            登陆
          </el-button>
          <el-button plain name="register" @click="onRegister">
            注册
          </el-button>
        </el-form-item>
      </template>

      <template v-else>
        <el-form-item label="当前用户">
            <el-tag>lrq</el-tag>
        </el-form-item>
        <el-form-item label="真实姓名">
            <el-tag>陆冉钦</el-tag>
        </el-form-item>
        <el-form-item label="牌照">
            <el-tag>沪CJ665</el-tag>
        </el-form-item>
        <el-form-item label="剩余分数">
            <el-tag>12</el-tag>
        </el-form-item>
        <el-form-item label="身份证号">
            <el-tag>320585199601081616</el-tag>
        </el-form-item>
        <el-form-item>
            <el-button plain > 注销 </el-button>
            <el-button plain > 具体信息 </el-button>
        </el-form-item>
      </template>

    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'UserLogin',
  data () {
    return {
      isLogin: true
    }
  },
  methods: {
    onRegister () {
      this.$router.push({path:'/user/register'})
    }
  }
}
</script>

<style>

</style>
