import React, { PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as entityActions from './entitiesActions';
import { get, isFetching } from './entitiesReducer';

const propTypes = {
  store: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  endpoints: PropTypes.shape({
    get: PropTypes.string,
  }).isRequired,
  fetching: PropTypes.bool,
  entities: PropTypes.array,
  fetch: PropTypes.func.isRequired,
};

const defaultProps = {
  entities: [],
  fetching: false,
};

class Entities extends React.Component {
  constructor(props) {
    super(props);
    this.meta = { store: props.store };

    if (!props.entities.length) {
      this.props.fetch({
        promise: axios.get(props.endpoints.get).then(res => res.data),
        payload: null,
        meta: this.meta,
      });
    }
  }

  render() {
    const { entities, fetching } = this.props;
    if (fetching) {
      return <div>loading...</div>;
    }

    return this.props.children({ entities });
  }
}

Entities.propTypes = propTypes;
Entities.defaultProps = defaultProps;

export default function entitiesConnector(storeName, endpoints) {
  const mapStateToProps = state => ({
    store: storeName,
    fetching: isFetching(state[storeName]),
    entities: get(state[storeName]),
    endpoints,
  });

  const boundActions = Object.keys(entityActions).reduce((acc, key) => {
    acc[key] = (data) => {
      const action = entityActions[key](data);
      if (data && data.promise) {
        action.promise = data.promise;
      }
      return action;
    };
    return acc;
  }, {});

  const mapDispatchToProps = boundActions;
  return connect(mapStateToProps, mapDispatchToProps)(Entities);
}
