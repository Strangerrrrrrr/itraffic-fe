<template>
  <div>
    <el-card>
      <el-form ref="searchForm" :model="searchForm">
      <el-input placeholder="请输入发动机号后六位" v-model="searchForm.engineID" prefix-icon="el-icon-info">
        <template slot="prepend"></template>
      </el-input>
      <el-input placeholder="请输入车牌号" v-model="searchForm.licenseNum" class="input-with-select">
        <el-select v-model="selectProvince" slot="prepend" placeholder="城市简称">
          <el-option v-for="provinceItem in province" :key="provinceItem.abbr" :label="provinceItem.name + ' (' + provinceItem.abbr + ')'" :value="provinceItem.abbr"></el-option>
        </el-select>
        <el-button type="primary" slot="append" icon="el-icon-search" @click="onSubmit"></el-button>
      </el-input>
      </el-form>
    </el-card>

    <h4 class="text-center">
      <span v-if="my_illegal_infos!=0">我的违章信息 {{ my_illegal_infos.length }} 条</span>
      <span v-else></span>
    </h4>

    <el-row :gutter="20">
      <el-col :span="8" v-for="(illegalItem, key) in my_illegal_infos" :key="key">
        <template v-if="illegalItem">
        <el-card>
          <el-form ref="form" size="mini" label-width="80px" :model="illegalItem">
            <div slot="header" class="clearfix">
              <span>违章记录</span>
            </div>

            <template>
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
                <el-button plain name="submit">
                  确认
                </el-button>
                <el-button plain>
                  申诉
                </el-button>
              </el-form-item>
            </template>

          </el-form>
        </el-card>
        </template>
      </el-col>

      <h4 class="text-center">
        <span v-if="illegal_infos!=0">违章信息 {{ illegal_infos.length }} 条</span>
        <span v-else></span>
      </h4>

      <el-col :span="8" v-for="(illegalItem, key) in illegal_infos" :key="key">
        <el-card>
          <el-form ref="form" size="mini" label-width="80px" :model="illegalItem">
            <div slot="header" class="clearfix">
              <span>违章记录</span>
            </div>

            <template>
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
                <el-button plain name="submit">
                  确认
                </el-button>
                <el-button plain>
                  申诉
                </el-button>
              </el-form-item>
            </template>

          </el-form>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'illegalInfo',
  data () {
    return {
      data: '',
      drivingLicenseInfos: '',
      selectProvince: '',
      searchForm: {
        licenseNum: '',
        engineID: '',
      },
      illegal_infos: [],
      my_illegal_infos: [],
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
          name: '重庆',
          abbr: '渝'
        },
        {
          name: '河北',
          abbr: '豫'
        },
        {
          name: '云南',
          abbr: '云'
        },
        {
          name: '辽宁',
          abbr: '辽'
        },
        {
          name: '黑龙江',
          abbr: '黑'
        },
        {
          name: '湖南',
          abbr: '湘'
        },
        {
          name: '安徽',
          abbr: '皖'
        },
        {
          name: '山东',
          abbr: '鲁'
        },
        {
          name: '新疆',
          abbr: '新'
        }, 
        {
          name: '江苏',
          abbr: '苏'
        }, 
        {
          name: '浙江',
          abbr: '浙'
        }, 
        {
          name: '江西',
          abbr: '赣'
        }, 
        {
          name: '湖北',
          abbr: '鄂'
        }, 
        {
          name: '广西',
          abbr: '桂'
        }, 
        {
          name: '甘肃',
          abbr: '甘'
        },
        {
          name: '山西',
          abbr: '晋'
        },
        {
          name: '内蒙古',
          abbr: '蒙'
        },
        {
          name: '陕西',
          abbr: '陕'
        },
        {
          name: '吉林',
          abbr: '吉'
        },
        {
          name: '福建',
          abbr: '闽'
        },
        {
          name: '贵州',
          abbr: '贵'
        },
        {
          name: '广东',
          abbr: '粤'
        },
        {
          name: '青海',
          abbr: '青'
        },
        {
          name: '西藏',
          abbr: '藏'
        },
        {
          name: '四川',
          abbr: '川'
        },
        {
          name: '宁夏',
          abbr: '宁'
        },
        {
          name: '海南',
          abbr: '琼'
        }
      ]
    }
  },
  mounted () {
    if (this.$store.state.access_token) {
      this.getMyInfo()
    }
  },
  methods: {
    onSubmit () {
      let self = this
      this.searchForm.license = this.selectProvince + this.searchForm.licenseNum
      this.searchIllegalInfo(this.searchForm).then(function(res){
        self.illegal_infos = res
      })
      this.my_illegal_infos = []
    },
    async searchIllegalInfo (searchForm) {
      let self = this
      return this.$axios.post('/api/illegal/search', searchForm)
      .then(function(res){
        if (res.data.illegal_infos) {
          self.data = res.data.illegal_infos
          self.$message({
            message: '查询成功',
            type: 'success'
          });
        }
        return self.data
      })
    },
    async getMyInfo () {
      let self = this
      this.$axios.setToken(this.$store.state.access_token, 'Bearer')
      this.$axios.get('/api/drivinglicense/show')
        .then(function(res){
        self.drivingLicenseInfos = res.data
        for (let i=0; i < self.drivingLicenseInfos.length; i++) {
          let illegalInfos = self.searchIllegalInfo(self.drivingLicenseInfos[i])
          illegalInfos.then(function(res){
            for (let j=0; j < res.length; j++) {
              self.my_illegal_infos.push(res[j])
            }
          })

        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input {
  margin-top: 5px;
  margin-bottom: 5px;
}
.el-select {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
