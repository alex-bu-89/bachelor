import angular from 'angular';
import Home from './home/home';
import Slides from './slides/slides';
import Task from './task/task';
import Login from './login/login';
import Navbar from './navbar/navbar';
import uiBootstrapModal from 'angular-ui-bootstrap/src/modal';
import loginModal from './modal/modal';

let componentModule = angular.module('app.components', [
  Home,
  Slides,
  Task,
  Login,
  Navbar,
  uiBootstrapModal,
  loginModal,
])

.name;

export default componentModule;
