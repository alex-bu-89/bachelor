class SlidesController {

  /*@ngInject*/
  constructor($scope, $timeout, slideService, socket, userService, $uibModal, $stateParams) {

    this._Reveal = Reveal;
    this._$scope = $scope;
    this._$timeout = $timeout;
    this._$stateParams = $stateParams;

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
    this._Reveal.initialize({
      center: false
    });
  }

  initEvents() {
    // init change slide event
    Reveal.addEventListener('slidechanged', (event) => {
      this.currentPage = event.indexh;
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
    });
    this._socket.on('task:updateAllAnswers:broadcast', (data) => {
      console.log('task:updateAllAnswers:broadcast');
      this.structure.slides[data.page].task.allAnswers.push({answer: data.answer});
    });
  }

  authenticateTempUser() {
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
    // get presentation structure
    this._slideService.getStructureById(this._$stateParams.id)
      .then((structure)=>{
        this.structure = structure;
        this._$timeout(() => {
          // init events
          this.initEvents();
          // init reveal.js
          this.initReveal();
          // authenticate temp user if you not logged in
          if (!this._userService.isAuthenticated) {
            if (!this._userService.isTempAuthenticated) {
              this.authenticateTempUser();
            }
          }
        });
    });
  }

}

export default SlidesController;
