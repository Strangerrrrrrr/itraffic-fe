<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>选择时间</span>
    </div>
    <div>
      <br>
      <el-form>
        <el-form-item label="选择日期" prop="date">
          <div class="block">
            <el-date-picker
              v-model="dateValue"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="选择时段" prop="time">
          <el-select v-model="selectTime" placeholder="请选择">
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
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
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
        },
        dateValue: '',
        timeOptions: [
          {
            value: 'am',
            label: '上午 9:00 - 12:00'
          },
          {
            value: 'pm',
            label: '下午 13:00 - 16:00'
          }
        ],
        selectTime: ''
      }
    }
}
</script>

<style>

</style>