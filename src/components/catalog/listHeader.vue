<template>
  <div>
    <v-btn small icon to="/catalog"><v-icon>mdi-file-tree</v-icon></v-btn>
    <v-btn
      color="primary"
      small
      class="ma-2"
      :to="{ name: 'newItem', params: { group: this.$route.params.group } }"
      :disabled="itemDisabled"
    >
      Создать SKU
    </v-btn>
    <v-btn
      color="primary"
      class="ma-2"
      small
      :to="{ name: 'newGroup', params: { group: this.$route.params.group } }"
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
