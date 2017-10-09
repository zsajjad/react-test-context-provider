/**
 * @author Kent C. Dodds <kent@doddsfamily.us> (http://kentcdodds.com)
 * @license MIT
 */
'use strict';

const createReactClass = require('create-react-class');
const React = require('react');
const PropTypes = require('prop-types');

module.exports = function getContextProviderCurried(context, children) {
  if (typeof children === 'undefined') {
    return function getContextProviderGetter(children) {
      return getContextProvider(context, children);
    };
  } else {
    return getContextProvider(context, children);
  }
};

function getContextProvider(context, children) {
  var ContextProvider = createReactClass({
    displayName: 'ContextProvider',

    getChildContext: function getChildContext() {
      return context;
    },
    childContextTypes: Object.keys(context).reduce(function (obj, key) {
      obj[key] = PropTypes.any;
      return obj;
    }, {}),
    render: function render() {
      return children;
    }
  });
  return React.createElement(ContextProvider, null);
};
