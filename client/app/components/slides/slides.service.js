class SlidesService {

  constructor() {
    // init var
    this.structure = {
      id: 111,
      theme: '',
      slides: [
        {
          contentHtml: '<h1>Test structure</h1>',
          task: {
            type: 'code', // multiple, quiz, code,
            questions: 'Fibonacci numbers',
            code: 'function fibonacci(a){\nfor(var d,b=1,c=0;a>=0;)\nd=b,b+=c,c=d,a--;\nreturn c\n}\nfibonacci(10)',
            answer: '',
            allAnswers: [],
          }
        },
        {
          task: {
            type: 'poll',
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
            allAnswers: [],
          }
        },
        {
          contentHtml: '<h1>Test structure</h1><p>Test text super <a href="">test</a></p><ul><li>item 1</li><li>item 2</li></ul>',
        },
        {
          contentHtml: '<h1>Test structure</h1>',
          task: {
            type: 'code', // multiple, quiz, code,
            questions: 'Fibonacci numbers',
            code: 'function fibonacci(a){\nfor(var d,b=1,c=0;a>=0;)\nd=b,b+=c,c=d,a--;\nreturn c\n}\nfibonacci(10)',
            answer: '',
            allAnswers: [],
          }
        },
      ]
    };

    this.init();
  }

  getStructure(id) {
    this.structure.slides.map((slide, index)=>{
      slide.page = index;
    });
    return this.structure;
  }

  setStructure(str, id) {
    console.log(str);
    this.structure = str;
  };

  init() {
  }
}

export default SlidesService;
