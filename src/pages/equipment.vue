<template>
  <f7-page name="about">
    <!-- <f7-navbar title="About" back-link="Back"></f7-navbar> -->
    <f7-navbar :sliding="false">
      <f7-block no-hairlines style="width: 100%">
        <f7-row>
          <f7-col width="30">
            <f7-input
              type="select"
              outline
              id="groupId"
              @change="groupIdchange"
              @input="groupIdchange"
            >
              <option hidden>Choose</option>
              <option value="1">第一車間</option>
              <option value="2">第二車間</option>
            </f7-input>
          </f7-col>
          <f7-col width="30">
            <f7-input
              type="select"
              outline
              id="macAddress"
              @change="MacAddressChange"
              @input="MacAddressChange"
            >
              <option hidden>Choose</option>
              <option
                v-for="(option, index) in equipment"
                :key="index"
                :value="option.MacAddress"
              >設備 {{ option.MachineNumber }}</option>
            </f7-input>
          </f7-col>
          <f7-col width="20">
            <f7-button small fill @click="getMachineName" id="submit" disabled>確認</f7-button>
          </f7-col>
          <f7-col width="20" id="MN"></f7-col>
        </f7-row>
      </f7-block>
    </f7-navbar>
    <f7-block>
      <f7-segmented raised tag="p">
        <f7-button
          v-for="(btn, index) in segment_btn"
          :key="btn"
          :active="index === 0"
          @click="swpier(index)"
          outline
        >{{btn}}</f7-button>
      </f7-segmented>
      <f7-swiper pagination>
        <f7-swiper-slide>
          <f7-block inset strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni molestiae laudantium dignissimos est nobis delectus nemo ea alias voluptatum architecto, amet similique, saepe iste consectetur in repellat ut minus quibusdam!</p>
            <p>Molestias et distinctio porro nesciunt ratione similique, magni doloribus, rerum nobis, aliquam quae reiciendis quasi modi. Nam a recusandae, fugiat in ea voluptates fuga eius, velit corrupti reprehenderit dignissimos consequatur!</p>
            <p>Blanditiis, cumque quo adipisci. Molestiae, dolores dolorum quos doloremque ipsa ullam eligendi commodi deserunt doloribus inventore magni? Ea mollitia veniam nostrum nihil, iusto doloribus a at! Ea molestiae ullam delectus!</p>
          </f7-block>
        </f7-swiper-slide>
        <f7-swiper-slide>
          <f7-block inset strong class="text-align-center">
            <f7-row>
              <f7-col>
                <h1>U</h1>
                <f7-col id="Chart_U"></f7-col>
                <h4>
                  <i class="icon material-icons">history</i>
                  {{Today_UAPQ.U}}
                </h4>
              </f7-col>
              <f7-col>
                <h1>A</h1>
                <f7-col id="Chart_A"></f7-col>
                <h4>
                  <i class="icon material-icons">history</i>
                  {{Today_UAPQ.A}}
                </h4>
              </f7-col>
            </f7-row>
            <f7-row>
              <f7-col>
                <h1>P</h1>
                <f7-col id="Chart_P"></f7-col>
                <h4>
                  <i class="icon material-icons">history</i>
                  {{Today_UAPQ.P}}
                </h4>
              </f7-col>
              <f7-col>
                <h1>Q</h1>
                <f7-col id="Chart_Q"></f7-col>
                <h4>
                  <i class="icon material-icons">history</i>
                  {{Today_UAPQ.Q}}
                </h4>
              </f7-col>
            </f7-row>
          </f7-block>
        </f7-swiper-slide>
        <f7-swiper-slide>Slide 3</f7-swiper-slide>
        <f7-swiper-slide>Slide 3</f7-swiper-slide>
      </f7-swiper>
    </f7-block>
  </f7-page>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
