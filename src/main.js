import flatpickr from 'flatpickr';

import HeaderRoutePriceView from './view/header-route-price.js';
import HeaderMenuView from './view/header-menu.js';
import HeaderFilterView from './view/header-filter.js';
import RoutePresenter from './presenter/route.js';
//import MainTripSortView from './view/main-sort.js';
//import ListPointsView from './view/list.js';
//import RoutePointView from './view/route-point.js';
import {generateTask} from './mock/task.js';
import {renderElement, RenderPosition, replace} from './utils/render.js';
// import {compare} from './utils/task.js';
// import FormEditingPointView from './view/form-editing-point.js';
import EventSectionOffersView from './view/event-section-offers.js';
import EventSectionDestinationView from './view/event-section-destination.js';
import EventOfferSelectorView from './view/event-offer-selector.js';
// import RoutePointDataView from './view/route-point-data.js';
//import ListEmptyView from './view/list-empty.js';

const TASK_COUNT = 20;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
console.log(tasks);

// const tasksSort = tasks.slice().sort((a, b) => compare(a.dateStart, b.dateStart));

const siteHeader = document.querySelector('header');
const siteBlockMain = document.querySelector('main');
const siteHeaderElementTripMain = siteHeader.querySelector('.trip-main');
const siteHeaderElementNavigation = siteHeader.querySelector('.trip-controls__navigation');
const siteHeaderElementFilter = siteHeader.querySelector('.trip-controls__filters');
const siteMainSection = siteBlockMain.querySelector('.trip-events');

renderElement(siteHeaderElementNavigation, new HeaderMenuView(), RenderPosition.BEFOREEND);
renderElement(siteHeaderElementFilter, new HeaderFilterView(), RenderPosition.BEFOREEND);

if (tasks.length !== 0) {
  renderElement(siteHeaderElementTripMain, new HeaderRoutePriceView(), RenderPosition.AFTERBEGIN);
}

  const routePresenter = new RoutePresenter(siteBlockMain);

  routePresenter.init(tasks);
  //renderElement(siteMainSection, new MainTripSortView(), RenderPosition.AFTERBEGIN);
  //renderElement(siteMainSection, new ListPointsView(), RenderPosition.BEFOREEND);

  // const tripEventsList = siteMainSection.querySelector('.trip-events__list');
/*
  const createEventOffer = (form) => {
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
  };

  const createRoutePoint = (pointListElement, data) => {
    const pointComponent = new RoutePointDataView(data);
    const pointFormComponent = new FormEditingPointView(data);
    createEventOffer(pointFormComponent);

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
    renderElement(tripEventsList, pointListElement, RenderPosition.BEFOREEND);
  };

  tasksSort.forEach((task) => createRoutePoint(new RoutePointView().getElement(), task));
*/
