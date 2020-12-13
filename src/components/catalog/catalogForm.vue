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
        {{ updatedItem }}
        <v-text-field
          label="Название"
          hint="Название элемента для отображения в списке"
          v-model="name"
        />
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
          buttonText="Иконка группы"
          :maxWidthDialog="1300"
          v-model="mainImageUrl"
        />
        <v-spacer />
        <v-btn color="primary" @click="cancel">Отмена</v-btn>
        <v-btn type="submit" color="primary" :disabled="!name || loading">Сохранить</v-btn>
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
    name: null,
    rank: 50,
    description: null
  }),
  components: {
    imagePickerDialog
  },
  computed: {
    ...mapGetters(['baseUrl'])
  },
  props: {
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
  methods: {
    submit() {
      if (this.name) {
        let catalogItem = {
          name: this.name,
          type: this.type,
          rank: this.rank,
          parent: this.parent,
          mainImageUrl: this.mainImageUrl,
          description: this.description
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
        }
      },
      immediate: true
    }
  }
}
</script>

<style></style>
