<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>选择时间</span>
    </div>
    <div>
      <br>
      <el-form :rules="rules" ref="ruleForm" :model="checkInfo">
        <el-form-item label="选择日期" prop="book_date">
          <div class="block">
            <el-date-picker
              v-model="checkInfo.book_date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="选择时段" prop="book_time">
          <el-select v-model="checkInfo.book_time" placeholder="请选择">
            <el-option
              v-for="item in timeOptions"
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
  name: 'Time',
   data() {
      return {
        checkInfo: {
          book_date: '',
          book_time: ''
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
        },
        timeOptions: [
          {
            value: 'am',
            label: '上午 9:00 - 12:00'
          },
          {
            value: 'pm',
            label: '下午 13:00 - 16:00'
          }
        ],
        rules: {
          book_date: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          book_time: [
            { required: true, message: '请选择活动区域', trigger: 'blur' }
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
          console.log('error')
          this.$emit('resetSaveStatus')
          this.$store.commit('SET_CANSUBMIT', false)
          return false
        }
      })
    },
    storeCheck () {
      let self = this
      this.checkInfo.id = this.checkId
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.post('/api/check/storeTimeInfo', this.checkInfo)
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