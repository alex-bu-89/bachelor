import angular from 'angular';
import uiRouter from 'angular-ui-router';
import template from './slides.html';
import controller from './slides.controller';
import './slides.sass';
import SlideService from './slides.service';
import ModalService from './modal/modal.service';
import trustFilter from '../../shared/filter/trust.filter';


let slidesModule = angular.module('slides', [
  uiRouter,
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('/slides', {
      url: '/slides/:id',
      component: 'slides'
    });
})

.component('slides', {
  restrict: 'E',
  bindings: {},
  template,
  controller
})
.service('slideService', SlideService)
.service('modalService', ModalService)
.filter('trustHtml', trustFilter)

.name;

export default slidesModule;
