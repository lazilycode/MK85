<template>
  <div>
    <el-date-picker
      v-model="value3"
      type="week"
      format="yyyy 第 WW 周"
      value-format="yyyy-MM-dd"
      placeholder="选择周"
      :picker-options="{ firstDayOfWeek: 1}"
      :clearable="false"
      @change="changeWeek"
    />
    {{ value3 }}
    <table id="customers">
      <tr>
        <th class="headr_row">
          <!-- <span class="headCureent_text" @click="fist"> ddd</span> -->
          <el-dropdown>
            <span class="el-dropdown-link">
              常规时间<i class="el-icon-s-unfold el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="changeTime(1,'常规时间')">常规时间</el-dropdown-item>
              <el-dropdown-item @click.native="changeTime(2,'全部时间')">全部时间</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </th>
        <th v-for=" (item,index) in headWeek" :key="index" class="headr_row">
          <div class="headCureent_text">
            <span :class="{'headCureent':item.current}">
              {{ item.day }}
            </span>
            <span>{{ item.week }}</span>
          </div>

        </th>
      </tr>
      <tr v-for="(row,rowindex) in arr" :key="rowindex" :class="{ 'classRestTime': row.start=='12:00'||row.start=='17:50'}">
        <td>
          <div>
            {{ row.start }}-{{ row.end }}
          </div>
        </td>

        <td
          v-for=" (item, index) in row.chaild"
          :key="index"
          @click="eventClick(item,$event)"
        >
          <div v-for="(ite, ind) in daArr" :key="ind">
            <a v-if="timeRange(row.start,row.end,ite.start)&&item.date===ite.day" slot="reference" :class="{ 'class-a': ite.className}" :style="{bottom:-ite.bottomHeight+'px',top:ite.topHeight+'px',backgroundColor: ite.Bg}" @click="markClick(ite,$event)"> {{ ite.title }}</a>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { formatDate, getMonDate, getDayName, time_range } from './uts'
