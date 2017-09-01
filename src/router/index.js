import Vue from 'vue'
import Router from 'vue-router'

import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Singer from 'components/singer/singer'
import Search from 'components/search/search'
import SingerDetail from 'components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children:[
        {
          // 动态路径参数 以冒号开头,以id为变量
          path: ':id',
          component: SingerDetail,

        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },

  ]
})
