class ModalController {

  /*@ngInject*/
  constructor() {
    this.user = {
      isProf: false,
      email: null,
      name: ''
    };
  }

  ok() {
    this.close({$value: this.user});
  };

  cancel() {
    this.dismiss({$value: 'cancel'});
  };

}

export default ModalController;
