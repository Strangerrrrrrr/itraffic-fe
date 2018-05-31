<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>选择考点</span>
    </div>
    <div>
      <br>
      <el-form>
        <el-form-item label="预约城市" prop="region">
              <el-select v-model="examInfo.region" placeholder="请选择报考城市" @change="getExamCenterInfo">
                <el-option 
                v-for="provinceItem in province"
                :key="provinceItem.abbr" 
                :label="provinceItem.name"
                :value="provinceItem.name">
                </el-option>
              </el-select>
        </el-form-item>
        <el-form-item label="预约场地">
              <el-select v-model="examInfo.exam_room" placeholder="请选择考点">
                <el-option
                  v-for="(item, key) in examCenterInfo"
                  :key="key"
                  :label="item.exam_room"
                  :value="item.exam_room">
                </el-option>
              </el-select>  
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Time',
   data() {
      return {
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
        {
          name: '江苏',
          abbr: '苏'
        },
      ],
        selectTime: ''
      }
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
    }
  }
}
</script>

<style>

</style>