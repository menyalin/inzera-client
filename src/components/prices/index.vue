<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="allSetPrices"
          class="elevation-1"
          dense
          :items-per-page="-1"
        >
          <template v-slot:top>
            <list-header @add="newSetPrice" @refresh="refresh" />
          </template>
          <!-- eslint-disable-next-line -->
          <template v-slot:item.actions="{ item }">
            <v-icon @click="rowClick(item)" class="mr-2">
              mdi-pencil
            </v-icon>
            <v-icon @click="deleteSetPrice(item._id)" color="warning">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import listHeader from '@/components/listHeader'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'prices',
  data: () => ({
    headers: [
      { value: 'createdAtFormatted', text: 'Дата создания' },
      { value: 'startDateFormatted', text: 'Начало' },
      { value: 'endDateFormatted', text: 'Завершение', sortable: false },
      { value: 'description', text: 'Описание', sortable: false },
      { value: 'actions', width: '100px', sortable: false, align: 'right' }
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
