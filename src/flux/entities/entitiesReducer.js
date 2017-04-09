import { handleActions } from 'redux-actions';
import { handle } from 'redux-pack';
import union from 'lodash/union';
import { fetch, receive } from './entitiesActions';

const entityState = {
  data: null,
  fetching: false,
};

function receiveEntity(prevState, action) {
  return {
    ...prevState,
    fetching: false,
    data: action.payload,
  };
}

const entity = handleActions({
  [fetch]: (state, action) => handle(state, action, {
    start: prevState => ({ ...prevState, fetching: true }),
    finish: prevState => ({ ...prevState, fetching: false }),
    success: receiveEntity,
  }),
  [receive]: receiveEntity,
}, entityState);

function normalizeEntities(entities, action) {
  return entities.reduce((acc, e) => {
    acc[e.id] = entity(undefined, Object.assign({}, action, { payload: e }));
    return acc;
  }, {});
}

const initialState = {
  entities: {},
  ids: [],
  fetching: false,
};

function receiveEntities(prevState, action) {
  return {
    ...prevState,
    entities: { ...prevState.entities, ...normalizeEntities(action.payload, action) },
    ids: union(prevState.ids, action.payload.map(e => e.id)),
  };
}

const entities = handleActions({
  [fetch]: (state, action) => {
    if (action.payload && action.payload.id) {
      // entity
      const { id } = action.payload;
      const updatedEntity = entity(state.entities[id], action);
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          entities: { ...prevState.entities, [id]: updatedEntity },
        }),
        finish: prevState => ({
          ...prevState,
          entities: { ...prevState.entities, [id]: updatedEntity },
        }),
        success: prevState => ({
          ...prevState,
          entities: { ...prevState.entities, [id]: updatedEntity },
          ids: union(prevState.ids, id),
        }),
      });
    }

    return handle(state, action, {
      start: prevState => ({ ...prevState, fetching: true }),
      finish: prevState => ({ ...prevState, fetching: false }),
      success: receiveEntities,
    });
  },
  [receive]: receiveEntities,
}, initialState);

export default entities;

export function get(state) {
  return state.ids.map(id => state.entities[id]);
}

export function isFetching(state) {
  return state.fetching;
}
