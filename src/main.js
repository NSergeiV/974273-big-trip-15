import flatpickr from 'flatpickr';

import HeaderRoutePriceView from './view/header-route-price.js';
import HeaderMenuView from './view/header-menu.js';
import HeaderFilterView from './view/header-filter.js';
import MainTripSortView from './view/main-sort.js';
import ListPointsView from './view/list.js';
import {generateTask} from './mock/task.js';
import {compare, renderElement, RenderPosition} from './utils.js';
import FormEditingPointView from './view/form-editing-point.js';
import EventSectionOffersView from './view/event-section-offers.js';
import EventSectionDestinationView from './view/event-section-destination.js';
import EventOfferSelectorView from './view/event-offer-selector.js';
import RoutePointView from './view/route-point.js';

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
renderElement(tripEventsList, new FormEditingPointView(tasksSort[0]).getElement(), RenderPosition.AFTERBEGIN);

const eventDetails = document.querySelector('.event__details');
if (tasksSort[0].eventOffer.length !== 0) {
  renderElement(eventDetails, new EventSectionOffersView().getElement(), RenderPosition.AFTERBEGIN);
  const eventAvailableOffers = eventDetails.querySelector('.event__available-offers');
  const offers = tasksSort[0].eventOffer;
  offers.forEach((offer) => {
    renderElement(eventAvailableOffers, new EventOfferSelectorView(offer).getElement(), RenderPosition.AFTERBEGIN);
  });
}

if (tasksSort[0].description.length !== 0 || tasksSort[0].eventPhoto !== null) {
  renderElement(eventDetails, new EventSectionDestinationView(tasksSort[0].description).getElement(), RenderPosition.BEFOREEND);
  if (tasksSort[0].eventPhoto !== null) {
    const eventPhotosTape = eventDetails.querySelector('.event__photos-tape');
    const photos = tasksSort[0].eventPhoto;
    photos.forEach((photo) => {
      const newPhoto = document.createElement('img');
      newPhoto.classList.add('event__photo');
      newPhoto.setAttribute('src', photo);
      newPhoto.setAttribute('alt', 'Event photo');
      eventPhotosTape.append(newPhoto);
    });
  }
}

for (let i = 1; i < tasksSort.length; i++) {
  renderElement(tripEventsList, new RoutePointView(tasksSort[i]).getElement(), RenderPosition.BEFOREEND);
}

const configFlatpickr = {
  enableTime: true,
  altInput: true,
  altFormat: 'd/m/y H:i',
  dateFormat: 'd/m/y H:i',
};

flatpickr('.event__input.event__input--time', configFlatpickr);
