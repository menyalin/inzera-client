<template>
  <form @submit.prevent="submitForm">
    <v-card :loading="loading">
      <v-card-title>{{ formTitle }} </v-card-title>
      <v-card-text>
        <v-select v-model="type" label="Тип" :items="detailTypes" />
        <v-text-field label="Название" v-model="name" />
        <v-textarea outlined label="Описание" v-model="description" rows="10" />
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
import { mapGetters } from 'vuex'
export default {
  name: 'detailForm',
  components: {
    cardButtons
  },
  data: () => ({
    id: null,
    name: null,
    type: 'brand',
    description: null
  }),
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    formTitle: String,
    detail: Object
  },
  computed: {
    ...mapGetters(['detailTypes']),
    formValid() {
      return !!this.name && !!this.description
    }
  },
  watch: {
    detail: {
      handler: function(val) {
        if (!!val && val._id) {
          this.id = val._id
          this.type = val.type
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
        let newDetail = {
          type: this.type,
          name: this.name,
          description: this.description
        }
        if (this.id) newDetail._id = this.id
        this.$emit('form-submit', newDetail)
      }
    }
  }
}
</script>

<style></style>
