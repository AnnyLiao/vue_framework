<template>
  <f7-page name="catalog">
    <f7-navbar back-link="Back"></f7-navbar>
    <f7-block>
      <f7-row>
        <f7-col>
          <f7-input
            type="select"
            outline
            id="setUp_groupId"
            @change="groupIdchange"
            @input="groupIdchange"
          >
            <option hidden>Choose</option>
            <option value="1">第一車間</option>
            <option value="2">第二車間</option>
          </f7-input>
        </f7-col>
        <f7-col>
          <f7-input
            type="select"
            outline
            id="setUp_macAddress"
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
        <f7-col>
          <f7-button small fill id="setUp_submit" disabled>確認</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-list inline-labels no-hairlines-md>
      <f7-list-input label="選擇看板" type="select" defaultValue="Male" placeholder="Please choose...">
        <option value="Male">單站看板</option>
        <option value="Female">Female</option>
      </f7-list-input>
      <f7-list-input
        label="選擇車間與設備"
        type="select"
        defaultValue="Male"
        placeholder="Please choose..."
      >
        <option value="Male">設備編號6</option>
        <option value="Female">Female</option>
      </f7-list-input>
      <f7-list-input label="選擇模式" type="select" defaultValue="Male" placeholder="Please choose...">
        <option value="Male">完工作量1</option>
        <option value="Female">Female</option>
      </f7-list-input>
      <f7-list-item title="狀態" after="EG異常"></f7-list-item>
      <f7-list-item title="操作">
        <f7-button small fill id="submit">確認</f7-button>
      </f7-list-item>
    </f7-list>
    <f7-block-footer>
      <p class="text-align-center">型創 IoM 1.0.0</p>
    </f7-block-footer>
  </f7-page>
</template>
<script>
import imageLink from "../static/cordova-android-icon.png";
export default {
  data: function() {
    let ip = this.$f7.data.ip;
    return {
      imageLink,
      equipment: [],
      token: "82589155",
      ip: ip
    };
  },
  methods: {
    getEquipment: function(groupId) {
      let vm = this;
      let $$ = this.$$;
      let urlDashboard = "http://" + vm.ip + "/webApi/dashboard";
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
      $$("#setUp_submit").removeClass("disabled");
    }
  }
};
</script>
