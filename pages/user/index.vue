<template>
  <div>
    <el-row class="tac">
  <el-col :span="12">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <span>查看个人信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="origin">个人基本信息</el-menu-item>
          <el-menu-item index="1-2" @click="dlinfo">驾驶证信息</el-menu-item>
          <el-menu-item index="1-1" @click="dllinfo">行驶证信息</el-menu-item>
          <el-menu-item index="1-2" @click="password">修改密码</el-menu-item>
        </el-menu-item-group>
       </el-submenu>
    </el-menu>
  </el-col>
    </el-row>
  </div>
</template>

<script>

</script>

<style>

</style>