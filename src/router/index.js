import Vue from 'vue'
import Router from 'vue-router'
import main from '../components/main'
import Create from '../components/Create'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Login from '../components/Login'
import Detail from '../components/Detail'
import Signup from '../components/Signup'

Vue.use(BootstrapVue)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    }

  ]
})
