<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items-per-page="-1"
          :items="allBrands"
          hide-default-footer
          :loading="loading"
          dense
          class="elevation-1"
          @click:row="rowClick"
        >
          <template v-slot:top>
            <list-header @add="addBrand" @refresh="refresh" />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import listHeader from '@/components/listHeader'

export default {
  name: 'brandList',
  components: {
    listHeader
  },
  data: () => ({
    loading: false,
    headers: [
      { value: 'createdAt', text: 'Создан' },
      { value: 'name', text: 'Рабочее название' }
    ]
  }),
  created() {
    if (this.allBrands.length === 0) {
      this.loading = true
      this.getAllBrands()
        .then()
        .finally(() => (this.loading = false))
    }
  },
  computed: {
    ...mapGetters(['allBrands'])
  },
  methods: {
    ...mapActions(['getAllBrands']),
    addBrand() {
      this.$router.push('/brands/new')
    },
    rowClick(item) {
      this.$router.push(`/brands/${item._id}`)
    },
    refresh() {
      this.loading = true
      this.getAllBrands()
        .then()
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style></style>
