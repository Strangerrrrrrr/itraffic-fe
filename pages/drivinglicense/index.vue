<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="业务须知"></el-step>
      <el-step title="基本信息"></el-step>
      <el-step title="选择时间"></el-step>
      <el-step title="选择地点"></el-step>
      <el-step title="确认预约"></el-step>
      <el-step title="完成预约"></el-step>
    </el-steps>
    <notice></notice>
    <region></region>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
</template>

<script>
import Notice from '~/components/drivinglicense/Notice.vue'
import Region from '~/components/drivinglicense/Region.vue'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      version: '',
      active: 0
    }
  },
  head () {
    return {
      title: this.title,
    }
  },
  components: {
    Notice,
    Region
  },
  mounted () {
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
    next() {
        if (this.active++ > 6) this.active = 0;
      }
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
