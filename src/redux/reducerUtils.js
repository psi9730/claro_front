// @flow

import _ from 'lodash';
import {decamelize} from 'humps';
import {WAIT_FOR_ACTION, ERROR_ACTION} from 'redux-wait-for-action';

export const actionsGenerator = (actions: Object): Object => {
  // ex) blahRequest 가 정의되어있으면 blahSuccess: ['payload'] 와 blahFailure: ['errorMessage']를 추가로 정의해 줌
  const newActions = {};
  _.forEach(_.keys(actions), (key) => {
    if (!_.endsWith(key, 'Request')) {
      newActions[key] = actions[key];
      return;
    }

    const successKey = _.replace(key, 'Request', 'Success');
    const failureKey = _.replace(key, 'Request', 'Failure');
    const actionParams = actions[key];
    if (_.isArray(actionParams)) {
      newActions[key] = [...actionParams, {[WAIT_FOR_ACTION]: _.toUpper(decamelize(successKey)), [ERROR_ACTION]: _.toUpper(decamelize(failureKey))}];
    } else {
      newActions[key] = {
        ...actionParams,
        [WAIT_FOR_ACTION]: _.toUpper(decamelize(successKey)),
        [ERROR_ACTION]: _.toUpper(decamelize(failureKey)),
      };
    }
    newActions[successKey] = ['payload'];
    newActions[failureKey] = ['error'];
  });
  return newActions;
};
