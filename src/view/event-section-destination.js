import {createElement} from '../utils.js';

const createEventSectionDestinationTemplate = (description) => (
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">

      </div>
    </div>
  </section>`
);

export default class EventSectionDestination {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return createEventSectionDestinationTemplate(this._data);
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
