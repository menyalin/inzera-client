import detailList from '@/components/details/detailList'
import editDetail from '@/components/details/editDetail'

export default [
  {
    path: '/details',
    name: 'detailList',
    component: detailList
  },
  {
    path: '/details/new',
    name: 'newDetail',
    component: editDetail
  },
  {
    path: '/details/:id',
    name: 'editDetail',
    component: editDetail,
    props: true
  }
]
