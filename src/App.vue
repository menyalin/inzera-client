<template>
  <v-app>
    <v-app-bar app color="primary" dense dark>
      <v-spacer />
      <v-btn text to="/">Каталог</v-btn>
      <v-btn text to="/images">images</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
