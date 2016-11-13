export interface Gloss {
  description: string;
}

export interface Word {
  id: number;
  traditional: string;
  simplified: string;
  pinyin: string;
  glosses: Gloss[];
}

export interface State {
  all?: Word[];
  selected?: number[];
  completed?: boolean;
  query?: string;
  progressPercentage?: number;
  page?: number;
  numberOfPages?: number;
}

export const WORDS_PER_PAGE = 10;
