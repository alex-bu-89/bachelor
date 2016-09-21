class LoginController {

  /*@ngInject*/
  constructor($scope, authService, $state) {

    this._$scope = $scope;
    this._authService = authService;
    this._$state = $state;
    this.user = {
      email: '',
      password: ''
    };

    this.init();
    console.log('login init');
  }

  login() {
    console.log(this.user);
    this._authService.login(this.user)
      .then((msg) => {
        // $state.go('inside');
        console.log(msg);
      }, (errMsg) => {
        console.log(errMsg);
      });
  };

  init() { }

}

export default LoginController;
