<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :items-per-page="-1"
          dense
          :headers="headers"
          :items="allSeries"
          hide-default-footer
          :loading="loading"
          class="elevation-1"
          @click:row="rowClick"
        >
          <template v-slot:top>
            <list-header @add="addSeries" @refresh="refresh" />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import listHeader from '@/components/common/listHeader'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'seriesList',
  data() {
    return {
      loading: false,
      headers: [{ text: 'Название', value: 'name' }]
    }
  },
  created() {
    if (this.allSeries.length === 0) {
      this.loading = true
      this.getAllSeries()
        .then()
        .finally(() => (this.loading = false))
    }
  },
  computed: {
    ...mapGetters(['allSeries'])
  },
  components: {
    listHeader
  },
  methods: {
    ...mapActions(['getAllSeries']),
    addSeries() {
      this.$router.push('/series/new')
    },
    rowClick(item) {
      this.$router.push(`/series/${item._id}`)
    },
    refresh() {
      this.loading = true
      this.getAllSeries().finally((this.loading = false))
    }
  }
}
</script>

<style></style>
