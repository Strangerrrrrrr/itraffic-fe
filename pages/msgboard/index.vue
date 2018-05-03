<template>
  <el-card>
    <!-- <valine></valine> -->
    <div id="comment"></div>
  </el-card>
</template>

<script>
// import Valine from '~/components/Valine.vue'

export default {
  name: 'msgBoard',
  data () {
    return {
      title: '留言板'
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ],
      // script: [
      //   // { src: '//cdn1.lncld.net/static/js/3.0.4/av-min.js' },
      //   // { src: '//unpkg.com/valine/dist/Valine.min.js' },
      // ]
    }
  },
  components: {
    // Valine
  },
  mounted () {
    // this.$nextTick(function(){
      // if (process.BROWSER_BUILD) {
        console.log('before Valine')
        // const Valine = require('valine/dist/Valine.min.js')
        new Valine()({
          el: '#comment',
          appId: 'IPaxqVkJmuKokzsJq6Rk19Ip-gzGzoHsz',
          appKey: '5ptbUUUdeAPHbmP47feUujYY',
          region: 'cn',
          notify: true, 
          verify: true, 
          placeholder: '留下您的宝贵意见~',
          path: window.location.pathname, 
          avatar: '',
          pageSize: 10,
          lang: 'zh-cn'
        })
        console.log('after Valine')
      // }
    // })
  }
}
</script>

<style>

</style>
