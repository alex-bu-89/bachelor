class TaskController {

  /*@ngInject*/
  constructor($scope, $timeout) {
    console.log('task controller');
    // init
    this.init();
    $timeout(function() {
      console.log($scope.structure);
    });
  }

  init() {

  }
}

export default TaskController;
