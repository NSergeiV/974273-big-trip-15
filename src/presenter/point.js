import flatpickr from 'flatpickr';

import RoutePointDataView from '../view/route-point-data.js';
import FormEditingPointView from '../view/form-editing-point.js';
import {renderElement, RenderPosition, replace, remove} from '../utils/render.js';
import EventSectionOffersView from '../view/event-section-offers.js';
import EventOfferSelectorView from '../view/event-offer-selector.js';
import EventSectionDestinationView from '../view/event-section-destination.js';
import RoutePointView from '../view/route-point.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(pointListContainer, changeData, changeMode) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._routePointView = new RoutePointView();

    this._pointComponent = null;
    this._pointFormComponent = null;
    this._mode = Mode.DEFAULT;

    this._configFlatpickr = {
      enableTime: true,
      altInput: true,
      altFormat: 'd/m/y H:i',
      dateFormat: 'd/m/y H:i',
    };

    this._onEscPress = this._onEscPress.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormClose = this._handleFormClose.bind(this);
    this._handleEditClickFavorite = this._handleEditClickFavorite.bind(this);
  }

  init(data) {
    const prevPointComponent = this._pointComponent;
    const prevPointFormComponent = this._pointFormComponent;

    this._pointComponent = new RoutePointDataView(data);
    this._pointFormComponent = new FormEditingPointView(data);
    this._createEventOffer(this._pointFormComponent);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointComponent.setEditClickFavorite(this._handleEditClickFavorite);

    this._pointFormComponent.setFormSubmitHandler(this._handleFormSubmit);

    this._pointFormComponent.setFormCloseHandler(this._handleFormClose);

    if (prevPointComponent === null || prevPointFormComponent === null) {
      renderElement(this._routePointView, this._pointComponent, RenderPosition.BEFOREEND);
      renderElement(this._pointListContainer, this._routePointView, RenderPosition.BEFOREEND);
      return;
    }

    // if (this._pointListContainer.getElement().contains(prevPointComponent.getElement())) {
    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    // if (this._pointListContainer.getElement().contains(prevPointFormComponent.getElement())) {
    if (this._mode === Mode.EDITING) {
      replace(this._pointFormComponent, prevPointFormComponent);
    }

    remove(prevPointComponent);
    remove(prevPointFormComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointFormComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replacePointToForm() {
    replace(this._pointFormComponent, this._pointComponent);
    document.addEventListener('keydown', this._onEscPress);
    flatpickr(document.querySelectorAll('.event__input--time'), this._configFlatpickr);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointFormComponent);
    document.removeEventListener('keydown', this._onEscPress);
    this._mode = Mode.DEFAULT;
  }

  _onEscPress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this._replaceFormToPoint();
    }
  }

  _handleEditClick() {
    this._replacePointToForm();
  }

  _handleEditClickFavorite(pointData) {
    this._task = pointData;

    this._changeData(
      Object.assign(
        {},
        this._task,
        {
          isFavorite: !this._task.isFavorite,
        },
      ),
    );
  }

  _handleFormSubmit() {
    this._replaceFormToPoint();
  }

  _handleFormClose() {
    this._replaceFormToPoint();
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
