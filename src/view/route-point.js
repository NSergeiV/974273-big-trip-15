import AbstractView from './abstract.js';

const createRoutePointTemplate = () => '<li class="trip-events__item"></li>';

export default class RoutePoint extends AbstractView {
  getTemplate() {
    return createRoutePointTemplate();
  }
}
