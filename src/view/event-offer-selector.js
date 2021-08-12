export const eventOfferSelector = (key, property) => (
  `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${key}-1" type="checkbox" name="event-offer-${key}" checked>
        <label class="event__offer-label" for="event-offer-${key}-1">
          <span class="event__offer-title">${key}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${property}</span>
        </label>
      </div>`
);
