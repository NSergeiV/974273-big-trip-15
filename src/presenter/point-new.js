
import FormEditingPointView from '../view/form-editing-point.js';
import {renderElement, RenderPosition, remove} from '../utils/render.js';
import RoutePointView from '../view/route-point.js';
import {UserAction, UpdateType} from '../const.js';
import {nanoid} from 'nanoid';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(pointListContainer, changeData, pointsModel) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._pointsModel = pointsModel;

    this._routePointView = new RoutePointView();

    this._pointFormComponent = null;
    this._mode = Mode.DEFAULT;

    this._onEscPress = this._onEscPress.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init() {

    if (this._pointFormComponent !== null) {
      return;
    }

    this._pointFormComponent = new FormEditingPointView(this._pointsModel.getPoints()[0]);

    this._pointFormComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointFormComponent.setFormDeleteHandler(this._handleDeleteClick);
    renderElement(this._pointListContainer, this._pointFormComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this._onEscPress);
  }

  destroy() {

    if (this._pointFormComponent === null) {
      return;
    }

    remove(this._pointFormComponent);
    this._pointFormComponent = null;

    document.removeEventListener('keydown', this._onEscPress);
  }

  _onEscPress(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  _handleFormSubmit(point) {

    this._changeData(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      Object.assign({id: nanoid()}, point),
    );

    this.destroy();
  }

  _handleFormClose() {
    this.destroy();
  }

  _handleDeleteClick(task) {
    this._changeData(
      UserAction.DELETE_TASK,
      UpdateType.MINOR,
      task,
    );
  }
}
