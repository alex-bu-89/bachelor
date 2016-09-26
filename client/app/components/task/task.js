import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './task.html';
import controller from './task.controller';
import SlideService from '../slides/slides.service';


let taskModule = angular.module('task', [
  uiRouter,
])

  .component('task', {
    restrict: 'E',
    scope: {
      structure: '='
    },
    template,
    controller
  })

  .name;

export default taskModule;
