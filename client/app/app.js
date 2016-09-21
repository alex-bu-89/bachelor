import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import socketFactory from './shared/factory/socket';
import Components from './components/components';
import config from './shared/config/config';
import AuthService from './shared/service/auth.service';
import 'normalize.css';
import template from './app.html';
import './app.sass';

angular.module('app', [
  uiRouter,
  Common,
  Components,
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

  .service('authService', AuthService)
  .service('userService', AuthService)

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

  .run(($rootScope, $state, authService) => {
    "ngInject";
    $rootScope.$on('$stateChangeStart', (event, next, nextParams, fromState) => {
      if (!authService.isAuthenticated()) {
        console.log(next.name);
        if (next.name !== 'outside.login' && next.name !== 'outside.register') {
          /*event.preventDefault();
          $state.go('outside.login');*/
        }
      }
    });

  })



