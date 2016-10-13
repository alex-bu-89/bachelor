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
    this.message = 'Ausführen Sie bitte den Code um ihre Lösung zu überprüfen und abzugeben';

    this.structure = this.slideStructure;
    this.codeToExecute = this.structure.task.codeTask.code;
    this.unitTest = this.structure.task.codeTask.unitTest;
    this.consoleOutput = '';
    this.isCodeFine = false;
    this.isCodeRun = false;
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

  runCodeChecker(){

    this.isCodeRun = true;

    this.executeCode().then((data)=>{
      // clear consol message
      this.consoleOutput = '';

      // check output for error
      var error = false;
      if(data.result !== 'null'){
        error = data.result.toLowerCase().indexOf('error') !== -1
      }
      if(data.result === 'null' && data.console[0] === undefined){
        error = true
      }

      // show output message
      if (data.result !== 'null' && data.console[0] !== undefined) {
        this.consoleOutput += data.result + '\r\n';
        this.consoleOutput += '[log]: ' + data.console + '\r\n';
      } else if (data.result !== 'null') {
        this.consoleOutput += data.result + '\r\n';
      } else if (data.console[0] !== undefined) {
        this.consoleOutput += '[log]: ' + data.console + '\r\n';
      }

      // return error
      return error;

    }).then((error)=>{
      // check code if no syntax error
      if(!error){
        this.checkCode()
          .then((data)=> {
            if (data.state === 'passed') {
              this.isCodeFine = true;
            }
            else {
              this.consoleOutput += '[log]: ' + data.err.message + '\r\n';
              this.isCodeFine = false;
            }
          });
      } else {
        this.consoleOutput += '[log]: error ' + '\r\n';
        this.isCodeFine = false;
      }
    });
  }

  checkCode(){
    return this._$http({
      url: this._config.API_ENDPOINT + '/checkcode',
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      dataType: 'json',
      method: 'POST',
      data: {
        "codeToExecute": this.codeToExecute,
        "unitTest": this.unitTest,
      }
    }).then((result) => {
      console.log(result);
      if (result.status == 200) {
        return result.data;
      } else {
        console.err('error' + result.data);
        return result.data
      }
    });
  }

  executeCode() {
    return this._$http({
      url: this._config.API_ENDPOINT + '/execute-code',
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
      dataType: 'json',
      method: 'POST',
      data: {"codeToExecute": this.codeToExecute}
    }).then((result) => {
      if (result.status == 200) {
        console.log(result.data);
        return result.data;
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

  /**
   * Save the answer and send it to all clients
   * @param answer
   * @param slideStructure
   */
  sendPollAnswer(answer, slideStructure) {
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

  /**
   * initialisation
   */
  init() {
    this._$timeout(() => {
      var ctx = angular.element(document.querySelector('#myChart'))[0];
      ctx.width = 500;
      ctx.height = 500;

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
