<template>
  <form @submit.prevent="submitForm">
    <v-card :loading="loading">
      <v-card-title>{{ formTitle }}</v-card-title>
      <v-card-text>
        <div class="settings">
          <div class="setting-child">
            <date-input label="Дата начала*" v-model="startDate" hide-details />
          </div>
          <div class="setting-child">
            <date-input label="Дата окончания" v-model="endDate" />
          </div>
          <div class="setting-child description">
            <v-text-field label="Описание*" v-model="description" />
          </div>
        </div>
        <div class="settings">
          <div class="setting-child">
            <v-switch v-model="isPromo" label="Акция" class="mb-2 mr-4" hide-details />
          </div>
          <div class="setting-child" v-if="isPromo">
            <v-text-field label="Размер скидки" v-model="discount" class="mb-2" hide-details />
          </div>
          <div class="setting-child description" v-if="isPromo">
            <v-text-field label="Описание акции" v-model="promoDescription" />
          </div>
        </div>
        <div class="prices">
          <v-data-table
            :headers="headers"
            :items="prices"
            dense
            v-model="selected"
            show-select
            item-key="sku"
            hide-default-footer
            :items-per-page="-1"
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
            <template v-slot:item.sku="{ item }">
              <v-autocomplete
                :items="allCatalogItems"
                hide-details
                single-line
                label="Выберите товар"
                flat
                color="primary"
                v-model="item.sku"
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
      <card-buttons
        :submitDisabled="!formValid"
        @cancel="cancel"
        @deletebtn="deletebtn"
        :showDeleteBtn="!!id"
      />
    </v-card>
  </form>
</template>

<script>
import cardButtons from '@/components/common/cardButtons'
import dateInput from '@/components/common/dateInput/dateInput'
import { mapGetters } from 'vuex'

export default {
  name: 'setPriceForm',
  data: () => ({
    id: null,
    startDate: null,
    endDate: null,
    description: null,
    selected: [],
    prices: [],
    isPromo: false,
    discount: 0,
    promoDescription: '',
    headers: [
      { value: 'sku', text: 'Товар' },
      { value: 'price', text: 'Новая цена', width: '150px', sortable: false },
      { value: 'oldPrice', text: 'Старая цена', width: '150px', sortable: false }
    ]
  }),
  props: {
    type: String,
    formTitle: String,
    setPrice: Object,
    loading: Boolean
  },
  watch: {
    setPrice: {
      handler: function(val) {
        if (val && val._id) {
          this.id = val._id
          this.startDate = val.startDateFormatted
          this.endDate = val.endDateFormatted
          this.description = val.description
          this.prices = val.prices
          this.isPromo = val.isPromo
          this.discount = val.discount
          this.promoDescription = val.promoDescription
        }
      },
      immediate: true
    }
  },
  components: {
    dateInput,
    cardButtons
  },
  computed: {
    ...mapGetters(['allCatalogItems']),
    formValid() {
      // проверяем заполненость даты начала цены
      const startDate = !!this.startDate
      const desc = !!this.description
      // проверка массива this.prices
      const tmpArrayOfIds = this.prices
        .map(price => {
          if (!!price.price && !!price.sku) return price.sku
        })
        .filter(item => !!item)

      const isValidPrices =
        tmpArrayOfIds.length === this.prices.length &&
        tmpArrayOfIds.length === new Set(tmpArrayOfIds).size

      return startDate && desc && isValidPrices
    }
  },
  methods: {
    addRow() {
      this.prices.push({})
    },
    cancel() {
      this.$router.go(-1)
    },
    deletebtn() {
      this.$emit('deletebtn')
    },
    deleteSelectedRow() {
      this.prices = this.prices.filter(
        price => !this.selected.map(item => item.sku).includes(price.sku)
      )
    },
    submitForm() {
      if (this.formValid) {
        const setPrice = {
          _id: this.id,
          startDate: this.startDate,
          endDate: this.endDate,
          description: this.description,
          prices: this.prices,
          isPromo: this.isPromo,
          discount: this.discount,
          promoDescription: this.promoDescription
        }
        this.$emit('form-submit', setPrice)
      }
    }
  }
}
</script>

<style>
.prices {
  padding: 20px 30px;
}
.settings {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
.setting-child {
  padding: 0px 10px;
  flex-basis: 300px;
}
.description {
  flex-basis: auto;
  flex-grow: 1;
}
</style>
