<template>
  <div>
    Valine
    <div id="comment"></div>
  </div>
</template>

<script>
export default {
  name: 'Valine',
  mounted () {
    this.$nextTick(function(){
      if (process.BROWSER_BUILD) {
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
      }
    })
  }
}
</script>

<style>

</style>
