class ModalController {

  /*@ngInject*/
  constructor() {
    this.user = {
      isProf: false,
      email: null,
      name: ''
    };
  }

  /**
   * ok
   */
  ok() {
    this.close({$value: this.user});
  };

  /**
   * cancel
   */
  cancel() {
    this.dismiss({$value: 'cancel'});
  };

}

export default ModalController;
