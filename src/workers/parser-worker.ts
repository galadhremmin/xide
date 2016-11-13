class DictionaryParser {
  constructor(private updateProgressFunc_: (progress: number, total: number, words?: any[]) => void) {
  }

  parse(r: string) {
    let words: any[] = [];

    let lines = r.split('\n');
    for (var i = lines.length - 1; i > 0; i -= 1) {
      let line = lines[i];

      if (this.shouldIgnore(line)) {
        continue;
      }

      let endOfTraditional = line.indexOf(' ');
      let endOfSimplified = line.indexOf(' ', endOfTraditional + 1);
      let startOfPinyin = line.indexOf('[');
      let endOfPinyin = line.indexOf(']');
      let rawGlosses = line.substr(endOfPinyin).split('/');

      let word = {
        id: i + 1,
        simplified: line.substr(endOfTraditional + 1, endOfSimplified - endOfTraditional - 1),
        traditional: line.substr(0, endOfTraditional),
        pinyin: line.substr(startOfPinyin + 1, endOfPinyin - startOfPinyin - 1),
        glosses: rawGlosses.reduce((glosses, gloss, index) => {
          if (index < 1 || !gloss || gloss[0] == '\n' || gloss[0] == '\r') {
            return glosses;
          }

          return [...glosses, {
            description: gloss
          }];
        }, [])
      };

      if (i % 1000 === 0) {
        this.updateProgressFunc_(lines.length - i, lines.length);
      }

      words.push(word);
    }

    this.updateProgressFunc_(words.length, words.length, words);
  }

  private shouldIgnore(line: string): boolean {
    return line[0] === '#';
  }
}

const reportProgress = (progress: number, total: number, words: any[] = null) => {
  postMessage({
    progress, 
    total,
    words
  }, undefined);
};

const worker = (e: MessageEvent) => {
  if (e.data.id !== 'parse') {
    return;
  }

  let data = e.data.dataSource as string;
  var parser = new DictionaryParser(reportProgress);
  parser.parse(data);
};

onmessage = worker;
