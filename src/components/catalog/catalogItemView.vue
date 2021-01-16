<template>
  <v-container>
    <v-row>
      <v-col v-if="!loading">
        <v-card class="elevation-1">
          <div class="image-container">
            <v-img width="300" height="300">
              <v-chip
                class="mt-7 pa-2"
                color="red"
                text-color="white"
                :style="{ transform: 'rotate(-30deg)' }"
              >
                Акция: -25
                <v-icon right>
                  mdi-sale
                </v-icon>
              </v-chip>
            </v-img>
          </div>
        </v-card>
      </v-col>
      <v-col v-else>
        <spinner />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import spinner from '@/components/common/spinner'
import { mapActions } from 'vuex'

export default {
  name: 'catalogItemView',
  components: {
    spinner
  },
  created() {
    this.getCatalogItem()
  },
  data: () => ({
    loading: false,
    catalogItem: {}
  }),
  props: {
    group: String,
    sku: String
  },
  methods: {
    ...mapActions(['getCatalogItemById']),
    getCatalogItem() {
      this.getCatalogItemById(this.sku)
        .then(data => {
          this.catalogItem = Object.assign({}, data)
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style></style>
