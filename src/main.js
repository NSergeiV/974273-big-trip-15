import flatpickr from 'flatpickr';

import HeaderRoutePriceView from './view/header-route-price.js';
import HeaderMenuView from './view/header-menu.js';
import HeaderFilterView from './view/header-filter.js';
import MainTripSortView from './view/main-sort.js';
import ListPointsView from './view/list.js';
import RoutePointView from './view/route-point.js';
import {generateTask} from './mock/task.js';
import {compare, renderElement, RenderPosition} from './utils.js';
import FormEditingPointView from './view/form-editing-point.js';
import EventSectionOffersView from './view/event-section-offers.js';
import EventSectionDestinationView from './view/event-section-destination.js';
import EventOfferSelectorView from './view/event-offer-selector.js';
import RoutePointDataView from './view/route-point-data.js';

const TASK_COUNT = 20;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const tasksSort = tasks.slice().sort((a, b) => compare(a.dateStart, b.dateStart));

const siteHeader = document.querySelector('header');
const siteBlockMain = document.querySelector('main');
const siteHeaderElementTripMain = siteHeader.querySelector('.trip-main');
const siteHeaderElementNavigation = siteHeader.querySelector('.trip-controls__navigation');
const siteHeaderElementFilter = siteHeader.querySelector('.trip-controls__filters');
const siteMainSection = siteBlockMain.querySelector('.trip-events');

renderElement(siteHeaderElementTripMain, new HeaderRoutePriceView().getElement(), RenderPosition.AFTERBEGIN);

renderElement(siteHeaderElementNavigation, new HeaderMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteHeaderElementFilter, new HeaderFilterView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainSection, new MainTripSortView().getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteMainSection, new ListPointsView().getElement(), RenderPosition.BEFOREEND);

const tripEventsList = siteMainSection.querySelector('.trip-events__list');

const createEventOffer = (form) => {
  const eventDetails = form.getElement().querySelector('.event__details');
  if (form._data.eventOffer.length !== 0) {
    renderElement(eventDetails, new EventSectionOffersView().getElement(), RenderPosition.AFTERBEGIN);
    const eventAvailableOffers = eventDetails.querySelector('.event__available-offers');
    const offers = form._data.eventOffer;
    offers.forEach((offer) => {
      renderElement(eventAvailableOffers, new EventOfferSelectorView(offer).getElement(), RenderPosition.AFTERBEGIN);
    });
  }
  if (form._data.description.length !== 0 || form._data.eventPhoto !== null) {
    renderElement(eventDetails, new EventSectionDestinationView(form._data.description).getElement(), RenderPosition.BEFOREEND);
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
};

const createRoutePoint = (pointListElement, data) => {
  const pointComponent = new RoutePointDataView(data);
  const pointFormComponent = new FormEditingPointView(data);
  createEventOffer(pointFormComponent);

  const replacePointToForm = () => {
    pointListElement.replaceChild(pointFormComponent.getElement(), pointComponent.getElement());

  };

  const replaceFormToPoint = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointFormComponent.getElement());
  };

  const onEscPress = (evt) => {
    if (evt.keyCode === 27) {
      replaceFormToPoint();
    }
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
  });

  pointFormComponent.getElement().querySelector('form').addEventListener('submit', () => {
    replaceFormToPoint();
  });

  pointFormComponent.getElement().querySelector('form').addEventListener('keydown', onEscPress);

  renderElement(pointListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
  renderElement(tripEventsList, pointListElement, RenderPosition.BEFOREEND);
};

tasksSort.forEach((task) => createRoutePoint(new RoutePointView().getElement(), task));

const configFlatpickr = {
  enableTime: true,
  altInput: true,
  altFormat: 'd/m/y H:i',
  dateFormat: 'd/m/y H:i',
};

flatpickr('.event__input.event__input--time', configFlatpickr);
