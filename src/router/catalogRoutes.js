import catalog from '@/components/catalog/index'
import editCatalogItem from '@/components/catalog/editCatalogItem'

export default [
    {
        path: '/catalog',
        name: 'catalog',
        component: catalog
      },
      {
        path: '/catalog/newItem',
        name: 'newItem',
        component: editCatalogItem,
        props: {
          type: 'item'
        }
      },
      {
        path: '/catalog/newGroup',
        name: 'newGroup',
        component: editCatalogItem,
        props: {
          type: 'group'
        }
      },
      {
        path: '/catalog/editGroup/:id',
        component: editCatalogItem,
        props: {
          type: 'group'
        }
      },
      {
        path: '/catalog/editItem/:id',
        component: editCatalogItem,
        props: {
          type: 'item'
        }
      }
    ]