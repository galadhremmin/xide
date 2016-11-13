import React = require('react');
import Redux = require('redux');

interface IProps {
  page: number;
  numberOfPages: number;
  onChanged: (page: number) => void;
}

interface IState {
  page: number;
}

class Paginator extends React.Component<IProps, IState> {
  constructor(props: IProps, context: any) {
    super(props, context);

    this.state = {
      page: props.page
    };
  }

  render() {
    const isFirst = this.state.page < 2;
    const isLast = this.state.page === this.props.numberOfPages;
    let pages: number[] = [];
    for (let i = 1; i <= this.props.numberOfPages; i += 1) {
      pages.push(i);
    }
    
    return (
      <ul className="pagination">
        <li className={isFirst ? 'disabled' : 'waves-effect'}><a href="#!" onClick={this.previousPage.bind(this)}><i className="material-icons">chevron_left</i></a></li>
        {pages.map(page => (<li key={page} className={(page === this.state.page) ? 'active' : 'waves-effect'}><a href="#!" onClick={this.navigated.bind(this)} data-page={page}>{page}</a></li>))}
        <li className={isLast ? 'disabled' : 'waves-effect'}><a href="#!"><i className="material-icons" onClick={this.nextPage.bind(this)}>chevron_right</i></a></li>
      </ul>
    );
  }

  private navigated(e: Event) {
    e.preventDefault();
    let element = (e.target as HTMLElement);
    let page = parseInt(element.dataset['page'] as string);
    this.relay(page);
  }

  private previousPage(e: Event) {
    e.preventDefault();
    this.relay(this.state.page - 1);
  }

  private nextPage(e: Event) {
    e.preventDefault();
    this.relay(this.state.page + 1);
  }

  private relay(page: number) {
    if (page < 1 || page > this.props.numberOfPages) {
      return;
    }

    this.setState({ page });
    this.props.onChanged(page);
  }
}

export = Paginator;
