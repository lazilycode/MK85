<template>
  <div class="demo-app">
    <FullCalendar
      ref="fullCalendar"
      class="demo-app-calendar"
      default-view="timeGridWeek"
      :header="{
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridWeek'
      }"
      :min-time="startTime"
      :max-time="endTime"
      :all-day-slot="alldayslot"
      :now-indicator="nowIndicator"
      :locale="locale"
      :plugins="calendarPlugins"
      :weekends="calendarWeekends"
      :events="events"
      :business-hours="true"
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
    FullCalendar // make the <FullCalendar> tag available
  },
  data: function() {
    return {
      // columnHeaderText: this.headTitle(),
      startTime: '06:00:00',
      endTime: '24:00:00',
      calendarPlugins: [
        // plugins must be defined in the JS
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin // needed for dateClick
      ],
      alldayslot: false,
      defaultView: 'timeGridWeek',
      nowIndicator: true,
      locale: zhcnLocale,
      calendarWeekends: true,
      calendarEvents: [{ title: 'Event Now', start: new Date() }],
      events: [
        {
          title: 'simple event',
          start: '2019-06-04',
          rendering: 'background',
          color: '#fcf8e3',
          businessHours: {
            // days of week. an array of zero-based day of week integers (0=Sunday)
            daysOfWeek: [1, 2, 3, 4], // Monday - Thursday

            startTime: '10:00', // a start time (10am in this example)
            endTime: '18:00' // an end time (6pm in this example)
          }
        },
        {
          title: 'event with URL',
          url: 'https://www.google.com/',
          start: '2019-06-04'
        }
      ]
    }
  },
  mounted() {
    this.timeLine()
    // document.querySelectorAll('.fc-time')
  },
  methods: {
    // 表头时间格式调整
    headTitle(e) {
      const date = new Date(e)
      const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      const nowweek = date.getDay()
      let nowDay = date.getDate()
      nowDay = nowDay < 10 ? ('0' + nowDay) : nowDay
      let newMon = date.getMonth() + 1
      newMon = newMon < 10 ? ('0' + newMon) : newMon
      return '<div><p><span>' + week[nowweek] + '</span></p><p><span>' + newMon + '月' + nowDay + '</span></p></div>'
    },
    // 操作dom 时间格式化
    timeLine() {
      console.log(this.time_to_sec(this.startTime))
      console.log(this.formatSeconds(this.time_to_sec(this.startTime)))
      console.log()
      // console.log() //
      // .map((item))
      const eleArr = document.querySelectorAll('.fc-time')
      eleArr.forEach((item, index) => {
        const startTiems = item.parentNode.getAttribute('data-time').substring(0, 5)
        console.log(eleArr[index + 1].parentNode)
        if (eleArr[index + 1].parentNode) {
          const endTiems = eleArr[index + 1].parentNode.getAttribute('data-time').substring(0, 5) || this.endTime
          item.innerHTML = '<span>' + startTiems + '-' + endTiems + '</span>'
        }
      })
    },
    // 时转秒
    time_to_sec(time) {
      var s = ''
      var hour = time.split(':')[0]
      var min = time.split(':')[1]
      var sec = time.split(':')[2]
      s = Number(hour * 3600) + Number(min * 60) + Number(sec)
      return s
    },
    // 秒转时
    formatSeconds(value) {
      var secondTime = parseInt(value)
      var minuteTime = 0
      var hourTime = 0
      if (secondTime > 60) {
        // 获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60)
        // 获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60)
        // 如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
          // 获取小时，获取分钟除以60，得到整数小时
          hourTime = parseInt(minuteTime / 60)
          // 获取小时后取佘的分，获取分钟除以60取佘的分
          minuteTime = parseInt(minuteTime % 60)
        }
      }
      var result = '' + parseInt(secondTime)
      if (minuteTime > 0) {
        result = '' + parseInt(minuteTime) + ':' + result
      }
      if (hourTime > 0) {
        result = '' + parseInt(hourTime) + ':' + result
      }
      return result
    },

    eventMouseEnter(e) {
      console.log(e, 90)
    },
    handleDateClick(info) {
      alert('Clicked on: ' + info.dateStr)
      alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY)
      alert('Current view: ' + info.view.type)
      // change the day's background color just for fun
      info.dayEl.style.backgroundColor = 'red'
      // if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
      //   this.calendarEvents.push({
      //     // add new event data
      //     title: "New Event",
      //     start: arg.date,
      //     allDay: arg.allDay
      //   })
      // }
    },
    select: function(info) {
      alert('selected ' + info.startStr + ' to ' + info.endStr)
    }
  }
}
</script>

<style lang='scss'>
// you must include each plugins' css
// paths prefixed with ~ signify node_modules
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";

// thead.fc-head {
//     background-color: red;
// }

#headTitle {
    border-width: 0px;
    position: absolute;
    left: 2px;
    top: 2px;
    width: 138px;
    word-wrap: break-word;
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
  // max-width: 900px;
}
</style>
