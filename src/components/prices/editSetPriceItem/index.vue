<template>
  <v-container>
    <v-row>
      <v-col>
        <set-price-form @cancel="cancel" @form-submit="submit" :formTitle="formTitle" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import setPriceForm from './setPriceForm.vue'
export default {
  name: 'editSetPriceItem',
  props: {
    type: {
      type: String,
      validator: value => ['new', 'edit'].includes(value)
    }
  },
  created() {
    this.getCatalogItemsForAutocomplete()
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
    ...mapActions(['getCatalogItemsForAutocomplete', 'createSetPrice']),
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
