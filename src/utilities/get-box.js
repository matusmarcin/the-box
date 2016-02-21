import isElement from './is-element';

import BoxGeneric from './../boxes/generic';
import BoxElement from './../boxes/element';
import BoxDocument from './../boxes/document';
import BoxViewport from './../boxes/viewport';


function isDocument (input) {
  return (input === 'document') ||
    (input === document) ||
    (input === document.body) ||
    (input === document.documentElement);
}

function isCollection (input) {
  const string_representation = Object.prototype.toString.call(input);
  return (string_representation === '[object NodeList]') ||
    (string_representation === '[object HTMLCollection]');
}


/**
 * Checks for the type of `input` and returns appropriate Box object.
 * @param {*} [input]
 * @returns {Object} instance of Box object
 */
export default function getBox (input) {
  if (isElement(input)) {
    return new BoxElement(input);
  }

  if (input === 'viewport') {
    return new BoxViewport();
  }

  if (isDocument(input)) {
    return new BoxDocument();
  }

  if (isCollection(input)) {
    return new BoxCollection(input);
  }

  return new BoxGeneric(input);
}