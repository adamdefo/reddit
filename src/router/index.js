import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/auth/Auth'
import Reddit from '@/components/reddit/Reddit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/reddit',
      name: 'Reddit',
      component: Reddit
    }
  ]
})
