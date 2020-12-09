<template>
  <v-card elevation="3" outlined>
    <form @submit.prevent="submit">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-text-field label="Название" hint="Название элемента для отображения в списке" />
        <v-text-field label="Рейтинг" hint="Очередность вывода" />
        <v-textarea
          v-if="type === 'item'"
          outlined
          label="Описание"
          hint="Описание товара"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <image-picker-dialog buttonText="Иконка группы" :maxWidthDialog="1300" />
        <v-spacer />
        <v-btn color="primary" @click="cancel">Отмена</v-btn>
        <v-btn type="submit" color="primary">Сохранить</v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
import imagePickerDialog from '../imagePickerDialog'
export default {
  name: 'catalogForm',
  data: () => ({}),
  components: {
    imagePickerDialog
  },
  props: {
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
    }
  },
  methods: {
    submit() {
      this.$emit('submit-form')
    },
    cancel() {
      this.$emit('cancel-form')
    }
  }
}
</script>

<style></style>
