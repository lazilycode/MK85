<template>
  <div class="demo-app">

    <el-row :gutter="20">
      <el-col :span="16">
        <el-button size="small">默认按钮</el-button>
        <el-button type="primary" size="small">主要按钮</el-button>
        <el-button type="success" size="small" @click="refresh">刷新</el-button>
        <span v-for="(item,index) in 3" :key="index">
          <button class="box" />
          <span>{{ item }}</span>
        </span>
      </el-col>

      <el-col :span="8">
        <div>
          <i class="el-icon-arrow-left" @click="previouWeek" />
          <el-date-picker
            v-model="value1"
            type="week"
            format="yyyy 第 WW 周"
            placeholder="选择周"
          />
          <i class="el-icon-arrow-right" @click="nextWeek" />
        </div>

      </el-col>
    </el-row>

    <FullCalendar
      ref="Calendar"
      class="demo-app-calendar"
      default-view="timeGridWeek"
      :header="{
        left: ' ',
        center: '',
        right: ''
      }"
      :event-render="eventRender"
      :height="667"
      :min-time="startTime"
      :max-time="endTime"
      :all-day-slot="alldayslot"
      :now-indicator="nowIndicator"
      :locale="locale"
      :plugins="calendarPlugins"
      :weekends="calendarWeekends"
      :events="events"
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
    FullCalendar // make the <FullCalendar> tag available
  },
  data: function() {
    return {
      hide: false,
      // 周的选择器
      value1: '',
      columnHeaderText: function(e) {
        const date = new Date(e)
        const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        const nowweek = date.getDay()
        let nowDay = date.getDate()
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
        daysOfWeek: [], // Monday, Tuesday, Wednesday
        startTime: '06:00',
        endTime: '24:00'
      },
      startTime: '08:00',
      endTime: '21:00',
      calendarPlugins: [
        // plugins must be defined in the JS
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin // needed for dateClick
      ],
      eventRender: function(info) {
        console.log(info)
      },
      alldayslot: false,
      defaultView: 'timeGridWeek',
      nowIndicator: true,
      locale: zhcnLocale,
      calendarWeekends: true,
      calendarEvents: [{ title: 'Event Now', start: '2018-06-05' }],
      events: [],
      events1: [
        {
          title: 'simple event',
          start: '2019-06-05 08:00',
          // rendering: 'background',
          // color: '#fcf8e3',
          className: 'blue'
        },
        {
          className: 'green',
          title: 'simple event',
          start: '2019-06-04 08:00'
        },
        {
          className: 'rest',
          title: 'event with URL',
          start: '2019-06-06 08:00',
          // rendering: 'background'
          color: '#f5d31e'
        },
        {
          title: 'event with URL',
          start: '2019-06-04'
        }
      ]
    }
  },
  created() {
    // console.log(444)

    this.events = this.events1
  },
  mounted() {
    // this.hide = false
    // this.$nextTick(() => {
    //   this.hide = true
    // })
    this.tableOne()
    this.timeLine()
    this.adjustCss()

    // document.querySelectorAll('.fc-time')
  },
  methods: {
    tableOne() {
      const tableone = this.domChange('.fc-axis.fc-widget-header')[0]
      tableone.innerHTML = '<span class="w100"><span class="s1">姓名</span><p></p><span class="s2">月份</span></span>'
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
      const eleArr = this.domChange('.fc-axis.fc-time.fc-widget-content')
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

    // 根据不同的className 调整css
    adjustCss() {
      const text = this.domChange('.rest')[0].text
      console.log((this.domChange('.rest')[0].innerHTML = text))
    },

    // 上一周
    previouWeek() {
      const calendarApi = this.$refs.Calendar.getApi()
      calendarApi.gotoDate('2018-07-01')
    },
    // 下一周
    nextWeek() {

    },
    // 刷新refresh
    refresh() {
      // console.log(this.$refs.Calendar)
      this.events1.push({
        className: 'rest',
        title: 'event with URL',
        start: '2019-06-07 08:00',
        // rendering: 'background'
        color: '#f5d31e'
      })

      this.tableOne()
      this.timeLine()
      this.adjustCss()
      // this.$refs.Calendar.render()
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

.head .headRow {
    padding: 2px 0px;
    color: #ffffff;
    font-size: 13px;
    font-weight: 400;
}

button.box {
    margin: 0px 10px;
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
</style>
