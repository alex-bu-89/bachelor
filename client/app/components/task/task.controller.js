class TaskController {

  /*@ngInject*/
  constructor($scope, $rootScope, $http, $timeout, config, slideService, userService, socket) {
    this._$scope = $scope;
    this._$rootScope = $rootScope;
    this._$http = $http;
    this._$timeout = $timeout;
    this._config = config;
    this._slideService = slideService;
    this._userService = userService;
    this._socket = socket;

    this.LOCAL_ANSWER = 'local_answer';

    this.structure = this.slideStructure;
    this.codeToExecute = this.structure.task.code;
    this.consoleOutput = '';
    this.myPieChart;

    this.init();
  }

  $onInit() {

    this._socket.on('structure:changed:broadcast', (data) => {
      this.slideStructure = data.structure.slides[this.slideStructure.page]
    });

    this._socket.on('task:poll:updateData:broadcast', (data) => {
      if (this.slideStructure.page == data.page) {
        console.log('task:poll:updateData:broadcast: ');
        data.task.answer = this.slideStructure.task.answer;
        this.slideStructure.task.allAnswers.push({answer: data.answer});
        this.slideStructure.task.poll.possibleAnswers = data.task.poll.possibleAnswers;

        this.myPieChart.data.datasets[0].data = this.slideStructure.task.poll.possibleAnswers.map((possibleAnswer)=> {
          return possibleAnswer.votes;
        });

        this.myPieChart.update();
      }
    });

  }

  executeCode() {
    this._$http({
      url: this._config.API_ENDPOINT + '/execute-code',
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      dataType: 'json',
      method: 'POST',
      data: {"codeToExecute": this.codeToExecute}
    }).then((result) => {
      if (result.status == 200) {
        if (result.data.result !== 'null' && result.data.console[0] !== undefined) {
          this.consoleOutput = result.data.result;
          this.consoleOutput += '\n[log]: ' + result.data.console;
        } else if (result.data.result !== 'null') {
          this.consoleOutput = result.data.result;
        } else if (result.data.console[0] !== undefined) {
          this.consoleOutput = '\n[log]: ' + result.data.console;
        }
      } else {
        console.log(result);
      }
    });
  }

  sendCodeAnswer() {
    window.localStorage.setItem(this.LOCAL_ANSWER, JSON.stringify(this.codeToExecute));
    this.slideStructure.task.answer = this.codeToExecute;
    // emit answers on change
    this._socket.emit('task:updateAllAnswers',
      {
        answer: this.slideStructure.task.answer,
        page: this.slideStructure.page
      });
  }

  sendPollAnswer(answer, slideStructure) {
    /*var ctx = angular.element(document.querySelector('#myChart'))[0];
     ctx.width = 600;
     ctx.height = 600;*/

    this.slideStructure.task.answer = answer;

    slideStructure.task.poll.possibleAnswers.map((possibleAnswer) => {
      possibleAnswer.votes = parseInt(possibleAnswer.votes);
      if (possibleAnswer.title == answer.title) {
        possibleAnswer.votes = possibleAnswer.votes + 1;
      }
      return possibleAnswer.title;
    });

    this._socket.emit('task:poll:updateData', slideStructure);

  }

  init() {
    this._$timeout(() => {
      var ctx = angular.element(document.querySelector('#myChart'))[0];
      ctx.width = 600;
      ctx.height = 600;

      this.myPieChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.structure.task.poll.possibleAnswers.map((possibleAnswer)=> {
            return possibleAnswer.title;
          }),
          datasets: [
            {
              label: "My First dataset",
              data: this.structure.task.poll.possibleAnswers.map((possibleAnswer)=> {
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
        },
        options: {
          responsive: false,
          maintainAspectRatio: true,
        }
      });
    });
  }

}

export default TaskController;
