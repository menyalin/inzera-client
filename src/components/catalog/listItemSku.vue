<template>
  <v-list-item @click="$emit('click')" class="mx-1 my-3 px-1">
    <v-card elevation="3" width="100%">
      <div class="catalog-list-item">
        <div class="image-wrapper">
          <v-img
            v-if="item.images && item.images.length"
            :src="baseUrl + item.images[0]"
            :transition="false"
            height="150px"
            width="150px"
            decoding="sync"
            contain
          >
            <discount-label
              v-if="item.prices.length && item.prices[0].isPromo"
              :discount="item.prices[0].discount"
            />
          </v-img>
        </div>
        <div class="content-wrapper">
          <v-card-title
            >{{ item.name }} <small class="pl-3" v-if="!item.isActive">(Скрыто)</small>
          </v-card-title>
          <v-card-subtitle v-if="!!item.prices[0]">
            <span class="new-price">{{ +item.prices[0].price | currency('₽', 2) }}</span>
            <span class="old-price">{{ +item.prices[0].oldPrice | currency('₽', 2) }}</span>
          </v-card-subtitle>
          <v-card-text>
            {{ item.description }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn icon small :to="'/editSKU/' + item._id">
              <v-icon color="green">mdi-pencil</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>
  </v-list-item>
</template>

<script>
import discountLabel from './discountLabel'

export default {
  name: 'listItemSku',
  data: () => ({}),
  components: {
    discountLabel
  },
  props: {
    item: Object,
    baseUrl: String
  }
}
</script>

<style>
.new-price {
  font-size: 1.3em;
  font-weight: 500;
}
.old-price {
  text-decoration: line-through;
  font-size: 1.1em;
  margin-left: 1em;
}
.catalog-list-item {
  display: flex;
  flex-direction: row;
}
.content-wrapper {
  width: 100%;
}
.image-wrapper {
  padding: 7px;
}
</style>
