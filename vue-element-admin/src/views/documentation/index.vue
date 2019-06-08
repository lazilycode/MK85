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
          <el-date-picker v-model="date" type="week" format="yyyy 第 WW 周" value-format="yyyy-MM-dd" placeholder="选择周" />
          <i class="el-icon-arrow-right" @click="nextWeek" />
        </div>
      </el-col>
    </el-row>
    <Body v-if="ish" ref="Bc" :events="isEdit" :now-time="date" />
  </div>
</template>
<script>
import axios from 'axios'
import Body from './body'
export default {
  components: {
    Body
  },
  data() {
    return {
      ish: true,
      date: this.AddDays(new Date(), 0),
      box: [{ name: '待上课', bgColor: '#00bbff' }, { name: '休息日', bgColor: '#ffffc4' }, { name: '被选择', bgColor: '#00af45' }],
      isEdits: [
        {
          title: 'simple event',
          start: '2019-07-05 08:00',
          // rendering: 'background',
          // color: '#fcf8e3',
          className: 'blue'
        },
        {
          className: 'green',
          title: 'simple event',
          start: '2019-07-04 08:00'
        },
        {
          className: 'rest',
          title: 'event with URL',
          start: '2019-07-06 08:00',
          // rendering: 'background'
          color: '#f5d31e'
        },
        {
          className: 'rest',
          title: 'event with URL',
          start: '2019-07-07 08:00',
          end: '2019-07-07 08:30',
          // rendering: 'background'
          color: '#f5d31e'
        }
      ],
      isEdit: []
    }
  },
  watch: {
    date: function() {
      this.$refs.Bc.previouWeek(this.date)
    }
  },
  created() {
    this.dataXhr()
  },
  methods: {
    dataXhr() {
      const that = this
      axios.get('http://111.231.94.121:3000/mock/19/demo/demo')
        .then(function(response) {
          that.ish = false
          that.$nextTick(() => {
            that.ish = true
          })
          that.isEdit = response.data
          console.log(response.data)
        })
    },

    dataXhrs() {
      const that = this
      axios.get('http://111.231.94.121:3000/mock/19/demo/demo_1559952423271')
        .then(function(response) {
          that.ish = false
          that.$nextTick(() => {
            that.ish = true
          })
          that.isEdit = response.data
          console.log(response.data)
        })
    },

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
      this.$refs.Bc.previouWeek(this.date)
    },

    // 下一周
    nextWeek() {
      this.dataXhrs()
      this.date = this.AddDays(this.date, 7)
      this.$refs.Bc.previouWeek(this.date)
    },

    // 刷新
    refresh() {

    }
    //
  }
}
</script>

<style lang='scss'>
.head .headRow {
    padding: 2px 0px;
    color: #ffffff;
    font-size: 13px;
    font-weight: 400;
}

button.box {
    pointer-events: none;
    margin: 0px 2px 0px 21px;
    width: 10px;
    height: 15px;
    background-color: rgb(0, 187, 255);
    border:none;
}
.el-icon-arrow-left,.el-icon-arrow-right{
    cursor: pointer;
}

</style>

