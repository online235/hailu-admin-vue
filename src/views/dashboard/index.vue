<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <div v-if="this.cityCodeName != '' && this.cityCodeName != null">当前账号关联的城市为：{{ cityCodeName }}</div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { cityCodeName } from '@/api/dashboard'
import { getCityCode } from '@/utils/auth'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      cityCodeName: '', // 城市名称
      cityCode: '' // 城市名称
    }
  },
  created() {
    this.cityCodeNameLoad() // 加载城市名称
  },
  methods: {
    cityCodeNameLoad() {
      const params = new URLSearchParams()
      this.cityCode = getCityCode()
      if (this.cityCode !== undefined) {
        params.append('code', getCityCode())
        cityCodeName(params).then(res => {
          if (res.code === 200) {
            this.cityCodeName = res.data
            console.log(this.cityCodeName)
          }
        }).catch(res => {
          this.$message.error('服务器有点累了！查询城市失败')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
