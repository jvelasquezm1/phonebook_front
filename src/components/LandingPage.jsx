import React, { Component } from 'react'
import Header from './header/Header'
import { NavLink as Link } from 'react-router-dom'
import ReactTable from 'react-table'
import { Icon } from 'react-fa'

import { connect } from 'react-redux';
import * as EntriesAction from '../store/actions/entries.actions';

import 'react-table/react-table.css'
import styles from './components.module.scss'

class LandingPage extends Component {
  state = {
    searchField: '',
  }

  componentDidMount() {
    this.getEntries();
  }

  getEntries = () => {
    const { fetchEntries } = this.props;
    fetchEntries();
  };
  
  onChangeFirstName = (event) => {
    this.setState({ searchField: event.target.value });
  };
  
  setEntryId = (entryId) => {
    window.localStorage.entryId = entryId;
  };

  render () {
    const { searchField } = this.state
    let { entries } = this.props
    if (entries) {
    entries = entries.filter(entry => entry.firstName.toUpperCase().includes(searchField.toUpperCase()) 
    || entry.lastName.toUpperCase().includes(searchField.toUpperCase())
    || entry.phone.includes(searchField));
    } else {
      entries = [];
    };
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
          onClick={this.setEntryId(row.original._id)}
        >
          <Icon name="pencil" />
        </Link>),
        width: 250
      },
    ]
    return (
      <div>
        <Header>
          <h1 className={styles.Title} onClick={this.closeAlert}>Phonebook</h1>
        </Header>
        <div className={`${styles.Content}`}>
          <div className={styles.ContentInput}>
            <input
              type='text'
              value={searchField}
              placeholder='Search'
              className={styles.Input}
              onChange={this.onChangeFirstName}
            />
            <Icon name="search" className={styles.P1}/>
          </div>
          {searchField !== '' &&
            <ReactTable
              data={entries}
              columns={columns}
              defaultPageSize={5}
              filterable
              showPagination
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]).includes(filter.value)
              }
            />
          }
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
)(LandingPage);
