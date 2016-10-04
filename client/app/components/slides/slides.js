import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './slides.html';
import controller from './slides.controller';
import './slides.sass';
import SlideService from './slides.service';
import trustFilter from '../../shared/filter/trust.filter';

let slidesModule = angular.module('slides', [ uiRouter] )
// set route   
.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('/slides', {
      url: '/slides/:id',
      component: 'slides'
    });
})
// set component
.component('slides', {
  restrict: 'E',
  bindings: {},
  template,
  controller
})
// set slide service
.service('slideService', SlideService)
// set filter
.filter('trustHtml', trustFilter)

.name;

export default slidesModule;
