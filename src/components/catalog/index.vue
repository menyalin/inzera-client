<template>
  <v-container>
    <v-row v-if="!loading">
      <v-col cols="8" offset-md="3" md="5">
        <list-header
          :parent="$route.params.group"
          :itemDisabled="!containSku($route.params.group)"
          :groupDisabled="!containSubgroups($route.params.group)"
        />
        <catalog-navigation v-if="$route.params.group" :groupId="$route.params.group" />
        <v-list subheader>
          <!-- <v-list-item v-if="parent.length >= 2" @click="back" dense>
            <v-list-item-content>
              <v-list-item-title>
                <v-icon>mdi-arrow-top-left-bold-outline</v-icon>
                Назад
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="parent.length >= 2" /> -->
          <div v-for="item of catalogList" :key="item._id">
            <list-item-group
              :item="item"
              :baseUrl="baseUrl"
              @click="click(item)"
              v-if="item.type === 'group'"
            />
            <list-item-sku v-else :item="item" :baseUrl="baseUrl" />
          </div>
        </v-list>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <spinner />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import spinner from '@/components/spinner'
import catalogNavigation from './catalogNavigation'
import listHeader from './listHeader'
import listItemGroup from './listItemGroup'
import listItemSku from './listItemSku'

export default {
  data: () => ({
    catalog: []
  }),
  methods: {
    ...mapActions(['getCatalog']),
    click(item) {
      if (item.type === 'group' && this.$route.params.group !== item._id) {
        this.$router.push('/catalog/' + item._id)
      }
    }
  },
  components: {
    spinner,
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
        let options = {}
        if (to.params.group) {
          options.parent = to.params.group
        } else {
          options.parent = 'root'
        }
        this.getCatalog(options)
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters(['baseUrl', 'catalogList', 'loading', 'containSku', 'containSubgroups'])
  }
}
</script>

<style></style>
