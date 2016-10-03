import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './task.html';
import controller from './task.controller';
import SlideService from '../slides/slides.service';
import style from './task.sass';


let taskModule = angular.module('task', [
  uiRouter,
])

  .component('task', {
    restrict: 'E',
    bindings: {
      slideStructure: '='
    },
    template,
    controller
  })

  .name;

export default taskModule;
