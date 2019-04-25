import React, { Component } from 'react'
import Header from './header/Header'
import styles from './components.module.scss'

import { connect } from 'react-redux';
import * as EntriesAction from '../store/actions/entries.actions';

class EditForm extends Component {
  render () {
    return (
      <div>
        <Header>
          <h1 className={styles.Title}>Phonebook</h1>
        </Header>

        <form>
          <div className={styles.ResetPasswordContainer}>
            <h3>Edit entry:</h3>
            <div className={styles.InputGroup}>
              <div>First Name</div>
              <input className='form-control' placeholder='First Name' />
            </div>
            <div className={styles.InputGroup}>
              <div>Last Name</div>
              <input className='form-control' placeholder='Last Name' />
            </div>
            <div className={styles.InputGroup}>
              <div>Phone</div>
              <input className='form-control' placeholder='Phone' />
            </div>
            <button type='button' className={`${styles.btn} ${styles.btn_primary}`}>
              {'Update'}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  entries: state.entries.entries,
  isFetchingEntries: state.entries.isFetchingEntries,
});

const mapDispatchToProps = dispatch => ({
  fetchEntries: () => dispatch(EntriesAction.fetchEntries()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditForm);