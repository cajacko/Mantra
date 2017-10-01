import sync from 'actions/sync';
import getStore from 'store/getStore';

const store = getStore();

let hydrated = false;
let myjsonIdExists = false;

store.subscribe(() => {
  const { lastAction, myjsonId } = store.getState();

  if (myjsonId) {
    myjsonIdExists = true;
  } else {
    myjsonIdExists = false;
  }

  switch (lastAction) {
    case 'SAVE_MANTRA':
    case 'DELETE_MANTRA':
      store.dispatch(sync());
      break;

    case 'persist/REHYDRATE':
      hydrated = true;
      break;

    default:
      break;
  }
});

export default function () {
  setInterval(() => {
    if (hydrated && myjsonIdExists) {
      store.dispatch(sync());
    }
  }, 10000);
}
