<template>
  <el-card>
    <div slot="header" class="clearfix">
        <span v-if="$store.state.access_token">用户信息</span>
        <span v-else>用户登录</span>
    </div>
    <el-form ref="loginForm" label-position="left" label-width="80px" size="small" :model="loginForm" :rules="rules">

      <template v-if="$store.state.access_token">
        <el-form-item label="当前用户">
            <el-tag>lrq</el-tag>
        </el-form-item>
        <el-form-item label="姓名">
            <el-tag>陆冉钦</el-tag>
        </el-form-item>
        <el-form-item label="联系方式">
            <el-tag>13301611706</el-tag>
        </el-form-item>
        <el-form-item label="身份证号">
            <el-tag>320585199601081616</el-tag>
        </el-form-item>
        <el-form-item>
            <el-button plain @click="Logout"> 注销 </el-button>
            <el-button plain > 修改信息 </el-button>
        </el-form-item>
      </template>

      <template v-else>
        <el-form-item label="用户名" prop="name">
          <el-input id="name" name="name" v-model="loginForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input id="password" name="password" type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain name="submit" @click="onSubmit">
            登陆
          </el-button>
          <el-button plain name="register" @click="onRegister">
            注册
          </el-button>
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
      loginForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    onRegister () {
      this.$router.push({path:'/user/register'})
    },
    onSubmit () {
      let self = this
      this.$refs['loginForm'].validate((valid) => {
        if (!valid) {
          console.log('error submit!!');
          return false;
        } else {
          this.$axios.$post('/api/authorizations', this.loginForm)
          .then(function(res){
            if (res.access_token) {
              self.$message({
                message: '登陆成功',
                type: 'success'
              });
              self.$axios.setToken(res.access_token, 'Bearer')
              self.$store.commit('SET_ACCESS_TOKEN', res.access_token)
            }
          })
          .catch(function(e){
            let errors = e.response.data.errors
            let message = ''
            console.log(errors)
            for (let e in errors) {
              for (let i=0; i < errors[e].length; i++) {
                message += errors[e][i] + '\n'
              }
            }
            self.$message({
                message: message,
                type: 'error'
            });
          })
        }
      });
    },
    Logout () {
      this.$axios.$delete('/api/authorizations/current')
      .then(function(res){
        self.$message({
          message: '注销成功',
          type: 'success'
        });
      })
      this.$axios.setToken(false)
      this.$store.commit('SET_ACCESS_TOKEN', null)
    }
  }
}
</script>

<style>

</style>
