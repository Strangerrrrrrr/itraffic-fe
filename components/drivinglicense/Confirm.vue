<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>基本信息</span>
    </div>
    <div>
      <br>
      <el-form>
      <el-form-item label="姓名" prop="name">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="车牌" prop="license">
        <el-input></el-input>
      </el-form-item>
        <el-form-item label="车辆类型" prop="type">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
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
  name: 'Region',
   data() {
      return {
        options: [{
          value: '选项1',
          label: '小型汽车'
        },
        {
          value: '选项2',
          label: '大型汽车'
        },
        {
          value: '选项3',
          label: '挂车'
        }],
        value: ''
      }
    }
}
</script>

<style>

</style>