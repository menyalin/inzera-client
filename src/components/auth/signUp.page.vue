<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-form @submit.prevent="submit">
            <v-card-text>
              <transition name="fade">
                <v-alert :type="messageType" v-if="!!message">{{ message }}</v-alert>
              </transition>
              <v-text-field label="Логин" prepend-icon="mdi-at" type="text" v-model="login" />
              <v-text-field label="Имя" prepend-icon="mdi-account" type="text" v-model="name" />
              <v-text-field
                id="password"
                v-model="password"
                label="Пароль"
                prepend-icon="mdi-lock"
                type="password"
              />
              <v-text-field
                id="password"
                v-model="confirmPassword"
                label="Повторите пароль"
                prepend-icon="mdi-lock"
                type="password"
                disabled
              />
            </v-card-text>
            <v-card-actions>
              <router-link to="/auth/login"><small>Уже зарегистрирован</small></router-link>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit" :loading="loading" :disabled="loading">
                Зарегистрироваться
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    formTitle: 'Создать новую учетную запись',
    loading: false,
    login: '',
    name: '',
    password: '',
    confirmPassword: '',
    message: null,
    messageType: null,
    errorTimeoutMs: 5000
  }),
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$store.getters.isLoggedIn) {
        vm.$router.push('/')
      }
    })
  },
  methods: {
    ...mapActions(['signUp']),
    showMessage(message, type) {
      this.messageType = type
      this.message = message
      setTimeout(() => {
        this.message = null
        this.messageType = null
      }, this.errorTimeoutMs)
    },
    submit() {
      this.loading = true
      const newUser = {
        login: this.login,
        name: this.name,
        password: this.password
      }
      this.signUp(newUser)
        .then(res => {
          if (res.token) {
            this.showMessage(
              'Учетная запись успешно создана, ожидайте подтверждения администратора',
              'success'
            )
          } else this.showMessage(res.message, 'warning')
        })
        .catch(e => this.showMessage(e.message, 'error'))
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
