<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
    <f7-login-screen-title>Framework7</f7-login-screen-title>
    <f7-list form>
      <f7-list-input
        label="Username"
        type="text"
        placeholder="Your username"
        :value="username"
        @input="username = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Password"
        type="password"
        placeholder="Your password"
        :value="password"
        @input="password = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="IP"
        type="text"
        placeholder="IP"
        :value="ip"
        @input="ip = $event.target.value"
      ></f7-list-input>
    </f7-list>
    <f7-list>
      <f7-list-button @click="signIn">Sign In</f7-list-button>
      <f7-block-footer>
        Some text about login information.
        <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </f7-block-footer>
    </f7-list>
  </f7-page>
</template>

<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      username: "",
      password: "",
      ip: ""
    };
  },
  methods: {
    signIn() {
      const self = this;
      const app = self.$f7;
      const router = self.$f7router;
      localStorage.clear();
      sessionStorage.setItem("logined", true);
      localStorage.setItem("ip", self.ip);
      app.dialog.alert(
        `Username: ${self.username}<br>Password: ${md5(self.password)}`,
        () => {
          router.navigate(router.currentRoute.url, {
            reloadCurrent: true,
            ignoreCache: true
          });
        }
      );
    }
  }
};
</script>