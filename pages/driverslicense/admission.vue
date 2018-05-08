<template>
  <el-row>
    <el-col :xs='{span: 24}' :md='{span: 8, offset: 8}'>
      <el-card>
        <el-form label-position="left" label-width="100px" v-model="examInfo">
            <h3 style="text-align: center">准考证</h3><br>
            <el-form-item label="考生姓名：">
              {{ userInfo.real_name }}
            </el-form-item>
            <el-form-item label="证件号码：">
              {{ userInfo.identity }}
            </el-form-item>
            <el-form-item label="考试地点：">
              {{ AdInfo.exam_room }}
            </el-form-item>
            <el-form-item label="考试机号：">
              {{ AdInfo.id }}
            </el-form-item>
            <el-form-item label="考试时间：" ><span>9：00</span>
            </el-form-item>
            <el-form-item label="考试日期：">
              {{ examdate() }}
            </el-form-item>
            <el-form-item label="报考科目："> 科目一      
            </el-form-item>
            <el-form-item label="备注：">
             <span>请考生自行打印该准考证并于考试当天携带此准考证以及身份证前往报名的地点参加机动车科目一考试。考试开始时间为上午9：00整，8：45方可入场，超过考试时间15分钟后视为自动放弃考试。</span>
            </el-form-item>
            
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      dlInfo: '',
      AdInfo: '',
      userInfo: '',
      value: '',
      examInfo: {
        region: '',
        exam_room: ''
      },
      examCenterInfo: '',
      province: [
        {
          name: '北京',
          abbr: '京'
        },
        {
          name: '天津',
          abbr: '津'
        },
        {
          name: '上海',
          abbr: '沪'
        },
      ]
    }
  },
  middleware: 'auth',
  mounted () {
    this.getUserInfo()
    this.dlshow()
    this.getAdInfo()
  },
  methods: {
    getExamCenterInfo () {
      let self = this
      let searchForm = {
        region: this.examInfo.region
      }
      this.$axios.post('/api/examcenter/search', searchForm)
      .then(function(res){
        self.examCenterInfo = res.data
        self.examInfo.exam_room = res.data[0]
      })
    },
    onBook () {

    },
    getUserInfo (){
      let self = this
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.get('/api/user')
      .then(function(res){
        self.userInfo = res.data
        if (self.userInfo.name) {
          self.$store.commit('SET_USERNAME', self.userInfo.name)
        }
      })
    },
    dlshow () {
      let self = this
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.get('/api/driverslicense/show')
      .then(function(res){
        self.dlInfo = res.data
      })
    },
    getAdInfo(){
      let self = this
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.get('/api/admission/show')
      .then(function(res){
        self.AdInfo = res.data
      })
    },
    examdate () {
      let examdate = new Date(this.AdInfo.bookdate)
      let date = (examdate.getFullYear()) + '年' + (examdate.getMonth() + 1) + '月' + examdate.getDate() + '日'
      return date
    },
},

}
</script>

<style>

</style>