<template>
  <f7-app :params="f7params">
    <!-- Status bar overlay for fullscreen mode-->
    <f7-statusbar></f7-statusbar>

    <!-- Left panel with cover effect-->
    <!-- <f7-panel left cover theme-dark>
    <f7-view>
      <f7-page>
        <f7-navbar title="Left Panel"></f7-navbar>
        <f7-block>Left panel content goes here</f7-block>
      </f7-page>
    </f7-view>
    </f7-panel>-->

    <!-- Right panel with reveal effect-->
    <!-- <f7-panel right reveal theme-dark>
    <f7-view>
      <f7-page>
        <f7-navbar title="Right Panel"></f7-navbar>
        <f7-block>Right panel content goes here</f7-block>
      </f7-page>
    </f7-view>
    </f7-panel>-->

    <!-- Views/Tabs container -->
    <f7-views tabs class="safe-areas">
      <!-- Tabbar for switching views-tabs -->
      <f7-toolbar tabbar labels bottom>
        <f7-link
          tab-link="#view-home"
          tab-link-active
          icon-ios="f7:favorites"
          icon-aurora="f7:favorites"
          icon-md="material:assignment"
          text="看板"
        ></f7-link>
        <f7-link
          tab-link="#view-equipment"
          icon-ios="f7:perm_data_setting"
          icon-aurora="f7:perm_data_setting"
          icon-md="material:perm_data_setting"
          text="設備"
        ></f7-link>
        <f7-link
          tab-link="#view-calendar"
          icon-ios="f7:calendar"
          icon-aurora="f7:calendar"
          icon-md="material:event"
          text="排程"
        ></f7-link>
        <f7-link
          tab-link="#view-analysis"
          icon-ios="f7:graph_round_fill"
          icon-aurora="f7:graph_round_fill"
          icon-md="material:assessment"
          text="分析"
        ></f7-link>
        <f7-link
          tab-link="#view-settings"
          icon-ios="f7:settings_fill"
          icon-aurora="f7:settings_fill"
          icon-md="material:settings"
          text="設定"
        ></f7-link>
      </f7-toolbar>

      <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
      <f7-view id="view-home" main tab tab-active url="/"></f7-view>

      <!-- Catalog View -->
      <f7-view id="view-equipment" name="equipment" tab url="/equipment/"></f7-view>

      <!-- Catalog View -->
      <f7-view id="view-calendar" name="timeline" tab url="/timeline/"></f7-view>

      <!-- Catalog View -->
      <f7-view id="view-analysis" name="analysis" tab url="/analysis/"></f7-view>

      <!-- Settings View -->
      <f7-view id="view-settings" name="settings" tab url="/setUp/"></f7-view>
    </f7-views>

    <!-- Popup -->
    <f7-popup id="my-popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <p>Popup content goes here.</p>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-login-screen id="my-login-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
          <f7-list form>
            <f7-list-input
              type="text"
              name="username"
              placeholder="Your username"
              :value="username"
              @input="username = $event.target.value"
            ></f7-list-input>
            <f7-list-input
              type="password"
              name="password"
              placeholder="Your password"
              :value="password"
              @input="password = $event.target.value"
            ></f7-list-input>
          </f7-list>
          <f7-list>
            <f7-list-button title="Sign In" login-screen-close @click="alertLoginData"></f7-list-button>
            <f7-block-footer>
              Some text about login information.
              <br />Click "Sign In" to close Login Screen
            </f7-block-footer>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>
  </f7-app>
</template>
<script>
import cordovaApp from "../js/cordova-app.js";
import routes from "../js/routes.js";

export default {
  data() {
    return {
      // Framework7 Parameters
      f7params: {
        id: "io.framework7.myapp", // App bundle ID
        name: "My App", // App name
        theme: "auto", // Automatic theme detection
        // App root data
        data: function() {
          return {
            user: {
              firstName: "John",
              lastName: "Doe",
              
            },
            ip: localStorage.getItem("ip"),
            // Demo products for Catalog section
            products: [
              {
                id: "1",
                title: "Apple iPhone 8",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis."
              },
              {
                id: "2",
                title: "Apple iPhone 8 Plus",
                description:
                  "Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!"
              },
              {
                id: "3",
                title: "Apple iPhone X",
                description:
                  "Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum."
              }
            ]
          };
        },

        // App routes
        routes: routes,

        // Input settings
        input: {
          scrollIntoViewOnFocus: this.$device.cordova && !this.$device.electron,
          scrollIntoViewCentered: this.$device.cordova && !this.$device.electron
        },
        // Cordova Statusbar settings
        statusbar: {
          overlay: (this.$device.cordova && this.$device.ios) || "auto",
          iosOverlaysWebView: true,
          androidOverlaysWebView: false
        }
      },

      // Login screen data
      username: "",
      password: ""
    };
  },
  methods: {
    alertLoginData() {
      this.$f7.dialog.alert(
        "Username: " + this.username + "<br>Password: " + this.password
      );
    }
  },
  mounted() {
    this.$f7ready(f7 => {
      // Init cordova APIs (see cordova-app.js)
      if (f7.device.cordova) {
        cordovaApp.init(f7);
      }
      // Call F7 APIs here
    });
  }
};
</script>