<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h1>Create note</h1>
      </div>
      <div class="card-body">
        <form action="#" method="post" @submit.prevent="store">
          <div class="form-group">
            <label for="title">Judul</label>
            <input type="text" v-model="form.title" class="form-control" />
            <div v-if="errors.title" class="mt-2 text-danger">{{ errors.title[0] }}</div>
          </div>
          <div class="form-group">
            <label for="subject">Subjek</label>
            <select v-model="form.subject_id" id="subject" class="form-control">
              <option
                v-for="subject in subjects"
                :value="subject.id"
                :key="subject.id"
              >{{ subject.name }}</option>
            </select>
            <div v-if="errors.subject_id" class="mt-2 text-danger">{{ errors.subject_id[0] }}</div>
          </div>
          <div class="form-group">
            <label for="description">Isi</label>
            <textarea v-model="form.description" id="description" class="form-control" rows="7"></textarea>
            <div v-if="errors.description" class="mt-2 text-danger">{{ errors.description[0] }}</div>
          </div>
          <button
            :disabled="loading"
            type="submit"
            class="btn btn-primary d-flex align-items-center"
          >
            Simpan
            <template v-if="loading == true">
              <loading-icon></loading-icon>
            </template>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../../components/Loading";
import axios from "axios";

export default {
  components: {
    "loading-icon": Loading,
  },
  data() {
    return {
      form: {
        title: "",
        description: "",
        subject_id: null,
      },
      subjects: [],
      errors: [],
      loading: false,
    };
  },
  mounted() {
    this.getSubjects();
  },
  methods: {
    async getSubjects() {
      let response = await axios.get("subject");
      if (response.status === 200) {
        this.subjects = response.data;
      }
    },
    async store() {
      this.loading = true;
      console.log(this.loading);
      try {
        let response = await axios.post("note/store", this.form);
        if (response.status === 200) {
          this.form.title = "";
          this.form.description = "";
          this.form.subject_id = null;
          this.errors = [];
          this.loading = false;

          this.$toasted.show(response.data.message, {
            type: "success",
            duration: 3500,
          });
        }
      } catch (e) {
        this.loading = false;
        this.$toasted.show("Gagal menyimpan catatan!", {
          type: "error",
          duration: 3500,
        });
        this.errors = e.response.data.errors;
      }
    },
  },
};
</script>

<style>
</style>