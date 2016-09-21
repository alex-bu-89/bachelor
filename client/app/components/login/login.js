import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './login.html';
import controller from './login.controller';
import './login.sass';

let loginModule = angular.module('login', [
  uiRouter
])

  .config(($stateProvider) => {
    "ngInject";
    $stateProvider
      .state('/login', {
        url: '/login',
        component: 'login'
      });
  })

  .component('login', {
    restrict: 'E',
    bindings: {},
    template,
    controller
  })

  .name;

export default loginModule;
