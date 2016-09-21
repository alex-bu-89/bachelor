class SlidesController {

  /*@ngInject*/
  constructor($scope, $timeout, slideService, socket, authService) {
    // init var
    this._$scope = $scope;
    this._$timeout = $timeout;
    this._slideService = slideService;
    this._socket = socket;
    this._authService = authService;
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
    
    this._socket.on('slide:navigate', (data) => {
      console.log(data);
      if(data.page !== this.currentPage) { Reveal.slide(data.page); }
    })
  }

  init() {
    // get structure
    this.structure = this._slideService.getStructure(12);

    // run reveal
    this._$timeout(() => {
      this.initReveal({
        center: false
      })

      console.log('isAuthenticated: ', this._authService.isAuthenticated);
    });

    // init events
    this.initEvents()
  }
}

export default SlidesController;
