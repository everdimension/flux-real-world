import { createAction } from 'redux-actions';

function metaCreator(data = {}) {
  return data.meta;
}
function payloadCreator(data = {}) {
  return data.payload;
}

export const fetch = createAction('GET', payloadCreator, metaCreator);
export const receive = createAction('RECEIVE', payloadCreator, metaCreator);
