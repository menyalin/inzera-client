<template>
  <v-list-item @click="$emit('click')" class="mx-1 px-1">
    <v-card elevation="4" width="100%">
      <div class="catalog-list-item">
        <div class="image-wrapper">
          <v-img :src="mockLink" height="150px" width="150px" contain />
        </div>
        <div class="content-wrapper">
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-subtitle>249,00 руб</v-card-subtitle>
          <p>
            {{ item.description }}
          </p>
        </div>
      </div>
    </v-card>
  </v-list-item>
</template>

<script>
export default {
  name: 'listItemSku',
  data: () => ({
    mockLink:
      'https://saranskiy.com/uploads/products/derevenjka/vodka/zimnyaya/new/Derevenka_zimnaya_1.jpg'
  }),
  props: {
    item: Object,
    baseUrl: String
  }
}
</script>

<style>
.catalog-list-item {
  display: flex;
  flex-direction: row;
}
.content-wrapper {
  width: 100%;
  padding: 10px;
}
.image-wrapper {
  padding: 7px;
}
</style>
