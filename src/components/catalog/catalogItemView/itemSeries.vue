<template>
  <div>
    <v-subheader>Продукция из этой серии</v-subheader>
    <div class="series-wrapper">
      <div class="mx-2" v-for="sku of skuArray" :key="sku._id">
        <v-chip
          class="pa-3 series-item"
          color="indigo darken-3"
          :disabled="isCurrentSku(sku)"
          :to="link(sku)"
          label
          dark
          outlined
        >
          {{ sku.nameForSeries ? sku.nameForSeries : sku.volume }}
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'itemSeries',
  props: {
    skuArray: Array,
    currentSku: String
  },
  methods: {
    isCurrentSku(sku) {
      return this.currentSku === sku._id
    },
    link(sku) {
      return `/catalog/${this.$route.params.group}/${sku._id}`
    }
  }
}
</script>

<style>
.series-wrapper {
  display: flex;
  flex-direction: row;
}
.series-item {
  cursor: pointer;
}
</style>
