import { combineReducers } from 'redux';
import items from 'reducers/items';
import view from 'reducers/view';
import myjsonId from 'reducers/myjsonId';
import lastAction from 'reducers/lastAction';
import version from 'reducers/version';
import notifications from 'reducers/notifications';
import permissions from 'reducers/permissions';
import lastSetBadge from 'reducers/lastSetBadge';
import lastSetNotifications from 'reducers/lastSetNotifications';
import syncLoading from 'reducers/syncLoading';
import offlineItemsSyncing from 'reducers/offlineItemsSyncing';
import menuOpen from 'reducers/menuOpen';
import firstTime from 'reducers/firstTime';
import suggestions from 'reducers/suggestions';
import discardedSuggestions from 'reducers/discardedSuggestions';
import addedSuggestions from 'reducers/addedSuggestions';
import acceptableRequests from 'reducers/acceptableRequests';

const appReducer = combineReducers({
  items,
  view,
  myjsonId,
  lastAction,
  version,
  notifications,
  permissions,
  lastSetBadge,
  lastSetNotifications,
  syncLoading,
  offlineItemsSyncing,
  menuOpen,
  firstTime,
  suggestions,
  discardedSuggestions,
  addedSuggestions,
  acceptableRequests,
});

/**
 * Completely wipe the store when a user logs out. This top level reducer
 * leaves no room for mistake
 *
 * @param  {Object} state  The existing state
 * @param  {Object} action The dispatched action
 * @return {Object}        The transformed state
 */
export default (state, action) => {
  let newState = state ? Object.assign({}, state) : state;

  if (action.type === 'LOGOUT') {
    newState = undefined;
  }

  return appReducer(newState, action);
};
