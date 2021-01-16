<template>
  <v-container>
    <v-row>
      <v-col>
        <detail-form
          :formTitle="formTitle"
          @form-submit="submit"
          @deletebtn="deleteItem"
          :loading="loading"
          :detail="detail"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import detailForm from './detailForm'
export default {
  name: 'editDetail',
  props: ['id'],
  data: () => ({
    loading: false,
    detail: {}
  }),
  components: {
    detailForm
  },
  created() {
    if (!this.isNewDetail) {
      this.getDetail()
    }
  },
  computed: {
    isNewDetail() {
      return !this.id
    },
    formTitle() {
      return this.isNewDetail ? 'Новая запись' : 'Редактировать запись'
    }
  },
  methods: {
    ...mapActions(['createDetail', 'getDetailById', 'updateDetail', 'deleteDetail']),
    getDetail() {
      this.loading = true
      this.getDetailById(this.id)
        .then(detail => (this.detail = detail))
        .catch(e => this.$store.commit('setError', e.message))
        .finally(() => (this.loading = false))
    },
    submit(val) {
      this.loading = true
      if (this.isNewDetail) {
        this.createDetail(val)
          .then(() => this.$router.push('/details'))
          .catch(e => this.$store.commit('setError', e.message))
          .finally(() => (this.loading = false))
      } else {
        // отправка формы если бренд редактируется
        this.updateDetail(val)
          .then(() => this.$router.push('/details'))
          .catch(e => this.$store.commit('setError', e.message))
          .finally(() => (this.loading = false))
      }
    },
    deleteItem() {
      if (!this.isNewDetail) {
        this.loading = true
        this.deleteDetail(this.id).finally(() => {
          this.loading = false
          this.$router.push('/details')
        })
      }
    }
  }
}
</script>

<style></style>
