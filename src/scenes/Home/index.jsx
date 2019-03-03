import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';

export default class Home extends Component {

  render() {

    return (
      <div className={styles.segment}>
        <h2>Select excercise</h2>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/notes">
              Notes
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/scales">
              Scales
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}
