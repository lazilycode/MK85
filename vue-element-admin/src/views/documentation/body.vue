<template>
  <div class="demo-app">
    {{ nowTime }}
    <FullCalendar
      v-if="hide"
      ref="Calendar"
      class="demo-app-calendar"
      default-view="timeGridWeek"
      :header="{
        left: ' ',
        center: '',
        right: ''
      }"
      :event-time-format="eventTimeFormat"
      :event-render="eventRender"
      :height="631"
      :min-time="startTime"
      :max-time="endTime"
      :all-day-slot="alldayslot"
      :now-indicator="nowIndicator"
      :locale="locale"
      :business-hours="businessHours"
      :plugins="calendarPlugins"
      :weekends="calendarWeekends"
      :events="events"
      :now="nowTime"
      :column-header-html="columnHeaderText"
      @dateClick="handleDateClick"
      @eventMouseEnter="eventMouseEnter"
      @select="select"
    />
  </div>
</template>

<script>

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import zhcnLocale from '@fullcalendar/core/locales/zh-cn'

export default {
  components: {
    FullCalendar
  },
  props: {
    events: {
      type: Array,
      default: Array
    },
    nowTime: {
      type: String,
      default: String
    }
  },
  data: function() {
    return {
      arr: [],
      hide: true,
      nowTimes: new Date(),
      // 周的选择器
      value1: '',
      columnHeaderText: function(e) {
        const date = new Date(e)

        const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        const nowweek = date.getDay()
        let nowDay = date.getDate()
        console.log(new Date(e).getDate(e))
        nowDay = nowDay < 10 ? '0' + nowDay : nowDay
        let newMon = date.getMonth() + 1
        newMon = newMon < 10 ? '0' + newMon : newMon
        return (
          '<div class="head"><div class="headRow"><span>' +
          week[nowweek] +
          '</span></div><div class="headRow"><span>' +
          newMon +
          '月' +
          nowDay +
          '</span></div></div>'
        )
      },
      businessHours: {
        daysOfWeek: [1, 2, 3, 4, 5, 6],
        startTime: '06:00',
        endTime: '24:00'
      },
      startTime: '08:00',
      endTime: '21:00',
      calendarPlugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin
      ],

      eventRender: function(e, t) {
      },
      eventTimeFormat: { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' },
      alldayslot: false,
      defaultView: 'timeGridWeek',
      nowIndicator: true,
      locale: zhcnLocale,
      calendarWeekends: true

    }
  },
  computed: {

  },
  created() {
  },
  mounted() {
    this.domAll()
  },
  methods: {

    domAll() {
      this.tableOne()
      this.timeLine()
      this.adjustCss()
    },
    tableOne() {
      const tableone = this.domChange('.fc-axis.fc-widget-header')[0]
      tableone.innerHTML = '<span class="w100"><span class="s1">姓名</span><p></p><span class="s2">月份</span></span>'
      const line = this.domChange('.w100 p')[0].style
      if (tableone.style.width === '59px') {
        line.width = '147px'
      } if (tableone.style.width === '102px') {
        line.width = '191px'
        line.style = 'transform: rotate(11deg)'
      } else {
        line.style = '190px;'
        line.style = 'transform: rotate(11deg)'
      } if (tableone.style.width === '76px') {
        line.style = '165px;'
        line.style = 'transform: rotate(11deg)'
      }
    },
    // 表头时间格式调整
    headTitle(e) {
      const date = new Date(e)
      const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      const nowweek = date.getDay()
      let nowDay = date.getDate()
      nowDay = nowDay < 10 ? '0' + nowDay : nowDay
      let newMon = date.getMonth() + 1
      newMon = newMon < 10 ? '0' + newMon : newMon
      return (
        '<div><p><span>' +
        week[nowweek] +
        '</span></p><p><span>' +
        newMon +
        '月' +
        nowDay +
        '</span></p></div>'
      )
    },
    // 选着择dom
    domChange(e) {
      return document.querySelectorAll(e)
    },
    // 操作dom 时间格式化
    timeLine() {
      const eleArr = this.domChange('td.fc-axis.fc-time.fc-widget-content')
      eleArr.forEach((item, index) => {
        const startTiems = item.parentNode
          .getAttribute('data-time')
          .substring(0, 5)
        if (index + 1 !== eleArr.length) {
          // arr.push({ className: 'rest', start: '2019-06-09' + ' ' + startTiems, end: '2019-06-09' + ' ' + endTiems })
          const endTiems = eleArr[index + 1].parentNode
            .getAttribute('data-time')
            .substring(0, 5)
          item.innerHTML = '<span>' + startTiems + '-' + endTiems + '</span>'
        } else {
          // arr.push({ className: 'rest', start: '2019-06-09' + ' ' + startTiems, end: '2019-06-09' + ' ' + this.endTiems })
          item.innerHTML =
            '<span>' + startTiems + '-' + this.endTime + '</span>'
        }
      })
      // return arr
    },

    // 根据不同的className 调整css
    adjustCss() {
      // const text = this.domChange('.rest')[0].text
      // console.log((this.domChange('.rest')[0].innerHTML = text))
    },
    changeWeek(e) {
      const calendarApi = this.$refs.Calendar.getApi()
      calendarApi.gotoDate(e)
      this.domAll(0)
    },
    eventMouseEnter(e) {
      console.log(e, 90)
    },
    handleDateClick(info) {
      // alert('Clicked on: ' + info.dateStr)
      // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY)
      // alert('Current view: ' + info.view.type)
      // info.dayEl.style.backgroundColor = 'red'
    },
    select: function(info) {
      alert('selected ' + info.startStr + ' to ' + info.endStr)
    }
  }
}
</script>

<style lang='scss'>
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";

thead.fc-head {
  height:39px;
  background-color: #409eff;
}

#headTitle {
  border-width: 0px;
  position: absolute;
  left: 2px;
  top: 2px;
  width: 138px;
  word-wrap: break-word;
}
.fc .fc-axis {
  padding: 0 41px;
}
.fc-ltr .fc-axis{
  width: 76px;
  text-align: left
}

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

/*模拟对角线*/
.w100 {
  width: 100px;
  position: relative;
}
.w100 span.s1 {
 position: absolute;
    left: 10px;
    top: 13px;
}
.w100 span.s2 {
  position: absolute;
    right: -130px;
    top: 5px;
}
.w100 p {
  width: 164px;
    height: 1px;
    background: red;
    -webkit-transform: rotate(22deg);
    transform: rotate(12deg);
    position: absolute;
    left: -5px;
    top: 3px;
}
.demo-app {
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-top {
  margin: 0 0 3em;
}

.demo-app-calendar {
  margin: 0 auto;
  // max-width: 1100px;
}

.fc-nonbusiness {
    background: #ffd5005e;
}
</style>
