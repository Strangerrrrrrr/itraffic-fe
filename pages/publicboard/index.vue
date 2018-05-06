<template>
  <el-card>
    <div slot="header">
      <span>交规宣传栏</span>
    </div>
    <div class="text item" v-for="item in newsInfo.data" :key="item.id">
      <i class="fas fa-info-circle"></i>
      <a :href="'/news?id=' + item.id">
        {{ item.title }}
        <span style="float:right;"> {{ item.created_at }} </span>
      </a>
    </div>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :total="newsInfo.total"
        :current-page="newsInfo.current_page"
        :page-size="newsInfo.per_page"
        @current-change="handleCurrentChange"
        @prev-click="prev"
        @next-click="next"
        >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'PublicBoard',
  data () {
    return {
      newsInfo: '',
    }
  },
  mounted(){
    this.getNewsInfo(1)
  },
  methods: {
    getNewsInfo (page) {
      let self = this
      this.$axios.get('/api/publicboard/show?page=' + page)
      .then(function(res){
        self.newsInfo = res.data
      })
    },
    handleCurrentChange (page) {
      this.getNewsInfo(page)
    },
    prev () {
      if (this.newsInfo.prev_page_url) {
        this.getNewsInfo(this.newsInfo.prev_page_url[this.newsInfo.prev_page_url.length-1])
      }
    },
    next () {
      if (this.newsInfo.next_page_url) {
        this.getNewsInfo(this.newsInfo.next_page_url[this.newsInfo.next_page_url.length-1])
      }
    }
  },
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