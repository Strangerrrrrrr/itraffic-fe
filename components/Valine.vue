<template>
  <div id="comment"></div>
</template>

<script>
// if (process.BROWSER_BUILD) {
  // require('external_library')
  // const Valine = require('valine/dist/Valine.min.js')
// }
// import Valine from 'valine/dist/Valine.min.js'

export default {
  name: 'Valine',
  mounted () {
    if (process.BROWSER_BUILD) {
      require('external_library')
    }
    const Valine = require('valine/dist/Valine.min.js')
    
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
  }
}
</script>

<style>

</style>
