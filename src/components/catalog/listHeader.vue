<template>
  <div class="list-header-wrapper">
    <v-btn small icon to="/catalog"><v-icon>mdi-file-tree</v-icon></v-btn>
    <v-btn
      color="primary"
      small
      class="ma-1"
      :to="{ name: 'newItem', params: { group: this.$route.params.group } }"
      :disabled="itemDisabled || !!search"
    >
      <v-icon left>
        mdi-plus
      </v-icon>
      SKU
    </v-btn>
    <v-btn
      color="primary"
      class="ma-1"
      small
      :to="{ name: 'newGroup', params: { group: this.$route.params.group } }"
      :disabled="groupDisabled || !!search"
    >
      <v-icon left>
        mdi-plus
      </v-icon>
      Группа
    </v-btn>
    <v-text-field label="Поиск по каталогу" @change="changeSearchInput" hide-details class="mx-4" />
    <date-input
      label="Цены на дату"
      :propDate="currentDate"
      @change="setCurrentDate"
      :isClearable="false"
    />
  </div>
</template>

<script>
import dateInput from '@/components/common/dateInput/dateInput'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'listHeader',
  data: () => ({
    search: ''
  }),
  components: {
    dateInput
  },
  props: {
    itemDisabled: Boolean,
    groupDisabled: Boolean,
    parent: String
  },
  computed: {
    ...mapGetters(['currentDate'])
  },
  methods: {
    ...mapMutations(['setCurrentDate']),
    changeSearchInput(str) {
      if (str.trim().length > 2 || str.trim().length == 0) {
        this.search = str.trim()
        this.$emit('change-search-input', str.trim())
      }
    }
  }
}
</script>

<style>
.list-header-wrapper {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
</style>
