import PointPresenter from './point.js';
import MainTripSortView from '../view/main-sort.js';
import ListPointsView from '../view/list.js';
import {renderElement, RenderPosition} from '../utils/render.js';
import ListEmptyView from '../view/list-empty.js';
import {compare} from '../utils/task.js';
import RoutePointView from '../view/route-point.js';

export default class Route {
  constructor(routeContainer) {
    this._routeContainer = routeContainer;
    this._siteMainSection = this._routeContainer.querySelector('.trip-events');

    this._mainTripSort = new MainTripSortView();
    this._listPointsView = new ListPointsView();
    this._listEmpty = new ListEmptyView();
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();

    this._renderBoard();
  }

  _renderSort() {
    this._tasksSort = this._boardTasks.sort((a, b) => compare(a.dateStart, b.dateStart));
  }

  _renderPoint(pointListElement, data) {
    const pointPresenter = new PointPresenter(this._tripEventsList);
    pointPresenter.init(pointListElement, data);
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
    this._renderSort();
    this._renderRoute();
  }
}
