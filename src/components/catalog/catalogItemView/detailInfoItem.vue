<template>
  <div class="detail-info-wrapper">
    <v-expansion-panels v-if="isExistData" focusable>
      <v-expansion-panel v-for="item of fieldsArray" :key="item.value" class="ma-1">
        <v-expansion-panel-header>
          <span class="panel-title">
            {{ item.title }}
          </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ item.description }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: 'detailInfoItem',
  data() {
    return {
      settings: [
        { value: 'brand', title: 'О бренде' },
        { value: 'company', title: 'Производитель' },
        { value: 'recomendation', title: 'Рекомендуемое употребление' },
        { value: 'sommelier', title: 'Элетронный сомелье' }
      ]
    }
  },
  props: {
    item: Object
  },
  computed: {
    fieldsArray() {
      return this.settings
        .map(field => {
          if (!!this.item[field.value] && Object.keys(this.item[field.value]).length) {
            return {
              title: field.title,
              name: this.item[field.value].name,
              description: this.item[field.value].description
            }
          }
        })
        .filter(item => !!item && !!item.description)
    },
    isExistData() {
      return this.settings.some(field => this.item[field.value] && this.item[field.value].name)
    }
  }
}
</script>

<style scoped>
.panel-title {
  font-size: 1.2rem;
  font-weight: 500;
}
</style>
