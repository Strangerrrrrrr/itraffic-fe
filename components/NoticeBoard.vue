<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>系统公告</span>
    </div>
    <div>
      <vue-time/>
      <br>
      系统公告,你好呀！
    </div>
  </el-card>
</template>

<script>
import VueTime from 'vue-time'
export default {
  name: 'NoticeBoard',
  components: {
    VueTime
  }
}
</script>

<style>

</style>
