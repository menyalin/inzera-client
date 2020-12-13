<template>
  <v-container>
    <v-row>
      <v-col cols="7" offset-md="3" md="4">
        <list-header />
        <v-list subheader>
          <v-subheader>Каталог</v-subheader>
          <v-list-item v-for="item of catalog" :key="item._id" @click="click">
            <v-list-item-avatar tile>
              <v-avatar size="30px" v-if="item.mainImageUrl">
                <v-img :src="baseUrl + item.mainImageUrl" />
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon :to='"/catalog/editGroup/"+item._id'>
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
  data: () => ({ catalog: [] }),
  methods: {
    ...mapActions(['getCatalog']),
    click() {}
  },
  mounted() {
    this.getCatalog().then(data => (this.catalog = data))
  },
  components: {
    listHeader
  },
  computed: {
    ...mapGetters(['baseUrl'])
  }
}
</script>

<style></style>
