<template>
  <v-container>
    <v-row>
      <v-col md="6" offset-md="3">
        <catalog-form
          @submit-form="submit"
          @cancel-form="cancel"
          title="Новая группа"
          type="group"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import catalogForm from './catalogForm'

export default {
  name: 'newCatalogGroup',
  components: {
    catalogForm
  },
  methods: {
    submit() {
      console.log('submit form')
    },
    cancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style></style>
