<template>
  <div>
    <v-btn color="primary" dark @click.stop="open">
      {{ buttonText }}
    </v-btn>
    <v-dialog v-model="dialog" :max-width="maxWidthDialog" persistent>
      <v-card>
        <v-card-title>
          {{ dialogTitle }}
        </v-card-title>

        <v-card-text>
          <div class="gallery-wrapper">
            <div class="gallery-item" v-for="image of images" :key="image.url">
              <p class="pa-0 ma-0">
                <small>FileName: {{ image.name }}</small>
                <br />
                <small>Folders: {{ image.folders }}</small>
              </p>
              <v-img :src="baseUrl + image.url" aspect-ratio="1" max-height="80" max-width="80" />
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="close">
            Disagree
          </v-btn>

          <v-btn color="green darken-1" text @click="close">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'imagePickerDialog',
  props: {
    buttonText: {
      type: String,
      default: 'Open Dialog'
    },
    dialogTitle: {
      type: String,
      default: 'Выбор иконки группы'
    },
    maxWidthDialog: {
      type: Number,
      default: 600
    }
  },
  data: () => ({
    dialog: false,
    images: []
  }),
  methods: {
    ...mapActions(['getImageUrls']),
    open() {
      this.getImageUrls('./static/svg')
        .then(res => {
          this.images = res
        })
        .catch(e => {
          this.$store.commit('setError', e.message)
        })
      this.dialog = true
    },
    close() {
      this.dialog = false
    }
  },
  computed: {
    ...mapGetters(['baseUrl'])
  }
}
</script>

<style>
.gallery-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.gallery-item {
  flex-basis: 100px;
}
</style>
