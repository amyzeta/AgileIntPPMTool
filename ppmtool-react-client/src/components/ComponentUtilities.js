import React from 'react';

export const mapToElements = (object, itemFn) => {
  if (!object) {
    return undefined;
  }
  const elements = [];
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      elements.push(itemFn(key, object[key]));
    }
  }
  return <React.Fragment>{elements}</React.Fragment>;
};
