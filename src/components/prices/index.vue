<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="allSetPrices"
          class="elevation-1"
          dense
          @click:row="rowClick"
          :items-per-page="-1"
        >
          <template v-slot:top>
            <list-header @add="newSetPrice" @refresh="refresh" />
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
  name: 'prices',
  data: () => ({
    headers: [
      { value: 'createdAtFormatted', text: 'Дата создания' },
      { value: 'startDateFormatted', text: 'Начало' },
      { value: 'endDateFormatted', text: 'Завершение', sortable: false },
      { value: 'description', text: 'Описание', sortable: false }
    ]
  }),
  components: {
    listHeader
  },
  methods: {
    ...mapActions(['getAllSetPrices', 'deleteSetPrice']),
    newSetPrice() {
      this.$router.push('/prices/newSetPrice')
    },
    rowClick(item) {
      this.$router.push(`/prices/${item._id}`)
    },
    refresh() {
      this.getAllSetPrices()
    }
  },
  computed: {
    ...mapGetters(['allSetPrices'])
  },
  created() {
    this.getAllSetPrices()
  }
}
</script>

<style></style>
