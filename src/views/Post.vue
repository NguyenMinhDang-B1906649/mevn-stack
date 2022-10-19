<template lang="">
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="pa-4 mx-auto">
        <v-card class="pa-2">
          <v-img :src="`/${post.image}`"></v-img>
          <v-card-actions>
            <v-row>
              <v-col sm="4">
                <v-btn class="ml-2" variant="outlined" color="primary">
                  {{ post.category }}
                </v-btn>
              </v-col>
              <v-col sm="8" class="d-flex justify-end">
                <v-btn color="success" variant="tonal">Edit</v-btn>
                <v-btn color="red" variant="tonal">Delete</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-subtitle class="headline pb-1">
            <h2>{{ post.title }}</h2>
          </v-card-subtitle>
          <v-card-text class="grey--text py-2">
            <p>{{ post.content }}</p>
            <p>{{ post.createAt }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import API from "../api";
export default {
  name: "PostView",
  data() {
    return {
      post: {},
    };
  },
  async created() {
    const res = await API.getPostById(this.$route.params.id);
    this.post = res;
  },
};
</script>
<style lang=""></style>
