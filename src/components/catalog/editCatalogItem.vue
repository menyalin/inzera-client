<template>
  <v-container>
    <v-row>
      <v-col md="6" offset-md="3">
        <catalog-form
          :updatedItem="updatedGroup"
          :parentProp="parent"
          :loading="loading"
          :type="type"
          :parentItems="parentItems"
          @submit-form="submit"
          @cancel-form="cancel"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import catalogForm from './catalogForm'

export default {
  name: 'editCatalogItem',
  props: {
    type: String
  },
  data: () => ({
    loading: false,
    parentItems: [],
    updatedGroup: {},
    parent: null
  }),
  components: {
    catalogForm
  },
  methods: {
    ...mapActions(['getCatalog', 'newCatalogItem']),
    submit(newGroup) {
      this.loading = true
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
    if (this.$route.params.parent) this.parent = this.$route.params.parent
    this.loading = true
    let options = {}
    if (this.type === 'group') options.parent = 'root'
    else options.forItems = true
    this.getCatalog(options)
      .then(res => {
        this.parentItems = res.map(item => ({
          value: item._id,
          text: item.name
        }))
      })
      .catch(e => this.$store.commit('setError', e.message))
      .finally(() => (this.loading = false))
    if (this.$route.params.id) {
      this.getCatalog({ _id: this.$route.params.id })
        .then(res => {
          if (res.length) this.updatedGroup = Object.assign({}, res[0])
          else {
            this.$store.commit('setError', 'Запись не найдена!')
            this.$router.go(-1)
          }
        })
        .catch(e => {
          this.$store.commit('setError', 'Ошибка выполнения запроса к серверу')
          this.$router.go(-1)
        })
    }
  }
}
</script>

<style></style>
