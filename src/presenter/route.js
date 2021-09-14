import PointPresenter from './point.js';
import MainTripSortView from '../view/main-sort.js';
import ListPointsView from '../view/list.js';
import {renderElement, RenderPosition} from '../utils/render.js';
import ListEmptyView from '../view/list-empty.js';
import {compare} from '../utils/task.js';
import {updateItem} from '../utils/common.js';

import {sortPointTime, sortPointPrice} from '../utils/task.js';
import {SortType} from '../const.js';

export default class Route {
  constructor(routeContainer) {
    this._routeContainer = routeContainer;
    this._siteMainSection = this._routeContainer.querySelector('.trip-events');
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DEFAULT;

    this._mainTripSort = new MainTripSortView();
    this._listPointsView = new ListPointsView();
    this._listEmpty = new ListEmptyView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();
    this._sourcedBoardTasks = boardTasks.slice();

    this._renderBoard();
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._boardTasks = updateItem(this._boardTasks, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SortType.SORT_TIME:
        this._boardTasks.sort(sortPointTime);
        break;
      case SortType.SORT_PRICE:
        this._boardTasks.sort(sortPointPrice);
        break;
      default:
        this._boardTasks = this._sourcedBoardTasks.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);
    this._clearPointList();
    this._renderRoute();
  }

  _renderSort() {
    this._boardTasks = this._sourcedBoardTasks.sort((a, b) => compare(a.dateStart, b.dateStart)).slice();

    this._mainTripSort.setSortTypeChangeHandler(this._handleSortTypeChange);
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
    this._boardTasks.forEach((task) => this._renderPoint(task));
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
