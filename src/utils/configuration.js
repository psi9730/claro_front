// @flow

import _ from 'lodash';

let configuration = {};

export function setConfiguration(name, value) {
  configuration = {
    ...configuration,
    [name]: value,
  };
}

export function setAll(properties) {
  configuration = {
    ...configuration,
    ...properties,
  };
}

export function unsetConfiguration(name) {
  configuration = {
    ...configuration,
    [name]: undefined,
  };
}

export function getConfiguration(key) {
  if (!_.has(configuration, key)) {
    throw new Error('Undefined configuration key: ' + key);
  }

  return _.get(configuration, key);
}
