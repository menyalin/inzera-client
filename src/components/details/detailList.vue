<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items-per-page="-1"
          :items="allDetails"
          hide-default-footer
          :loading="loading"
          dense
          class="elevation-1"
          @click:row="rowClick"
        >
          <template v-slot:top>
            <list-header @add="addDetail" @refresh="refresh" />
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
  name: 'detailList',
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
    if (this.allDetails.length === 0) {
      this.loading = true
      this.getAllDetails()
        .then()
        .finally(() => (this.loading = false))
    }
  },
  computed: {
    ...mapGetters(['allDetails'])
  },
  methods: {
    ...mapActions(['getAllDetails']),
    addDetail() {
      this.$router.push('/details/new')
    },
    rowClick(item) {
      this.$router.push(`/details/${item._id}`)
    },
    refresh() {
      this.loading = true
      this.getAllDetails()
        .then()
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style></style>
