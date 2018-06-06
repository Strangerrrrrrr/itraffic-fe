<template>
 <div>
   <template v-if="checkInfos!==[]">
    <el-row :gutter="20">
      <el-col :span="8" v-for="checkInfo in checkInfos" :key="checkInfo.id">
        <el-card>
          <el-form label-position="left" label-width="100px">
              <h3 style="text-align: center">我的预约</h3><br>
              <el-form-item label="姓名：">
                {{ checkInfo.name }}
              </el-form-item>
              <el-form-item label="车牌：">
                {{ checkInfo.license }}
              </el-form-item>
              <el-form-item label="类型：">
                {{ checkInfo.type }}
              </el-form-item>
              <el-form-item label="日期：">
                {{ checkInfo.book_date }}
              </el-form-item>
              <el-form-item label="时间：">
                <template v-if="checkInfo.book_time==='am'">
                  9：00-12：00
                </template>
                <template v-else-if="checkInfo.book_time==='pm'">
                  13：00-16：00
                </template>
              </el-form-item>
              <el-form-item label="地区：">
                {{ checkInfo.region }}
              </el-form-item>
              <el-form-item label="地点：">
                {{ checkInfo.exam_room }}
              </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
   </template>
   <template v-else>
      您当前没有预约任何安检~
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkInfos: [],
      userInfo: '',
    }
  },
  mounted () {
    this.getCheckInfo()
  },
  methods: {
    getCheckInfo(){
      let self = this
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.get('/api/check/showAll')
      .then(function(res){
        if (res.data) {
          self.checkInfos = res.data
        }
      })
    },
  },

}
</script>

<style>

</style>