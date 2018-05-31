<template>
  <el-row>
    <el-col :xs='{span: 24}' :md='{span: 8, offset: 8}'>
      <el-card>
        <el-form label-position="left" label-width="100px" v-model="checkInfo">
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
            <el-form-item label="备注：">
             <span>请用户牢记自己预约信息于当日持身份证、驾驶证、行驶证等有效证件至预约的地点进行车辆安检。</span>
            </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ['saveStatus', 'checkId'],
  data () {
    return {
      checkInfo: {},
      userInfo: '',
    }
  },
  middleware: 'auth',
  mounted () {
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
  },

}
</script>

<style>

</style>