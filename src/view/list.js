import AbstractView from './abstract.js';

export const createListPointsTemplate = () => ('<ul class="trip-events__list"> </ul>');

export default class ListPoints extends AbstractView {
  getTemplate() {
    return createListPointsTemplate();
  }
}
