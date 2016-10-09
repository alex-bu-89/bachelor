class SlidesService {

  /*@ngInject*/
  constructor($http, $q, config) {
    this._$http = $http;
    this._$q = $q;
    this._config = config

    this.testStructure = {
      _id: 'aX4j9Z',
      subject: {

      },
      feedback: [

      ],
      slides: [
        {
          content: '<h2>Unterrichtssystem</h2>',
          assets: {

          },
          vertical: true
        },
        {
          content: '<h2>Verwendung der for Schleife</h2><br />' +
          '<pre><code>for (var i = 0; i < 9; i++) {\n' +
          '    console.log(i);\n' +
          '    // more statements\n' +
          '}</code></pre><br />' +
          '<p>Die folgende for Anweisung initialisiert die Variable <span>i</span> mit null. Die Bedingung prüft ob i kleiner neun ist, führt den Code in der block Anweisung aus und erhöht i um eins nach jedem Schleifendurchlauf.</p>',
            assets: {

          }
        },
        {
          task: {
            "type": "code",
            "questions": "Verwendung der for Schleife",
            "code": "for (var i = 0; i < 9; i++) {\n console.log(i);\n // more statements \n}",
            "allAnswers": [],
            "poll": {
              "possibleAnswers": []
            }
          }
        },
        {
          task: {
            "type": "poll",
            "questions": "Wie gut schätzen Sie ihr Vorwissen in JavaScript ein?",
            "allAnswers": [],
            "poll": {
              "possibleAnswers": [
                {
                  "title": "kein Vorwissen",
                  "votes": 0,
                  "_id": "57fa795d23546e995b83ce38"
                },
                {
                  "title": "etwas",
                  "votes": 0,
                  "_id": "57fa795d23546e995b83ce37"
                },
                {
                  "title": "geht so",
                  "votes": 0,
                  "_id": "57fa795d23546e995b83ce36"
                },
                {
                  "title": "recht gut",
                  "votes": 0,
                  "_id": "57fa795d23546e995b83ce35"
                },
                {
                  "title": "sehr gutes Vorwissen",
                  "votes": 0,
                  "_id": "57fa795d23546e995b83ce35"
                }
              ]
            }
          },
        },
      ]
    };

  }

  /**
   *
   * @param id
   * @returns {structure}
   */
  getStructureById(id) {
    return this._$http({
      url: this._config.API_ENDPOINT + '/slides/' + id,
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      dataType: 'json',
      method: 'GET'
    }).then((result) => {
      if (result.status == 200) {
        var defer = this._$q.defer();
        var structure = result.data;

        // TODO remove
        if(!structure){structure = this.testStructure}

        structure.slides.map((slide, index)=>{
          slide.page = index;
        });
        defer.resolve(structure);
        return defer.promise;
        
      } else {
        console.log('getStructureById: ' + result);
      }
    });
  }

  /**
   *
   * @param structure
   */
  setStructure(structure) {
    console.log(str);
    this.structure = str;
  };

  /**
   *
   * @param structure
   * @param id
   */
  updateStructureById(structure, id) {
    return this._$http({
      url: this._config.API_ENDPOINT + '/slides/' + id,
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      dataType: 'json',
      method: 'POST',
      data: {id: id, structure: structure}
    }).then((result) => {
      if (result.status == 200) {
        console.log(result);
      } else {
        console.log('updateStructureById error: ' + result);
      }
    });
  };

}

export default SlidesService;