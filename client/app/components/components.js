import angular from 'angular';
import Home from './home/home';
import Slides from './slides/slides';
import Login from './login/login';

let componentModule = angular.module('app.components', [
  Home,
  Slides,
  Login
])

.name;

export default componentModule;
