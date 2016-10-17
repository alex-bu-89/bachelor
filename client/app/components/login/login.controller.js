class LoginController {

  /*@ngInject*/
  constructor($scope, userService, $state) {

    this._$scope = $scope;
    this._userService = userService;
    this._$state = $state;
    this.user = {
      email: '',
      password: ''
    };

    this.init();
    console.log('login init');
  }

  /**
   * Login
   */
  login() {
    this._userService.login(this.user)
      .then((msg) => {
        // $state.go('/slides/1');
        console.log(msg);
      }, (errMsg) => {
        console.log(errMsg);
      });
  };

  /**
   * Logout
   */
  logout() {
    this._userService.logout();
  }

  init() { }

}

export default LoginController;
