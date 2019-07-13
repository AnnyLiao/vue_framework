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
          <f7-col width="20" id="MN"></f7-col>
        </f7-row>
      </f7-block>
    </f7-navbar>
    
      <!-- Timeline -->
      <div class="timeline">
        <!-- Timeline item with special timeline elements -->
        <div class="timeline-item">
          <div class="timeline-item-date">
            2019-05-21<br>09:45
          </div>
          <div class="timeline-item-divider"></div>
          <div class="timeline-item-content">
            <div class="timeline-item-inner">
              <div class="timeline-item-time">A1905200020</div>
            </div>
            <div class="timeline-item-inner">
              <!-- <div class="timeline-item-title">Item Title</div>
              <div class="timeline-item-subtitle">Item Subtitle</div>
              <div class="timeline-item-text">Item Text</div> -->
              
            </div>
          </div>
        </div>
        <!-- Timeline item with special timeline elements -->
        <div class="timeline-item">
          <div class="timeline-item-date">
            2019-05-21<br>09:45
          </div>
          <div class="timeline-item-divider"></div>
          <div class="timeline-item-content">
            <div class="timeline-item-inner">
              <div class="timeline-item-time">A1905200020</div>
            </div>
            <div class="timeline-item-inner">
              <div class="timeline-item-title">Item Title</div>
              <div class="timeline-item-subtitle">Item Subtitle</div>
              <div class="timeline-item-text">Item Text</div>
            </div>
          </div>
        </div>
        <!-- Timeline item with special timeline elements -->
        <div class="timeline-item">
          <div class="timeline-item-date">
            2019-05-21<br>09:45
          </div>
          <div class="timeline-item-divider"></div>
          <div class="timeline-item-content">
            <div class="timeline-item-inner">
              <div class="timeline-item-time">A1905200020</div>
            </div>
            <div class="timeline-item-inner">
              <div class="timeline-item-title">Item Title</div>
              <div class="timeline-item-subtitle">Item Subtitle</div>
              <div class="timeline-item-text">Item Text</div>
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
      $$("#MN").text(vm.machineName);
      // this.UAPQdata(vm.machineId);
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
</style>

