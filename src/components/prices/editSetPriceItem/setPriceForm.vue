<template>
  <form>
    prices: {{ prices }} selected: {{ selected }}
    <v-card>
      <v-card-title>{{ formTitle }}</v-card-title>
      <v-card-text>
        <div class="settings">
          <div class="setting-child">
            <date-input label="Дата начала" v-model="startDate" />
          </div>
          <div class="setting-child">
            <date-input label="Дата окончания" v-model="endDate" />
          </div>
          <div class="setting-child description">
            <v-text-field label="Описание" v-model="description" />
          </div>
        </div>
        <div class="prices">
          <v-data-table
            :headers="headers"
            :items="prices"
            dense
            v-model="selected"
            show-select
            item-key="catalogItemId"
            :limit="-1"
          >
            <template v-slot:top>
              <v-btn small color="primary" @click="addRow" class="mx-2">Добавить строку</v-btn>
              <v-btn
                small
                color="warning"
                @click="deleteSelectedRow"
                class="mx-2"
                :disabled="!selected.length"
              >
                Удалить строки
              </v-btn>
            </template>
            <!-- eslint-disable-next-line -->
            <template v-slot:item.catalogItemId="{ item }">
              <v-autocomplete
                :items="filteredPrices(item.catalogItemId)"
                hide-details
                single-line
                label="Выберите товар"
                flat
                color="primary"
                v-model="item.catalogItemId"
                class="my-0 py-0"
              />
            </template>
            <!-- eslint-disable-next-line -->
            <template v-slot:item.price="{ item }">
              <v-text-field
                v-model="item.price"
                color="primary"
                single-line
                label="Новая цена"
                hide-details
                class="my-0 py-0"
              />
            </template>
            <!-- eslint-disable-next-line -->
            <template v-slot:item.oldPrice="{ item }">
              <v-text-field
                v-model="item.oldPrice"
                color="primary"
                single-line
                label="Старая цена"
                hide-details
                class="my-0 py-0"
              />
            </template>
          </v-data-table>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="$emit('cancel')" color="primary">Отмена</v-btn>
        <v-btn type="submit" color="primary" :disabled="!formValid || loading">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>

<script>
/*
@cancel
@form-submit

Форма - 
    startDate
    endDate
    description
    prices: 
        skuId
        price
        oldPrice

*/
import dateInput from '@/components/dateInput/dateInput'
import { mapGetters } from 'vuex'

export default {
  name: 'setPriceForm',
  data: () => ({
    startDate: null,
    endDate: null,
    description: null,
    selected: [],
    prices: [
      {
        catalogItemId: '5fdf30d5ba264c2970039d37',
        price: 260,
        oldPrice: 300
      }
    ],
    headers: [
      { value: 'catalogItemId', text: 'Товар' },
      { value: 'price', text: 'Новая цена', width: '150px', sortable: false },
      { value: 'oldPrice', text: 'Старая цена', width: '150px', sortable: false }
    ]
  }),
  props: {
    type: String,
    formTitle: String
  },
  components: {
    dateInput
  },
  computed: {
    ...mapGetters(['allCatalogItems']),
    formValid() {
      return true
    },
    loading() {
      return false
    }
  },
  methods: {
    addRow() {
      this.prices.push({})
    },
    deleteSelectedRow() {
      this.prices = this.prices.filter(
        price => !this.selected.map(item => item.catalogItemId).includes(price.catalogItemId)
      )
    },
    filteredPrices(currentPriceId = '') {
      const catalogIdsInPrices = this.prices.map(price => price.catalogItemId || '')
      console.log('currentPriceId:', currentPriceId)
      let res = this.allCatalogItems.filter(
        item =>
          !catalogIdsInPrices.includes(item.catalogItemId) ||
          (!currentPriceId && item.catalogItemId == currentPriceId)
      )
      return res
    }
  }
}
</script>

<style>
.settings {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.setting-child {
  padding: 10px;
  flex-basis: 300px;
}
.description {
  flex-basis: auto;
  flex-grow: 1;
}
</style>
