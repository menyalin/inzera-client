<template>
  <v-container>
    <v-row>
      <v-col cols="7" offset-md="3" md="4">
        <list-header
          :parent="parent[parent.length - 1]"
          :groupDisabled="parent.length >= 3"
          :itemDisabled="parent.length < 3"
        />
        <v-list subheader>
          <v-list-item v-if="parent.length >= 2" @click="back" dense>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-arrow-top-left-bold-outline</v-icon>
                Назад
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="parent.length >= 2" />
          <div v-for="item of catalog" :key="item._id">
            <list-item-group
              :item="item"
              :baseUrl="baseUrl"
              @click="click(item)"
              v-if="item.type === 'group'"
            />
            <list-item-sku :item="item" :baseUrl="baseUrl" />
          </div>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import listHeader from './listHeader'
import listItemGroup from './listItemGroup'
import listItemSku from './listItemSku'

export default {
  data: () => ({
    catalog: [],
    parent: ['root']
  }),
  methods: {
    ...mapActions(['getCatalog']),
    back() {
      if (this.parent.length >= 2) {
        this.parent = this.parent.slice(0, this.parent.length - 1)
      }
    },
    click(item) {
      this.parent.push(item._id)
      this.getCatalogItem({ parent: item._id })
    },
    getCatalogItem(options) {
      this.getCatalog(options).then(data => (this.catalog = data))
    }
  },
  components: {
    listHeader,
    listItemGroup,
    listItemSku
  },
  watch: {
    parent: {
      handler: function(val) {
        this.getCatalogItem({ parent: val[val.length - 1] })
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters(['baseUrl'])
  }
}
</script>

<style></style>
