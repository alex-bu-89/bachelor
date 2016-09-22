class ModalService {

  /*@ngInject*/
  constructor($uibModal) {
    this._$uibModal = $uibModal;
    console.log('MODAL')
  }

  open(size) {
    var modalInstance = this._$uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'modallogin.html',
      size: size,
      resolve: {
        items: 10
      }
    });
  }

}

export default ModalService;
