import {headerRoutePrice} from './view/header-route-price.js';
import {headerMenu} from './view/header-menu.js';
import {headerFilter} from './view/header-filter.js';
import {mainTripSort} from './view/main-sort.js';
import {listPoints} from './view/list.js';

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
