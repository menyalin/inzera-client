<template>
  <v-container>
    <v-row>
      <v-col>
        <brand-form
          :formTitle="formTitle"
          @form-submit="submit"
          @deletebtn="deleteItem"
          :loading="loading"
          :brand="brand"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import brandForm from './brandForm'
export default {
  name: 'editBrand',
  props: ['id'],
  data: () => ({
    loading: false,
    brand: {}
  }),
  components: {
    brandForm
  },
  created() {
    if (!this.isNewBrand) {
      this.getBrand()
    }
  },
  computed: {
    isNewBrand() {
      return !this.id
    },
    formTitle() {
      return this.isNewBrand ? 'Новый бренд' : 'Редактировать бренд'
    }
  },
  methods: {
    ...mapActions(['createBrand', 'getBrandById', 'updateBrand', 'deleteBrand']),
    getBrand() {
      this.loading = true
      this.getBrandById(this.id)
        .then(brand => (this.brand = brand))
        .catch(e => this.$store.commit('setError', e.message))
        .finally(() => (this.loading = false))
    },
    submit(val) {
      this.loading = true
      if (this.isNewBrand) {
        this.createBrand(val)
          .then(() => this.$router.push('/brands'))
          .catch(e => this.$store.commit('setError', e.message))
          .finally(() => (this.loading = false))
      } else {
        // отправка формы если бренд редактируется
        this.updateBrand(val)
          .then(() => this.$router.push('/brands'))
          .catch(e => this.$store.commit('setError', e.message))
          .finally(() => (this.loading = false))
      }
    },
    deleteItem() {
      if (!this.isNewBrand) {
        this.loading = true
        this.deleteBrand(this.id).finally(() => {
          this.loading = false
          this.$router.push('/brands')
        })
      }
    }
  }
}
</script>

<style></style>
