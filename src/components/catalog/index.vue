<template>
  <v-container>
    <v-row>
      <v-col cols="7">
        <list-header />
        <v-list subheader>
          <v-subheader>Каталог</v-subheader>
          <v-list-item v-for="item of catalog" :key="item._id" @click="click">
            <v-list-item-avatar tile>
              <v-avatar size="30px">
                <v-img :src="item.mainImageUrl" />
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        {{ catalog }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
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
  }
}
</script>

<style></style>
