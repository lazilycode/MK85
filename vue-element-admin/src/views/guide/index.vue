<template>
  <el-table
    :data="tableData"
    show-overflow-tooltip="true"
    :cell-style="cellStyle"
    fit="false"
    border
    style="width: 100%"
  >
    <el-table-column
      prop="date"
      label="日期"
    />
    <el-table-column
      prop="weekDayOne"
      label="周一"
    />
    <el-table-column
      prop="weekDayTwo"
      label="周二"
    />
    <el-table-column
      prop="weekDayThree"
      label="周三"
    />
    <el-table-column
      prop="name"
      label="周四"
    />
    <el-table-column
      prop="name"
      label="周五"
    />
    <el-table-column
      prop="address"
      label="周六"
    />
    <el-table-column
      prop="address"
      label="周日"
    />
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { curr_plan_name: '高二历史同步提分',
          endTime: '10:00',
          isCoincide: '0',
          jx_strategy_id: '640357',
          lessonTypeName: '正课',
          lesson_detail: '',
          lesson_plan_id: '12449158',
          lesson_type: '1',
          minuteTime: '60',
          planDate: '2019年06月03日',
          plan_end_time: '2019-06-03 10:00:00',
          plan_start_time: '2019-06-03 09:00:00',
          startTime: '09:00',
          status: '3',
          studentName: '焦爽',
          student_id: '639097',
          teacherName: '张广飞',
          teacher_id: '26256',
          tick: '1',
          type: '1',
          typeName: '正课',
          weekDay: '星期一',
          weekDayOne: '星期一'
        },
        { curr_plan_name: '高二历史同步提分',
          endTime: '10:00',
          isCoincide: '0',
          jx_strategy_id: '640357',
          lessonTypeName: '正课',
          lesson_detail: '',
          lesson_plan_id: '12449158',
          lesson_type: '1',
          minuteTime: '60',
          planDate: '2019年06月03日',
          plan_end_time: '2019-06-03 10:00:00',
          plan_start_time: '2019-06-03 09:00:00',
          startTime: '09:00',
          status: '3',
          studentName: '焦爽',
          student_id: '639097',
          teacherName: '张广飞',
          teacher_id: '26256',
          tick: '1',
          type: '1',
          typeName: '正课',
          weekDay: '星期一',
          weekDayTwo: '星期二' },
        { curr_plan_name: '高二历史同步提分',
          endTime: '10:00',
          isCoincide: '0',
          jx_strategy_id: '640357',
          lessonTypeName: '正课',
          lesson_detail: '',
          lesson_plan_id: '12449158',
          lesson_type: '1',
          minuteTime: '60',
          planDate: '2019年06月03日',
          plan_end_time: '2019-06-03 10:00:00',
          plan_start_time: '2019-06-03 09:00:00',
          startTime: '09:00',
          status: '3',
          studentName: '焦爽',
          student_id: '639097',
          teacherName: '张广飞',
          teacher_id: '26256',
          tick: '1',
          type: '1',
          typeName: '正课',
          weekDayThree: '星期三' }
      ],
      tableDatas: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      console.log(column, 990)
      // console.log(row, column, rowIndex, columnIndex)
      if (rowIndex === 0 && columnIndex === 4) {
        return 'background:pink'
      }
      if (rowIndex === 1 && columnIndex === 4) {
        return 'background:pink'
      }
    }
  }
}
</script>
