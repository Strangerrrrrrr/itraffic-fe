<template>
  <el-card>
    <div slot="header" class="text-center">
      <h3>{{ news.title }}</h3>
      <hr>
      <span>作者：{{ news.author }}</span>
      &nbsp;
      &nbsp;
      <span>发布于：{{ news.created_at }}</span>
    </div>
    <div>
      <p v-html="news.content">
      </p>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'PublicBoard',
  data () {
    return {
      news: {
        title: '标题',
        author: '匿名',
        content: '内容',
        created_at: '2018-08-09',
      },
    }
  },
  mounted(){
    this.getNews(this.$route.query.id)
  },
  methods: {
    getNews (id) {
      let self = this
      this.$axios.get('/api/news?id=' + id)
      .then(function(res){
        self.news = res.data
      })
    }
  },
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>