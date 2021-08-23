import {createElement} from '../utils.js';

const createEventSectionOffersTemplate = () => (
  `<section class="event__section  event__section--offers">
     <h3 class="event__section-title  event__section-title--offers">Offers</h3>

     <div class="event__available-offers">

    </div>
  </section>`
);

export default class EventSectionOffers {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventSectionOffersTemplate();
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
