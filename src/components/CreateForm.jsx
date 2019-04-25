import React, { Component } from 'react'
import Header from './header/Header'
import styles from './components.module.scss'

import { connect } from 'react-redux';
import EntriesService from '../services/entries.services';
import * as EntriesAction from '../store/actions/entries.actions';

class CreateForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    phone: '',
    entries: {},
    error: '',
    isValid: false,
  }

  isValidForm = (firstName, lastName) => {
    const isValid = firstName !== '' && lastName !== '';
    if (!isValid) {
      this.setState({
        error: 'Please provide a first and last name',
        isValid: false,
      });
    } else {
      this.setState({
        error: null,
        isValid: true,
      });
    }
  }

  isValidPhone = (phone) => {
    console.log(phone.length)
    const isValid = phone.match(/^\+\d.{1,1}.\d.{1,1}.\d+/) && phone.length > 12;
    if (!isValid) {
      this.setState({
        error: 'The format for the number must follow "+11 11 111111..."',
        isValid: false,
      });
    } else {
      this.setState({
        error: null,
        isValid: true,
      });
    }
  }
  
  onChangeFirstName = (event) => {
    const { firstName, lastName } = this.state;    
    this.setState({ firstName: event.target.value });
    this.isValidForm(firstName, lastName);
  }

  onChangeLastName = (event) => {
    const { firstName, lastName } = this.state;
    this.setState({ lastName: event.target.value });
    this.isValidForm(firstName, lastName);
  }

  onChangePhone = (event) => {
    this.setState({ phone: event.target.value });
    this.isValidPhone(event.target.value);
  }

  createEntry = async () => {    
    const { firstName, lastName, phone } = this.state;
    const entries = { firstName, lastName, phone };
    try {
      await EntriesService.addEntries(entries);
      console.log('ok')
    } catch (error) {
      console.log(error)
    }
  }

  render () {
    const { firstName, lastName, phone, isValid, error } = this.state;
    return (
      <div>
        <Header>
          <h1 className={styles.Title}>Phonebook</h1>
        </Header>

        <form>
          <div className={styles.ResetPasswordContainer}>
            <h3>Create entry:</h3>
            <div className={styles.InputGroup}>
              <div>First Name</div>
              <input className='form-control' placeholder='First Name' value={ firstName } onChange={this.onChangeFirstName} />
            </div>
            <div className={styles.InputGroup}>
              <div>Last Name</div>
              <input className='form-control' placeholder='Last Name' value={ lastName } onChange={this.onChangeLastName} />
            </div>
            <div className={styles.InputGroup}>
              <div>Phone</div>
              <input className='form-control' placeholder='Phone' value={ phone } onChange={this.onChangePhone} />
            </div>
            {!isValid &&
            <div className={styles.InputGroup}>
              <div>{error}</div>
            </div>}
            <button type='button' className={`${styles.btn} ${styles.btn_primary}`} onClick={this.createEntry}>
              {'Create'}
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
)(CreateForm);