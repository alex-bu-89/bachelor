import angular from 'angular';
import Home from './home/home';
import Slides from './slides/slides';
import Login from './login/login';
import Navbar from './navbar/navbar';
import Modal from 'angular-ui-bootstrap/src/modal';

let componentModule = angular.module('app.components', [
  Home,
  Slides,
  Login,
  Navbar,
  Modal
])

.name;

export default componentModule;
