<template>
  <v-card elevation="3" outlined :loading="loading">
    <form @submit.prevent="submit" disabled>
      <v-card-title>
        {{ title }}
        <v-spacer />
        <v-img
          v-if="catalogItem.mainImageUrl"
          :src="baseUrl + catalogItem.mainImageUrl"
          aspect-ratio="1"
          max-height="60"
          max-width="60"
        />
      </v-card-title>
      <v-card-text>
        <v-text-field label="Название" v-model="catalogItem.name" />
        <v-text-field
          v-if="type === 'item'"
          label="Короткое название для блока с аналогами"
          v-model="catalogItem.nameForSeries"
        />
        <v-select
          v-if="type === 'item'"
          label="Бренд"
          v-model="catalogItem.brand"
          :items="allBrands"
          item-text="name"
          item-value="_id"
        />
        <v-select
          v-if="type === 'item'"
          label="Тип"
          v-model="catalogItem.skuType"
          :items="skuTypes"
        />
        <v-select
          v-if="type === 'item'"
          label="Серия"
          v-model="catalogItem.series"
          :items="allSeries"
          item-value="_id"
          item-text="name"
        />
        <v-select
          v-if="type === 'item'"
          label="Производитель"
          v-model="catalogItem.company"
          :items="allCompanies"
          item-text="name"
          item-value="_id"
        />
        <v-select
          v-if="type === 'item'"
          label="Рекомендации употребления"
          v-model="catalogItem.recomendation"
          :items="allRecomendations"
          item-text="name"
          item-value="_id"
        />
        <v-select
          v-if="type === 'item'"
          label="Электронный сомелье"
          v-model="catalogItem.sommelier"
          :items="allSommelier"
          item-text="name"
          item-value="_id"
        />
        <v-select
          v-if="type === 'item'"
          label="Сегмент"
          v-model="catalogItem.segment"
          :items="allSegments"
        />
        <v-text-field v-if="type === 'item'" label="Артикул" v-model="catalogItem.sku" />
        <v-select
          v-if="type === 'item'"
          label="Объем"
          v-model="catalogItem.volume"
          :items="volumeTypes"
        />
        <v-select v-if="type === 'item'" label="Крепость" v-model="catalogItem.abv" :items="abvs" />
        <v-text-field label="Рейтинг" hint="Очередность вывода" v-model="catalogItem.rank" />
        <v-select
          label="Родитель"
          multiple
          :items="parentItems"
          v-model="catalogItem.parent"
          clearable
          chips
        />
        <v-textarea
          v-if="type === 'item'"
          outlined
          hide-details
          label="Описание товара"
          v-model="catalogItem.description"
        />
        <v-checkbox hide-details label="Показывать в каталоге" v-model="catalogItem.isActive" />
        <v-checkbox
          v-if="isGroup"
          hide-details
          label="Может содержать подгруппы"
          v-model="catalogItem.containSubgroups"
        />
        <v-checkbox
          v-if="isGroup"
          hide-details
          label="Может содержать SKU"
          v-model="catalogItem.containSku"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn
          v-if="!isNewItem"
          color="warning"
          class="mx-2"
          @click="$emit('remove-catalog', catalogItem._id)"
        >
          Удалить
          <v-icon>mdi-delete </v-icon>
        </v-btn>
        <image-picker-dialog
          v-if="type === 'group'"
          buttonText="Иконка группы"
          folder="./static/svg"
          :maxWidthDialog="1000"
          v-model="catalogItem.mainImageUrl"
        />
        <image-picker-dialog
          v-else
          dialogTitle="Выбор фотографий"
          buttonText="Загрузить фото"
          multiple
          :maxWidthDialog="1300"
          v-model="catalogItem.images"
          folder="./static/sku_images"
        />
        <v-spacer />
        <v-btn color="primary" @click="cancel">Отмена</v-btn>
        <v-btn type="submit" color="primary" :disabled="!formValid || loading">Сохранить</v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import imagePickerDialog from '@/components/common/imagePickerDialog'
export default {
  name: 'catalogForm',
  data() {
    return {
      catalogItem: {
        _id: null,
        mainImageUrl: null,
        parent: [],
        images: null,
        nameForSeries: null,
        name: null,
        rank: 50,
        sommelier: null,
        segment: null,
        volume: null,
        series: null,
        brand: null,
        abv: null,
        company: null,
        recomendation: null,
        description: null,
        sku: null,
        containSubgroups: false,
        containSku: false,
        isActive: true
      }
    }
  },
  components: {
    imagePickerDialog
  },
  computed: {
    ...mapGetters([
      'baseUrl',
      'volumeTypes',
      'allBrands',
      'allDetails',
      'allCompanies',
      'allRecomendations',
      'allSommelier',
      'skuTypes',
      'allSegments',
      'abvs',
      'allSeries'
    ]),
    formValid() {
      return (
        (this.type === 'group' && this.catalogItem.name) ||
        (this.type === 'item' && this.catalogItem.name && this.catalogItem.parent.length >= 1)
      )
    },
    isGroup() {
      return this.type === 'group'
    },
    isNewItem() {
      return !this.catalogItem._id
    }
  },
  props: {
    parentProp: String,
    loading: {
      type: Boolean,
      default: false
    },
    parentItems: {
      type: Array
    },
    title: {
      type: String,
      default: 'Catalog Form'
    },
    type: {
      type: String,
      default: 'group',
      validator: function(value) {
        return ['group', 'item'].includes(value)
      }
    },
    updatedItem: {
      type: Object
    }
  },
  mounted() {
    if (this.parentProp) this.catalogItem.parent.push(this.parentProp)
    if (this.allDetails.length === 0) this.getAllDetails()
    if (this.allSeries.length === 0) this.getAllSeries()
  },
  methods: {
    ...mapActions(['getAllDetails', 'getAllSeries']),
    submit() {
      if (this.formValid) {
        this.$emit('submit-form', this.catalogItem)
      }
    },
    cancel() {
      this.$emit('cancel-form')
    }
  },
  watch: {
    updatedItem: {
      handler: function(val) {
        if (val._id) {
          this.catalogItem = Object.assign({}, val)
        }
      },
      immediate: true
    }
  }
}
</script>

<style></style>
