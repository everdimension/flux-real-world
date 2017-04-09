export default function createNamespacedReducer(reducer, predicate) {
  return (state, action) => {
    if (predicate(action) || state === undefined) {
      return reducer(state, action);
    }
    return state;
  };
}

export function storeReducer(reducer, storeName) {
  return createNamespacedReducer(reducer, (action) => {
    if (!action.meta || !action.meta.store) {
      return false;
    }
    return action.meta.store === storeName;
  });
}
