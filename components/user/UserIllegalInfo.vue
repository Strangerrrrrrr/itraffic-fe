<template>
  <el-card>
    <el-form ref="form" size="mini" label-width="80px" :model="illegalItem">
      <div slot="header" class="clearfix">
        <span>违章记录</span>
      </div>

        <el-form-item label="时间">
          <el-tag> {{ illegalItem.created_at }}</el-tag>
        </el-form-item>
        <el-form-item label="车牌号码">
          <el-tag color="#fff"> {{ illegalItem.license }}</el-tag>
        </el-form-item>
        <el-form-item label="发动机号">
          <el-tag color="#fff"> {{ illegalItem.engineID }}</el-tag>
        </el-form-item>
        <el-form-item label="地点">
          <el-tag type="info"> {{ illegalItem.location }}</el-tag>
        </el-form-item>
        <el-form-item label="违章代码">
          <el-tag type="warning"> {{ illegalItem.illegal_id }}</el-tag>
        </el-form-item>
        <el-form-item label="扣分">
          <el-tag type="danger"> {{ illegalItem.illegal_code.deduction }} 分</el-tag>
        </el-form-item>
        <el-form-item label="罚款">
          <el-tag type="danger"> {{ illegalItem.illegal_code.fine }} 元</el-tag>
        </el-form-item>
        <el-form-item label="描述">
          <el-card style="margin: 0px">{{ illegalItem.illegal_code.description }}</el-card>
        </el-form-item>
          <el-form-item label="状态">
          <el-tag color="#fff"> {{ illegalItem.status }}</el-tag>
        </el-form-item>
        <el-form-item>
          <el-button plain name="submit" title="确认违章">
            确认
          </el-button>
          <el-button plain @click="onComplain">
            申诉
          </el-button>
        </el-form-item>

      <template v-if="isComplain">
        <user-complain></user-complain>
      </template>

    </el-form>
  </el-card>
</template>

<script>
import UserComplain from '~/components/user/UserComplain.vue'

export default {
  props: ['illegalItem'],
  data () {
    return {
      isComplain: false,
    }
  },
  components: {
    UserComplain
  },
  methods: {
    onComplain (val) {
      this.isComplain= true
    },
  }
}
</script>

<style>

</style>
