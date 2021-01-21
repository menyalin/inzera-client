import seriesList from '@/components/series/list.vue'
import editSeries from '@/components/series/editSeries.vue'

export default [
  {
    path: '/series',
    name: 'seriesList',
    component: seriesList
  },
  {
    path: '/series/new',
    name: 'newSeries',
    component: editSeries
  },
  {
    path: '/series/:id',
    name: 'editSeries',
    component: editSeries,
    props: true
  }
]
