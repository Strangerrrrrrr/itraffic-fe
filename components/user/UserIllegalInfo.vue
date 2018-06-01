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

        <!-- <template v-if="complain.status==='未申诉'"> -->
          <el-form-item label="状态">
            <el-tag color="#fff"> {{ illegalItem.status }}</el-tag>
          </el-form-item>
        <!-- </template> -->


        <template v-if="complain.status==='申诉中'">
          <el-form-item label="申诉状况">
            <el-tag> {{ complain.status }}</el-tag>
          </el-form-item>
        </template>
        <template v-else-if="complain.status==='申诉失败'">
          <el-form-item label="申诉状况">
            <el-tag type="danger"> {{ complain.status }}</el-tag>
          </el-form-item>
          <el-form-item label="失败原因">
            <el-card style="margin: 0px">{{ complain.response }}</el-card>
          </el-form-item>

          <el-form-item>
            <el-button plain @click="IKnow">
                我知道了
              </el-button>
          </el-form-item>
        </template>
        <template v-else-if="complain.status==='申诉成功'">
          <el-form-item label="申诉状况">
            <el-tag type="success"> {{ complain.status }}</el-tag>
          </el-form-item>
        </template>
        <template v-else>
          <template v-if="!isConfirm && illegalItem.status==='待确认'">
            <el-form-item>
              <el-button plain name="submit" title="确认违章" @click="onConfirm">
                确认
              </el-button>
              <el-button plain @click="onComplain">
                申诉
              </el-button>
            </el-form-item>
          </template>
        </template>
        
      <template v-if="isConfirm">
          <el-card>
            <img class="pay_image" :src="prefix + illegalItem.pay_image">
          </el-card>
      </template>

      <template v-if="isComplain">
        <user-complain :illegalInfoId="illegalItem.id" :status="illegalItem.status"></user-complain>
      </template>

    </el-form>
  </el-card>
</template>

<script>
import UserComplain from '~/components/user/UserComplain.vue'

export default {
  props: ['userInfo', 'illegalItem'],
  data () {
    return {
      prefix: 'http://localhost:8000/uploads/',
      isComplain: false,
      isConfirm: false,
      complain: {
        response: '',
        status: '',
      }
    }
  },
  components: {
    UserComplain
  },
  mounted () {
    this.getComplainStatus()
  },
  methods: {
    IKnow () {
      let self = this
      this.$axios.delete('api/complain/' + this.complain.id)
      .then(function(res){
        console.log(res.data)
        self.complain = ''
        self.isComplain = false
        self.isConfirm = false
      })
    },
    onComplain (val) {
      this.isComplain= true
    },
    onConfirm () {
      if (this.userInfo.status=="已认证") {
        this.isConfirm = true
        console.log('pay confirm')
        let self  = this
        this.$axios.get('api/illegal/pay?id=' + this.illegalItem.id)
        .then(function(res){
          self.illegalItem.status='待付款'
        })

        this.$axios.get('api/driverslicense/deduct?grade=' + this.illegalItem.illegal_code.deduction)
        .then(function(res){
          self.$message.success('已确认违章，并扣除' + self.illegalItem.illegal_code.deduction + '分！')
        })
      } else {
        this.$message({
            showClose: true,
            message: '请先进行实名认证！',
            type: 'warning'
        });
      }
    },
    getComplainStatus () {
      let self = this
      this.$axios.get('api/complain/show?illegal_info_id=' + this.illegalItem.id)
      .then(function(res){
        self.complain = res.data
        console.log(res.data)
      })
    }
  }
}
</script>

<style scoped>
.pay_image {
  width: 100%;
  display: block;
}
</style>
