import { entriesActions } from '../actions/entries.actions';

const initialState = {
  entries: [],
  isFetchingEntries: false,
  fetchEntriesError: null,
};

const entriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case entriesActions.START_FETCH_ENTRIES:
      return { ...state, isFetchingEntries: true };
    case entriesActions.SUCCESS_FETCH_ENTRIES:
      return { ...state, entries: action.payload, isFetchingEntries: false };
    case entriesActions.ERROR_FETCH_ENTRIES:
      return { ...state, fetchEntriesError: action.payload, isFetchingEntries: false };
    case entriesActions.CLEAR_ENTRIES:
      return { ...state, entries: [] };
    default:
      return state;
  }
};

export default entriesReducer;
