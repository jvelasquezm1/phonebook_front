import React, { Component } from 'react'
import Header from './header/Header'
import { NavLink as Link } from 'react-router-dom'
import ReactTable from 'react-table'
import { Icon } from 'react-fa'

import 'react-table/react-table.css'
import styles from './components.module.scss'

export default class LandingPage extends Component {
  state = {
    firstName: '',
    json: [
      {
        firstName: 'test',
        lastName: 'testN',
        phone: '32132'
      }
    ]
  }

  render () {
    const { firstName } = this.state
    const columns = [
      {
        Header: 'Name',
        accessor: 'firstName',
        width: 250
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        width: 250
      },
      {
        Header: 'Phone Number',
        accessor: 'phone',
        width: 250
      },
      {
        Header: 'Edit',
        Cell: row => (<Link
          to='/edit'
          className={styles.RouterLink}
          activeClassName={styles.Active}
        >
          <Icon name="pencil" />
        </Link>),
        width: 250
      },
    ]
    return (
      <div>
        <Header>
          <h1 className={styles.Title}>Phonebook</h1>
        </Header>
        <div className={`${styles.Content}`}>
          <input
            type='text'
            value={firstName}
            placeholder='First name'
            className={styles.Input}
          />
          <ReactTable
            data={this.state.json}
            columns={columns}
            defaultPageSize={3}
            filterable
            showPagination
            defaultFilterMethod={(filter, row) =>
              String(row[filter.id]).includes(filter.value)
            }
          />
          <div className={styles.FlexJustify}>
            <Link
              to='/create'
              className={styles.RouterLink}
              activeClassName={styles.Active}
            >
              <button className={`${styles.btn} ${styles.btn_primary}`}>{'Create'}</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
