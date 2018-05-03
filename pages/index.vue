<template>
  <div>
    <el-row :gutter="20">
      <el-col :md="{span: 18}" :xs="{span: 24}">
        <public-board/>
      </el-col>
      <el-col :md="{span: 6}" :xs="{span: 24}">
        <notice-board/>
        <user-login/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AppLogo from '~/components/AppLogo.vue'
import NoticeBoard from '~/components/NoticeBoard.vue'
import PublicBoard from '~/components/PublicBoard.vue'

import UserLogin from '~/components/user/UserLogin.vue'


export default {
  data () {
    return {
      version: '',
      title: '主页 | 交通违章一站式处理'
    }
  },
  head () {
    return {
      title: this.title,
    }
  },
  components: {
    AppLogo,
    NoticeBoard,
    PublicBoard,
    UserLogin
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
