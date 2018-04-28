<template>
  <el-menu default-active="1" class="el-menu-demo" mode="horizontal" :router='router'>
    <el-menu-item v-for="menuItem in menuItems" :key="menuItem.name" :index="menuItem.index">
      {{ menuItem.name }}
    </el-menu-item>

    <el-menu-item v-if="$store.state.access_token" index="/user" style="float:right"> {{ username }} </el-menu-item>
    <template v-else>
      <el-menu-item index="/user/register" style="float:right"> 注册 </el-menu-item>
      <el-menu-item index="/" style="float:right"> 登录 </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'MainHeader',
  data () {
    return {
      username: 'LRQ',
      router: true,
      menuItems: [
        {
          name: '交通违章一站式处理',
          index: '/'
        },
        {
          name: '交规宣传栏',
          index: '/'
        },
        {
          name: '违章信息查询',
          index: '/search/illegal'
        },
        {
          name: '机动车业务',
          index: '/'
        },
        {
          name: '驾驶证业务',
          index: '/'
        },
        {
          name: '在线留言',
          index: '/'
        }
      ]
    }
  },
  mounted () {
    this.$store.getters.getStorage
  }
}
</script>

<style>

</style>
