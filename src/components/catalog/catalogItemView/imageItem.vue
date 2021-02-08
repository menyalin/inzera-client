<template>
  <div>
    <v-img
      v-if="isExistItem && !!item.images && !!item.images.length"
      width="250"
      height="350"
      contain
      :transition="false"
      :src="baseUrl + item.images[0]"
      aspect-ratio="1"
      @click="dialog = true"
    >
      <discount-label
        v-if="item.prices.length && item.prices[0].isPromo"
        :discount="item.prices[0].discount"
      />
    </v-img>
    <v-dialog v-model="dialog" max-width="1200">
      <v-card>
        <v-card-title>
          {{ item.name }}
        </v-card-title>
        <v-card-text class="center image-dialog-wrapper">
          <v-img
            v-if="isExistItem && !!item.images && !!item.images.length"
            max-width="800"
            max-height="650"
            contain
            :transition="false"
            :src="baseUrl + item.images[0]"
            aspect-ratio="1"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import discountLabel from '../discountLabel'

export default {
  name: 'imageItem',
  data: () => ({
    dialog: false
  }),
  props: {
    item: {
      type: Object
    }
  },
  components: {
    discountLabel
  },
  computed: {
    ...mapGetters(['baseUrl']),
    isExistItem() {
      return !!Object.keys(this.item).length
    }
  }
}
</script>

<style>
.image-dialog-wrapper {
  display: flex;
  justify-content: center;
}
</style>
