<template>
  <div>
    <el-date-picker
      v-model="value3"
      type="week"
      format="yyyy 第 WW 周"
      value-format="yyyy-MM-dd"
      placeholder="选择周"
      :clearable="false"
      @change="changeWeek"
    />
    {{ value3 }}
    <table id="customers">
      <tr>
        <th> <span @click="fist"> ddd</span></th>
        <th v-for=" (item,index) in headWeek" :key="index">
          <div class="headCureent_text">
            <span :class="{'headCureent':item.current}">
              {{ item.day }}
            </span>
            <span>{{ item.week }}</span>
          </div>

        </th>
      </tr>
      <tr v-for="(row,rowindex) in arr" :key="rowindex">
        <td>
          <div>
            {{ row.start }}-{{ row.end }}
          </div>
        </td>
        <td
          v-for=" (item, index) in headWeek"
          :key="index"
          @click="eventClick(row.start,item.date,$event)"
        >
          <div v-for="(ite, ind) in daArr" :key="ind">
            <!-- {{ row.start===ite.start&&item.date===ite.day }} -->
            <a v-if="row.start===ite.start&&item.date===ite.day" slot="reference" :class="{ 'class-a': ite.className}" :style="{bottom:-ite.maio*30+'px'}"> {{ ite.title }}</a>
            <!-- <el-popover placement="top-start" width="200" :trigger="ite.hover==='hover'?'hover':'manual'">
              <div v-html="ite.html" />
              {{ ite }}

            </el-popover> -->
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { formatDate, getMonDate, getDayName } from './uts'
export default {
  data() {
    return {
      value3: '',
      nowDate: new Date(),
      arr: [],
      headWeek: [],
      space: '30',
      startTime: '08:00',
      endTime: '18:00',
      config: {
        minTime: '08:00',
        maxTime: '18:00',
        slotDuration: '30'
      },

      daArr: [
        {
          html: '<span>sdjcbniunciuejnce<span>',
          startDay: '2019-07-30 11:00',
          endDay: '2019-07-31 15:00',
          day: '2019-07-30',
          start: '11:00',
          title: 353,
          className: 'demo'
        },
        {
          html: '<span>sdjcbniunciuejnce<span>',
          startDay: '2019-07-30 11:30',
          endDay: '2019-07-30 15:00',
          day: '2019-07-30',
          start: '11:30',
          title: 353,
          className: 'demo'
        },
        {
          html: '<span>sdjcbniunciuejnce<span>',
          hover: 'hover',
          startDay: '2019-7-31 11:30',
          endDay: '2019-7-31 12:00',
          day: '2019-7-31',
          start: '11:30',
          title: '23e23e23e23e',
          className: 'demo'
        }
      ]
    }
  },
  mounted() {
    // 数据校验
    this.dataTr()
    this.headerTable(this.nowDate)
    this.sunDayWeek(this.nowDate)

    // this.timesection()
  },
  methods: {

    count(b, a) {
      var date1 = new Date(b)
      var date2 = new Date(a)
      var date = (date1.getTime() - date2.getTime()) / (1000 * 60 * parseInt(this.config.slotDuration))
      return date
    },

    dataTr() {
      this.daArr.map((item, index) => {
        item.maio = this.count(item.endDay, item.startDay)
      })
    },

    sunDayWeek(e) {
      const arr = []
      if (!this.startTime) {
        this.startTime = '00:00'
        this.endTime = '24:00'
      }
      const next = parseInt(this.endTime.slice(0, 2)) - parseInt(this.startTime.slice(0, 2))
      const space = next * 60 * 60 / parseInt(this.space) / 60
      for (let i = 0; i < space; i++) {
        const timeStart =
						(new Date(formatDate(e, 'YYYY-MM-DD') + ' ' + this.startTime).getTime() / 1000 +
							i * parseInt(this.space) * 60) *
						1000
        const timeEnd =
						(new Date(formatDate(e, 'YYYY-MM-DD') + ' ' + this.endTime).getTime() / 1000 +
							(i + 1) * parseInt(this.space) * 60) *
            1000
        arr.push({
          startDate: formatDate(new Date(timeStart), 'YYYY-MM-DD hh:mm'),
          endDate: formatDate(new Date(timeEnd), 'YYYY-MM-DD hh:mm'),
          nowDay: formatDate(new Date(timeStart), 'YYYY-MM-DD'),
          start: formatDate(new Date(timeStart), 'hh:mm'),
          end: formatDate(new Date(timeEnd), 'hh:mm')
        })
      }
      console.log(arr)
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

    eventClick(e, r, t) {
      console.log(e, r, t)
    },
    changeWeek() {
      this.headerTable(this.value3)
    },
    fist() {
      this.sunDayWeek(this.nowDate)
      this.startTime = '00:00'
      this.endTime = '24:00'
    }
  }
}
</script>
<style scoped>
#customers {
	font-family: 'Trebuchet MS', Arial, Helvetica, sans-serif;
	width: 100%;
	border-collapse: collapse;
}

#customers td,
#customers th {
	text-align: center;
    font-size: 1em;
    border: 1px solid #98bf21;
    position: relative;
    height: 30px;
}

#customers th {
	text-align: center;
	font-size: 1.1em;
	text-align: left;
	padding-top: 5px;
	padding-bottom: 4px;
	background-color: #a7c942;
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
  text-align: center;
}

span.headCureent {
    width: 20px;
    height: 20px;
    border-radius: 16px;
    background-color: red;
}
</style>
