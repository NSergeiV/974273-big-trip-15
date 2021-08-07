import flatpickr from 'flatpickr';
import {headerRoutePrice} from './view/header-route-price.js';
import {headerMenu} from './view/header-menu.js';
import {headerFilter} from './view/header-filter.js';
import {mainTripSort} from './view/main-sort.js';
import {listPoints} from './view/list.js';
//import {generateTask} from './mock/task.js';

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

//const flatpickr = require("flatpickr");
// const Ddddd = flatpickr(document.querySelector('#event-start-time-1'), {dateFormat: "Y-m-d",});
// console.log(Ddddd);

const configFlatpickr = {
  enableTime: true,
  altInput: true,
  altFormat: 'd/m/y H:i',
  dateFormat: 'd/m/y H:i',
};

//console.log(document.querySelector('.event__field-group--time'));

flatpickr('.event__input.event__input--time', configFlatpickr);
//flatpickr('#event-end-time-1', configFlatpickr);

//console.log(generateTask());
