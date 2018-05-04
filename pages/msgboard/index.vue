<template>
  <el-card>
    <div id="comment"></div>
  </el-card>
</template>

<script>
export default {
  name: 'msgBoard',
  data () {
    return {
      title: '留言板',
      config: {
        el: '#comment',
        appId: 'IPaxqVkJmuKokzsJq6Rk19Ip-gzGzoHsz',
        appKey: '5ptbUUUdeAPHbmP47feUujYY',
        region: 'cn',
        notify: true, 
        verify: true, 
        placeholder: '留下您的宝贵意见~',
        // path: window.location.pathname,
        guest_info: ['nick', 'mail'],
        avatar: '',
        pageSize: 10,
        lang: 'zh-cn'
      }
    }
  },
  head () {
    return {
      title: this.title,
      script: [
        { src: '//cdn1.lncld.net/static/js/3.0.4/av-min.js' },
        // { src: '//unpkg.com/valine/dist/Valine.min.js' },
        { src: '/Valine.min.js' },
      ]
    }
  },
  components: {
    // Valine
  },
  mounted () {
    let valine = new Valine()
    valine.init(this.config)
    // if (!this.$store.state.valine) {
    //   console.log('before Valine')
    //   valine.init(this.config)
    //   console.log('after Valine')
    //   this.$store.commit('SET_VALINE', true)
    // }
  },
  methods: {

  },
}
</script>

<style>

</style>
