class NavbarController {
  /*@ngInject*/
  constructor($scope, $rootScope, userService) {
    this._$scope = $scope;
    this._$rootScope = $rootScope;
    this._userService = userService;
    this.currentUser;

    this.init()
  }

  init(){
    this.currentUser = this._userService.getUser();

    this.stream = this._$rootScope.$on('user.updated', (event, user) => {
      this.currentUser = user;
    });

    this._$scope.$on('$destroy', this.stream);
  }

}

export default NavbarController;