// import { debounce } from '@/utils'
export default {
  data() {
    return {
      value3: '',
      nowDate: new Date(),
      arr: [],
      headWeek: [],
      config: {
        minTime: '07:00',
        maxTime: '26:00',
        slotDuration: '40'
      },

      daArr: [
        // {
        //   html: '<span>sdjcbniunciuejnce<span>',
        //   startDay: '2019-07-30 11:00',
        //   endDay: '2019-07-30 15:00',
        //   day: '2019-07-30',
        //   start: '11:00',
        //   title: 35521253,
        //   Bg:'red',
        //   className: 'demo'
        // },
        {
          html: '<span>sdjcbniunciuejnce<span>',
          startDay: '2019-08-15 11:45',
          endDay: '2019-08-15 16:55',
          title: 3552125312121,
          Bg: '#74a8fb',
          className: 'demo'
        },
        {
          html: '<span>sdjcbniunciuejnce<span>',
          startDay: '2019-08-01 07:40',
          endDay: '2019-08-01 08:20',
          title: 35521253,
          Bg: 'red',
          className: 'demo'
        }
        // {
        //   html: '<span>sdjcbniunciuejnce<span>',
        //  startDay: '2019-07-30 11:00',
        //   endDay: '2019-07-30 15:00',
        //   day: '2019-07-30',
        //   start: '11:30',
        //   title: 353,
        //   className: 'demo'
        // }
      ]
    }
  },
  mounted() {
    // 数据校验
    this.dataTr()
    this.headerTable(this.nowDate)
    this.sunDayWeek(this.nowDate)
    this.changeWeek()
    // this.timesection()
  },
  methods: {

    count(b, a) {
      // 每个高度为30px
      var date1 = new Date(b)
      var date2 = new Date(a)
      const topHeight = ((date2.getTime() / 1000 / 60) % parseInt(this.config.slotDuration)) / parseInt(this.config.slotDuration) * 30
      const bottomHeight = (date1.getTime() - date2.getTime()) / (1000 * 60) / parseInt(this.config.slotDuration) * 30 - topHeight
      return { bottomHeight, topHeight }
    },

    dataTr() {
      if (!this.config.minTime && !this.config.maxTime && !this.config.slotDuration) {
        this.config.minTime = '00:00'
        this.config.maxTime = '26:00'
        this.config.slotDuration = '30'
      }
      this.daArr.map((item, index) => {
        item.bottomHeight = this.count(item.endDay, item.startDay).bottomHeight
        item.topHeight = this.count(item.endDay, item.startDay).topHeight
        item.day = formatDate(item.startDay, 'YYYY-MM-DD')
        item.start = formatDate(item.startDay, 'hh:mm')
      })
    },

    sunDayWeek(e, r) {
      const arr = []
      const next = (parseInt(this.config.maxTime.slice(0, 2)) - parseInt(this.config.minTime.slice(0, 2))) * 2
      for (let i = 0; i < next; i++) {
        const arrTime = []
        const timeStart =	(new Date(formatDate(e, 'YYYY-MM-DD') + ' ' + this.config.minTime).getTime() / 1000 +	i * parseInt(this.config.slotDuration) * 60) * 1000
        const timeEnd = (new Date(formatDate(e, 'YYYY-MM-DD') + ' ' + this.config.minTime).getTime() / 1000 +	(i + 1) * parseInt(this.config.slotDuration) * 60) *	1000
        this.headWeek.map(item => {
          const startTimes = (new Date(formatDate(item.date + ' ' + this.config.minTime, 'YYYY-MM-DD') + ' ' + this.config.minTime).getTime() / 1000 +	(i) * parseInt(this.config.slotDuration) * 60) * 1000
          const endTimes = (new Date(formatDate(item.date + ' ' + this.config.minTime, 'YYYY-MM-DD') + ' ' + this.config.minTime).getTime() / 1000 +	(i + 1) * parseInt(this.config.slotDuration) * 60) * 1000
          item.startTime = formatDate(new Date(startTimes), 'YYYY-MM-DD hh:mm')
          item.endTime = formatDate(new Date(endTimes), 'YYYY-MM-DD hh:mm')
          arrTime.push({ startTime: item.startTime, endTime: item.endTime, date: formatDate(new Date(item.startTime), 'YYYY-MM-DD') })
        })
        arr.push({
          chaild: arrTime,
          startDate: formatDate(new Date(timeStart), 'YYYY-MM-DD hh:mm'),
          endDate: formatDate(new Date(timeEnd), 'YYYY-MM-DD hh:mm'),
          start: formatDate(new Date(timeStart), 'hh:mm'),
          end: formatDate(new Date(timeEnd), 'hh:mm')
        })
      }
      this.arr = arr
    },

    // table 表格头部
    headerTable(e) {
      const d = getMonDate(e)
      const arr = []
      for (var i = 0; i < 7; i++) {
        const nowData = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
        arr.push({
          day: formatDate(nowData, 'DD'),
          date: formatDate(nowData, 'YYYY-MM-DD'),
          week: getDayName(d.getDay()).week,
          current: getDayName(d.getDay()).current
        })
        d.setDate(d.getDate() + 1)
      }
      this.headWeek = arr
    },

    dataTreating() {
      // 初始化
      // const dataArr = []
      if (!this.config.minTime && !this.config.maxTime) {
        this.startTime = '00:00'
        this.endTime = '24:00'
      }
    },

    // 较长的日期按时间段分割
    timesection() {
      this.daArr.forEach((item, index) => {
        // 获取秒除以时间间隔
        let mistiming = new Date(item.endDay).getTime() - new Date(item.startDay).getTime()
        mistiming = mistiming / (parseInt(this.space) * 60) * 1000
        console.log(mistiming)
      })
    },

    eventClick(item, s) {
      console.log(item, s)
    },
    markClick(e, r) {
      console.log(e, r, '5566')
    },
    changeWeek() {
      this.headerTable(this.value3)
    },
    changeTime(e, r) {
      if (e == 1) {
        this.$nextTick(() => {
          this.sunDayWeek(this.nowDate, e)
          // this.config.minTime= '07:00'
          // this.config.maxTime= '24:00'
          this.$set(this.config, 'minTime', '07:00')
          this.$set(this.config, 'maxTime', '24:00')
        })
        // console.log( this.config)
      } else {
        this.$nextTick(() => {
          this.sunDayWeek(this.nowDate, e)
          // this.config.minTime = '00:20'
          // this.config.maxTime= '24:00'
          this.$set(this.config, 'minTime', '00:20')
          this.$set(this.config, 'maxTime', '24:00')
        })

        // console.log( this.config)
      }
    },
    timeRange(beginTime, endTime, nowTime) {
      return time_range(beginTime, endTime, nowTime)
    }

  }
}
</script>
<style scoped>
#customers {
	width: 100%;
	border-collapse: collapse;
  overflow: hidden;
}

#customers td,
#customers th {
	text-align: center;
    font-size: 1em;
    border: 1px solid #d5d9e1;
    position: relative;
    height: 30px;
}

#customers th {
	text-align: center;

	text-align: left;
	padding-top: 5px;
	padding-bottom: 4px;
	background-color: #f5f5f5;
	color: #ffffff;
}

#customers tr.alt td {
	color: #000000;
	background-color: #eaf2d3;
}

a.class-a {
	width: 100%;
	position: absolute;
	top: 0px;
	left: 0px;
	background-color: antiquewhite;
  z-index: 100;
}

.headCureent_text {
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: gray;
}

span.headCureent {
  line-height: 25px;
    width: 25px;
    height: 25px;
    border-radius: 17px;
    background-color: #2c7eff;
    display: inline-block;
    color: #fff;
}

tr.classRestTime {
    background-color: #e4e4e4;
}

</style>
