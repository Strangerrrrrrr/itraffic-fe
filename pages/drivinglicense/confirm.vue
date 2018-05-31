<template>
  <el-row>
    <el-col :xs='{span: 24}' :md='{span: 8, offset: 8}'>
      <el-card>
        <el-form label-position="left" label-width="100px" v-model="checkInfo">
            <h3 style="text-align: center">确认预约信息</h3><br>
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
            <el-form-item label="备注：">
             <span>请确认自己的信息是否准确，若无误则点击下一步。</span>
            </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ['saveStatus', 'checkId'],
  watch: {
    saveStatus () {
      if (this.saveStatus===true) {
        this.storeCheck()
      }
    }
  },
  data () {
    return {
      checkInfo: {
        finish:''
      },
      userInfo: '',
    }
  },
  middleware: 'auth',
  mounted () {
    this.$store.commit('SET_CANSUBMIT', true)
    this.getCheckInfo()
  },
  methods: {
    getCheckInfo(){
      let self = this
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.get('/api/check/show' + '?id=' + this.checkId)
      .then(function(res){
        self.checkInfo = res.data
      })
    },
    storeCheck () {
      let self = this
      this.checkInfo.id = this.checkId
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.post('/api/check/storeFinishInfo', this.checkInfo)
      .then(function(res){
        self.$message.success('成功预约！')
      })
      .catch(function(e){
        self.$message.error('预约失败！')
      })
    }
},

}
</script>

<style>

</style>