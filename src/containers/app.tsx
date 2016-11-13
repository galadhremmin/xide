import React = require('react');
import ReactDOM = require('react-dom');
import Redux = require('redux');
import ReactRedux = require('react-redux');
import http = require('axios');

import SearchInput = require('components/search');
import Word = require('components/word');
import Paginator = require('components/paginator');

import model_ = require('model/model');
import actions_ = require('model/actions');

interface IAppProps {
  dispatch?: Redux.Dispatch<any>;
  data: model_.State;
}

class App extends React.Component<IAppProps, void> {
  private worker_: Worker;

  constructor(props: IAppProps, context: any) {
    super(props, context);
  }

  componentDidMount() {
    this.props.dispatch(actions_.loadAsyncAction());

    http.get('/words.txt').then((r) => {
      this.worker_ = new Worker('/scripts/workers/parser-worker.js');
      this.worker_.onmessage = this.workerProgress.bind(this);
      this.worker_.postMessage({
        id: 'parse',
        dataSource: r.data as string
      });
    });
  }

  render() {
    const from = (this.props.data.page - 1) * model_.WORDS_PER_PAGE;
    const to   = Math.min(from + model_.WORDS_PER_PAGE, this.props.data.selected.length);

    return (
      <article>
        <SearchInput onChanged={this.searchTermChanged.bind(this)} />
        {!this.props.data.completed ? (
          <div className="progress">
            <div className="determinate" style={{width: this.props.data.progressPercentage + '%'}}></div>
          </div>
        ) : (
          <div className="row">
            {this.props.data.selected.slice(from, to).map(index => (
              <Word word={this.props.data.all[index]} key={this.props.data.all[index].id} />)
            )}
            </div>
        )}
        {this.props.data.selected.length > 0 ? (
          <Paginator onChanged={this.paginationChanged.bind(this)} page={this.props.data.page} numberOfPages={this.props.data.numberOfPages} />
        ) : ''}
      </article>
    );
  }

  private workerProgress(e: MessageEvent) {
    if (e.data.words) {
      this.props.dispatch(actions_.loadedAction(e.data.words));
    } else {
      let progressPercentage = ~~(e.data.progress / e.data.total * 100);
      this.props.dispatch(actions_.loadProgressAction(progressPercentage));
    }
  }

  private searchTermChanged(term: string) {
    this.props.dispatch(actions_.searchAction(term));
  }

  private paginationChanged(page: number) {
    this.props.dispatch(actions_.goToPageAction(page));
  }
}

const mapStateToProps = (state: any) => ({
  data: state.dictionary
});

export = ReactRedux.connect(mapStateToProps)(App);
