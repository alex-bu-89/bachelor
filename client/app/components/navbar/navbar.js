import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './navbar.html';
import controller from './navbar.controller';

let navbarModule = angular.module('navbar', [
  uiRouter
])

.component('navbar', {
  restrict: 'E',
  bindings: {},
  template,
  controller
})
  
.name;

export default navbarModule;
