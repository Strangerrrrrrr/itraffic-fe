<template>
  <el-card>
    <div slot="header">
        <span>交规宣传栏</span>
        <el-button style="float: right; padding: 3px 0" type="text"><a href=""> 更多 &gt;&gt;&gt; </a></el-button>
    </div>
    <!-- <div class="text item" v-for="(newsItem, key) in news" :key="key">
        <i class="fas fa-info-circle"></i>
        <a href="">
          {{ newsItem.title }}
          <span style="float:right;"> {{ newsItem.date }} </span>
        </a>
    </div> -->
    <div class="text item" v-for="n in 10" :key="n">
        <i class="fas fa-info-circle"></i>
        <a href="">
          你好呀~
          <span style="float:right;"> 2017-08-09 </span>
        </a>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'PublicBoard',
  data () {
    return {
      news: [
        {
          link: '',
          title: 'LRQ',
          content: 'nihaonihao',
          date: '2017-08-09'
        },
        {
          link: '',
          title: 'LRQ',
          content: 'nihaonihao',
          date: '2017-08-09'
        }
      ]
    }
  }
}
</script>

<style scoped>

.text {
    font-size: 16px;
  }

.item {
  margin-bottom: 18px;
}

</style>