<template>
  <v-container>
    <v-row>
      <v-col class="spinner-wrapper">
        <v-progress-circular :size="100" color="primary" indeterminate :width="8" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'spinner'
}
</script>

<style>
.spinner-wrapper {
  padding-top: 100px;
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
