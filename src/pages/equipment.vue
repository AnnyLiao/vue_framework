<template>
  <f7-page :page-content="false">
    <f7-navbar >
      
    </f7-navbar>
    <f7-toolbar tabbar scrollable :position="isBottom ? 'top' : 'bottom'">
      <f7-link
        v-for="(tab, index) in tabs"
        :key="tab"
        :tab-link="`#tab-${tab}`"
        :tab-link-active="index === 0"
        @click="getGroupData(tab)"
      >第{{tabsC[index]}}車間</f7-link>
    </f7-toolbar>
    <f7-tabs>
      <f7-tab
        v-for="(tab, index) in tabs"
        :key="tab"
        :id="`tab-${tab}`"
        class="page-content"
        :tab-active="index === 0"
      >
        <!-- machine status block -->
        <f7-block>
          <f7-row>
            <f7-col width="100" tablet-width="100">
              <i class="icon material-icons color-theme-green">stop</i>
              正常 {{statusColor.normal}} 台
              <i
                class="icon material-icons color-theme-orange"
              >stop</i>
              閒置 {{statusColor.Idle}} 台
              <i
                class="icon material-icons color-theme-red"
              >stop</i>
              異常 {{statusColor.abnormal}} 台
              <i
                class="icon material-icons color-theme-gray"
              >stop</i>
              停機 {{statusColor.downTime}} 台
            </f7-col>
          </f7-row>
        </f7-block>

        <!-- machine status Chart Section -->
        <f7-row>
          <f7-col width="100" tablet-width="100" :id="`chartdiv-${tab}`"></f7-col>
        </f7-row>

        <!-- 單一機台狀態 Section -->
        <f7-block strong inset v-for="(item, index) in data" :key="index" id="tab-block">
          <f7-row>
            <f7-col width="15">
              <p>
                <i :class="`icon material-icons ${item.StatusColor}`" :id="`icon-${item.MachineNumber}`">perm_data_setting</i>
                {{item.MachineNumber}}
              </p>
              <p>{{item.MachineName}}</p>
            </f7-col>
            <f7-col :id="`${item.MacAddress}-${tab}`" width="85"></f7-col>
          </f7-row>

          <f7-row>
            <f7-col>
              <h4>剩餘比例: {{item.Progress}}%</h4>
            </f7-col>
            <f7-col width="40">
              <h4>剩餘時間: {{item.PlanTimes}}</h4>
            </f7-col>
            <f7-col>
              <h4>剩餘數量: {{item.PlanProduction}}</h4>
            </f7-col>
          </f7-row>
        </f7-block>
      </f7-tab>
    </f7-tabs>
  </f7-page>
</template>

