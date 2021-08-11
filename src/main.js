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

const TASK_COUNT = 20;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
// console.log(tasks);


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
//console.log(tasks[0].description.length);
//console.log(tasks[0].eventPhoto);

paste(tripEventsList, formEditingPoint(), 'afterbegin');
const eventDetails = document.querySelector('.event__details');
if (tasks[0].eventOffer.length !== 0) {
  paste(eventDetails, eventSectionOffers(), 'afterbegin');
}
if (tasks[0].description.length !== 0 || tasks[0].eventPhoto !== null) {
  //console.log('works');
  paste(eventDetails, eventSectionDestination(), 'beforeend');
}

const configFlatpickr = {
  enableTime: true,
  altInput: true,
  altFormat: 'd/m/y H:i',
  dateFormat: 'd/m/y H:i',
};

flatpickr('.event__input.event__input--time', configFlatpickr);
