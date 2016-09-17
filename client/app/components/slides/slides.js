import angular from 'angular';
import uiRouter from 'angular-ui-router';
import slidesComponent from './slides.component';
import SlideService from './slides.service';
import trustFilter from '../../shared/filter/trust.filter';

let slidesModule = angular.module('slides', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('/slides', {
      url: '/slides/:id',
      component: 'slides'
    });
})

.component('slides', slidesComponent)
.service('slideService', SlideService)
.filter('trustHtml', trustFilter)

.name;

export default slidesModule;
