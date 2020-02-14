import {RouteConfig} from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: 'index', component: () => import('pages/Index.vue')},
      {
        path: 'imports',
        component: () => import('pages/ImportsPage.vue'),
      },
      {path: '', redirect: 'imports'},
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
