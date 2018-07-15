import Vue from 'vue';
import Router from 'vue-router';
import Application from './views/Application.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Application,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
});
