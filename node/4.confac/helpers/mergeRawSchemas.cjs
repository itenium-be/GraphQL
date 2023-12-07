const { mergeWith, isArray } = require('lodash');

/** will merge typedefs into an array */
function withArraysConcatination(objValue, srcValue) {
  if (isArray(objValue)) {
      return objValue.concat(srcValue);
  }
}

const mergeRawSchemas = (...schemas) => {
  return mergeWith({}, ...schemas, withArraysConcatination);
};

module.exports = {mergeRawSchemas}
