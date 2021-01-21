<template>
  <div class="detail-info-wrapper">
    <v-expansion-panels accordion>
      <v-expansion-panel v-for="i of fieldsArray" :key="i.value">
        <v-expansion-panel-header>
          <span class="panel-title">
            {{ i.title }}
          </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ i.description }}
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
      return this.settings.map(field => {
        if (Object.keys(this.item[field.value]).length) {
          return {
            title: field.title,
            name: this.item[field.value].name,
            description: this.item[field.value].description
          }
        }
      })
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
