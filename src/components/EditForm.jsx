import React, { Component } from 'react'
import Header from './header/Header'
import styles from './components.module.scss'

import { connect } from 'react-redux'
import EntriesService from '../services/entries.services'
import * as EntriesAction from '../store/actions/entries.actions'
import SweetAlert from 'sweetalert-react'

class EditForm extends Component {
  state = {
    entryId: window.localStorage.entryId,
    firstName: '',
    lastName: '',
    phone: '',
    success: false,
    successMessage: ''
  }

  onChangeFirstName = event => {
    this.setState({ firstName: event.target.value })
  }

  onChangeLastName = event => {
    this.setState({ lastName: event.target.value })
  }

  onChangePhone = event => {
    this.setState({ phone: event.target.value })
  }

  componentDidMount = () => {
    this.getEntryById()
  }

  getEntryById = async () => {
    const { entryId } = this.state
    try {
      const entry = await EntriesService.getEntryById(entryId)
      const { firstName, lastName, phone } = entry
      this.setState({ firstName, lastName, phone })
    } catch (error) {
      console.log(error)
    }
  }

  updateEntry = async () => {
    const { firstName, lastName, phone } = this.state
    const entries = {
      firstName,
      lastName,
      phone,
      id: window.localStorage.entryId
    }
    try {
      await EntriesService.editEntries(entries)
      this.setState({
        success: true,
        successMessage: 'Entry successfully updated'
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
    const { firstName, lastName, phone, success, successMessage } = this.state
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
              <input
                className='form-control'
                value={firstName}
                onChange={this.onChangeFirstName}
              />
            </div>
            <div className={styles.InputGroup}>
              <div>Last Name</div>
              <input
                className='form-control'
                value={lastName}
                onChange={this.onChangeLastName}
              />
            </div>
            <div className={styles.InputGroup}>
              <div>Phone</div>
              <input
                className='form-control'
                value={phone}
                onChange={this.onChangePhone}
              />
            </div>
            <button
              type='button'
              className={`${styles.btn} ${styles.btn_primary}`}
              onClick={this.updateEntry}
            >
              {'Update'}
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
)(EditForm)
