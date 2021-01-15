<template>
  <v-card-actions>
    <v-btn v-if="showDeleteBtn" @click="$emit('deletebtn')" color="warning">Удалить</v-btn>
    <v-spacer />
    <v-btn @click="$emit('cancel')" color="primary">Отмена</v-btn>
    <v-btn type="submit" color="primary" :disabled="submitDisabled">Сохранить</v-btn>
  </v-card-actions>
</template>

<script>
export default {
  props: {
    showDeleteBtn: {
      type: Boolean,
      default: false
    },
    submitDisabled: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style></style>
