<template>
  <form @submit.prevent="submitForm">
    <v-card :loading="loading">
      <v-card-title>{{ formTitle }} </v-card-title>
      <v-card-text>
        <v-text-field label="Название" v-model="name" />
        <v-textarea outlined label="Описание" v-model="description" rows="8" />
      </v-card-text>
      <card-buttons
        :submitDisabled="!formValid"
        @cancel="cancel"
        @deletebtn="deletebtn"
        :showDeleteBtn="!!id"
      />
    </v-card>
  </form>
</template>

<script>
import cardButtons from '@/components/common/cardButtons'
export default {
  name: 'brandForm',
  components: {
    cardButtons
  },
  data: () => ({
    id: null,
    name: null,
    description: null
  }),
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    formTitle: String,
    brand: Object
  },
  computed: {
    formValid() {
      return !!this.name && !!this.description
    }
  },
  watch: {
    brand: {
      handler: function(val) {
        if (!!val && val._id) {
          this.id = val._id
          this.name = val.name
          this.description = val.description
        }
      },
      immediate: true
    }
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    deletebtn() {
      this.$emit('deletebtn')
    },

    submitForm() {
      if (this.formValid) {
        let newBrand = {
          name: this.name,
          description: this.description
        }
        if (this.id) newBrand._id = this.id
        this.$emit('form-submit', newBrand)
      }
    }
  }
}
</script>

<style></style>
