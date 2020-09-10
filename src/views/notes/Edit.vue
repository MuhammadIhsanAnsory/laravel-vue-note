<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h1>Create note</h1>
      </div>
      <div class="card-body">
        <form action="#" method="post" @submit.prevent="update">
          <div class="form-group">
            <label for="title">Judul</label>
            <input type="text" v-model="form.title" class="form-control" />
            <div v-if="errors.title" class="mt-2 text-danger">{{ errors.title[0] }}</div>
          </div>
          <div class="form-group">
            <label for="subject">Subjek</label>
            <select @change="selectedSubject" id="subject" class="form-control">
              <option :value="form.subject_id">{{ form.subject }}</option>
              <template v-for="subject in subjects">
                <option
                  v-if="subject.id !== form.subject_id"
                  :value="subject.id"
                  :key="subject.id"
                >{{ subject.name }}</option>
              </template>
            </select>

            <div v-if="errors.subject_id" class="mt-2 text-danger">{{ errors.subject_id[0] }}</div>
          </div>
          <div class="form-group">
            <label for="description">Isi</label>
            <textarea v-model="form.description" id="description" class="form-control" rows="7"></textarea>
            <div v-if="errors.description" class="mt-2 text-danger">{{ errors.description[0] }}</div>
          </div>
          <button type="submit" class="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: [],
      subjects: [],
      errors: [],
    };
  },
  mounted() {
    this.getSubjects();
    this.getNote();
  },
  methods: {
    async getSubjects() {
      let response = await axios.get("subject");
      if (response.status === 200) {
        this.subjects = response.data;
      }
    },
    async getNote() {
      let response = await axios.get(`note/${this.$route.params.noteSlug}`);
      this.form = response.data.data;
    },
    selectedSubject(e) {
      this.form.subject_id = e.target.value;
    },
    async update() {
      let response = await axios.put(
        `note/${this.$route.params.noteSlug}/update`,
        this.form
      );
      if (response.status == 200) {
        this.$toasted.show(response.data.message, {
          type: "success",
          duration: 3500,
        });
        this.$router.push("/note");
      }
    },
  },
};
</script>