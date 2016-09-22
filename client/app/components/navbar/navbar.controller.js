class NavbarController {
  /*@ngInject*/
  constructor(userService) {
    this._userService = userService;
    this.currentUser;

    this.init()
  }

  init(){
    this.currentUser = this._userService.getUser();
  }

}

export default NavbarController;
