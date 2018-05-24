<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8" v-for="dlInfo in dlInfos" :key="dlInfo.id">
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  methods: {
  }
}
</script>

<style>

</style>