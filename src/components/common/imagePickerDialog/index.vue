<template>
  <div>
    <v-btn color="primary" dark @click.stop="open">
      {{ buttonText }}
    </v-btn>
    <v-dialog v-model="dialog" :max-width="maxWidthDialog" persistent>
      <v-card>
        <v-card-title>
          {{ dialogTitle }}
          <v-spacer />
          <v-text-field label="Поиск по названию" v-model.trim="search" class="px-3" />
        </v-card-title>

        <v-card-text>
          <div class="gallery-wrapper">
            <div
              v-for="image of filteredImages"
              class="gallery-item text-center"
              :class="{ selected: isSelectedImage(image) }"
              :key="image.url"
              @click="select(image)"
            >
              <small>{{ image.name }}</small>
              <v-img :src="baseUrl + image.url" max-width="200" max-height="280" contain />
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
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Array]
    },
    folder: {
      type: String,
      default: './static/svg'
    },
    buttonText: {
      type: String,
      default: 'Open Dialog'
    },
    dialogTitle: {
      type: String,
      default: 'Выбор изображения'
    },
    maxWidthDialog: {
      type: Number,
      default: 600
    }
  },
  data: () => ({
    search: '',
    dialog: false,
    images: [],
    selected: null
  }),
  methods: {
    ...mapActions(['getImageUrls']),
    isSelectedImage(image) {
      if (Array.isArray(this.selected)) return this.selected.includes(image.url)
      else return this.selected === image.url
    },
    select(image) {
      if (this.multiple) {
        if (this.selected && this.selected.includes(image.url))
          this.selected = this.selected.filter(item => item !== image.url)
        else this.selected = [image.url]
      } else {
        if (this.selected === image.url) this.selected = null
        else this.selected = image.url
      }
    },
    open() {
      this.getImageUrls(this.folder)
        .then(res => {
          this.images = res
          this.selected = this.value
          this.dialog = true
        })
        .catch(e => {
          this.$store.commit('setError', e.message)
        })
    },
    save() {
      this.$emit('change', this.selected)
      this.dialog = false
    },
    close() {
      this.dialog = false
    }
  },
  computed: {
    ...mapGetters(['baseUrl']),
    filteredImages() {
      return this.search
        ? this.images.filter(image => image.url.toLowerCase().includes(this.search.toLowerCase()))
        : this.images
    }
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
  box-sizing: border-box;
  /* padding: 15px; */
  margin: 15px;
}
.selected {
  /* border: 1px solid lightgray;
  border-radius: 4px; */
  box-shadow: 3px 3px 6px 2px rgba(0, 0, 0, 0.5);
}
</style>
