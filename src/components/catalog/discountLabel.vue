<template>
  <v-chip
    color="red"
    text-color="white"
    :style="{ transform: 'rotate(-25deg)' }"
    class="mt-6"
    small
  >
    Скидка {{ discount }}%
  </v-chip>
</template>

<script>
export default {
  name: 'discountLabel',
  props: {
    discount: [String, Number]
  }
}
</script>

<style></style>
