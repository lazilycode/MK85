<template>
  <div>
    <table id="customers">
      <tr>
        <th/>
        <th v-for=" (item,index) in headWeek" :key="index">
          <span>{{ item.date }}</span>
        </th>
      </tr>
      <tr v-for="(row,rowindex) in arr" :key="rowindex">
        <td>{{ row.start }}</td>
        <td
          v-for=" (item, index) in headWeek"
          :key="index"
          @click="eventClick(row.start,item.date,$event)">
          <div v-for="(ite, ind) in daArr" :key="ind">
              <el-popover placement="top-start"  width="200"  :trigger="ite.hover==='hover'?'hover':'manual'" >
                  <div v-html="ite.html"> </div>
              <a slot="reference" v-if="row.start===ite.start&&item.date===ite.day" :class="{ 'class-a': ite.className}"> {{ ite.title }}</a>
              </el-popover>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { formatDate, getMonDate, getDayName } from "./uts";
export default {
  data() {
    return {
      nowDate: new Date(),
      arr: [],
      headWeek: [],
      space: "30",
      startTime: "08:00",
      endTime: "18:00",
      daArr: [
        { 
          html:"<span>sdjcbniunciuejnce<span>",
          startDay: "2019-6-21 11:00",
          endDay: "2019-6-21 12:00",
          day: "2019-6-21",
          start: "11:00",
          end: "12:00",
          title: 353,
          className: "demo"
        },
        {
          html:"<span>sdjcbniunciuejnce<span>",
          hover:'hover',
          startDay: "2019-6-21 11:00",
          endDay: "2019-6-21 12:00",
          day: "2019-6-21",
          start: "14:00",
          end: "16:00",
          title: 353,
          className: "demo"
        },
        {
          html:"<span>sdjcbniundscgywebjhcbwehbciewuhciuejnce<span>",
          hover:'hover',
          startDay: "2019-6-21 11:00",
          endDay: "2019-6-21 12:00",
          day: "2019-6-21",
          start: "15:00",
          end: "15:30",
          title: 353,
          className: "demo"
        }
      ]
    };
  },
  mounted() {
    this.init(this.nowDate);
    this.sunDayWeek(this.nowDate);
    this.timesection();
  },
  methods: {
    sunDayWeek(e) {
      const arr = [];
      if (!this.startTime) {
        this.startTime = "00:00";
        this.endTime = "24:00";
      }
      const next =
        parseInt(this.endTime.slice(0, 2)) -
        parseInt(this.startTime.slice(0, 2));
      const space = (next * 60 * 60) / parseInt(this.space) / 60;
      console.log((next * 60 * 60) / parseInt(this.space) / 60);
      if (!new Date("2019-6-9").getDay()) {
        for (let i = 0; i < space; i++) {
          const timeStart =
            (new Date(
              formatDate(e, "YYYY-MM-DD") + " " + this.startTime
            ).getTime() /
              1000 +
              i * parseInt(this.space) * 60) *
            1000;
          const timeEnd =
            (new Date(
              formatDate(e, "YYYY-MM-DD") + " " + this.endTime
            ).getTime() /
              1000 +
              (i + 1) * parseInt(this.space) * 60) *
            1000;
          arr.push({
            startDate: formatDate(new Date(timeStart), "YYYY-MM-DD hh:mm"),
            endDate: formatDate(new Date(timeEnd), "YYYY-MM-DD hh:mm"),
            nowDay: formatDate(new Date(timeStart), "YYYY-MM-DD"),
            start: formatDate(new Date(timeStart), "hh:mm"),
            end: formatDate(new Date(timeEnd), "hh:mm")
          });
        }
      }
      console.log(arr);
      this.arr = arr;
    },

    // d是当前星期一的日期对象
    init(e) {
      var d = getMonDate(e);
      var arr = [];
      for (var i = 0; i < 7; i++) {
        arr.push({
          date: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(),
          week: getDayName(d.getDay())
        });
        d.setDate(d.getDate() + 1);
      }
      this.headWeek = arr;
    },

    // 较长的日期按时间段分割
    timesection() {
      this.daArr.forEach((item, index) => {
        // 获取秒除以时间间隔
        let mistiming =
          new Date(item.endDay).getTime() - new Date(item.startDay).getTime();
        mistiming = (mistiming / (parseInt(this.space) * 60)) * 1000;
        console.log(mistiming);
      });
    },

    eventClick(e, r, t) {
      console.log(e, r, t);
    }
  }
};
</script>
<style scoped>
#customers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  width: 100%;
  border-collapse: collapse;
}

#customers td,
#customers th {
  text-align: center;
  font-size: 1em;
  border: 1px solid #98bf21;
  padding: 3px 7px 2px 7px;
  position: relative;
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
}
</style>
