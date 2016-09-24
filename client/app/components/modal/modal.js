import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './login.modal.html';
import controller from './modal.controller';

let modal = angular.module('modal', [
  uiRouter
])

  .component('loginModalComponent', {
    restrict: 'E',
    bindings: {
      resolve: '<',
      close: '&',
      dismiss: '&'
    },
    template,
    controller
  })

  .name;

export default modal;
