import {routePoint} from './route-point.js';
import {formEditingPoint} from './form-editing-point.js';

const points = [formEditingPoint(), routePoint(), routePoint()];

const createList = () => {
  const list = points.join('');
  return list;
};

export const listPoints = () => (
  `<ul class="trip-events__list">${createList()}</ul>`
);
