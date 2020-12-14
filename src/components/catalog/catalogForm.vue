<template>
  <v-card elevation="3" outlined :loading="loading">
    <form @submit.prevent="submit" disabled>
      <v-card-title>
        {{ title }}
        <v-spacer />
        <v-img
          v-if="mainImageUrl"
          :src="baseUrl + mainImageUrl"
          aspect-ratio="1"
          max-height="60"
          max-width="60"
        />
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Название"
          hint="Название элемента для отображения в списке"
          v-model="name"
        />
        <v-text-field label="Артикул" v-model="sku" />
        <v-text-field label="Рейтинг" hint="Очередность вывода" v-model="rank" />
        <v-select label="Родитель" multiple :items="parentItems" v-model="parent" clearable chips />
        <v-textarea
          v-if="type === 'item'"
          outlined
          label="Описание"
          hint="Описание товара"
          v-model="description"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <image-picker-dialog
          v-if="type === 'group'"
          buttonText="Иконка группы"
          folder="./static/svg"
          :maxWidthDialog="800"
          v-model="mainImageUrl"
        />
        <image-picker-dialog
          v-else
          dialogTitle="Выбор фотографий"
          multiple
          buttonText="Загрузить фото"
          :maxWidthDialog="800"
          v-model="images"
          folder="./static/sku_images"
        />
        <v-spacer />
        <v-btn color="primary" @click="cancel">Отмена</v-btn>
        <v-btn type="submit" color="primary" :disabled="!formValid || loading">Сохранить</v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import imagePickerDialog from '../imagePickerDialog'
export default {
  name: 'catalogForm',
  data: () => ({
    _id: null,
    mainImageUrl: null,
    parent: [],
    images: [],
    name: null,
    rank: 50,
    description: null,
    sku: null
  }),
  components: {
    imagePickerDialog
  },
  computed: {
    ...mapGetters(['baseUrl']),
    formValid() {
      return (
        (this.type === 'group' && this.name) ||
        (this.type === 'item' && this.name && this.parent.length >= 1)
      )
    }
  },
  props: {
    parentProp: String,
    loading: {
      type: Boolean,
      default: false
    },
    parentItems: {
      type: Array
    },
    title: {
      type: String,
      default: 'Catalog Form'
    },
    type: {
      type: String,
      default: 'group',
      validator: function(value) {
        return ['group', 'item'].includes(value)
      }
    },
    updatedItem: {
      type: Object
    }
  },
  mounted() {
    if (this.parentProp) {
      this.parent.push(this.parentProp)
    }
  },
  methods: {
    submit() {
      if (this.formValid) {
        let catalogItem = {
          name: this.name,
          type: this.type,
          rank: this.rank,
          parent: this.parent,
          mainImageUrl: this.mainImageUrl,
          description: this.description,
          sku: this.sku,
          images: this.images
        }
        if (this._id) catalogItem._id = this._id
        this.$emit('submit-form', catalogItem)
      }
    },
    cancel() {
      this.$emit('cancel-form')
    }
  },
  watch: {
    updatedItem: {
      handler: function(val) {
        if (val._id) {
          console.log('updatedItem:', val)
          this._id = val._id
          this.name = val.name
          this.parent = val.parent
          this.rank = val.rank
          this.mainImageUrl = val.mainImageUrl
          this.description = val.description
          this.sku = val.sku
          this.images = val.images
        }
      },
      immediate: true
    }
  }
}
</script>

<style></style>
