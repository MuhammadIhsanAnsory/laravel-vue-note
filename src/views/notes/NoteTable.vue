<template>
  <div class="container">
    <h3 class="my-3">Catatanku</h3>
    <table class="table table-hover table-stripped">
      <tr>
        <th>Judul</th>
        <th>Subjek</th>
        <th>Isi</th>
        <th>Aksi</th>
      </tr>
      <tr v-for="note in notes" :key="note.id">
        <td>
          <router-link :to="{ name: 'note.show', params: {noteSlug: note.slug} }">{{ note.title }}</router-link>
        </td>
        <td>{{ note.subject }}</td>
        <td>{{ note.description }}</td>
        <td>
          <div class="row">
            <router-link
              :to="{ name: 'note.edit', params: { noteSlug: note.slug } }"
              class="mr-2 btn btn-success btn-sm"
            >Edit</router-link>
            <delete-note :endpoint="note.slug" />
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import DeleteNote from "../../components/Delete";
import axios from "axios";

export default {
  components: {
    "delete-note": DeleteNote,
  },
  data() {
    return {
      notes: [],
    };
  },
  mounted() {
    this.getNotes();
  },
  methods: {
    async getNotes() {
      let response = await axios.get("note");
      this.notes = response.data.data;
    },
  },
};
</script>