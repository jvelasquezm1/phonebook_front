import React, { Component } from 'react';
import Header from './header/Header';
import { NavLink as Link } from 'react-router-dom';

import styles from './components.module.scss';

export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <Header>
          <h1 className={styles.Title}>Phonebook</h1>
        </Header>
        <div className={`${styles.Content}`}>
          <Link to="/create" className={styles.RouterLink} activeClassName={styles.Active}>
            {'Create'}
          </Link>
          <Link to="/edit" className={styles.RouterLink} activeClassName={styles.Active}>
            {'Edit'}
          </Link>
        </div>
      </div>
    )
  }
}
