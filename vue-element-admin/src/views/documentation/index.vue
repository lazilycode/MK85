<template>
  <div class="demo-app">
    <FullCalendar
      ref="fullCalendar"
      class="demo-app-calendar"
      default-view="dayGridMonth"
      :header="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      }"
      min-time="06:00:00"
      max-time="24:00:00"
      :all-day-slot="alldayslot"
      :now-indicator="nowIndicator"
      :locale="locale"
      :plugins="calendarPlugins"
      :weekends="calendarWeekends"
      :events="events"
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
      columnHeaderText: function(date) {
        if (date.getDay() === 5) {
          return 'Friday!'
        }
      },
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
          start: '2019-05-02'
        },
        {
          title: 'event with URL',
          url: 'https://www.google.com/',
          start: '2019-05-03'
        }
      ]
    }
  },
  methods: {
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

.demo-app {
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-top {
  margin: 0 0 3em;
}

.demo-app-calendar {
  margin: 0 auto;
  max-width: 900px;
}
</style>
