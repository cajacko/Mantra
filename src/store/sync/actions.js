/* eslint max-lines: 0 */
import mergeItems from 'helpers/mergeItems';
import combineArrays from 'helpers/combineArrays';
import fetcher from 'helpers/fetcher';

/**
 * Get data from the online JSON store, by a given ID
 *
 * @param  {string} myjsonId The myjsonID to get online
 * @param  {string} requestId The unique request id to pass to the fetcher
 * @return {Promise}          A promise that resolves to the data or errors
 */
function getServerData(myjsonId, requestId) {
  return new Promise((resolve, reject) => {
    fetcher(`https://api.myjson.com/bins/${myjsonId}`, requestId)
      .then(response => response.json())
      .then((payload) => {
        if (!payload || !payload.items) {
          reject('BAD_RESPONSE');
        } else {
          resolve(payload);
        }
      })
      .catch((payload) => {
        if (payload) {
          reject(payload);
        } else {
          reject('UNDEFINED_ERROR');
        }
      });
  });
}

/**
 * Given some data save it online at the given myjsonId
 *
 * @param {string} myjsonId The myjsonId to save to
 * @param  {string} requestId The unique request id to pass to the fetcher
 * @param {Object} data     The data to save
 * @return {Promise}        A promise that resolves with the all the data that's
 * saved for this user
 */
function setServerData(myjsonId, requestId, data) {
  return new Promise((resolve, reject) => {
    fetcher(`https://api.myjson.com/bins/${myjsonId}`, requestId, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then((payload) => {
        if (payload && payload.items) {
          resolve(payload);
        } else {
          reject(payload);
        }
      })
      .catch((payload) => {
        if (payload) {
          reject(payload);
        } else {
          reject('UNDEFINED_ERROR');
        }
      });
  });
}

/**
 * Get a list of the posts that were offline that are now syncing
 *
 * @param  {Object} items The object of mantra items
 * @return {array}       Array of mantra ID's
 */
function offLinePostsSyncing(items) {
  const offlinePosts = [];

  Object.keys(items).forEach((id) => {
    if (items[id].online === false) {
      offlinePosts.push(id);
    }
  });

  return offlinePosts;
}

let activeSync = null;
let id = 0;

/**
 * Sync the data with the online json store
 *
 * @param  {boolean} cancelOtherCalls A flag to cancel the response from any
 * outstanding calls
 * @return {function}                 A thunk function that redux-thunk will use
 * to dispathc multiple actions
 */
export default function (cancelOtherCalls) {
  const syncId = id;
  id += 1;

  return (dispatch, getState) => {
    if (!cancelOtherCalls && activeSync !== null) {
      return;
    }

    const {
      items,
      myjsonId,
      addedSuggestions,
      discardedSuggestions,
      sources,
    } = getState();

    activeSync = syncId;

    dispatch({
      type: 'SYNC_INIT',
      payload: { items: offLinePostsSyncing(items), id },
    });

    getServerData(myjsonId, id)
      .then((response) => {
        if (activeSync !== syncId) {
          return null;
        }

        const mergedItems = mergeItems(items, response.items, true);
        const mergedSources = mergeItems(sources, response.sources, true);

        const data = {
          items: mergedItems,
          sources: mergedSources,
          addedSuggestions: combineArrays(
            addedSuggestions,
            response.addedSuggestions
          ),
          discardedSuggestions: combineArrays(
            discardedSuggestions,
            response.discardedSuggestions
          ),
        };

        return setServerData(myjsonId, id, data);
      })
      .then((data) => {
        if (activeSync === syncId) {
          activeSync = null;

          if (data) {
            dispatch({ type: 'SYNC_SUCCESS', payload: data });
          } else {
            dispatch({ type: 'SYNC_ERROR', payload: 'No serverItems' });
          }
        }
      })
      .catch((err) => {
        if (activeSync === syncId) {
          dispatch({ type: 'SYNC_ERROR', payload: err });
          activeSync = null;
        }
      });
  };
}
