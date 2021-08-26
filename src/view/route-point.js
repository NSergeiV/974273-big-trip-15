import {createElement} from '../utils.js';

const createRoutePointTemplate = () => '<li class="trip-events__item"></li>';

export default class RoutePoint {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createRoutePointTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
