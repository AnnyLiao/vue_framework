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
            <f7-button small fill @click="getMachineName" id="submit">確認</f7-button>
          </f7-col>
          <f7-col width="20" id="timeline_mn"></f7-col>
        </f7-row>
      </f7-block>
    </f7-navbar>

    <!-- Timeline -->
    <div class="timeline">
      <!-- Timeline item with special timeline elements -->
      <div class="timeline-item" v-for="(schedult, index) in schedults" :key="index">
        <div class="timeline-item-date">
          {{schedult.TimeStartinput.split(" ")[0]}}
          <br />
          {{schedult.TimeStartinput.split(" ")[1]}}
        </div>
        <div class="timeline-item-divider" :style="`background: ${schedult.ScheduleColor}`"></div>
        <div class="timeline-item-content">
          <div
            class="timeline-item-inner adjust-width"
            :style="`border: 2px solid ${schedult.ScheduleColor};`"
          >
            <div class="timeline-item-time">{{schedult.ScheduleSerial}}</div>
          </div>
          <p class="adjust-text" :style="`color: ${schedult.ScheduleColor}`">{{schedult.SchedultStatus}}</p>
          <i
            class="icon material-icons color-theme-green"
            v-if="schedult.SchedultStatus == '進行中'"
          >person</i>
          <div class="timeline-item-inner" :style="`border: 2px solid ${schedult.ScheduleColor};`">
            <f7-block>
              <div class="flex-item justify-content-center text-align-center">
                <div>
                  <p>
                    {{schedult.TimeStartinput.split(" ")[0].split("/")[1] + "/" + schedult.TimeStartinput.split(" ")[0].split("/")[2]}}
                    <br />
                    {{schedult.TimeStartinput.split(" ")[1]}}
                  </p>
                </div>
                <div class="item-right">
                  <p>
                    {{schedult.TimeStartinput.split(" ")[0].split("/")[1] + "/" + schedult.TimeStartinput.split(" ")[0].split("/")[2]}}
                    <br />
                    {{schedult.TimeEndoutput.split(" ")[1]}}
                  </p>
                </div>
              </div>
              <div class="flex">
                <div class="item" :style="`border: 2px solid ${schedult.ScheduleColor};`">
                  <p>開始</p>
                </div>
                <div class="item2 flex-2">
                  <p>生產數量 {{schedult.Qty}}</p>
                  <hr />
                  <p>預計週期時間 {{schedult.CycleTime}}s</p>
                </div>
                <div class="item end-circle" :style="`border: 2px solid ${schedult.ScheduleColor}; background: ${schedult.ScheduleColor};`">
                  <p>結束</p>
                </div>
              </div>
              <div class="flex-item">
                <div>
                  <p>製品編號: {{schedult.ProductNumber}}</p>
                </div>
                <div class="item-right">
                  <p>模具編號: {{schedult.MoldNumber}}</p>
                </div>
              </div>
            </f7-block>
          </div>
        </div>
      </div>
    </div>
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
      schedults: [],
      equipment: [],
      machineName: "",
      machineId: "",
      token: "82589155"
    };
  },
  created() {},
  beforeMount() {
    this.getEquipment(1);
  },
  methods: {
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
    getSchedult() {
      let vm = this;
      let $$ = this.$$;
      let urlDashboard =
        "http://220.130.131.251:8887/webApi/nextScheduleByMachineId";
      let headers = {
        headers: {
          token: vm.token,
          machineId: vm.machineId,
          number: 3
        }
      };

      // Axios.get(urlDashboard, headers).then(response => {
      //   vm.equipment = [];
      //   if (response.data.data != null) {
      //     response.data.data.forEach(function(item) {
      //       vm.equipment.push({
      //         MachineNumber: item.MachineNumber,
      //         MacAddress: item.MacAddress,
      //         MachineName: item.MachineName
      //       });
      //     });
      //   }
      // });

      // 暫時
      vm.schedults = [
        {
          ScheduleSerial: "2019050109",
          MoldNumber: "5635N",
          Qty: 12152,
          TimeStartinput: "2019/04/30 9:00",
          ProductNumber: "5635N",
          SchedultStatus: "待完成",
          ScheduleColor: "#1e90ff",
          CycleTime: "60",
          TimeEndoutput: "2019/04/30 16:00"
        },
        {
          ScheduleSerial: "2019050110",
          MoldNumber: "5635N",
          Qty: 12152,
          TimeStartinput: "2019/04/28 9:00",
          ProductNumber: "5635N",
          SchedultStatus: "進行中",
          ScheduleColor: "#4cd964",
          CycleTime: "60",
          TimeEndoutput: "2019/04/30 16:00"
        },
        {
          ScheduleSerial: "2019050111",
          MoldNumber: "5635N",
          Qty: 12152,
          TimeStartinput: "2019/04/27 9:00",
          ProductNumber: "5635N",
          SchedultStatus: "已完成",
          ScheduleColor: "#93a4b5",
          CycleTime: "60",
          TimeEndoutput: "2019/04/30 16:00"
        },
        {
          ScheduleSerial: "2019050111",
          MoldNumber: "5635N",
          Qty: 12152,
          TimeStartinput: "2019/04/27 9:00",
          ProductNumber: "5635N",
          SchedultStatus: "已完成",
          ScheduleColor: "#93a4b5",
          CycleTime: "60",
          TimeEndoutput: "2019/04/30 16:00"
        }
      ];
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
    },
    getMachineName() {
      let vm = this;
      let $$ = this.$$;
      $$("#timeline_mn").text(vm.machineName);
      this.getSchedult();
    }
  },
  mounted() {
    // this.getEquipment(1);
  }
};
</script>

<style>
.timeline-item-date {
  width: auto;
}

.radius {
  border-radius: 100%;
  border: 2px solid #73ad21;
  padding: 20px;
  width: auto;
  height: auto;
}

.flex {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
hr {
  width: 100%;
  height: 1px;
}
.item {
  width: 10px;
  height: 10px;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border-radius: 100%;
  border: 2px solid #1e90ff;
  padding: 20px;
}

.end-item {
  background-color: #1e90ff;
  color: white;
}

.item2 {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  text-align: center;
}

.flex-2 {
  width: 60vw;
  height: 120px;
  display: flex;
  flex-direction: column;
}

.flex-item {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 10px;
}

.item-right {
  margin-left: auto;
}

.adjust-width {
  display: inline-block;
  width: fit-content;
}

.adjust-text {
  display: inline-block;
}

.end-circle {
  background-color: #1e90ff;
  color: #fff;
}

.timeline-item-inner {
  border: 2px solid dodgerblue;
}

.timeline-item-divider:after {
  background: #bbb;
}

.timeline-item-divider:before {
  background: #bbb;
}

.timeline-item-divider {
  background: #1e90ff;
  margin: 17px var(--f7-timeline-divider-margin-horizontal) 0;
}
</style>

