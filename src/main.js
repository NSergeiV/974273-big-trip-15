import flatpickr from 'flatpickr';
import {headerRoutePrice} from './view/header-route-price.js';
import {headerMenu} from './view/header-menu.js';
import {headerFilter} from './view/header-filter.js';
import {mainTripSort} from './view/main-sort.js';
import {listPoints} from './view/list.js';
import {generateTask} from './mock/task.js';
import {formEditingPoint} from './view/form-editing-point.js';
import {eventSectionOffers} from './view/event-section-offers.js';
import {eventSectionDestination} from './view/event-section-destination.js';
import {eventOfferSelector} from './view/event-offer-selector.js';

const TASK_COUNT = 20;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const paste = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector('header');
const siteBlockMain = document.querySelector('main');
const siteHeaderElementTripMain = siteHeader.querySelector('.trip-main');
const siteHeaderElementNavigation = siteHeader.querySelector('.trip-controls__navigation');
const siteHeaderElementFilter = siteHeader.querySelector('.trip-controls__filters');
const siteMainSection = siteBlockMain.querySelector('.trip-events');

paste(siteHeaderElementTripMain, headerRoutePrice(), 'afterbegin');
paste(siteHeaderElementNavigation, headerMenu(), 'beforeend');
paste(siteHeaderElementFilter, headerFilter(), 'beforeend');
paste(siteMainSection, mainTripSort(), 'afterbegin');
paste(siteMainSection, listPoints(), 'beforeend');

const tripEventsList = siteMainSection.querySelector('.trip-events__list');

paste(tripEventsList, formEditingPoint(), 'afterbegin');
const eventDetails = document.querySelector('.event__details');
if (tasks[0].eventOffer.length !== 0) {
  paste(eventDetails, eventSectionOffers(), 'afterbegin');
  const eventAvailableOffers = eventDetails.querySelector('.event__available-offers');
  const offers = tasks[0].eventOffer;
  offers.forEach((offer) => {
    const key = Object.keys(offer);
    const property = Object.values(offer);
    paste(eventAvailableOffers, eventOfferSelector(key[0], property[0]), 'afterbegin');
  });
}
if (tasks[0].description.length !== 0 || tasks[0].eventPhoto !== null) {
  paste(eventDetails, eventSectionDestination(tasks[0].description), 'beforeend');
  if (tasks[0].eventPhoto !== null) {
    const eventPhotosTape = eventDetails.querySelector('.event__photos-tape');
    const photos = tasks[0].eventPhoto;
    photos.forEach((photo) => {
      const newPhoto = document.createElement('img');
      newPhoto.classList.add('event__photo');
      newPhoto.setAttribute('src', photo);
      newPhoto.setAttribute('alt', 'Event photo');
      eventPhotosTape.append(newPhoto);
    });
  }
}

const configFlatpickr = {
  enableTime: true,
  altInput: true,
  altFormat: 'd/m/y H:i',
  dateFormat: 'd/m/y H:i',
};

flatpickr('.event__input.event__input--time', configFlatpickr);
