<template>
  <v-list-item @click="$emit('click')">
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
          item.type === 'group' ? '/catalog/editGroup/' + item._id : '/catalog/editItem/' + item._id
        "
      >
        <v-icon color="green">mdi-pencil</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: 'listItemGroup',
  props: {
    item: Object,
    baseUrl: String
  }
}
</script>

<style></style>
