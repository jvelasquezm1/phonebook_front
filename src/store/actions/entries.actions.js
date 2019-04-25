import EntriesService from '../../services/entries.services';

export const entriesActions = {
  START_FETCH_ENTRIES: '[ENTRIES] Start fetching entries',
  SUCCESS_FETCH_ENTRIES: '[ENTRIES] Success fetching entries',
  ERROR_FETCH_ENTRIES: '[ENTRIES] Error fetching entries',
  CLEAR_ENTRIES: '[ENTRIES] Clear entries',
};

export function startFetchEntries() {
  return {
    type: entriesActions.START_FETCH_ENTRIES,
  };
}

export function successFetchEntries(entries) {
  return {
    type: entriesActions.SUCCESS_FETCH_ENTRIES,
    payload: entries,
  };
}

export function errorFetchEntries(error) {
  return {
    type: entriesActions.ERROR_FETCH_ENTRIES,
    payload: error,
  };
}

export function clearEntries() {
  return {
    type: entriesActions.CLEAR_ENTRIES,
  };
}

export function fetchEntries() {
  return (dispatch) => {
    dispatch(startFetchEntries());
    return EntriesService.readEntries()
      .then(entries => dispatch(successFetchEntries(entries)))
      .catch(error => dispatch(errorFetchEntries(error)));
  };
}
