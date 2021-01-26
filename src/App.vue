<template>
  <div>
    <router-view v-if="!appLoading" />
    <spinner v-else />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import spinner from '@/components/common/spinner'
export default {
  computed: {
    ...mapGetters(['appLoading'])
  },
  components: {
    spinner
  }
}
</script>
