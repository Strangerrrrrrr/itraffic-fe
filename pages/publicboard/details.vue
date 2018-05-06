<template>
  <el-card>
    <div slot="header">
        <span>{{ item.title }}</span>
    </div>
    <div class="text item" v-for="(item, key) in newsInfo.data" :key="key">
        <i class="fas fa-info-circle"></i>
        <a href="">
          {{ item.title }}
          <span style="float:right;"> {{ item.created_at }} </span>
        </a>
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
    this.getNewsInfo()
  },
  methods: {
    getNewsInfo () {
      let self = this
      this.$axios.get('/api/publicboard/show')
      .then(function(res){
        self.newsInfo = res.data
      })
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