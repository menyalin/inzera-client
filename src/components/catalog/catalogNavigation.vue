<template>
  <div>
    <v-subheader>
      {{ parentById(groupId) ? parentById(groupId).name : null }}
    </v-subheader>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'catalogNavigation',
  props: {
    groupId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['parentById'])
  }
}
</script>

<style>
.catalog-nav-wrapper {
  display: flex;
  flex-direction: row;
}
</style>
