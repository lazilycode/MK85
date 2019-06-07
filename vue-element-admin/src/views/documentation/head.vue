<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-button type="success" size="small">保存</el-button>
        <el-button type="primary" size="small">批量设置</el-button>
        <el-button size="small" @click="refresh">刷新</el-button>
        <span v-for="(item,index) in box" :key="index">
          <button class="box" :style="{ backgroundColor: item.bgColor}" />
          <span>{{ item.name }}</span>
        </span>
      </el-col>

      <el-col :span="8">
        <div>
          {{ date }}
          <i class="el-icon-arrow-left" @click="previouWeek" />
          <el-date-picker
            v-model="date"
            type="week"
            format="yyyy 第 WW 周"
            value-format="yyyy-MM-dd"
            placeholder="选择周"
          />
          <i class="el-icon-arrow-right" @click="nextWeek" />
        </div>

      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      date: '2018-07-01',
      box: [{ name: '待上课', bgColor: '#00bbff' }, { name: '休息日', bgColor: '#ffffc4' }, { name: '被选择', bgColor: '#00af45' }]
    }
  },
  watch: {
    date: function() {
      console.log(90)
    }
  },
  methods: {
    // 当前日期加七天
    AddDays(date, days) {
      var nd = new Date(date)
      nd = nd.valueOf()
      nd = nd + days * 24 * 60 * 60 * 1000
      nd = new Date(nd)
      var y = nd.getFullYear()
      var m = nd.getMonth() + 1
      var d = nd.getDate()
      if (m <= 9) m = '0' + m
      if (d <= 9) d = '0' + d
      var cdate = y + '-' + m + '-' + d
      return cdate
    },

    // 上一周
    previouWeek() {
      this.date = this.AddDays(this.date, -7)
    },

    // 下一周
    nextWeek() {
      this.date = this.AddDays(this.date, 7)
    },

    // 刷新
    refresh() {

    }
    //
  }
}
</script>
