import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import {
  Index,
  Edit,
  ContentList,
  PagePreview,
  Page,
  EditForm,
  LightManageCenter,
  FormManageCenter
} from '@/page';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { 
    path: '/', 
    name: 'home',
    component: Index,
    redirect: 'list',
    children: [
      {
        path: 'list',
        name: 'list',
        component: ContentList,
      },
      {
        path: '/edit/:id',
        name: 'edit',
        component: Edit
      },
      {
        path: '/EditForm',
        name: 'EditForm',
        component: EditForm
      },
      {
        path: '/LightManageCenter/:id',
        name: 'LightManageCenter',
        component: LightManageCenter
      },
      {
        path: '/FormManageCenter/:id',
        name: 'FormManageCenter',
        component: FormManageCenter
      }
    ]
  },
  {
    path: '/pageview/:id',
    name: 'PagePreview',
    component: PagePreview
  },
  {
    path: '/page/:id',
    name: 'Page',
    component: Page
  }
  // {
  //   path: 'conversion',
  //   name: 'conversion',
  //   component: Conversion,
  //   redirect: 'channelconversion',
  //   children: [
  //     {
  //       path: 'channelconversion',
  //       name: 'ChannelConversion',
  //       component: ChannelConversion,
  //     },
  //     {
  //       path: 'turnoverdefeate',
  //       name: 'TurnoverDefeate',
  //       component: TurnoverDefeate,
  //     }
  //   ]
  // }
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login,
  // }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
