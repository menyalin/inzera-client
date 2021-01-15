import brandList from '@/components/brands/brandList'
import editBrand from '@/components/brands/editBrand'

export default [
  {
    path: '/brands',
    name: 'brandList',
    component: brandList
  },
  {
    path: '/brands/new',
    name: 'newBrand',
    component: editBrand
  },
  {
    path: '/brands/:id',
    name: 'editBrand',
    component: editBrand,
    props: true
  }
]
