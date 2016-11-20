import React = require('react');
import Redux = require('redux');

interface IProps {
  onChanged: (term: string) => void;
}

interface IState {
  term: string;
}

class Search extends React.Component<IProps, IState> {
  constructor(props: IProps, context: any) {
    super(props, context);
    this.state = {
      term: ''
    };
  }

  render() {
    return (
      <form method="get" action="" onSubmit={this.commit.bind(this)}>
        <div className="input-field">
          <i className="material-icons prefix">search</i>
          <input id="search-box" type="search" value={this.state.term} onChange={this.changed.bind(this)} />
          <label htmlFor="search-box">Search term</label>
        </div>
      </form>
    );
  }

  private changed(e: Event) {
    this.setState({ term: (e.target as HTMLInputElement).value });
  }

  private commit(e: Event) {
    e.preventDefault();
    this.props.onChanged(this.state.term);
  }
}

export = Search;