export default {
  data() {
    return {
      segment_btn: ["即時", "UAPQ", "品質", "週期"],
      colors: ["#db2828", "#eb7318", "#fbbd08", "#8ebc27", "#21ba45"],
      equipment: [],
      machineName: "",
      machineId: "",
      token: "82589155",
      Today_UAPQ: {},
      Interval_UAPQ: {}
    };
  },
  created() {},
  beforeMount() {
    am4core.useTheme(am4themes_animated);
    this.getEquipment(1);
  },
  methods: {
    swpier(index) {
      const self = this;
      const app = self.$f7;
      var $$ = this.$$;
      $$(".segmented .button").on("click", function(e) {
        $$(".segmented .button").removeClass("button-active");
        $$(this).toggleClass("button-active");
      });
      var swiper = app.swiper.get(".swiper-container");
      swiper.slideTo(index);
    },
    getEquipment: function(groupId) {
      let vm = this;
      let $$ = this.$$;
      let urlDashboard = "http://220.130.131.251:8887/webApi/dashboard";
      let headers = {
        headers: {
          token: vm.token,
          groupId: groupId
        }
      };

      Axios.get(urlDashboard, headers).then(response => {
        vm.equipment = [];
        if (response.data.data != null) {
          response.data.data.forEach(function(item) {
            vm.equipment.push({
              MachineNumber: item.MachineNumber,
              MacAddress: item.MacAddress,
              MachineName: item.MachineName
            });
          });
        }
      });
    },
    groupIdchange(e) {
      const selectedCode = e.target.value;
      this.getEquipment(selectedCode);
      // const option = this.options.find((option) => {
      //   return selectedCode === option.code;
      // });
      // this.$emit("input", option);
    },
    MacAddressChange(e) {
      let vm = this;
      let $$ = this.$$;
      const address = e.target.value;
      vm.equipment.forEach(function(item) {
        if (item.MacAddress == address) {
          vm.machineName = item.MachineName;
          vm.machineId = item.MacAddress;
        }
      });

      $$("#submit").removeClass("disabled");
    },
    UAPQdata(machineId) {
      let vm = this;
      let now = new Date();
      let endtime = Math.floor(now.getTime()) - 300000;
      let starttime = endtime - 300000;
      let urlDashboard =
        "http://220.130.131.251:8887/webApi/teepByMachineIdTimeRangeInterval";
      let headers = {
        headers: {
          token: vm.token,
          machineId: machineId,
          startTime: starttime,
          endTime: endtime,
          mode: 0
        }
      };

      Axios.get(urlDashboard, headers).then(response => {
        if (response.data.data != null) {
          vm.Today_UAPQ = response.data.data;
        }
      });

      headers.headers.mode = 1;
      Axios.get(urlDashboard, headers).then(response => {
        if (response.data.data != null) {
          vm.Interval_UAPQ = response.data.data;
          this.UAPQchart();
        }
      });
    },
    UAPQchart() {
      let vm = this;
      Object.keys(vm.Interval_UAPQ).forEach(item => {
        if (item != "timestamp") {
          // Create chart instance
          var chart = am4core.create("Chart_" + item, am4charts.RadarChart);
          // Add data
          chart.data = [
            {
              category: item,
              value: Math.round(vm.Interval_UAPQ[item]), // Math.floor(Math.random()*100)
              full: 100
            }
          ];

          // Make chart not full circle
          chart.startAngle = 180;
          chart.endAngle = 360;
          chart.innerRadius = am4core.percent(60);
          chart.height = am4core.percent(80);

          // Create axes
          var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = "category";
          categoryAxis.renderer.grid.template.location = 0;
          categoryAxis.renderer.grid.template.strokeOpacity = 0;
          categoryAxis.renderer.labels.template.horizontalCenter = "right";
          categoryAxis.renderer.labels.template.fontWeight = 500;
          categoryAxis.renderer.labels.template.adapter.add("fill", function(
            fill,
            target
          ) {
            return target.dataItem.index >= 0
              ? chart.colors.getIndex(target.dataItem.index)
              : fill;
          });
          categoryAxis.renderer.minGridDistance = 10;
          categoryAxis.renderer.labels.template.disabled = true;

          var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
          valueAxis.renderer.grid.template.strokeOpacity = 0;
          valueAxis.min = 0;
          valueAxis.max = 100;
          valueAxis.strictMinMax = true;
          valueAxis.renderer.labels.template.disabled = true;

          // Create series
          var series1 = chart.series.push(new am4charts.RadarColumnSeries());
          series1.dataFields.valueX = "full";
          series1.dataFields.categoryY = "category";
          series1.clustered = false;
          series1.columns.template.fill = new am4core.InterfaceColorSet().getFor(
            "alternativeBackground"
          );
          series1.columns.template.fillOpacity = 0.08;
          series1.columns.template.cornerRadiusTopLeft = 0;
          series1.columns.template.strokeWidth = 0;
          series1.columns.template.radarColumn.cornerRadius = 0;

          var series2 = chart.series.push(new am4charts.RadarColumnSeries());
          series2.dataFields.valueX = "value";
          series2.dataFields.categoryY = "category";
          series2.clustered = false;
          series2.columns.template.strokeWidth = 0;
          /* series2.columns.template.tooltipText = "{category}: [bold]{value}[/]"; */
          series2.columns.template.radarColumn.cornerRadius = 0;

          // series2.columns.template.stroke = am4core.color("#ffffff");

          if (chart.data[0].value <= 10) {
            series2.columns.template.radarColumn.fill = am4core.color(
              vm.colors[0]
            );
          } else if (chart.data[0].value > 10 && chart.data[0].value <= 25) {
            series2.columns.template.radarColumn.fill = am4core.color(
              vm.colors[1]
            );
          } else if (chart.data[0].value > 25 && chart.data[0].value <= 50) {
            series2.columns.template.radarColumn.fill = am4core.color(
              vm.colors[2]
            );
          } else if (chart.data[0].value > 50 && chart.data[0].value <= 75) {
            series2.columns.template.radarColumn.fill = am4core.color(
              vm.colors[3]
            );
          } else {
            series2.columns.template.radarColumn.fill = am4core.color(
              vm.colors[4]
            );
          }

          series2.columns.template.adapter.add("fill", function(fill, target) {
            return chart.colors.getIndex(target.dataItem.index);
          });

          let label = chart.createChild(am4core.Label);
          label.text = chart.data[0].value + "%";
          label.fontSize = 15;
          label.align = "center";
          label.isMeasured = false;
          label.x = am4core.percent(50);
          label.y = am4core.percent(55);
          label.horizontalCenter = "middle";
        }
      });
    },
    getMachineName() {
      let vm = this;
      let $$ = this.$$;
      $$("#MN").text(vm.machineName);
      this.UAPQdata(vm.machineId);
    }
  },
  mounted() {
    this.swpier(0);

    // this.getEquipment(1);
  }
};
</script>

