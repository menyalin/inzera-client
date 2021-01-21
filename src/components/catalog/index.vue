<template>
  <v-container>
    <v-row>
      <v-col lg="8" offset-lg="2" xl="6" offset-xl="3">
        <list-header
          :parent="$route.params.group"
          :itemDisabled="!containSku($route.params.group)"
          :groupDisabled="!containSubgroups($route.params.group)"
          @change-search-input="changeSearchInput"
        />
        <catalog-navigation :groupId="$route.params.group" />
        <v-list subheader>
          <div v-for="item of catalogList" :key="item._id">
            <list-item-group
              :item="item"
              :baseUrl="baseUrl"
              @click="click(item)"
              v-if="item.type === 'group'"
            />
            <list-item-sku v-else :item="item" :baseUrl="baseUrl" @click="click(item)" />
          </div>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import catalogNavigation from './catalogNavigation'
import listHeader from './listHeader'
import listItemGroup from './listItemGroup'
import listItemSku from './listItemSku'

export default {
  data: () => ({
    catalog: [],
    search: null
  }),
  methods: {
    ...mapActions(['getCatalog']),
    ...mapMutations(['clearCatalog']),
    click(item) {
      if (item.type === 'group' && this.$route.params.group !== item._id) {
        this.$router.push('/catalog/' + item._id)
      } else if (item.type === 'item') {
        this.$router.push(this.$route.path + '/' + item._id)
      }
    },
    getCatalogItem(group = 'root', str = '') {
      let options = {
        date: this.currentDate
      }
      if (str.trim().length) options.search = str
      else options.parent = group
      this.getCatalog(options)
    },
    changeSearchInput(str) {
      this.getCatalogItem(this.$route.params.group, str)
    }
  },
  components: {
    listHeader,
    listItemGroup,
    listItemSku,
    catalogNavigation
  },
  props: {
    group: String,
    sku: String
  },
  watch: {
    $route: {
      handler: function(to, from) {
        this.clearCatalog()
        this.getCatalogItem(to.params.group)
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters([
      'baseUrl',
      'catalogList',
      'loading',
      'containSku',
      'containSubgroups',
      'currentDate'
    ])
  }
}
</script>

<style></style>
