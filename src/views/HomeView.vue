<template>
  <v-container>
    <v-alert type="success" border="left" closable="true" v-if="showAlert">
      {{ showAlert }}</v-alert
    >
    <v-row>
      <v-col sm="4" class="pa-3" v-for="post in posts" :key="post._id">
        <v-card
          class="pa-1"
          no-gutters
          :to="{ name: 'post', params: { id: post._id } }"
        >
          <v-img cover class="pa-0" height="250" :src="`${post.image}`"></v-img>
          <v-btn class="ml-4 mt-3" small variant="outlined" color="indigo">
            {{ post.category }}
          </v-btn>
          <v-card-title class="headline">
            {{ post.title }}
          </v-card-title>
          <v-card-text class="py-0">
            <p>{{ post.content.substring(0, 100) + "..." }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import API from "../api";

// Components

export default defineComponent({
  name: "HomeView",
  data() {
    console.log(this.$route);
    return {
      posts: [],
      showAlert: this.$route.query.message,
    };
  },
  async created() {
    this.posts = await API.getAllPost();
  },
});
</script>
