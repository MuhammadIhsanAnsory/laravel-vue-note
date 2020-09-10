<template>
  <div class="container">
    <h3 class="mt-4 text-center">{{ note.title }}</h3>
    <p>
      <i>
        Subjek:
        <b>{{ note.subject }}</b>
      </i>
    </p>
    <i>Dibuat: {{ note.published }}</i>
    <p>{{ note.description }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      note: [],
    };
  },
  mounted() {
    this.getNote();
  },
  methods: {
    async getNote() {
      let response = await axios.get("note/" + this.$route.params.noteSlug);

      this.note = response.data.data;
    },
  },
};
</script>