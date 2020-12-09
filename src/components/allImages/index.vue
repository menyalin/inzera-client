<template>
  <v-container>
    <v-row>
      <v-col>
        {{ imageUrls }}
      </v-col>
    </v-row>

    <v-row>
      <v-col class="img-wrapper">
        <div v-for="image of images" :key="image.url" class="img-item">
          <p class="pa-0 ma-0">
            <small>FileName: {{ image.name }}</small>
            <br />
            <small>Folders: {{ image.folders }}</small>
          </p>
          <v-img
            :src="baseUrl + image.url"
            aspect-ratio="1"
            class="grey lighten-2"
            height="200"
            width="200"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    imageUrls: []
  }),
  methods: {
    ...mapActions(['getImageUrls'])
  },
  created() {
    this.getImageUrls().then(res => (this.imageUrls = res))
  },
  computed: {
    images() {
      return this.imageUrls
    },
    ...mapGetters(['baseUrl'])
  }
}
</script>

<style>
.img-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.img-item {
  flex-basis: 250px;
}
</style>
