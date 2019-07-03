<template>
  <f7-page name="about">
    <f7-navbar title="About" back-link="Back"></f7-navbar>
    <f7-block-title>About My App</f7-block-title>
    <f7-segmented raised tag="p">
      <f7-button @click="swpier(0)">Button</f7-button>
      <f7-button @click="swpier(1)">Button</f7-button>
      <f7-button  @click="swpier(2)">Active</f7-button>
    </f7-segmented>
    <f7-swiper pagination>
      <f7-swiper-slide>
        <f7-block id="abc">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni molestiae laudantium dignissimos est nobis delectus nemo ea alias voluptatum architecto, amet similique, saepe iste consectetur in repellat ut minus quibusdam!</p>
          <p>Molestias et distinctio porro nesciunt ratione similique, magni doloribus, rerum nobis, aliquam quae reiciendis quasi modi. Nam a recusandae, fugiat in ea voluptates fuga eius, velit corrupti reprehenderit dignissimos consequatur!</p>
          <p>Blanditiis, cumque quo adipisci. Molestiae, dolores dolorum quos doloremque ipsa ullam eligendi commodi deserunt doloribus inventore magni? Ea mollitia veniam nostrum nihil, iusto doloribus a at! Ea molestiae ullam delectus!</p>
        </f7-block>
      </f7-swiper-slide>
      <f7-swiper-slide>
        <f7-block>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni molestiae laudantium dignissimos est nobis delectus nemo ea alias voluptatum architecto, amet similique, saepe iste consectetur in repellat ut minus quibusdam!</p>
          <p>Molestias et distinctio porro nesciunt ratione similique, magni doloribus, rerum nobis, aliquam quae reiciendis quasi modi. Nam a recusandae, fugiat in ea voluptates fuga eius, velit corrupti reprehenderit dignissimos consequatur!</p>
          <p>Blanditiis, cumque quo adipisci. Molestiae, dolores dolorum quos doloremque ipsa ullam eligendi commodi deserunt doloribus inventore magni? Ea mollitia veniam nostrum nihil, iusto doloribus a at! Ea molestiae ullam delectus!</p>
        </f7-block>
      </f7-swiper-slide>
      <f7-swiper-slide>Slide 3</f7-swiper-slide>
    </f7-swiper>
  </f7-page>
</template>

<script>
export default {
  methods: {
    swpier(index) {
      const self = this;
      const app = self.$f7;
      var swiper = app.swiper.get(".swiper-container");
          swiper.slideTo(index);
    }
  }
};
</script>

