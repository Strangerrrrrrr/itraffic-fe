<template>
  <div>
    <el-card>
      <el-input placeholder="请输入发动机号后六位" v-model="engineID" prefix-icon="el-icon-info">
        <template slot="prepend"></template>
      </el-input>
      <el-input placeholder="请输入车牌号" v-model="license" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="城市简称">
          <el-option v-for="provinceItem in province" :key="provinceItem.abbr" :label="provinceItem.name + ' (' + provinceItem.abbr + ')'" :value="provinceItem.abbr"></el-option>
        </el-select>
        <el-button type="primary" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-card>

    <h4 class="text-center">
      <span v-if="isIllegal">违章信息 x 条</span>
      <span v-else>没有违章信息</span>
    </h4>

    <el-row :gutter="20">
      <el-col :span="8" v-for="(illegalItem, key) in illegalInfo" :key="key">
        <el-card>
          <el-form ref="form" size="mini" label-width="80px" :model="illegalItem">
            <div slot="header" class="clearfix">
              <span>违章记录</span>
            </div>

            <template>
              <el-form-item label="车牌号码">
                <el-tag> {{ illegalItem.license }}</el-tag>
              </el-form-item>
              <el-form-item label="发动机号">
                <el-tag> {{ illegalItem.engineID }}</el-tag>
              </el-form-item>
              <el-form-item label="时间">
                <el-tag> {{ illegalItem.time }}</el-tag>
              </el-form-item>
              <el-form-item label="地点">
                <el-tag> {{ illegalItem.location }}</el-tag>
              </el-form-item>
              <el-form-item label="违章代码">
                <el-tag> {{ illegalItem.code }}</el-tag>
              </el-form-item>
              <el-form-item label="描述">
                <el-tag> {{ illegalItem.description }}</el-tag>
              </el-form-item>
              <el-form-item label="扣分">
                <el-tag> {{ illegalItem.deduction }} 分</el-tag>
              </el-form-item>
              <el-form-item label="罚款">
                <el-tag> {{ illegalItem.fine }} 元</el-tag>
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
      isIllegal: true,
      license: '',
      engineID: '',
      select: '',
      illegalInfo: [
        {
          license: '川A7D1E2',
          engineID: '521263',
          time: '2018-02-25 09:34:12',
          location: '沈海高速3374公里',
          code: '1001',
          description: '机动车违反禁止标线指示',
          deduction: '2',
          fine: '100'
        },
        {
          license: '川A7D1E2',
          engineID: '521263',
          time: '2018-02-25 09:34:12',
          location: '沈海高速3374公里',
          code: '1001',
          description: '机动车违反禁止标线指示',
          deduction: '2',
          fine: '100'
        },
        {
          license: '川A7D1E2',
          engineID: '521263',
          time: '2018-02-25 09:34:12',
          location: '沈海高速3374公里',
          code: '1001',
          description: '机动车违反禁止标线指示',
          deduction: '2',
          fine: '100'
        }
      ],
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
