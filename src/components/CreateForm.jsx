import React, { Component } from 'react'
import Header from './header/Header'
import styles from './components.module.scss'

import { connect } from 'react-redux'
import EntriesService from '../services/entries.services'
import * as EntriesAction from '../store/actions/entries.actions'
import SweetAlert from 'sweetalert-react'

class CreateForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    phone: '',
    entries: {},
    error: '',
    isValid: false,
    success: false,
    successMessage: ''
  }

  isValidForm = (firstName, lastName) => firstName !== '' && lastName !== ''

  isValidPhone = phone => phone.match(/^\+\d.{1,1}\s\d.{1,1}\s\d+/) && phone.length > 12

  isValidAllFields = (valid, validPhone) => {
    if(!valid || !validPhone || validPhone === null){
      this.setState({
        error: 'Please fill all fields and the format for the number must follow "+11 11 111111..."',
        isValid: false
      })
    } else {
      this.setState({
        error: null,
        isValid: true
      })
  }
  }

  onChangeFirstName = async event => {
    const { firstName, lastName, phone } = this.state
    this.setState({ firstName: event.target.value })
    const validPhone = await this.isValidPhone(phone)
    const valid = await this.isValidForm(firstName, lastName)
    this.isValidAllFields(valid, validPhone);
  }

  onChangeLastName = async event => {
    const { firstName, lastName, phone } = this.state
    this.setState({ lastName: event.target.value })
    const validPhone = await this.isValidPhone(phone)
    const valid = await this.isValidForm(firstName, lastName)
    this.isValidAllFields(valid, validPhone);
  }

  onChangePhone = async event => {
    const { firstName, lastName } = this.state
    const numberRegex = /^[0-9*#+ ]+$/;
    if (event.target.value === '' || numberRegex.test(event.target.value)) {
      this.setState({ phone: event.target.value })
   }
    const validPhone = await this.isValidPhone(event.target.value)
    const valid = await this.isValidForm(firstName, lastName)
    this.isValidAllFields(valid, validPhone);
  }

  createEntry = async () => {
    const { firstName, lastName, phone } = this.state
    const entries = { firstName, lastName, phone }
    try {
      await EntriesService.addEntries(entries)
      this.setState({
        success: true,
        successMessage: 'Entry successfully created'
      })
    } catch (error) {
      console.log(error)
    }
  }

  closeAlert = () => {
    this.setState({ success: false, successMessage: '' });
    let path = '/';
    this.props.history.push(path);
  }

  render () {
    const {
      firstName,
      lastName,
      phone,
      isValid,
      error,
      success,
      successMessage
    } = this.state
    return (
      <div>
        <Header>
          <h1 className={styles.Title} onClick={this.closeAlert}>Phonebook</h1>
        </Header>

        <form>
          <div className={styles.ResetPasswordContainer}>
            <h3>Create entry:</h3>
            <div className={styles.InputGroup}>
              <div>First Name</div>
              <input
                className='form-control'
                placeholder='First Name'
                value={firstName}
                onChange={this.onChangeFirstName}
              />
            </div>
            <div className={styles.InputGroup}>
              <div>Last Name</div>
              <input
                className='form-control'
                placeholder='Last Name'
                value={lastName}
                onChange={this.onChangeLastName}
              />
            </div>
            <div className={styles.InputGroup}>
              <div>Phone</div>
              <input
                className='form-control'
                placeholder='Phone'
                value={phone}
                onChange={this.onChangePhone}
              />
            </div>
            {!isValid && (
              <div className={styles.InputGroup}>
                <div>{error}</div>
              </div>
            )}
            <button
              type='button'
              className={`${styles.btn} ${styles.btn_primary}`}
              onClick={this.createEntry}
              disabled={!isValid}
            >
              {'Create'}
            </button>
            <SweetAlert
              show={success}
              title='Success'
              text={successMessage}
              type='success'
              onConfirm={() => this.closeAlert()}
            />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  entries: state.entries.entries,
  isFetchingEntries: state.entries.isFetchingEntries
})

const mapDispatchToProps = dispatch => ({
  fetchEntries: () => dispatch(EntriesAction.fetchEntries())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateForm)
