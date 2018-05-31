<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>基本信息</span>
    </div>
    <div>
      <br>
      <el-form  :rules="rules" ref="ruleForm" :model="checkInfo">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="checkInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="车牌" prop="license">
          <el-input v-model="checkInfo.license"></el-input>
        </el-form-item>
          <el-form-item label="车辆类型" prop="type">
            <el-select v-model="checkInfo.type" placeholder="请选择车辆类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Region',
   data() {
      return {
        checkInfo:{
          name:'',
          license:'',
          type:''
        },
        options: [{
          value: '小型车',
          label: '小型车'
        },
        {
          value: '中型车',
          label: '中型车'
        },
        {
          value: '挂车',
          label: '挂车'
        }],
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          license: [
            { required: true, message: '请选择活动区域', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择type', trigger: 'blur' }
          ],
        }
      }
    },
  props: ['saveStatus', 'checkId'],
  watch: {
    saveStatus () {
      if (this.saveStatus===true) {
        this.submitForm('ruleForm')
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.commit('SET_CANSUBMIT', true)
          this.$emit('nextStep')
          this.storeCheck()
        } else {
          this.$emit('resetSaveStatus')
          this.$store.commit('SET_CANSUBMIT', false)
          return false
        }
      })
    },
    storeCheck () {
      let self = this
      this.checkInfo.id = this.checkId
      console.log(this.checkInfo)
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.post('/api/check/storeBasicInfo', this.checkInfo)
      .then(function(res){
        self.$message.success('成功预约！')
      })
      .catch(function(e){
        self.$message.error('预约失败！')
      })
    }
  }
}
</script>

<style>

</style>