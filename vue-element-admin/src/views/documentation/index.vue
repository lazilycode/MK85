<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-button type="success" size="small">保存</el-button>
        <el-button type="primary" size="small">批量设置</el-button>
        <el-button size="small" @click="refresh">刷新</el-button>
        <span v-for="(item,index) in box" :key="index">
          <button class="box" :style="{ backgroundColor: item.bgColor}"/>
          <span>{{ item.name }}</span>
        </span>
      </el-col>

      <el-col :span="8">
        <div>
          {{ date }}
          <i class="el-icon-arrow-left" @click="previouWeek"/>
          <el-date-picker
            v-model="date"
            type="week"
            :picker-options="{ firstDayOfWeek: 1}"
            format="yyyy 第 WW 周"
            value-format="yyyy-MM-dd"
            placeholder="选择周"
            @change="changweWeek(date)"
          />
          <i class="el-icon-arrow-right" @click="nextWeek"/>
        </div>
      </el-col>
    </el-row>
    <div class="block">
      <span class="demonstration">默认</span>
      {{value1}}
      <el-date-picker
        @focus="se"
        :picker-options="{
        selectableRange:'18:30:00 - 20:30:00'
      }"  
        v-model="value1"
        type="datetime"
        format="yyyy-MM-dd HH:mm"
        value-format="yyyy-MM-dd HH:mm"
        placeholder="选择日期"
      ></el-date-picker>

      <!-- <el-date-picker
      v-model="value1"
      type="datetime"
       format='HH:mm'
      placeholder="选择日期时间">
    </el-date-picker>

    <el-time-select
    placeholder="起始时间"
    v-model="startTime"
    :picker-options="{
      start: '08:30',
      step: '00:30',
      end: '18:30'
    }">
      </el-time-select>-->
    </div>
    <Body v-if="ish" ref="Bc" :events="isEdit" :now-time="date" @show-CityName="showCityName"/>
  </div>
</template>
<script>
import { formatDate } from "../../utils/validate.js";
import axios from "axios";
import Body from "./body";
import { setTimeout } from "timers";
export default {
  components: {
    Body
  },
  data() {
    return {
      value1: "",
      startTime: "",
      condition: false,
      ish: true,
      date: this.AddDays(new Date(), 0),
      box: [
        { name: "待上课", bgColor: "#00bbff" },
        { name: "休息日", bgColor: "#ffffc4" },
        { name: "被选择", bgColor: "#00af45" }
      ],
      isEdits: [
        {
          title: "simple event",
          start: "2019-07-05 08:00",
          // rendering: 'background',
          // color: '#fcf8e3',
          className: "blue"
        },
        {
          className: "green",
          title: "simple event",
          start: "2019-07-04 08:00"
        },
        {
          className: "rest",
          title: "event with URL",
          start: "2019-07-06 08:00",
          // rendering: 'background'
          color: "#f5d31e"
        },
        {
          className: "rest",
          title: "event with URL",
          start: "2019-07-07 08:00",
          end: "2019-07-07 08:30",
          // rendering: 'background'
          color: "#f5d31e"
        }
      ],
      isEdit: []
    };
  },
  watch: {
    // date: function() {
    //   // console.log(this.subtractOneDay())
    //   // this.dataXhrs('http://111.231.94.121:3000/mock/19/demo/demo')
    //   this.$refs.Bc.changeWeek(this.date)
    // }
  },
  created() {},
  mounted() {},
  methods: {
    se() {
      setTimeout(() => {
        // disabled
        let arr = document.querySelectorAll(
          ".el-scrollbar__view.el-time-spinner__list"
        )[1].children;
        for (let index = 0; index < arr.length; index++) {
          if ( arr[index].innerHTML === "30")

            arr[index].setAttribute('class','disabled')
            console.log( arr[index].style.color='red')
        }
      });

      //  let arr= [...]
      //   console.log(arr)
    },
    dataXhr(url) {
      const that = this;
      axios.get(url).then(function(response) {
        that.ish = false;
        that.$nextTick(() => {
          that.ish = true;
        });
        that.isEdit = response.data;
        that.sunDayWeek().map(item => {
          that.isEdit.push(item);
        });
        console.log(that.isEdit);
        // console.log(that.sunDayWeek())
        // that.isEdit = [...response.data, ]
        // console.log(that.isEdit)
      });
    },

    dataXhrs() {
      const that = this;
      axios
        .get("http://111.231.94.121:3000/mock/19/demo/demo_1559952423271")
        .then(function(response) {
          that.ish = false;
          that.$nextTick(() => {
            that.ish = true;
          });

          that.isEdit = response.data;
          console.log(response.data);
        });
    },
    // 周日是时间分段 数据填充
    sunDayWeek() {
      const arr = [];
      if (!new Date("2019-6-9").getDay()) {
        for (let i = 0; i < 26; i++) {
          const timeStart =
            new Date("2019-6-9 08:00").getTime() + i * 1800 * 1000;
          const timeEnd =
            new Date("2019-6-9 08:00").getTime() + (i + 1) * 1800 * 1000;
          arr.push({
            className: "rest",
            title: "-",
            start: formatDate(new Date(timeStart)),
            end: formatDate(new Date(timeEnd)),
            color: "#f5d31e"
          });
        }
      }
      return arr;
    },

    // 日期处理
    subtractOneDay() {
      const ze = new RegExp("/", "g");
      let dateTime = new Date(this.date);
      dateTime = dateTime.setDate(dateTime.getDate() - 1);
      const yymmdd = new Date(dateTime).toLocaleDateString().replace(ze, "-");
      return yymmdd;
    },

    // 当前日期加七天
    AddDays(date, days) {
      var nd = new Date(date);
      nd = nd.valueOf();
      nd = nd + days * 24 * 60 * 60 * 1000;
      nd = new Date(nd);
      var y = nd.getFullYear();
      var m = nd.getMonth() + 1;
      var d = nd.getDate();
      if (m <= 9) m = "0" + m;
      if (d <= 9) d = "0" + d;
      var cdate = y + "-" + m + "-" + d;
      return cdate;
    },
    // 日期处理
    chnagDate() {
      if (this.condition) {
        return this.subtractOneDay();
      } else {
        return this.date;
      }
    },
    // 上一周
    previouWeek() {
      this.date = this.AddDays(this.date, -7);
      this.$refs.Bc.changeWeek(this.date);
      this.dataXhr("http://127.0.0.1:7001/user?startTime=" + this.chnagDate());
      console.log(this.chnagDate());
    },

    // 下一周
    nextWeek() {
      this.date = this.AddDays(this.date, 7);
      this.$refs.Bc.changeWeek(this.date);
      this.dataXhr("http://127.0.0.1:7001/user?startTime=" + this.chnagDate());
      // console.log()
    },

    // 刷新
    refresh() {},

    // changweWeek
    changweWeek(e) {
      this.condition = true;
      this.$refs.Bc.changeWeek(this.date);
      console.log(this.subtractOneDay());
    },

    // clicksucctk
    showCityName(e) {
      console.log(e, 888);
      this.$refs.Bc.changeWeek(this.date);
      this.dataXhr("http://127.0.0.1:7001/user?startTime=" + this.chnagDate());
      // alert(55787864)
    }
  }
};
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
  border: none;
}
.el-icon-arrow-left,
.el-icon-arrow-right {
  cursor: pointer;
}
</style>

