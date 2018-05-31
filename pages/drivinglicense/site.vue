<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>选择地点</span>
    </div>
    <div>
      <br>
      <el-form :rules="rules" ref="ruleForm" :model="checkInfo">
        <el-form-item label="选择城市" prop="region">
          <el-select v-model="checkInfo.region" placeholder="请选择报考城市" @change="getExamCenterInfo">
            <el-option 
            v-for="provinceItem in province"
            :key="provinceItem.abbr" 
            :label="provinceItem.name"
            :value="provinceItem.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择地点" prop="exam_room">
          <el-select v-model="checkInfo.exam_room" placeholder="请选择考点">
            <el-option
              v-for="(item, key) in examCenterInfo"
              :key="key"
              :label="item.exam_room"
              :value="item.exam_room">
            </el-option>
          </el-select>  
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
export default {
   data() {
    return {
      checkInfo: {
        region: '',
        exam_room: ''
      },
      examCenterInfo: '',
      province: [
        {
          name: '北京',
          abbr: '京'
        },
        {
          name: '天津',
          abbr: '津'
        },
        {
          name: '上海',
          abbr: '沪'
        },
        {
          name: '江苏',
          abbr: '苏'
        },
      ],
      rules: {
        region: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        exam_room: [
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
    getExamCenterInfo () {
      let self = this
      let searchForm = {
        region: this.checkInfo.region
      }
      this.$axios.post('/api/examcenter/search', searchForm)
      .then(function(res){
        self.examCenterInfo = res.data
      })
    },
    storeCheck () {
      let self = this
      this.checkInfo.id = this.checkId
      console.log(this.checkInfo)
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.post('/api/check/storeSiteInfo', this.checkInfo)
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
