<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>系统公告</span>
    </div>
    <div>
      <vue-time/>
      <br>
      这是一个交通违章一站式处理系统，目标是为广大车主用户提供一个能够快速处理违章记录的平台。请多多关注，多多支持！
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
