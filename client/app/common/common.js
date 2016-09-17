import angular from 'angular';
import Navbar from './navbar/navbar';

let commonModule = angular.module('app.common', [
  Navbar,
  // Hero,
  // User
])

.name;

export default commonModule;
