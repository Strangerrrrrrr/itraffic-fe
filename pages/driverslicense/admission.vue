<template>
  <el-row>
    <el-col :xs='{span: 24}' :md='{span: 8, offset: 8}'>
      <el-card>
        <el-form label-position="left" label-width="100px" v-model="examInfo">
            <el-form-item label="考生姓名：">
              {{ userInfo.real_name }}
            </el-form-item>
            <el-form-item label="证件号码：">
              {{ userInfo.identity }}
            </el-form-item>
            <el-form-item label="考试地点：">
              {{ userInfo.phone }}
            </el-form-item>
            <el-form-item label="考试机号：">
              {{ dlInfo.vehicle_type }}
            </el-form-item>
            <el-form-item label="考试时间：" 
                v-model="booktime"
                type="date"
                placeholder="选择日期"
                value-format="timestamp"
                :disabled='true'>
              {{ booktime }}           
            </el-form-item>
            <el-form-item label="考试日期">
              <el-date-picker
                v-model="booktime"
                type="date"
                placeholder="选择日期"
                value-format="timestamp"
                :disabled='true'>
              </el-date-picker>        
            </el-form-item>
            <el-form-item label="备注">
              <el-select v-model="examInfo.region" placeholder="请选择报考城市" @change="getExamCenterInfo">
                <el-option 
                v-for="provinceItem in province"
                :key="provinceItem.abbr" 
                :label="provinceItem.name"
                :value="provinceItem.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="examInfo.exam_room" placeholder="请选择考点">
                <el-option
                  v-for="(item, key) in examCenterInfo"
                  :key="key"
                  :label="item.exam_room"
                  :value="item.id">
                </el-option>
              </el-select>  
            </el-form-item>
            <el-form-item label="报考科目">
              <el-tag>科目一</el-tag>         
            </el-form-item>   
             <el-form-item>
            <el-button plain name="submit" @click="onBook">
              确认信息
            </el-button> 
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
    }
  },
  computed: {
    booktime () {
      let now = new Date()
      let day = now.getDay()
      let curDate = now.getDate()
      if (day == 0) {
        day = 7
      }

      let gap = 7 - day + 3
      let bookDate = curDate + gap
      let booktime = now.setDate(bookDate)
      return booktime
    },
  }
}
</script>

<style>

</style>