<template>
  <el-card>
    <div slot="header">
        <span>交规宣传栏</span>
        <el-button style="float: right; padding: 3px 0" type="text"  @click="onLook">更多 &gt;&gt;&gt;</el-button>
    </div>
    <div class="text item" v-for="(item, key) in newsInfo.data" :key="key">
        <i class="fas fa-info-circle"></i>
        <a :href="'/news?id='+item.id">
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
    },
    onLook () {
      this.$router.push({path:'/publicboard'})
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