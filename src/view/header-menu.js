import AbstractView from './abstract.js';
import {MenuItem} from '../const.js';

const createHeaderMenuTemplate = () => (
  `<div class="page-body__container  page-header__container">
    <img class="page-header__logo" src="img/logo.png" width="42" height="42" alt="Trip logo">
    <div class="trip-main">
      <div class="trip-main__trip-controls  trip-controls">
        <div class="trip-controls__navigation">
          <h2 class="visually-hidden">Switch trip view</h2>
          <nav class="trip-controls__trip-tabs trip-tabs">
            <a class="trip-tabs__btn trip-tabs__btn--active" data-click="${MenuItem.POINTS}" href="#">Table</a>

            <a class="trip-tabs__btn" data-click="${MenuItem.STATISTICS}" href="#">Stats</a>
          </nav>
        </div>
        <div class="trip-controls__filters">
          <h2 class="visually-hidden">Filter events</h2>
        </div>
      </div>
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" data-click="${MenuItem.NEW_EVENT}" type="button">New event</button>
    </div>
  </div>`
);

export default class HeaderMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createHeaderMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.click);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const reverse = (menuItem === MenuItem.STATISTICS) ? MenuItem.POINTS : MenuItem.STATISTICS;
    const item = this.getElement().querySelector(`[data-click=${menuItem}]`);
    const itemAnother = this.getElement().querySelector(`[data-click=${reverse}]`);

    if (item !== null) {
      item.classList.add('trip-tabs__btn--active');
    }

    if (itemAnother !== null) {
      itemAnother.classList.remove('trip-tabs__btn--active');
    }
  }
}

