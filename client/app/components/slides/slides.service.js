/*
  this.structure = {
    id: 'aX4j9Z',
    subject: {

    },
    feedback: [

    ],
    slides: [
      {
        content: '',
        task: {
          type: 'code',
          questions: '',
          answer: '',
          allAnswers: [

          ],
          code: {

          }
        },
        assets: {

        }
      },
      {
        // next slide
      },
      {
        // next slide
      }
    ]
  };
*/

class SlidesService {

  /*@ngInject*/
  constructor($http, $q, config) {
    this._$http = $http;
    this._$q = $q;
    this._config = config

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