<template lang="">
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Add New Post</v-card-title>
          <v-divider></v-divider>
          <v-form
            @submit.prevent="submitForm"
            ref="form"
            enctype="multipart/form-data"
          >
            <v-text-field
              label="Title"
              prepend-icon="mdi-note"
              :rules="rules"
              v-model="post.title"
            ></v-text-field>
            <v-text-field
              label="Category"
              prepend-icon="mdi-view-list"
              :rules="rules"
              v-model="post.category"
            ></v-text-field>
            <v-textarea
              label="Content"
              prepend-icon="mdi-note-plus"
              :rules="rules"
              v-model="post.content"
            ></v-textarea>
            <v-file-input
              label="Select Image"
              show-size
              ref="file"
              counter
              multiple
              :rules="rules"
              @change="selectFile"
            ></v-file-input>
            <v-btn type="submit" class="mt-3" color="primary">Add Post</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import API from "../api";
export default {
  data() {
    return {
      rules: [(value) => !!value || "This field is require"],
      post: {
        title: "",
        category: "",
        content: "",
        image: "",
      },
      image: "",
    };
  },
  methods: {
    selectFile() {
      this.image = this.$refs.file.files[0];
    },
    async submitForm() {
      const formData = new FormData();
      formData.append("title", this.post.title);
      formData.append("category", this.post.category);
      formData.append("content", this.post.content);
      formData.append("image", this.image);
      if (this.$refs.form.validate()) {
        const res = await API.addPost(formData);
        this.$router.push({
          name: "home",
          query: { message: res.message },
        });
      }
    },
  },
};
</script>
<style lang=""></style>
