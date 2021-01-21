<template>
  <v-container>
    <v-row>
      <v-col v-if="!loading" cols="8" offset-md="3" md="6">
        <v-card class="elevation-1 ">
          <div class="item-view-wrapper">
            <div class="image-container">
              <image-item :item="catalogItem" />
            </div>
            <div class="main-info-container">
              <main-info-item :item="catalogItem" />
            </div>
          </div>
          <div class="detail-info-wrapper">
            <detail-info-item :item="catalogItem" />
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
import { mapActions, mapGetters } from 'vuex'

import spinner from '@/components/common/spinner'
import imageItem from './imageItem.vue'
import mainInfoItem from './mainInfoItem.vue'
import detailInfoItem from './detailInfoItem.vue'

export default {
  name: 'catalogItemView',
  components: {
    spinner,
    imageItem,
    mainInfoItem,
    detailInfoItem
  },
  // created() {
  //   this.getCatalogItem()
  // },
  watch: {
    $route: {
      handler: function() {
        this.getCatalogItem()
      },
      immediate: true
    }
  },
  data: () => ({
    loading: false,
    catalogItem: {}
  }),
  props: {
    group: String,
    sku: String
  },
  computed: {
    ...mapGetters(['baseUrl'])
  },
  methods: {
    ...mapActions(['getCatalogItemById']),
    getCatalogItem() {
      this.loading = true
      this.getCatalogItemById(this.sku)
        .then(data => {
          this.catalogItem = Object.assign({}, data)
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style>
.image-container {
  padding: 15px 0px;
}
.item-view-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.main-info-container {
  padding: 5px;
}
</style>
