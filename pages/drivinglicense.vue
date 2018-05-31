<template>
  <div>
    <el-steps :active="curStep" finish-status="success">
      <el-step title="业务须知"></el-step>
      <el-step title="基本信息"></el-step>
      <el-step title="选择时间"></el-step>
      <el-step title="选择地点"></el-step>
      <el-step title="确认预约"></el-step>
      <el-step title="完成预约"></el-step>
    </el-steps>
    <nuxt-child :checkId="checkId" :saveStatus="saveStatus" @resetSaveStatus="resetSaveStatus" @nextStep="nextStep"></nuxt-child>
    <hr>
    <el-button v-if="curStep!==0 && curStep!==(steps.length-1)" @click="prevStep">上一步</el-button>
    <el-button v-if="curStep!==(steps.length-1)" @click="nextStep">下一步</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      steps: ['', 'region', 'time','site','confirm','finish'],
      curStep: 0,
      saveStatus: false,
      checkId: '',
      nextDisabled: false,
    }
  },
  methods: {
    prevStep () {
      this.curStep--
      let path = '/drivinglicense/' + this.steps[this.curStep]
      this.$router.push({path})
    },
    nextStep () {
      this.saveStatus = true

      if (this.curStep === 0) {
        this.getCheckId()
      }

      if (this.$store.state.canSubmit) {
        this.curStep++
        let path = '/drivinglicense/' + this.steps[this.curStep]
        this.$router.push({path})
      } else {
        // this.$message.error('当前信息未填写完整!')
      }
    },
    resetSaveStatus () {
      this.saveStatus = false
      // this.nextDisabled = true
      this.$store.commit('SET_CANSUBMIT', false)
    },
    getCheckId () {
      let self = this
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.post('/api/check/store')
      .then(function(res){
        self.checkId = res.data
        console.log(self.checkId)
      })
    }
  },
  watch: {
    curStep () {
      setTimeout(this.resetSaveStatus,100)
    }
  }
}
</script>

<style>

</style>
