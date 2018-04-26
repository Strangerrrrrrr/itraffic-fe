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
import AppLogo from '~/components/AppLogo.vue'
import NoticeBoard from '~/components/NoticeBoard.vue'
import PublicBoard from '~/components/PublicBoard.vue'

import UserLogin from '~/components/user/UserLogin.vue'

export default {
  components: {
    AppLogo,
    NoticeBoard,
    PublicBoard,
    UserLogin
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
