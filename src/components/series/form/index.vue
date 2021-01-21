<template>
  <form @submit.prevent="submitForm">
    <v-card :loading="loading">
      <v-card-title>{{ formTitle }} </v-card-title>
      <v-card-text>
        <v-text-field label="Название" v-model="localSeries.name" />
        <div class="sku-wrapper">
          <div class="series-sku" v-if="!!Object.keys(this.localSeries).length">
            <h5>Состав серии</h5>
            <v-list dense>
              <draggable v-model="localSeries.sku">
                <transition-group>
                  <v-list-item v-for="sku of localSeries.sku" :key="sku" class="pa-0 ma-1">
                    <v-list-item-content class="pa-0">
                      {{ tmpSku[sku] ? tmpSku[sku].name : sku }}
                    </v-list-item-content>
                    <v-list-item-action class="my-0">
                      <v-btn icon @click="removeSku(sku)" color="warning" x-small>
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </transition-group>
              </draggable>
            </v-list>
          </div>
          <div class="add-sku-button">
            <v-btn @click="addToSeries" :disabled="!selected.length" color="accent">Добавить</v-btn>
          </div>
          <div class="search-sku">
            <v-text-field
              label="Поиск"
              @change="changeSearchText"
              @keydown.enter.prevent
              outlined
              hide-details
              dense
            />
            <v-data-table
              :loading="searchLoading"
              dense
              show-select
              item-key="_id"
              :headers="headers"
              v-model="selected"
              :items-per-page="40"
              hide-default-footer
              :items="filteredSearchResult"
            />
          </div>
        </div>
      </v-card-text>
      <card-buttons
        :submitDisabled="!formValid"
        @cancel="cancel"
        @deletebtn="deletebtn"
        :showDeleteBtn="!!localSeries._id"
      />
    </v-card>
  </form>
</template>

<script>
import draggable from 'vuedraggable'
import { mapActions, mapGetters } from 'vuex'

import cardButtons from '@/components/common/cardButtons'

export default {
  name: 'seriesForm',
  components: {
    cardButtons,
    draggable
  },
  data() {
    return {
      searchLoading: false,
      searchText: null,
      tmpSku: {},
      searchResult: [],
      selected: [],
      headers: [{ text: 'Название', value: 'name' }],
      localSeries: {
        _id: null,
        name: null,
        sku: []
      }
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    formTitle: String,
    series: Object
  },
  computed: {
    formValid() {
      return !!this.localSeries.name
    },
    filteredSearchResult() {
      return this.searchResult.filter(item => !this.localSeries.sku.includes(item._id))
    }
  },
  watch: {
    series: {
      handler: function(val) {
        if (!!val && val._id) {
          this.localSeries = { ...val }
          if (!!val.sku.length) {
            this.getCatalog({ skuArray: val.sku }).then(res => {
              console.log(res)
              this.addToTmpSku(res)
            })
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(['getCatalog']),
    cancel() {
      this.$router.go(-1)
    },
    deletebtn() {
      this.$emit('deletebtn')
    },
    removeSku(sku) {
      this.localSeries.sku = this.localSeries.sku.filter(item => item !== sku)
    },
    submitForm() {
      if (this.formValid) {
        this.$emit('form-submit', this.localSeries)
      }
    },
    addToTmpSku(skuArray) {
      skuArray.forEach(item => this.$set(this.tmpSku, item._id, item))
    },
    addToSeries() {
      this.selected.forEach(item => this.localSeries.sku.push(item._id))
    },
    changeSearchText(str) {
      if (str.trim().length) {
        this.searchLoading = true
        this.getCatalog({ search: str.trim() })
          .then(res => {
            this.searchResult = res
            this.addToTmpSku(res)
          })
          .finally(() => (this.searchLoading = false))
      }
    }
  }
}
</script>

<style scoped>
.sku-wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: space-around;
  align-items: flex-center;
}
.search-sku {
  width: 42%;
}
.add-sku-button {
  align-self: center;
}
.series-sku {
  width: 42%;
}
</style>
