class SlidesController {

  /*@ngInject*/
  constructor($scope, $rootScope, $timeout, $sce, slideService) {
    // init var
    this._$scope = $scope;
    this._$rootScope = $rootScope;
    this._$timeout = $timeout;
    this._$sce = $sce;
    this._slideService = slideService;
    this.structure = {};

    // init
    this.init();
  }

  initReveal() {
    Reveal.initialize();
  }

  init() {

    this.structure = this._slideService.getStructure(12);
    console.log(this.structure);

    // run reveal
    this._$timeout(() => {
      this.initReveal({
        center: false
      })
    });
  }

}

export default SlidesController;
