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
            <div
              class="gallery-item ma-2"
              :class="{ selected: image.url === selected }"
              v-for="image of images"
              :key="image.url"
              @click="select(image)"
            >
              <v-img :src="baseUrl + image.url" aspect-ratio="1" max-height="90" max-width="90" />
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="close">
            Отмена
          </v-btn>

          <v-btn color="green darken-1" text @click="save">
            Применить
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
    value: {
      type: [String]
    },
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
    images: [],
    selected: null
  }),
  methods: {
    ...mapActions(['getImageUrls']),
    select(image) {
      if (this.selected === image.url) {
        this.selected = null
      } else {
        this.selected = image.url
      }
    },
    open() {
      this.getImageUrls('./static/svg')
        .then(res => {
          this.images = res
          this.dialog = true
        })
        .catch(e => {
          this.$store.commit('setError', e.message)
        })
    },
    save() {
      this.$emit('input', this.selected)
      this.dialog = false
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
  flex-basis: 90px;
}
.selected {
  border: 2px solid gray;
  border-radius: 4px;
}
</style>
