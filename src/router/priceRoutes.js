import prices from '@/components/prices/index.vue'
import editSetPriceItem from '@/components/prices/editSetPriceItem'

export default [
  {
    path: '/prices',
    name: 'prices',
    component: prices
  },
  {
    path: '/prices/newSetPrice',
    name: 'newSetPrice',
    component: editSetPriceItem,
    props: {
      type: 'new'
    }
  }
]
