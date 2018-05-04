<template>
  <div>
    <el-card>
      <el-row>
        <el-col :xs="24" :md="{span: 16, offset: 4}">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
              <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="real_name">
              <el-input type="text" v-model="ruleForm.real_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="identity">
              <el-input type="text" v-model="ruleForm.identity" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
              <el-input type="text" v-model="ruleForm.phone" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
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
          name: '',
          password: '',
          checkPass: '',
          real_name: '',
          identity: '',
          phone: '',
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
    methods: {
      submitForm (formName) {
        let self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.register()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields();
      },
      register () {
        let self = this
        this.$axios.post('/api/users', this.ruleForm)
        .then(function(res){
          self.$router.push({path: '/'})
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
