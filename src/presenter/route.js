import PointPresenter from './point.js';
import PointNewPresenter from './point-new.js';
import MainTripSortView from '../view/main-sort.js';
import ListPointsView from '../view/list.js';
import {renderElement, RenderPosition, remove} from '../utils/render.js';
import {filter} from '../utils/filter.js';
import ListEmptyView from '../view/list-empty.js';
import {compare, sortPointTime, sortPointPrice} from '../utils/task.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';

export default class Route {
  constructor(routeContainer, pointsModel, filterModel) {
    this._routeContainer = routeContainer;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._siteMainSection = this._routeContainer.querySelector('.trip-events');
    this._pointPresenter = new Map();
    this._filterType = FilterType.EVERYTHING;
    this._currentSortType = SortType.DEFAULT;

    this._mainTripSort = null;
    this._listEmpty = null;
    this._listPointsView = new ListPointsView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    // this._pointsModel.addObserver(this._handleModelEvent);
    // this._filterModel.addObserver(this._handleModelEvent);

    this._pointNewPresenter = new PointNewPresenter(this._listPointsView, this._handleViewAction, this._pointsModel);
  }

  init() {

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  destroy() {
    this._clearBoard({resetSortType: true});

    remove(this._listPointsView);
    remove(this._mainTripSort);
    // remove(this._boardComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint(callback) {
    this._pointNewPresenter.init(callback);
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this._pointsModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this._pointsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this._pointsModel.deleteTask(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _renderSort() {
    if (this._mainTripSort !== null) {
      this._mainTripSort = null;
    }
    this._mainTripSort = new MainTripSortView(this._currentSortType);
    renderElement(this._siteMainSection, this._mainTripSort, RenderPosition.AFTERBEGIN);
    this._mainTripSort.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _getPoints() {
    this._filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[this._filterType](points);

    switch (this._currentSortType) {
      case SortType.SORT_TIME:
        return filtredPoints.sort(sortPointTime);
      case SortType.SORT_PRICE:
        return filtredPoints.sort(sortPointPrice);
    }

    return filtredPoints.sort(compare);
  }

  _renderPoint(data) {
    const pointPresenter = new PointPresenter(this._listPointsView, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(data);
    this._pointPresenter.set(data.id, pointPresenter);
  }

  _renderRoute() {
    renderElement(this._siteMainSection, this._listPointsView, RenderPosition.BEFOREEND);
    this._getPoints().forEach((task) => this._renderPoint(task));
  }

  _renderNoRoute() {
    this._listEmpty = new ListEmptyView(this._filterType);
    renderElement(this._siteMainSection, this._listEmpty, RenderPosition.BEFOREEND);
  }

  _clearBoard({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();

    remove(this._mainTripSort);

    if (this._listEmpty) {
      remove(this._listEmpty);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderBoard() {
    const points = this._getPoints();
    const pointCount = points.length;

    if (pointCount === 0) {
      this._renderNoRoute();
      return;
    }
    this._renderSort();
    this._renderRoute();
  }
}
