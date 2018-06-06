<template>
   <el-card>
    <div slot="header" class="clearfix">
      <span>业务须知</span>
    </div>
    <div>
      （1）申请人可在机动车检验有效期满前3个月内提出申请。<br>
      （2）在检验机动车前，申请人应处理完毕该机动车所有交通违法行为和交通事故。<br>
      （3）机动车检验时应携带机动车驾驶证，车主身份证。<br>
      （4）申请人应在预约的时间准时进行车辆安全检查。<br>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['saveStatus'],
  data () {
    return {
      version: '',
      active: 0,
      title: '机动车业务'
    }
  },
  head () {
    return {
      title: this.title,
    }
  },
  components: {
    
  },
  mounted () {
    this.$store.commit('SET_CANSUBMIT', true)
    if (!this.$store.state.access_token) {
      this.prompt()
    }
  },
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'getStorage',
      // ...
    ])
  },
  methods: {
    prompt () {
      if (this.$store.state.tempInfo) {
        this.$message({
          showClose: true,
          type: 'error',
          message: this.$store.state.tempInfo
        })
        this.$store.commit('SET_TEMP_INFO', '')
      }
    },
  },
  watch: {
    '$store.state.tempInfo': 'prompt'
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
