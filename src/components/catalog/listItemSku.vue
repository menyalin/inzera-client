<template>
  <v-list-item @click="$emit('click')" class="px-0 mx-0">
    {{ item }}
  </v-list-item>
</template>

<script>
export default {
  name: 'listItemSku',
  props: {
    item: Object,
    baseUrl: String
  }
}
</script>

<style></style>
