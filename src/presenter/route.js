import flatpickr from 'flatpickr';
import MainTripSortView from '../view/main-sort.js';
import ListPointsView from '../view/list.js';
import {renderElement, RenderPosition} from '../utils/render.js';
import ListEmptyView from '../view/list-empty.js';
import {compare} from '../utils/task.js';
import RoutePointView from '../view/route-point.js';
import RoutePointDataView from '../view/route-point-data.js';
import FormEditingPointView from '../view/form-editing-point.js';

export default class Route {
  constructor(routeContainer) {
    this._routeContainer = routeContainer;
    this._siteMainSection = this._routeContainer.querySelector('.trip-events');
    this._tripEventsList = this._siteMainSection.querySelector('.trip-events__list');

    this._mainTripSort = new MainTripSortView();
    this._listPointsView = new ListPointsView();
    this._listEmpty = new ListEmptyView();
    this._routePoint = new RoutePointView();
    //this._routePointDataView = new RoutePointDataView();
    //this._formEditingPoint = new FormEditingPointView();
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();

    this._renderBoard();
  }

  _renderSort() {
    console.log(this._boardTasks);
    this._tasksSort = this._boardTasks.sort((a, b) => compare(a.dateStart, b.dateStart));
    console.log(this._tasksSort);
  }

  _renderPoint(pointListElement, data) {
    this._pointComponent = new RoutePointDataView(data);
    this._pointFormComponent = new FormEditingPointView(data);
    //createEventOffer(this._pointFormComponent);

    const configFlatpickr = {
      enableTime: true,
      altInput: true,
      altFormat: 'd/m/y H:i',
      dateFormat: 'd/m/y H:i',
    };

    const replacePointToForm = () => {
      replace(this._pointFormComponent, this._pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(this._pointComponent, this._pointFormComponent);
    };

    const onEscPress = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscPress);
      }
    };

    this._pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscPress);
      flatpickr(document.querySelectorAll('.event__input--time'), configFlatpickr);
    });

    this._pointFormComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscPress);
    });

    this._pointFormComponent.setFormCloseHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscPress);
    });

    renderElement(pointListElement, this._pointComponent, RenderPosition.BEFOREEND);
    renderElement(this._tripEventsList, pointListElement, RenderPosition.BEFOREEND);
  }

  _renderRoute() {
    console.log(this._routePoint);
    this._tasksSort.forEach((task) => this._renderPoint(this._routePoint.getElement(), task));
  }

  _renderNoRoute() {
    renderElement(this._siteMainSection, this._listEmpty, RenderPosition.BEFOREEND);
  }

  _renderBoard() {
    if (this._boardTasks.length === 0) {
      this._renderNoRoute();
      return;
    }
      renderElement(this._siteMainSection, this._mainTripSort, RenderPosition.AFTERBEGIN);
      renderElement(this._siteMainSection, this._listPointsView, RenderPosition.BEFOREEND);
      this._renderSort();
      this._renderRoute();
  }
}
