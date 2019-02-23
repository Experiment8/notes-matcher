import React, { Component } from 'react';

import { shuffle } from './utils';
import { NOTES } from './config';

import styles from './styles.module.css';

const randomNote = () => {
  const notes = Object.keys(NOTES);
  return notes[Math.floor((Math.random() * (notes.length - 1)))];
};

const getCorrectnessClass = correct => {
  const classes = [styles.correctness];

  if (correct) classes.push(styles.correct);
  else classes.push(styles.wrong);

  return classes.join(' ');
}

export default class App extends Component {

  state = {
    wrongs       : 0,
    rights       : 0,
    disabled     : false,
    note         : randomNote(),
    selectedNote : undefined,
    correct      : undefined
  }

  selectAnswer = usNote => {
    const correct = usNote === NOTES[this.state.note];

    const { rights, wrongs } = this.state;

    this.setState({
      correct,
      disabled     : true,
      selectedNote : usNote,
      rights       : correct ? (rights + 1) : rights,
      wrongs       : !correct ? (wrongs + 1) : wrongs
    })

    setTimeout(() => {
      this.setState({
        disabled     : false,
        note         : randomNote(),
        selectedNote : undefined,
        correct      : undefined
      })
    }, 1000)

  }

  render() {

    const {

      note,
      correct,
      disabled,

      rights,
      wrongs

    } = this.state;

    return (
      <div clasName={styles.container}>

        <div className={styles.counter}>
          <div className={styles.right}>
            Right: { rights }
          </div>
          <div className={styles.wrong}>
            Wrong: { wrongs }
          </div>
        </div>

        <div className={styles.note}>
          <span className={styles.inner}>
            { note }
          </span>
        </div>

        <ul className={styles.selection}>
          { shuffle(Object.values(NOTES)).map((usNote, idx) => (
            <li
              className={styles.item}
              onClick={() => {
                if (!disabled) this.selectAnswer(usNote)
              }}>
              { usNote }
            </li>
          )) }
        </ul>

        { correct !== undefined && <div className={getCorrectnessClass(correct)}>
          { correct ? 'Right' : 'Wrong' }
        </div> }

      </div>
    );
  }
}
