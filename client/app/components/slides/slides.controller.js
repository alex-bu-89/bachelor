class SlidesController {

  /*@ngInject*/
  constructor($scope, $timeout, slideService, socket, userService, $uibModal) {
    // init var
    this._Reveal = Reveal;
    this._$scope = $scope;
    this._$timeout = $timeout;
    this._slideService = slideService;
    this._socket = socket;
    this._userService = userService;
    this._$uibModal = $uibModal;

    this.structure = {};
    this.currentPage = 0;

    // init
    this.init();
  }

  initReveal() {
    this._Reveal.initialize();
  }

  initEvents() {
    // init chage slide event
    Reveal.addEventListener('slidechanged', (event) => {
      this.currentPage = Reveal.getProgress();
      this._socket.emit('slide:changed', {page: this.currentPage});
    });

    this._socket.on('connect', () => {
      console.log('client connected');
      this._socket.emit('client:connected', {name: this._userService.getUser().name});
    });

    this._socket.on('slide:navigate', (data) => {
      console.log(data);
      if (data.page !== this.currentPage) {
        Reveal.slide(data.page);
      }
    })
  }

  open() {
    // disable reveal keyboard events
    this._Reveal.configure({
      keyboard: null
    });
    // open modal
    var modalInstance = this._$uibModal.open({
      animation: false,
      component: 'loginModalComponent',
      keyboard: false,
      openedClass: 'student-login-modal',
      resolve: {
        items: 10
      }
    });

    modalInstance.result.then((user) => {
      this._userService.storeTempUserCredentials(user);
    },() => {
      console.log('modal-component dismissed at: ' + new Date());
    });

    modalInstance.closed.then(()=> {
      // enable reveal keyboard eventsenable reveal keyboard events
      this._Reveal.configure({
        keyboard: {}
      })
    })
  }

  init() {
    // get structure
    this.structure = this._slideService.getStructure(12);

    // run app
    this._$timeout(() => {

      // init events
      this.initEvents();

      this.initReveal();
      if (!this._userService.isTempAuthenticated) {
        this.open();
      }
    });
  }
}

export default SlidesController;
