class SlidesService {

  constructor() {
    // init var
    this.structure = {};

    this.init();
  }

  getStructure(id) {
    return {
      id: 111,
      theme: '',
      slides: [
        {
          contentHtml: '<h1>Test structure</h1>',
          task: {
            type: 'poll', // multiple, quiz, code,
            questions: 'What\'s Your Favorite Programming Language?',
            possibleAnswers: [
              {
                title: 'Java',
                votes: 0
              },
              {
                title: 'C++',
                votes: 0
              },
              {
                title: 'JavaScript',
                votes: 0
              },
              {
                title: 'Rails',
                votes: 0
              }
            ],
            answer: '',
          }
        },
        {
          contentHtml: '<h1>Test structure</h1><p>Test text super <a href="">test</a></p><ul><li>item 1</li><li>item 2</li></ul>',
        }
      ]
    };
  }

  init() {
  }
}

export default SlidesService;
