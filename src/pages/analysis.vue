<template>
  <f7-page :page-content="false">
    <f7-navbar></f7-navbar>
    <f7-toolbar tabbar scrollable :position="isBottom ? 'top' : 'bottom'">
      <f7-link
        v-for="(tab, index) in tabs"
        :key="tab"
        :tab-link="`#analysis-${tab}`"
        :tab-link-active="index === 0"
        @click="getGroupData(tab)"
      >第{{tabsC[index]}}車間</f7-link>
    </f7-toolbar>
    <f7-tabs>
      <f7-tab
        v-for="(tab, index) in tabs"
        :key="tab"
        :id="`analysis-${tab}`"
        class="page-content"
        :tab-active="index === 0"
      >
        <f7-block>
          <f7-segmented raised tag="p" tabbar>
            <f7-button
              v-for="(btn, index) in segment_btn"
              :key="btn"
              :tab-link="`#subtab-${index+1}-${tab}`"
              :tab-link-active="index === 0"
              outline
            >{{btn}}</f7-button>
          </f7-segmented>

          <f7-tabs swipeable>
            <f7-tab :id="`subtab-1-${tab}`" tab-active>
              <f7-row class="justify-content-center">
                <f7-col>
                  <i class="icon material-icons color-theme-green">stop</i>
                  正常
                </f7-col>
                <f7-col>
                  <i class="icon material-icons color-theme-orange">stop</i>
                  閒置
                </f7-col>
                <f7-col>
                  <i class="icon material-icons color-theme-red">stop</i>
                  異常
                </f7-col>
                <f7-col>
                  <i class="icon material-icons color-theme-gray">stop</i>
                  停機
                </f7-col>
              </f7-row>
              <f7-row>
                <f7-col :id="`chart-${tab}`"></f7-col>
              </f7-row>
            </f7-tab>
            <f7-tab :id="`subtab-2-${tab}`">
              <f7-block>
                <p>Tab 2 content</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit temporibus sequi iure ad laboriosam accusamus?</p>
                <p>Saepe explicabo voluptas ducimus provident, doloremque quo totam molestias! Suscipit blanditiis eaque exercitationem praesentium reprehenderit, fuga accusamus possimus sed, sint facilis ratione quod, qui dignissimos voluptas! Aliquam rerum consequuntur deleniti.</p>
                <p>Totam reprehenderit amet commodi ipsum nam provident doloremque possimus odio itaque, est animi culpa modi consequatur reiciendis corporis libero laudantium sed eveniet unde delectus a maiores nihil dolores? Natus, perferendis.</p>
                <p>Atque quis totam repellendus omnis alias magnam corrupti, possimus aspernatur perspiciatis quae provident consequatur minima doloremque blanditiis nihil maxime ducimus earum autem. Magni animi blanditiis similique iusto, repellat sed quisquam!</p>
                <p>Suscipit, facere quasi atque totam. Repudiandae facilis at optio atque, rem nam, natus ratione cum enim voluptatem suscipit veniam! Repellat, est debitis. Modi nam mollitia explicabo, unde aliquid impedit! Adipisci!</p>
                <p>Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste fugiat iusto dolorem autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro accusantium, officiis veniam nostrum cum cumque impedit.</p>
                <p>Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad praesentium rerum libero consectetur temporibus cupiditate atque aspernatur, eaque provident eligendi quaerat ea soluta doloremque. Iure fugit, minima facere.</p>
              </f7-block>
            </f7-tab>
            <f7-tab :id="`subtab-3-${tab}`">
              <f7-block>
                <p>Tab 3 content</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit temporibus sequi iure ad laboriosam accusamus?</p>
                <p>Saepe explicabo voluptas ducimus provident, doloremque quo totam molestias! Suscipit blanditiis eaque exercitationem praesentium reprehenderit, fuga accusamus possimus sed, sint facilis ratione quod, qui dignissimos voluptas! Aliquam rerum consequuntur deleniti.</p>
                <p>Totam reprehenderit amet commodi ipsum nam provident doloremque possimus odio itaque, est animi culpa modi consequatur reiciendis corporis libero laudantium sed eveniet unde delectus a maiores nihil dolores? Natus, perferendis.</p>
                <p>Atque quis totam repellendus omnis alias magnam corrupti, possimus aspernatur perspiciatis quae provident consequatur minima doloremque blanditiis nihil maxime ducimus earum autem. Magni animi blanditiis similique iusto, repellat sed quisquam!</p>
                <p>Suscipit, facere quasi atque totam. Repudiandae facilis at optio atque, rem nam, natus ratione cum enim voluptatem suscipit veniam! Repellat, est debitis. Modi nam mollitia explicabo, unde aliquid impedit! Adipisci!</p>
                <p>Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste fugiat iusto dolorem autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro accusantium, officiis veniam nostrum cum cumque impedit.</p>
                <p>Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad praesentium rerum libero consectetur temporibus cupiditate atque aspernatur, eaque provident eligendi quaerat ea soluta doloremque. Iure fugit, minima facere.</p>
              </f7-block>
            </f7-tab>
          </f7-tabs>
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
import {
  f7Navbar,
  f7Page,
  f7Block,
  f7Tabs,
  f7Tab,
  f7Link,
  f7Toolbar
} from "framework7-vue";
export default {
  components: {
    f7Navbar,
    f7Page,
    f7Block,
    f7Tabs,
    f7Tab,
    f7Link,
    f7Toolbar
  },
  data: function() {
    let ip = this.$f7.data.ip;
    return {
      tabs: [1, 2, 3],
      tabsC: ["一", "二", "三"],
      segment_btn: ["稼動分析", "總產量分析", "工時產量分析"],
      isBottom: true,
      headers: {
        headers: {
          token: "82589155"
          //   groupId: 1
        }
      },
      token: "",
      ip: ip
    };
  },
  beforeMount() {
    am4core.useTheme(am4themes_animated);
  },
  methods: {
    getGroupData: function(id) {
      let vm = this;
      let urlDashboard =
        "http://" + vm.ip + "/analysisApi/wholePlant/utilizationAnalysis";
      let yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date());
      let endtime = yesterday.setHours(23, 59, 59, 999);
      let starttime = yesterday.setHours(0, 0, 0, 0);

      vm.headers.headers.startTime = starttime;
      vm.headers.headers.endTime = endtime;
      vm.headers.headers.groupId = id;
      Axios.get(urlDashboard, this.headers).then(response => {
        if (response.data.data != null) {
          // response.data.data.forEach(function(item) {

          // });
          vm.makeChart(response.data.data, id);
        }
      });
    },
    makeChart: function(data, id) {
      var chart = am4core.create("chart-" + id, am4charts.XYChart);
      // chart.height = am4core.percent(100);
      chart.data = data;

      // Create axes
      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "MachineNumber";
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 15;

      // categoryAxis.renderer.labels.template.disabled = true;

      var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.max = 100;
      valueAxis.strictMinMax = true;
      valueAxis.calculateTotals = true;
      valueAxis.renderer.minWidth = 100;
      // This adapter adds custom text to the label
      valueAxis.renderer.labels.template.adapter.add(
        "text",
        (label, target, key) => {
          return label + "%";
        }
      );

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = "Normal";
      series.dataFields.categoryY = "MachineNumber";
      // series.dataItems.template.locations.categoryY = 0.5;
      series.columns.template.width = am4core.percent(100);
      series.stacked = true;
      series.columns.template.fill = am4core.color("#4cd964");
      series.columns.template.stroke = am4core.color("#ffffff");

      var series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.dataFields.categoryY = "MachineNumber";
      series2.dataFields.valueX = "Idle";
      // series2.dataItems.template.locations.categoryY = 0.5;
      series2.columns.template.width = am4core.percent(100);
      series2.stacked = true;
      series2.columns.template.fill = am4core.color("#ff9500");
      series2.columns.template.stroke = am4core.color("#ffffff");

      var series3 = chart.series.push(new am4charts.ColumnSeries());
      series3.dataFields.categoryY = "MachineNumber";
      series3.dataFields.valueX = "Abnormal";
      // series3.dataItems.template.locations.categoryY = 0.5;
      series3.columns.template.width = am4core.percent(100);
      series3.stacked = true;
      series3.columns.template.fill = am4core.color("#ff3b30");
      series3.columns.template.stroke = am4core.color("#ffffff");

      var series4 = chart.series.push(new am4charts.ColumnSeries());
      series4.dataFields.categoryY = "MachineNumber";
      series4.dataFields.valueX = "Dead";
      // series4.dataItems.template.locations.categoryY = 0.5;
      series4.columns.template.width = am4core.percent(100);
      series4.stacked = true;
      series4.columns.template.fill = am4core.color("#8e8e93");
      series4.columns.template.stroke = am4core.color("#ffffff");

      let cellSize = 50;
      chart.events.on("datavalidated", function(ev) {
        // Get objects of interest
        let chart = ev.target;
        let categoryAxis = chart.yAxes.getIndex(0);

        // Calculate how we need to adjust chart height
        let adjustHeight =
          chart.data.length * cellSize - categoryAxis.pixelHeight;

        // get current chart height
        let targetHeight = chart.pixelHeight + adjustHeight;

        // Set it on chart's container
        chart.svgContainer.htmlElement.style.height = targetHeight + "px";
      });
    }
  },
  mounted() {
    // am4core.useTheme(am4themes_animated);
    this.getGroupData(1);
    // this.swpier(0);
    // this.makeChart();
  }
};
</script>

