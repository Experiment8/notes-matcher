import React, { Component } from 'react';

import { shuffle } from './utils';
import { NOTES } from './config';

import styles from './styles.module.css';

const randomNote = reverse => {
  const notes = getObjectMethod(!reverse)(NOTES);
  return notes[Math.floor((Math.random() * notes.length))];
};

const randomBool = () => (
  Math.random() >= 0.5
);

const getObjectMethod = reverse => (
  reverse ? Object.keys : Object.values
);

const getCorrectnessClass = correct => {
  const classes = [styles.correctness];

  if (correct) classes.push(styles.correct);
  else classes.push(styles.wrong);

  return classes.join(' ');
}

const checkCorrectness = (selection, note, reverse) => (
  reverse ?
    (NOTES[selection] === note) :
    (selection === NOTES[note])
)

const getItemClasses = (note, selectedNote, correct) => {
  const classes = [styles.item];

  if (correct !== undefined) {
    if (note === selectedNote) {
      if (correct) classes.push(styles.correct);
      else classes.push(styles.wrong);
    } else {
      classes.push(styles.disabled);
    }
  }

  return classes.join(' ');
}

export default class App extends Component {

  state = {
    notes        : shuffle(Object.values(NOTES)),
    wrongs       : 0,
    rights       : 0,
    disabled     : false,
    reverse      : false,
    note         : randomNote(),
    selectedNote : undefined,
    correct      : undefined
  }

  selectAnswer = selection => {
    const correct = checkCorrectness(
      selection,
      this.state.note,
      this.state.reverse
    );

    const { rights, wrongs } = this.state;

    this.setState({
      correct,
      disabled     : true,
      selectedNote : selection,
      rights       : correct ? (rights + 1) : rights,
      wrongs       : !correct ? (wrongs + 1) : wrongs
    })

    setTimeout(() => {
      const reverse = randomBool();

      this.setState({
        reverse,
        notes        : shuffle(getObjectMethod(reverse)(NOTES)),
        disabled     : false,
        note         : randomNote(reverse),
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

      notes,
      selectedNote,

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
          { notes.map((note, idx) => (
            <li
              key={note}
              className={getItemClasses(note, selectedNote, correct)}
              onClick={() => {
                if (!disabled) this.selectAnswer(note)
              }}>
              { note }
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
