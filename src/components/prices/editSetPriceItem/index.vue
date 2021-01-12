<template>
  <v-container>
    <v-row>
      <v-col>
        <set-price-form
          @cancel="cancel"
          @form-submit="submit"
          :formTitle="formTitle"
          :setPrice="setPrice"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import setPriceForm from './setPriceForm.vue'

export default {
  name: 'editSetPriceItem',
  data: () => ({
    setPrice: {}
  }),
  props: {
    id: String,
    type: {
      type: String,
      default: 'edit',
      validator: value => ['new', 'edit'].includes(value)
    }
  },
  async created() {
    this.getCatalogItemsForAutocomplete()
    if (this.id) {
      const setPrice = await this.getSetPriceById(this.id)
      setPrice.prices = setPrice.prices.map(item => ({ ...item, sku: item.sku._id }))
      this.setPrice = setPrice
    }
  },
  components: {
    setPriceForm
  },
  computed: {
    formTitle() {
      return this.type === 'new' ? 'Установить цены номенклатуры' : 'Изменить цены номенклатуры'
    }
  },
  methods: {
    ...mapActions(['getCatalogItemsForAutocomplete', 'createSetPrice', 'getSetPriceById']),
    cancel() {
      this.$router.go(-1)
    },
    submit(newSetPrice) {
      this.createSetPrice(newSetPrice).then(() => {
        this.$router.push('/prices')
      })
    }
  }
}
</script>

<style></style>
