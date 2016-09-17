import angular from 'angular';
import Home from './home/home';
import Slides from './slides/slides';

let componentModule = angular.module('app.components', [
  Home,
  Slides
])

.name;

export default componentModule;
