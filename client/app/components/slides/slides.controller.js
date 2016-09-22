class SlidesController {

  /*@ngInject*/
  constructor($scope, $timeout, slideService, socket, userService, modalService) {
    // init var
    this._$scope = $scope;
    this._$timeout = $timeout;
    this._slideService = slideService;
    this._socket = socket;
    this._userService = userService;
    this._modalService = modalService;

    this.structure = {};
    this.currentPage = 0;

    // init
    this.init();
  }

  initReveal() {
    Reveal.initialize();
  }

  initEvents(){
    // init chage slide event
    Reveal.addEventListener( 'slidechanged', ( event ) => {
      this.currentPage = Reveal.getProgress();
      this._socket.emit('slide:changed', { page: this.currentPage } );
    });

    this._socket.on('connect', () => {
      console.log('client connected');
      this._socket.emit('client:connected', { name: 'Test name' } );
    });

    this._socket.on('slide:navigate', (data) => {
      console.log(data);
      if(data.page !== this.currentPage) { Reveal.slide(data.page); }
    })
  }

  init() {
    // get structure
    this.structure = this._slideService.getStructure(12);

    // init events
    this.initEvents();

    // run reveal.js
    this._$timeout(() => {
      this.initReveal({
        center: false
      });
    });
  }
}

export default SlidesController;
