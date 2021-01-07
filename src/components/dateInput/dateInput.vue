<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="true"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :label="label"
        :value="formattedDate"
        readonly
        :clearable="isClearable"
        @click:clear="reset"
        hide-details
        v-mask="'99.99.9999'"
        autocomplete="off"
        v-on="on"
        append-icon="mdi-calendar-text-outline"
      ></v-text-field>
    </template>
    <v-date-picker
      no-title
      :max="max"
      :min="min"
      :value="date"
      scrollable
      @click:date="clickDateHandler"
      first-day-of-week="1"
      color="primary"
    ></v-date-picker>
  </v-menu>
</template>
<script>
import AwesomeMask from 'awesome-mask'
import moment from 'moment'

export default {
  model: {
    prop: 'propDate',
    event: 'change'
  },
  props: {
    propDate: String,
    dateInputFormat: {
      type: String,
      default: 'DD.MM.YYYY'
    },
    readonly: {
      type: Boolean,
      default: true
    },
    isClearable: {
      type: Boolean,
      default: true
    },
    label: String,
    max: String,
    min: String
  },
  directives: {
    mask: AwesomeMask
  },
  data: () => ({
    date: null,
    formattedDate: null,
    menu: false
  }),
  methods: {
    inputDate(val) {
      // const res = val.split('.')
      // if (res.length === 1) {
      //   ;+res[0]
      // }
    },
    clickDateHandler(date) {
      this.$emit('change', date)
      this.menu = false
    },
    setDate(momentDate) {
      this.$emit('change', momentDate.format('YYYY-MM-DD'))
      this.formattedDate = momentDate.format(this.dateInputFormat)
    },
    reset() {
      this.$emit('change', null)
      this.date = null
    }
  },
  watch: {
    propDate: {
      immediate: true,
      handler: function(val) {
        if (val) {
          const tmpDate = moment(isNaN(+val) ? val : +val)
          if (tmpDate.isValid()) this.setDate(tmpDate)
          else this.reset()
        } else {
          this.reset()
        }
      }
    }
  }
}
</script>
