<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table :headers="headers" :items="allSetPrices" class="elevation-1" dense>
          <template v-slot:top>
            <list-header @add="newSetPrice" @refresh="refresh" />
          </template>
          <!-- eslint-disable-next-line -->
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="deleteSetPrice(item._id)">
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
      { value: 'actions', width: '10px', sortable: false }
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
