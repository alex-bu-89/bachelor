class TaskController {

  /*@ngInject*/
  constructor($scope, $http, config, slideService, userService, socket) {
    this._$scope = $scope;
    this._$http = $http;
    this._config = config;
    this._slideService = slideService;
    this._userService = userService;
    this._socket = socket;

    this.structure = this.slideStructure;
    this.codeToExecute = this.structure.task.code;
    this.consoleOutput = '';

  }

  $onInit() {
    this._socket.on('structure:changed:broadcast', (data) => {
      this.slideStructure = data.structure.slides[this.slideStructure.page]
    });
  }

  executeCode(){
    this._$http({
      url: this._config.API_ENDPOINT + '/execute-code',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      dataType: 'json',
      method: 'POST',
      data: {"codeToExecute": this.codeToExecute}
    }).then((result) => {
      if (result.status == 200) {
        if (result.data.result !== 'null' && result.data.console[0] !== undefined){
          this.consoleOutput = result.data.result;
          this.consoleOutput += '\n[log]: ' + result.data.console;
        } else if(result.data.result !== 'null'){
          this.consoleOutput = result.data.result;
        } else if(result.data.console[0] !== undefined){
          this.consoleOutput = '\n[log]: ' + result.data.console;
        }
      } else {
        console.log(result);
      }
    });
  }

  sendCodeAnswer(){
    this.slideStructure.task.answer = this.codeToExecute;
    // emit answers on change
    this._socket.emit('task:updateAllAnswers',
      {
        answer: this.slideStructure.task.answer,
        page: this.slideStructure.page
      });
  }

  sendPollAnswer(answer, slideStructure){
    var ctx = angular.element( document.querySelector( '#myChart' ) )[0];
    this.slideStructure.task.answer = answer;

    var test = slideStructure.task.poll.possibleAnswers.map((possibleAnswer)=>{
      possibleAnswer.votes = parseInt(possibleAnswer.votes);
      if(possibleAnswer.title == answer.title){
        possibleAnswer.votes = possibleAnswer.votes + 1;
      }
      return possibleAnswer.title;
    });

    var data = {
      labels: slideStructure.task.poll.possibleAnswers.map((possibleAnswer)=>{
        return possibleAnswer.title;
      }),
      datasets: [
        {
          label: "My First dataset",
          data: slideStructure.task.poll.possibleAnswers.map((possibleAnswer)=>{
            return possibleAnswer.votes;
          }),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#36A2EB",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#36A2EB",
          ]
        }]
    };

    var myPieChart = new Chart(ctx,{
      type: 'bar',
      data
    });
  }

}

export default TaskController;
