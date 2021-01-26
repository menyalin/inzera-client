<template>
  <v-container>
    <v-row>
      <v-col md="6" offset-md="3">
        <catalog-form
          :updatedItem="updatedItem"
          :parentProp="parent"
          :loading="loading"
          :type="type"
          :parentItems="parentItems(type)"
          @submit-form="submit"
          @cancel-form="cancel"
          :title="formTitle"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import catalogForm from './catalogForm'

export default {
  name: 'editCatalogItem',
  props: {
    type: String
  },
  data: () => ({
    loading: false,
    updatedItem: {},
    parent: null
  }),
  components: {
    catalogForm
  },
  computed: {
    ...mapGetters(['parentItems']),
    formTitle() {
      return !!this.updatedItem && this.updatedItem._id ? 'Редактировать запись' : 'Новая запись'
    }
  },
  methods: {
    ...mapActions(['getCatalog', 'newCatalogItem']),
    submit(newGroup) {
      this.loading = true
      newGroup.type = this.type
      this.newCatalogItem(newGroup)
        .then(res => {
          this.$router.go(-1)
        })
        .catch(e => this.$store.commit('setError', e.message))
        .finally(() => (this.loading = false))
    },
    cancel() {
      this.$router.go(-1)
    }
  },
  created() {
    if (this.$route.params.group) this.parent = this.$route.params.group
    if (this.$route.params.id) {
      this.loading = true
      this.getCatalog({ _id: this.$route.params.id })
        .then(res => {
          if (res.length) {
            this.updatedItem = Object.assign({}, res[0])
          } else {
            this.$store.commit('setError', 'Запись не найдена!')
            this.$router.go(-1)
          }
        })
        .catch(e => {
          this.$store.commit('setError', 'Ошибка выполнения запроса к серверу')
          this.$router.go(-1)
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style></style>
