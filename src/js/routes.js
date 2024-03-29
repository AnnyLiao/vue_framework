import LoginPage from '../pages/login.vue';
import HomePage from '../pages/dashboard.vue';
import EquipmentPage from '../pages/equipment.vue';
import FormPage from '../pages/form.vue';
import SetUpPage from '../pages/set_up.vue';
import ProductPage from '../pages/product.vue';
import SettingsPage from '../pages/settings.vue';
import DashboardPage from '../pages/dashboard.vue';
import TimelinePage from '../pages/timeline.vue';
import AnalysisPage from '../pages/analysis.vue';
import DMPage from '../pages/dashboard_manage.vue';

import DynamicRoutePage from '../pages/dynamic-route.vue';
import RequestAndLoad from '../pages/request-and-load.vue';
import NotFoundPage from '../pages/404.vue';

var routes = [{
    path: '/',
    async(routeTo, routeFrom, resolve, reject) {
      var userLoggedIn = sessionStorage.getItem("logined");
      
      if (userLoggedIn != null) {
        
        resolve({
          component: HomePage})
      }
      else 
      {
        
        resolve({
          component: LoginPage})
      }
    }
  },
  {
    path: '/login/',
    component: LoginPage,
  },
  {
    path: '/equipment/',
    component: EquipmentPage,
  },
  {
    path: '/timeline/',
    component: TimelinePage,
  },
  {
    path: '/analysis/',
    component: AnalysisPage
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/setUp/',
    component: SetUpPage,
  },
  {
    path: '/dashboard_manage/',
    component: DMPage,
  },
  {
    path: '/product/:id/',
    component: ProductPage,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [{
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve({
          component: RequestAndLoad,
        }, {
          context: {
            user: user,
          }
        });
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;