class SlidesService {

  constructor() {
    // init var
    this.structure = {};

    this.init();
  }

  getStructure(id){
    return {
      id: 111,
      theme: '',
      slides: [
        {
          contentHtml: '<h1>Test structure</h1><p>Test text super <a href="">test</a></p><ul><li>item 1</li><li>item 2</li></ul>',
          task: {
            type: '', // multiple, quiz, code,
            questions: 'What time is it?',
            answer: ''
          }
        },
        {
          contentHtml: '<h1>Slide 2</h1>',
        }
      ]
    };
  }

  init(){}
}

export default SlidesService;
