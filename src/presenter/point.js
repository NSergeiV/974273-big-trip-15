import RoutePointDataView from '../view/route-point-data.js';
import FormEditingPointView from '../view/form-editing-point.js';
import {renderElement, RenderPosition, replace, remove} from '../utils/render.js';
import RoutePointView from '../view/route-point.js';
import {UserAction, UpdateType} from '../const.js';
import {isDatesEqual} from '../utils/task.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(pointListContainer, changeData, changeMode) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._routePointView = new RoutePointView();

    this._pointComponent = null;
    this._pointFormComponent = null;
    this._mode = Mode.DEFAULT;

    this._onEscPress = this._onEscPress.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormClose = this._handleFormClose.bind(this);
    this._handleEditClickFavorite = this._handleEditClickFavorite.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(data) {
    this._pointData = data;
    const prevPointComponent = this._pointComponent;
    const prevPointFormComponent = this._pointFormComponent;

    this._pointComponent = new RoutePointDataView(data);
    this._pointFormComponent = new FormEditingPointView(data);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointComponent.setEditClickFavorite(this._handleEditClickFavorite);

    this._pointFormComponent.setFormSubmitHandler(this._handleFormSubmit);

    this._pointFormComponent.setFormCloseHandler(this._handleFormClose);
    this._pointFormComponent.setFormDeleteHandler(this._handleDeleteClick);

    if (prevPointComponent === null || prevPointFormComponent === null) {
      renderElement(this._routePointView, this._pointComponent, RenderPosition.BEFOREEND);
      renderElement(this._pointListContainer, this._routePointView, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointFormComponent, prevPointFormComponent);
    }

    remove(prevPointComponent);
    remove(prevPointFormComponent);
  }

  destroy() {
    remove(this._routePointView);
    remove(this._pointComponent);
    remove(this._pointFormComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replacePointToForm() {
    replace(this._pointFormComponent, this._pointComponent);
    document.addEventListener('keydown', this._onEscPress);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointFormComponent);
    document.removeEventListener('keydown', this._onEscPress);
    this._mode = Mode.DEFAULT;
  }

  _onEscPress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this._pointFormComponent.reset(this._pointData);
      this._replaceFormToPoint();
    }
  }

  _handleEditClick() {
    this._replacePointToForm();
  }

  _handleEditClickFavorite(pointData) {
    this._task = pointData;

    this._changeData(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._task,
        {
          isFavorite: !this._task.isFavorite,
        },
      ),
    );
  }

  _handleFormSubmit(update) {
    // Проверяем, поменялись ли в задаче данные, которые попадают под фильтрацию,
    // а значит требуют перерисовки списка - если таких нет, это PATCH-обновление
    const isMinorUpdate =
      !isDatesEqual(this._pointData.dueDate, update.dueDate);

    this._changeData(
      UserAction.UPDATE_TASK,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );

    this._replaceFormToPoint();
  }

  _handleDeleteClick(task) {
    this._changeData(
      UserAction.DELETE_TASK,
      UpdateType.MINOR,
      task,
    );
    this._replaceFormToPoint();
  }

  _handleFormClose() {
    this._pointFormComponent.reset(this._pointData);
    this._replaceFormToPoint();
  }
}
