<template>
  <div class="footer">
    <hr>
    <div class="copyright">
      <span> 陆冉钦 </span>
      <i class="fas fa-cloud"></i>
      {{ copyright }}
      <hr>
      <span @click="goToTheme">{{ theme }}</span>
      <hr>
    </div>
    <div class="link">
      <span v-for="(link, key) in links" :key="key">
        <el-tooltip  class="item" effect="light" :content="link.label" placement="top">
          <a class="link-item" :style="{color: link.color, borderColor: link.color}" :href="link.href" target="_blank">
            <i :class="link.icon"></i>
          </a>
        </el-tooltip>
      </span>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'MainFooter',
  data () {
    return {
      copyright: '交通违章一站式处理',
      theme: 'Element-Theme-Ink',
      links: {
        github: {
          color: 'black',
          icon: 'fab fa-github',
          label: 'GitHub 项目代码',
          href: 'https://github.com/YunYouJun/element-theme-ink'
        },
        weibo: {
          color: '#DB2828',
          icon: 'fab fa-weibo',
          label: '微博：机智的云游君',
          href: 'http://weibo.com/jizhideyunyoujun'
        },
        email: {
          color: '#409EFF',
          icon: 'fas fa-envelope',
          label: '邮箱：me@yunyoujun.cn',
          href: 'mailto:me@yunyoujun.cn'
        },
        blog: {
          color: '#6435C9',
          icon: 'fas fa-globe',
          label: '博客：yunyoujun.cn',
          href: 'http://www.yunyoujun.cn'
        }
      }
    }
  },
  components: {
    
  },
  methods: {
    goToTheme () {
      let href = "https://ink.yunyoujun.cn"
      window.open(href, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.copyright {
  margin-top: 5px;
  margin-bottom: 5px;
}
h4 {
  font-weight: normal;
}
.footer {
  text-align: center;
}
.link-item {
  display: inline-block;
  font-size: 1rem;
  color: #000;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: 1px solid #000;
  border-radius: 2rem;
  transition: .3s;
  align-content: center;
  line-height: 2rem;
  border-radius: 2rem;
  margin: 5px;
  width: 2rem;
  &:hover {
    transform: scale(1.2);
    color: #fff !important;
    border-color: black !important;
    background-color: #000;
    text-shadow: 0px 0px 1px #000;
  }
}
</style>