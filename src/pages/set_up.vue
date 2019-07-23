<template>
  <f7-page name="catalog">
    <f7-navbar></f7-navbar>
    <f7-block>
      <f7-row>
        <f7-col width="20">
          <img :src="imageLink" style="width: 100%;" />
        </f7-col>
        <f7-col width="80">
          <h3>型創科技</h3>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-list>
      <f7-list-item
        title="看版管理"
        link="/dashboard_manage/"
      ></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
import imageLink from "../static/cordova-android-icon.png";
export default {
  data: function() {
    return {
      imageLink,
      
    };
  }
};
</script>
