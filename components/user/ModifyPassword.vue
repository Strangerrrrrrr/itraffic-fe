<template>
  <div>
    <el-form :model="ruleForm" ref="ruleForm" label-position="left" label-width="130px" size="small">
      <el-form-item label="输入新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="重新输入新密码" prop="checkpass">
          <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button @click="submitForm('ruleForm')">
                修改
          </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
        password: '',
        checkPass: '',
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
  mounted () {
  },
  methods: {
    submitForm (formName) {
        let self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.modifyPassword()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      modifyPassword () {
        let self = this
        this.$axios.setToken(this.$store.state.access_token, 'Bearer')
        this.$axios.post('/api/users/pass', this.ruleForm)
        .then(function(res){
          self.$message.success('修改成功！')
        })
        .catch(function(e){
          console.log(e)
          let errors = e.response.data.errors
          let message = ''
          console.log(errors)
          for (let e in errors) {
            for (let i=0; i < errors[e].length; i++) {
              message += errors[e][i] + '\n'
            }
          }
          self.$message({
              showClose: true,
              message: message,
              type: 'error'
          });
        })
      }
    }
}
</script>

<style>

</style>