<script>
// Import amcharts
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { contains } from "@amcharts/amcharts4/.internal/core/utils/DOM";
export default {
  data() {
    return {
      tabs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      tabsC : ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
      isBottom: true,
      headers: {
        headers: {
          token: "82589155"
          //   groupId: 1
        }
      },
      statusColor: {},
      total: 0,
      data: [],
      macAddress: [],
      indicator: null
    };
  },
  beforeMount() {
    am4core.useTheme(am4themes_animated);
  },
  methods: {
    getGroupData: function(id) {
      let vm = this;
      let urlDashboard = "http://220.130.131.251:8887/webApi/dashboard";
      let Statusdata = [];
      vm.data = [];
      vm.macAddress = [];
      vm.total = 0;
      vm.statusColor = {
        downTime: 0,
        Idle: 0,
        abnormal: 0,
        normal: 0
      };

      // control tab active class
      var $$ = this.$$;
      $$(".link .tab-link").on("click", function(e) {
        $$(".link .tab-link").removeClass("tab-link-active");
        $$(this)
          .toggleClass("tab-link-active");
      });

      vm.headers.headers.groupId = id;
      Axios.get(urlDashboard, this.headers).then(response => {
        if (response.data.data != null) {
          vm.total = response.data.data.length;
          response.data.data.forEach(function(item) {
            if (item.StatusColor == 3) {
              vm.statusColor.Idle = vm.statusColor.Idle + 1;
              item.StatusColor = "color-theme-orange";
            } else if (item.StatusColor == 4) {
              vm.statusColor.abnormal = vm.statusColor.abnormal + 1;
              item.StatusColor = "color-theme-red";
            } else if (item.StatusColor == 5) {
              vm.statusColor.normal = vm.statusColor.normal + 1;
              item.StatusColor = "color-theme-green";
            } else {
              vm.statusColor.downTime = vm.statusColor.downTime + 1;
              item.StatusColor = "color-theme-gray";
            }
            item.Progress = Math.round(item.Progress);
            item.PlanTimes = vm.TimeRefomate(item.PlanTimes);
            vm.macAddress.push(item.MacAddress);
            vm.data.push(item);
          });
          Statusdata.push({
            category: "StatusBar",
            Idle: vm.statusColor.Idle,
            abnormal: vm.statusColor.abnormal,
            normal: vm.statusColor.normal,
            downTime: vm.statusColor.downTime
          });
          vm.makeChart(Statusdata, id);
          vm.getMachineData(vm.macAddress, id);
        }
      });
    },
    async getMachineData(IDdata, id) {
      let vm = this;
      let urlDashboard = "http://220.130.131.251:8887/webApi/gyrByMachineId";
      IDdata.forEach(function(item) {
        vm.headers.headers.machineId = item;
        Axios.get(urlDashboard, vm.headers).then(response => {
          if (response.data.data != null) {
            vm.machineChart(response.data.data, item + "-" + id);
          }
          // vm.machineChart(response.data.data, item);
        });
      });
    },
    makeChart: function(data, id) {
      var chart = am4core.create("chartdiv-" + id, am4charts.XYChart);
      chart.colors.step = 2;
      chart.height = am4core.percent(80);
      chart.data = data;

      // Create axes
      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 25;
      categoryAxis.renderer.labels.template.disabled = true;

      var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      // valueAxis.renderer.minWidth = 10;
      valueAxis.strictMinMax = true;
      valueAxis.renderer.grid.template.disabled = true;

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = "normal";
      series.dataFields.categoryY = "category";
      series.name = "Series 1";
      series.dataItems.template.locations.categoryY = 0.5;
      series.stacked = true;
      series.columns.template.fill = am4core.color("#4cd964");
      series.columns.template.stroke = am4core.color("#ffffff");

      var series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.name = "Series 2";
      series2.dataFields.categoryY = "category";
      series2.dataFields.valueX = "Idle";
      series2.dataItems.template.locations.categoryY = 0.5;
      series2.stacked = true;
      series2.columns.template.fill = am4core.color("#ff9500");
      series2.columns.template.stroke = am4core.color("#ffffff");

      var series3 = chart.series.push(new am4charts.ColumnSeries());
      series3.name = "Series 3";
      series3.dataFields.categoryY = "category";
      series3.dataFields.valueX = "abnormal";
      series3.dataItems.template.locations.categoryY = 0.5;
      series3.stacked = true;
      series3.columns.template.fill = am4core.color("#ff3b30");
      series3.columns.template.stroke = am4core.color("#ffffff");

      var series4 = chart.series.push(new am4charts.ColumnSeries());
      series4.name = "Series 4";
      series4.dataFields.categoryY = "category";
      series4.dataFields.valueX = "downTime";
      series4.dataItems.template.locations.categoryY = 0.5;
      series4.stacked = true;
      series4.columns.template.fill = am4core.color("#8e8e93");
      series4.columns.template.stroke = am4core.color("#ffffff");

      // Set cell size in pixels
      // var cellSize = 30;
      // chart.events.on("datavalidated", function(ev) {
      //   // Get objects of interest
      //   var chart = ev.target;
      //   var categoryAxis = chart.yAxes.getIndex(0);

      //   // Calculate how we need to adjust chart height and width
      //   var adjustHeight =
      //     chart.data.length * cellSize - categoryAxis.pixelHeight;

      //   var adjustWidth =
      //     chart.data.length * cellSize - categoryAxis.pixelWidth;

      //   // get current chart height and width
      //   var targetHeight = chart.pixelHeight + adjustHeight;
      //   var targeWidth = chart.pixelWidth + adjustWidth;

      //   // Set it on chart's container
      //   chart.svgContainer.htmlElement.style.height = targetHeight + "px";
      //   chart.svgContainer.htmlElement.style.width = targeWidth + "px";
      //   console.log(targetHeight);
      // });
    },
    async machineChart(data, id) {
      // Themes begin
      // am4core.useTheme(am4themes_animated);
      // // Themes end
      // // Create chart instance
      var chart = am4core.create(id, am4charts.XYChart);
      chart.preloader.disabled = true;
      chart.data = data;
      chart.width = am4core.percent(100);

      // Create axes
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "Time";
      // categoryAxis.title.text = "Local country offices";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.cellStartLocation = 0.1;
      categoryAxis.renderer.cellEndLocation = 0.9;
      categoryAxis.renderer.labels.template.disabled = true;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      // valueAxis.title.text = "Expenditure (M)";
      valueAxis.renderer.labels.template.disabled = true;
      // Create series
      function createSeries(field, name, stacked, color) {
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = field;
        series.dataFields.categoryX = "Time";
        series.name = name;
        // series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
        series.stacked = stacked;
        series.columns.template.stroke = am4core.color("#ddf1fb");
        series.columns.template.fill = am4core.color(color);
        series.columns.template.width = am4core.percent(100);
      }

      createSeries("GreenProduction", "GreenProduction", true, "#4cd964");
      createSeries("YellowProduction", "YellowProduction", true, "#f9f900");
      createSeries("RedProduction", "RedProduction", true, "#ff3b30");
    },
    TimeRefomate: function(second) {
      var seconds = parseInt(second, 10);
      var days = Math.floor(seconds / (3600 * 24));
      seconds -= days * 3600 * 24;
      var hrs = Math.floor(seconds / 3600);
      seconds -= hrs * 3600;
      var mnts = Math.floor(seconds / 60);
      seconds -= mnts * 60;
      var TimeString = "";

      if (days >= 1) {
        TimeString += days + "D " + hrs + "H ";
      } else {
        TimeString += hrs + "H " + mnts + "M ";
      }

      return TimeString;
    },
    showIndicator: function() {
      indicator = chart.tooltipContainer.createChild(am4core.Container);
      indicator.background.fill = am4core.color("#fff");
      indicator.background.fillOpacity = 0.8;
      indicator.width = am4core.percent(100);
      indicator.height = am4core.percent(100);

      let indicatorLabel = indicator.createChild(am4core.Label);
      indicatorLabel.text = "Loading stuff...";
      indicatorLabel.align = "center";
      indicatorLabel.valign = "middle";
      indicatorLabel.fontSize = 20;
    }
  },

  mounted() {
    // am4core.useTheme(am4themes_animated);
    this.getGroupData(1);
    // this.makeChart();
  }
};
</script>
<style>
#tab-block {
  background-color: #ddf1fb;
  color: #757575;

}
</style>
