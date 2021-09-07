import PointPresenter from './point.js';
import MainTripSortView from '../view/main-sort.js';
import ListPointsView from '../view/list.js';
import {renderElement, RenderPosition, replace} from '../utils/render.js';
import ListEmptyView from '../view/list-empty.js';
import {compare} from '../utils/task.js';
import RoutePointView from '../view/route-point.js';
// import RoutePointDataView from '../view/route-point-data.js';
// import FormEditingPointView from '../view/form-editing-point.js';

export default class Route {
  constructor(routeContainer) {
    this._routeContainer = routeContainer;
    this._siteMainSection = this._routeContainer.querySelector('.trip-events');

    this._mainTripSort = new MainTripSortView();
    this._listPointsView = new ListPointsView();
    this._listEmpty = new ListEmptyView();
    // this._routePoint = new RoutePointView();
    // this._routePointDataView = new RoutePointDataView();
    // this._formEditingPoint = new FormEditingPointView();
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
    const pointPresenter = new PointPresenter(this._tripEventsList);
    pointPresenter.init(pointListElement, data);
    /*
    console.log(pointListElement);
    console.log(data);
    const pointComponent = new RoutePointDataView(data);
    const pointFormComponent = new FormEditingPointView(data);
    // createEventOffer(pointFormComponent);

    const configFlatpickr = {
      enableTime: true,
      altInput: true,
      altFormat: 'd/m/y H:i',
      dateFormat: 'd/m/y H:i',
    };

    console.log('ПРОВАЛИЛОСЬ');

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

    console.log('ПРОВАЛИЛОСЬ');

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

    console.log('ПРОВАЛИЛОСЬ');

    renderElement(pointListElement, pointComponent, RenderPosition.BEFOREEND);
    console.log('ПРОВАЛИЛОСЬ');
    console.log(this._tripEventsList);
    renderElement(this._tripEventsList, pointListElement, RenderPosition.BEFOREEND);
    console.log('ПРОВАЛИЛОСЬ');
*/
  }

  _renderRoute() {
    this._tasksSort.forEach((task) => this._renderPoint(new RoutePointView().getElement(), task));
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
      this._tripEventsList = this._siteMainSection.querySelector('.trip-events__list');
      console.log(this._tripEventsList);
      this._renderSort();
      this._renderRoute();
  }
}
