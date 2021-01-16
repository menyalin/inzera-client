import catalog from '@/components/catalog/index'
import editCatalogItem from '@/components/catalog/editCatalogItem'
import catalogItemView from '@/components/catalog/catalogItemView'

export default [
  {
    path: '/catalog',
    name: 'catalogRoot',
    component: catalog
    // props: {
    //   group: 'root'
    // }
  },
  {
    path: '/catalog/:group/:sku',
    component: catalogItemView,
    name: 'catalogItem',
    props: true
  },
  {
    path: '/catalog/:group',
    component: catalog,
    name: 'catalogGroup'
    // props: true
  },
  {
    path: '/newSKU',
    name: 'newItem',
    component: editCatalogItem,
    props: {
      type: 'item'
    }
  },
  {
    path: '/newCatalogGroup',
    name: 'newGroup',
    component: editCatalogItem,
    props: {
      type: 'group'
    }
  },
  {
    path: '/editCatalogGroup/:id',
    component: editCatalogItem,
    props: {
      type: 'group'
    }
  },
  {
    path: '/editSKU/:id',
    component: editCatalogItem,
    props: {
      type: 'item'
    }
  }
]
