import React, { Component, Fragment } from 'react';

import { NOTES } from 'config';
import { SEMI_TONES_POSITION } from './config';

import styles from './styles.module.css';

const getKeys = () => {
  const keys = [];
  let i = 0;

  for (let key in NOTES) {
    if (!NOTES.hasOwnProperty(key)) continue;

    keys.push(
      <li className={styles.white} key={key}>
        <span className={styles.label}>{ NOTES[key] }</span>
        <span className={styles.note}>{ key }</span>
      </li>
    );

    if (SEMI_TONES_POSITION.indexOf(i) >= 0) {
      keys.push(<li key={i} className={styles.black}></li>)
    }

    i++;
  }

  return keys;
};

export default class ScalesMatcher extends Component {

  render() {

    return (
      <Fragment>
        <div className={styles.piano}>
          <ul className={styles.keyboard}>
           { getKeys() }
          </ul>
        </div>
      </Fragment>
    )
  }
}
