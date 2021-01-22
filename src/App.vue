<template>
  <v-app>
    <v-app-bar app color="primary" dense dark>
      <v-spacer />
      <v-btn text to="/series">Серии</v-btn>
      <v-btn text to="/prices">Цены</v-btn>
      <v-btn text to="/details">Доп.Информация</v-btn>
      <v-btn text to="/catalog">Каталог</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <v-snackbar :value="error" :timeout="-1" rounded="pill" color="blue-grey lighten-2" dark>
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn color="indigo" text v-bind="attrs" @click="clearError">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['error'])
  },
  created() {
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
    console.log('process.env.API_URL', process.env.BASE_URL)
  },
  methods: {
    ...mapMutations(['clearError'])
  }
}
</script>
