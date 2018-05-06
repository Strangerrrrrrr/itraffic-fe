<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router='router'>
    <el-menu-item v-for="menuItem in menuItems" :key="menuItem.name" :index="menuItem.index">
      {{ menuItem.name }}
    </el-menu-item>

    <el-menu-item v-if="$store.state.username!=''" index="/user" style="float:right"> {{ $store.state.username }} </el-menu-item>
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
      router: true,
      menuItems: [
        {
          name: '交通违章一站式处理',
          index: '/',
        },
        {
          name: '交规宣传栏',
          index: '/publicboard'
        },
        {
          name: '违章信息查询',
          index: '/search/illegal'
        },
        {
          name: '机动车业务',
          index: '/drivinglicense'
        },
        {
          name: '驾驶证业务',
          index: '/driverslicense'
        },
        {
          name: '在线留言',
          index: '/msgboard'
        }
      ]
    }
  },
  mounted () {
    this.$store.getters.getStorage
    if (this.$store.state.tempInfo) {
      this.active = '/'
    }
  },
  computed: {
    activeIndex () {
      return this.$route.path
    }
  },
  methods: {
    
  },
  watch: {
    '$route' (to, from) {
      if (from.path != '/msgboard' && to.path == '/msgboard') {
        this.$router.go(0)
      }
    }
  }
}
</script>

<style>

</style>
