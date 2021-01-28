<template>
  <v-container>
    <v-row>
      <v-col>
        <set-price-form
          @cancel="cancel"
          @form-submit="submit"
          :formTitle="formTitle"
          :setPrice="setPrice"
          @deletebtn="deleteItem"
          :loading="loading"
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
    setPrice: {},
    loading: false
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
    ...mapActions([
      'getCatalogItemsForAutocomplete',
      'createSetPrice',
      'updateSetPrice',
      'getSetPriceById',
      'deleteSetPrice'
    ]),
    cancel() {
      this.$router.go(-1)
    },
    deleteItem() {
      if (this.id) {
        this.loading = true
        this.deleteSetPrice(this.id).finally(() => {
          this.loading = false
          this.$router.push('/prices')
        })
      }
    },
    submit(setPrice) {
      if (this.id) {
        this.updateSetPrice(setPrice).then(() => this.$router.push('/prices'))
      } else this.createSetPrice(setPrice).then(() => this.$router.push('/prices'))
    }
  }
}
</script>

<style></style>
