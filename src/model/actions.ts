import Redux = require('redux-actions');
import model_ = require('./model');

export const LOAD_ASYNC = "LOAD_ASYNC";
export const LOAD_PROGRESS = "LOAD_PROGRESS";
export const LOADED = "LOADED";
export const SEARCH = "SEARCH";
export const GOTO_PAGE = "GOTO_PAGE";

export const loadAsyncAction = Redux.createAction<model_.State>(LOAD_ASYNC, () => ({
  all: [],
  selected: [], 
  completed: false
}));

export const loadProgressAction = Redux.createAction<model_.State>(LOAD_PROGRESS, (progressPercentage: number) => ({
  progressPercentage
}));

export const loadedAction = Redux.createAction<model_.State>(LOADED, (all: model_.Word[]) => ({
  all,
  selected: [],
  completed: true
}));

export const searchAction = Redux.createAction<model_.State>(SEARCH, (query: string) => ({ 
  query
}));

export const goToPageAction = Redux.createAction<model_.State>(GOTO_PAGE, (page: number) => ({ 
  page
}));
