import React = require('react');
import model_ = require('model/model');

interface IProps {
  word: model_.Word;
}

class Word extends React.Component<IProps, void> {
  render() {
    const word = this.props.word;
    return (
      <blockquote>
        <h2>{word.simplified}</h2>
        <p><em>{word.pinyin}</em></p>
        <p>{word.glosses.reduce((gs, g) => [...gs, g.description], []).join('; ')}.</p>
      </blockquote>);
  }
}

export = Word;
