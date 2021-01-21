<template>
  <v-container>
    <v-row>
      <v-col>
        <series-form
          :formTitle="formTitle"
          @form-submit="submit"
          @deletebtn="deleteItem"
          :loading="loading"
          :series="series"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import seriesForm from './form/index.vue'

export default {
  name: 'editSeries',
  components: {
    seriesForm
  },
  props: ['id'],
  data: () => ({
    loading: false,
    series: {}
  }),
  created() {
    if (!this.isNewSeries) {
      this.getSeries()
    }
  },
  computed: {
    isNewSeries() {
      return !this.id
    },
    formTitle() {
      return this.isNewSeries ? 'Новая запись' : 'Редактировать запись'
    }
  },
  methods: {
    ...mapActions(['createSeries', 'getSeriesById', 'updateSeries', 'deleteSeries']),
    getSeries() {
      this.loading = true
      this.getSeriesById(this.id)
        .then(res => (this.series = res))
        .catch(e => this.$store.commit('setError', e.message))
        .finally(() => (this.loading = false))
    },
    submit(val) {
      this.loading = true
      if (this.isNewSeries) {
        this.createSeries(val)
          .then(() => this.$router.push('/series'))
          .catch(e => this.$store.commit('setError', e.message))
          .finally(() => (this.loading = false))
      } else {
        // отправка формы если бренд редактируется
        this.updateSeries(val)
          .then(() => this.$router.push('/series'))
          .catch(e => this.$store.commit('setError', e.message))
          .finally(() => (this.loading = false))
      }
    },
    deleteItem() {
      if (!this.isNewSeries) {
        this.loading = true
        this.deleteSeries(this.id).finally(() => {
          this.loading = false
          this.$router.push('/series')
        })
      }
    }
  }
}
</script>

<style></style>
