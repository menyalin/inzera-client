<template>
  <div>
    <v-btn color="primary" class="pa-2 ma-2" to="/catalog/newItem">Создать</v-btn>
    <v-btn color="primary" class="pa-2 ma-2" @click="setError">тест</v-btn>
    <v-btn color="primary" class="pa-2 ma-2" to="/catalog/newGroup">Создать группу</v-btn>
  </div>
</template>

<script>
export default {
  name: 'listHeader',
  methods:{
    setError() {
      this.$store.commit('setError', 'Ошибка')
    }
  }
}
</script>

<style></style>
