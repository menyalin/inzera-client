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
              <v-list-item-title>Назад</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <hr v-if="parent.length >= 2" />
          <v-list-item v-for="item of catalog" :key="item._id" @click="click(item)">
            <v-list-item-avatar tile>
              <v-avatar size="30px" v-if="item.mainImageUrl">
                <v-img :src="baseUrl + item.mainImageUrl" />
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                icon
                :to="
                  item.type === 'group'
                    ? '/catalog/editGroup/' + item._id
                    : '/catalog/editItem/' + item._id
                "
              >
                <v-icon color="green">mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import listHeader from './listHeader'
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
    listHeader
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
