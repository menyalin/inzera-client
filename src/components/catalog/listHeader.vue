<template>
  <div>
    <v-btn
      color="primary"
      small
      class="ma-2"
      :to="{ name: 'newItem', params: { parent } }"
      :disabled="itemDisabled"
    >
      Создать SKU
    </v-btn>
    <v-btn
      color="primary"
      class="ma-2"
      small
      :to="{ name: 'newGroup', params: { parent } }"
      :disabled="groupDisabled"
    >
      Создать группу
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'listHeader',
  props: {
    itemDisabled: Boolean,
    groupDisabled: Boolean,
    parent: String
  },
  methods: {
    setError() {
      this.$store.commit('setError', 'Ошибка')
    }
  }
}
</script>

<style></style>
