import AbstractView from './abstract.js';

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

export default class EventSectionDestination extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createEventSectionDestinationTemplate(this._data);
  }
}
