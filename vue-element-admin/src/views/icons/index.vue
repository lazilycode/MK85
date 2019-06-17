<template>
  <div>
    <service-dialog :show.sync="show"></service-dialog>
    <el-button @click="open">click</el-button>
  </div>
</template>

<script>
import serviceDialog from "./demo";

export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    open() {
      this.show = true;
    }
  },
  components: {
    serviceDialog
  }
};
</script>
