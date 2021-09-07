import flatpickr from 'flatpickr';

import RoutePointDataView from '../view/route-point-data.js';
import FormEditingPointView from '../view/form-editing-point.js';
import {renderElement, RenderPosition, replace} from '../utils/render.js';
import EventSectionOffersView from '../view/event-section-offers.js';
import EventOfferSelectorView from '../view/event-offer-selector.js';
import EventSectionDestinationView from '../view/event-section-destination.js';

export default class Point {
  constructor(pointListContainer) {
    this._pointListContainer = pointListContainer;

    this._pointComponent = null;
    this._pointFormComponent = null;
  }

  init(pointListElement, data) {

    this._pointComponent = new RoutePointDataView(data);
    const pointFormComponent = new FormEditingPointView(data);
    this._createEventOffer(pointFormComponent);

    const configFlatpickr = {
      enableTime: true,
      altInput: true,
      altFormat: 'd/m/y H:i',
      dateFormat: 'd/m/y H:i',
    };

    const replacePointToForm = () => {
      replace(pointFormComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointFormComponent);
    };

    const onEscPress = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscPress);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscPress);
      flatpickr(document.querySelectorAll('.event__input--time'), configFlatpickr);
    });

    pointFormComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscPress);
    });

    pointFormComponent.setFormCloseHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscPress);
    });

    renderElement(pointListElement, pointComponent, RenderPosition.BEFOREEND);

    renderElement(this._pointListContainer, pointListElement, RenderPosition.BEFOREEND);
  }

  _createEventOffer(form) {
    const eventDetails = form.getElement().querySelector('.event__details');
    if (form._data.eventOffer.length !== 0) {
      renderElement(eventDetails, new EventSectionOffersView(), RenderPosition.AFTERBEGIN);
      const eventAvailableOffers = eventDetails.querySelector('.event__available-offers');
      const offers = form._data.eventOffer;
      offers.forEach((offer) => {
        renderElement(eventAvailableOffers, new EventOfferSelectorView(offer), RenderPosition.AFTERBEGIN);
      });
    }
    if (form._data.description.length !== 0 || form._data.eventPhoto !== null) {
      renderElement(eventDetails, new EventSectionDestinationView(form._data.description), RenderPosition.BEFOREEND);
      if (form._data.eventPhoto !== null) {
        const eventPhotosTape = eventDetails.querySelector('.event__photos-tape');
        const photos = form._data.eventPhoto;
        photos.forEach((photo) => {
          const newPhoto = document.createElement('img');
          newPhoto.classList.add('event__photo');
          newPhoto.setAttribute('src', photo);
          newPhoto.setAttribute('alt', 'Event photo');
          eventPhotosTape.append(newPhoto);
        });
      }
    }
  }
}
