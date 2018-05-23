import Vue from 'vue'
import Router from 'vue-router'
import Reddit from '@/components/reddit/Reddit'
import Julia from '@/components/julia/Julia'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Reddit',
      component: Reddit
    },
    {
      path: '/julia',
      name: 'Julia',
      component: Julia
    }
  ]
})
