import Redux = require('redux');
import ReduxActions = require('redux-actions');
import actions_ = require('./actions');
import model_ = require('./model');

const initialState: model_.State = {
  all: [],
  selected: []
};

const dictionary = ReduxActions.handleActions({
  [actions_.LOAD_ASYNC]: (state: model_.State, action: ReduxActions.Action<model_.State>) => {
    return Object.assign({}, action.payload);
  },
  [actions_.LOAD_PROGRESS]: (state: model_.State, action: ReduxActions.Action<model_.State>) => {
    return Object.assign({}, state, action.payload);
  }, 
  [actions_.LOADED]: (state: model_.State, action: ReduxActions.Action<model_.State>) => {
    let newState = Object.assign({}, action.payload);
    newState.all.sort((a, b) => {
      let v = a.simplified.localeCompare(b.simplified);
      if (!v) v = a.traditional.localeCompare(b.traditional);
      return v;
    });

    return newState;
  },
  [actions_.SEARCH]: (state: model_.State, actions: ReduxActions.Action<model_.State>) => {
    const validDelimiters = "- \n\r\t";
    var query = actions.payload.query as string;
    let filtered: number[] = query 
      ? state.all.reduce((indexes, s, i) => {
          let found = s.simplified.indexOf(query) > -1 || 
            s.traditional.indexOf(query) > -1 ||
            (query.length > 1 && s.glosses.some(g => {
              let pos = g.description.indexOf(query);
              if (pos < 0) {
                return false;
              }
              
              if (pos === 0) {
                return true;
              }

              return validDelimiters.indexOf(g.description[pos - 1]) > -1;
            }));

          return found ? [...indexes, i] : indexes;
        }, [])
      : [];
    
    filtered.sort((a, b) => {
      let v = state.all[a].simplified.length - state.all[b].simplified.length;
      return v > 0 ? 1 : (v < 0 ? -1 : 0);
    });

    return {
      all: state.all,
      completed: true,
      query: query,
      selected: filtered,
      page: 1,
      numberOfPages: Math.ceil(filtered.length / model_.WORDS_PER_PAGE)
    } as model_.State;
  },
  [actions_.GOTO_PAGE]: (state: model_.State, actions: ReduxActions.Action<model_.State>) => {
    return Object.assign({}, state, actions.payload);
  }
}, initialState);

export = Redux.combineReducers({
  dictionary
});
