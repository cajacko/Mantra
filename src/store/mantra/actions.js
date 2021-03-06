import moment from 'moment';
import uuidv4 from 'uuid/v4';

/**
 * Build a mantra object and then return the action for redux
 *
 * @param  {string} title        The Mantra title
 * @param  {?object} item         An existing mantra object to ammend
 * @param  {?string} suggestionId The ID of a suggested mantra, if this is one
 * @return {object}              The action to dispatch
 */
export function saveMantra({ title, source, item, suggestionId }) {
  const now = moment().unix();
  const payload = {};
  let mantra = {};

  if (item) {
    mantra = Object.assign({}, item);
  }

  // Is this is a suggested mantra then add id
  if (suggestionId) {
    mantra.suggestionId = suggestionId;
  }

  mantra.title = title;
  mantra.dateModified = now;
  mantra.deleted = false;
  mantra.online = false;

  if (!item) {
    mantra.id = uuidv4();
    mantra.dateAdded = now;
  }

  if (source && source.title && source.title.length) {
    const sourceData = {
      id: source.id || uuidv4(),
      link: source.link && source.link.length ? source.link : null,
      title: source.title,
      dateAdded: source.dateAdded || now,
      dateModified: now,
      online: false,
      deleted: false,
    };

    mantra.source = sourceData.id;
    payload.source = sourceData;
  } else {
    mantra.source = null;
    payload.source = null;
  }

  payload.mantra = mantra;

  return {
    type: 'SAVE_MANTRA',
    payload,
  };
}

export function deleteMantra(id) {
  return {
    type: 'DELETE_MANTRA',
    payload: {
      id,
      dateModified: moment().unix(),
    },
  };
}
