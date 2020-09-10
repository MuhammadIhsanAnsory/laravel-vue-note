<template>
  <button class="btn btn-sm btn-danger" ref="deleteNote" @click="destroyNote">Hapus</button>
</template>

<script>
import axios from "axios";

export default {
  props: ["endpoint"],
  methods: {
    async destroyNote() {
      let q = window.confirm("Yakin hapus catatan?");

      if (q == true) {
        let response = await axios.delete(`note/${this.endpoint}/delete`);
        if (response.status == 200) {
          this.$toasted.show(response.data.message, {
            type: "error",
            duration: 3500,
          });
          this.$refs.deleteNote.parentNode.parentNode.parentNode.remove();
        }
      }
    },
  },
};
</script>


