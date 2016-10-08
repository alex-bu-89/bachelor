import angular from 'angular';
import uiRouter from 'angular-ui-router';
import socketFactory from './shared/factory/socket';
import Components from './components/components';
import config from './shared/config/config';
import UserService from './shared/service/user.service';
import 'normalize.css';
import template from './app.html';
import './app.sass';

angular.module('app', [
  uiRouter,
  Components
])
  .config(($locationProvider, $stateProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
  })

  .constant('config', config)

  .component('app', {
    template,
    restrict: 'E'
  })

  .service('userService', UserService)

  .factory('socket', socketFactory)

  .factory('AuthInterceptor', function ($rootScope, $q, config) {
    "ngInject";
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: config.NOT_AUTHENTICATED,
        }[response.status], response);
        console.log('NOT_AUTHENTICATED');
        return $q.reject(response);
      }
    };
  })
  .config(function ($httpProvider) {
    "ngInject";
    $httpProvider.interceptors.push('AuthInterceptor');
  })

  .run(($rootScope, $state, userService) => {
    "ngInject";
    $rootScope.$on('$stateChangeStart', (event, next, nextParams, fromState) => {
      console.log('$stateChangeStart: ', next.name);
      if (!userService.isAuthenticated()) {
        if (next.name !== 'outside.login' && next.name !== 'outside.register') {
          /*event.preventDefault();
          $state.go('outside.login');*/
        }
      }
    });

  });



