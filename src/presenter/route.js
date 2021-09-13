import PointPresenter from './point.js';
import MainTripSortView from '../view/main-sort.js';
import ListPointsView from '../view/list.js';
import {renderElement, RenderPosition} from '../utils/render.js';
import ListEmptyView from '../view/list-empty.js';
import {compare} from '../utils/task.js';
// import RoutePointView from '../view/route-point.js';
import {updateItem} from '../utils/common.js';

export default class Route {
  constructor(routeContainer) {
    this._routeContainer = routeContainer;
    this._siteMainSection = this._routeContainer.querySelector('.trip-events');
    this._pointPresenter = new Map();

    this._mainTripSort = new MainTripSortView();
    this._listPointsView = new ListPointsView();
    this._listEmpty = new ListEmptyView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();

    this._renderBoard();
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._boardTasks = updateItem(this._boardTasks, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _renderSort() {
    this._tasksSort = this._boardTasks.sort((a, b) => compare(a.dateStart, b.dateStart));
  }

  _renderPoint(data) {
    const pointPresenter = new PointPresenter(this._listPointsView, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(data);
    this._pointPresenter.set(data.id, pointPresenter);
  }

  _clearPointList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderRoute() {
    this._tasksSort.forEach((task) => this._renderPoint(task));
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
