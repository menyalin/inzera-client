<template>
  <v-container class="wrapper">
    <h3 class="pb-2">{{ item.name }}</h3>
    <div v-if="item.company && item.company.name">Производитель: {{ item.company.name }}</div>
    <div v-if="item.skuType">Тип: {{ item.skuType }}</div>
    <div v-if="item.abv">Крепость: {{ item.abv }}%</div>
    <div v-if="item.segment">Сегмент: {{ item.segment }}</div>
    <div class="series" v-if="item.series && item.series.sku.length">
      <item-series :skuArray="item.series.sku" :currentSku="item._id" />
    </div>
    <div class="prices">
      <div class="price">
        <span v-if="!item.prices.length">
          Цена не указана
        </span>
        <span v-else class="price-text">
          {{ +item.prices[0].price | currency('₽', 2) }}
          <span class="old-price-text">
            {{ +item.prices[0].oldPrice | currency('₽', 2) }}
          </span>
        </span>
      </div>
      <div class="shops">
        <v-btn color="info" text>ГДЕ КУПИТЬ?</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import itemSeries from './itemSeries'

export default {
  name: 'mainInfoItem',
  props: {
    item: Object
  },
  components: {
    itemSeries
  }
}
</script>

<style scoped>
.old-price-text {
  font-size: 1.2rem;
  font-weight: 400;
  padding-left: 10px;
  text-decoration: line-through;
}

.price-text {
  color: grey;
  font-size: 1.6rem;
  font-weight: 600;
}
.prices {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
}
.prices > div {
  padding: 10px 20px;
}
.wrapper {
  padding-top: 20px;
}
.wrapper > div {
  padding: 8px 10px;
}
</style>
