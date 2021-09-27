import HeaderRoutePriceView from './view/header-route-price.js';
import HeaderMenuView from './view/header-menu.js';
import HeaderStatsView from './view/stats.js';
import RoutePresenter from './presenter/route.js';
import FilterPresenter from './presenter/filter.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import {generateTask} from './mock/task.js';
import {renderElement, RenderPosition, remove} from './utils/render.js';
import {MenuItem, UpdateType, FilterType} from './const.js';

const TASK_COUNT = 20;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const siteHeader = document.querySelector('header');
const siteBlockMain = document.querySelector('main');


const pointsModel = new PointsModel();
const headerMenu = new HeaderMenuView();
renderElement(siteHeader, headerMenu, RenderPosition.AFTERBEGIN);
const siteHeaderElementTripMain = siteHeader.querySelector('.trip-main');
const siteHeaderElementFilter = siteHeader.querySelector('.trip-controls__filters');

pointsModel.setPoints(tasks);

const filterModel = new FilterModel();

if (tasks.length !== 0) {
  renderElement(siteHeaderElementTripMain, new HeaderRoutePriceView(), RenderPosition.AFTERBEGIN);
}

const routePresenter = new RoutePresenter(siteBlockMain, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteHeaderElementFilter, filterModel, pointsModel);

const handlePointNewFormClose = () => {
  headerMenu.getElement().querySelector(`[data-click=${MenuItem.NEW_EVENT}]`).disabled = false;
};

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_EVENT:
      // Скрыть статистику
      remove(statisticsComponent);
      // Показать доску
      routePresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      routePresenter.init();
      routePresenter.createPoint(handlePointNewFormClose);
      headerMenu.getElement().querySelector(`[data-click=${MenuItem.NEW_EVENT}]`).disabled = true;
      headerMenu.getElement().querySelector(`[data-click=${MenuItem.POINTS}]`).setAttribute('style', 'pointer-events: none;');
      break;
    case MenuItem.POINTS:
      // Показать доску
      routePresenter.init();
      headerMenu.getElement().querySelector(`[data-click=${MenuItem.NEW_EVENT}]`).disabled = false;
      headerMenu.getElement().querySelector(`[data-click=${MenuItem.POINTS}]`).setAttribute('style', 'pointer-events: none;');
      headerMenu.setMenuItem(MenuItem.POINTS);
      // Скрыть статистику
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      // Скрыть доску
      routePresenter.destroy();
      headerMenu.getElement().querySelector(`[data-click=${MenuItem.NEW_EVENT}]`).disabled = true;
      headerMenu.getElement().querySelector(`[data-click=${MenuItem.POINTS}]`).setAttribute('style', 'pointer-events: auto;');
      headerMenu.setMenuItem(MenuItem.STATISTICS);
      // Показать статистику
      statisticsComponent = new HeaderStatsView(pointsModel.getPoints());
      renderElement(siteBlockMain.querySelector('.page-body__container'), statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

headerMenu.getElement().querySelector(`[data-click=${MenuItem.POINTS}]`).setAttribute('style', 'pointer-events: none;');
headerMenu.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
routePresenter.init();
