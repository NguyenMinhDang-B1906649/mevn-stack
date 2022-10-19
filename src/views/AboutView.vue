<template lang="">
  <div>
    About page
    <v-btn :to="link">change</v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {
      link: "/add-post",
    };
  },
};
</script>
<style lang=""></style>
