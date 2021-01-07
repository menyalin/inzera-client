<template>
  <v-toolbar flat>
    <v-btn icon><v-icon dark color="green" @click="refresh">mdi-refresh-circle</v-icon></v-btn>
    <v-btn icon><v-icon dark color="primary" @click="add">mdi-plus-circle</v-icon></v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: 'listHeader',
  methods: {
    refresh() {
      this.$emit('refresh')
    },
    add() {
      this.$emit('add')
    }
  }
}
</script>

<style></style>
