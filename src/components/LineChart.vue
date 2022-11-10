<template>
  <div id="Linechart" style="height: 150px"></div>
</template>
<script>
import ApexCharts from "apexcharts";

export default {
  props: {
    series: {
      type: Array,
    },
    labels: {
      type: Array,
    },
  },
  mounted() {
    var options = {
      chart: {
        type: "line",
      },
      series: this.series,
      labels: this.labels,
    };
    var chart = new ApexCharts(document.querySelector("#Linechart"), options);
    chart.render();
  },
};
</script>

<style></style>
