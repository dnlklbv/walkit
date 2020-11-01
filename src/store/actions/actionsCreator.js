const camelizeReplacer = (word, index) => {
  if (index === 0) return word.toLowerCase();
  return word.toUpperCase();
};

function camelize(str) {
  return str
    .toLowerCase()
    .split('_')
    .join(' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, camelizeReplacer)
    .replace(/\s+/g, '');
}

export const createAction = (actionName) => (payload) => ({
  type: actionName,
  payload,
});

export const createActions = (name) => {
  const SUCCESS_ACTION = `${name}_SUCCESS`;
  const SET_ERRORS_ACTION = `SET_${name}_ERRORS`;
  const FAILED_ACTION = `${name}_FAILED`;
  return {
    [SUCCESS_ACTION]: SUCCESS_ACTION,
    [FAILED_ACTION]: FAILED_ACTION,
    [SET_ERRORS_ACTION]: SET_ERRORS_ACTION,
    [camelize(name)]: createAction(name),
    [camelize(SET_ERRORS_ACTION)]: createAction(SET_ERRORS_ACTION),
    [camelize(SUCCESS_ACTION)]: createAction(SUCCESS_ACTION),
    [camelize(FAILED_ACTION)]: createAction(FAILED_ACTION),
  };
};
