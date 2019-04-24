import React, { Component } from 'react'
import Header from './header/Header'
import { NavLink as Link } from 'react-router-dom'
import ReactTable from 'react-table'

import 'react-table/react-table.css'
import styles from './components.module.scss'

export default class LandingPage extends Component {
  state = {
    firstName: '',
    json: [
      {
        firstName: 'ju',
        lastName: 'es',
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
        width: 340
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        width: 340
      },
      {
        Header: 'Phone Number',
        accessor: 'phone',
        width: 320
      }
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
              <button color="primary" size="lg">{'Create'}</button>
            </Link>
            <Link
              to='/edit'
              className={styles.RouterLink}
              activeClassName={styles.Active}
            >
              <button color="primary" size="lg">{'Edit'}</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
