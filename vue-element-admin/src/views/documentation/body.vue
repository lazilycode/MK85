<template>
  <div class="demo-app">
    {{ nowTime }}
    <FullCalendar
      ref="Calendar"
      class="demo-app-calendar"
      default-view="timeGridWeek"
      :header="{
        left: ' ',
        center: '',
        right: ''
      }"
      time-zone="UTC"
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
      @eventClick="eventClick"
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
        if (e.el.className.includes('rest')) {
          e.el.innerHTML = "<div class='textCentn'><span> ——— </span></div>"
        }
      },
      eventTimeFormat: { hour: 'numeric', omitZeroMinute: false, minute: '2-digit', timeZoneName: 'short' },
      alldayslot: false,
      defaultView: 'timeGridWeek',
      nowIndicator: true,
      locale: zhcnLocale,
      calendarWeekends: true,
      touchtime: false
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
      this.$nextTick(() => {
        this.tableOne()
        this.timeLine()
      })
    },
    tableOne() {
      const tableone = this.domChange('.fc-axis.fc-widget-header')[0]
      tableone.innerHTML = '<span class="w100"><span class="s1">姓名</span><p></p><span class="s2">月份</span></span>'
      const line = this.domChange('.w100 p')[0].style
      if (tableone.style.width === '59px') {
        line.width = '147px'
      } else if (tableone.style.width === '102px') {
        line.width = '191px'
        line.style = 'transform: rotate(11deg)'
      } else {
        line.style = '190px;'
        line.style = 'transform: rotate(11deg)'
      } if (tableone.style.width === '76px') {
        line.style = '165px;'
        line.style = 'transform: rotate(11deg)'
      } else if (tableone.style.width === '165px') {
        line.style = '147px;'
        line.style = 'transform: rotate(11deg)'
      }
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
          const endTiems = eleArr[index + 1].parentNode
            .getAttribute('data-time')
            .substring(0, 5)
          item.innerHTML = '<span>' + startTiems + '-' + endTiems + '</span>'
        } else {
          item.innerHTML =
            '<span>' + startTiems + '-' + this.endTime + '</span>'
        }
      })
    },
    changeWeek(e) {
      const calendarApi = this.$refs.Calendar.getApi()
      calendarApi.gotoDate(e)
      this.domAll(0)
    },

    eventMouseEnter(e) {
      // console.log(e, 90)
    },
    handleDateClick(info) {
      if (this.touchtime) {
        this.$emit('show-CityName', info)
        // alert(66)
        this.touchtime = false
      } else {
        this.touchtime = true
        setTimeout(() => {
          this.touchtime = false
        }, 300)
      }
    },
    select: function(info) {
      alert('selected ' + info.startStr + ' to ' + info.endStr)
    },
    eventClick(e) {
      if (this.touchtime) {
        alert(6655)
        this.touchtime = false
      } else {
        this.touchtime = true
        setTimeout(() => {
          this.touchtime = false
        }, 300)
      }
    }
  }
}
</script>

<style lang='scss'>
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";
@import "@/styles/fullcalendar.scss";
</style>
