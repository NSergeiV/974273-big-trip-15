import {createElement} from '../utils.js';

const createEventOfferSelectorTemplate = (data) => {
  const offer = data;
  return `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${Object.keys(offer)}-1" type="checkbox" name="event-offer-${Object.keys(offer)}" checked>
          <label class="event__offer-label" for="event-offer-${Object.keys(offer)}-1">
            <span class="event__offer-title">${Object.keys(offer)}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${Object.values(offer)}</span>
          </label>
        </div>`;
};

export default class EventOfferSelector {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return createEventOfferSelectorTemplate(this._data);
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
