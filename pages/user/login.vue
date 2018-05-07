<template>
  <el-row>
    <el-col :xs="{span:24}" :md="{span:8, offset:8}">
      <user-login/>
    </el-col>
  </el-row>
</template>

<script>
import UserLogin from '~/components/user/UserLogin'

export default {
  components: {
    UserLogin
  }
}
</script>

<style>

</style>
