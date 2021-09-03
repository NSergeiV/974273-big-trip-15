import AbstractView from './abstract.js';

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

export default class EventOfferSelector extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createEventOfferSelectorTemplate(this._data);
  }
}
