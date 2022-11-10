<template>
  <div id="Piehart" style="height: 150px"></div>
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
        type: "pie",
      },
      series: this.series,
      labels: this.labels,
    };
    var chart = new ApexCharts(document.querySelector("#Piehart"), options);
    chart.render();
  },
};
</script>

<style></style>
