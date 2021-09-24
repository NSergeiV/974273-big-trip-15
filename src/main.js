import HeaderRoutePriceView from './view/header-route-price.js';
import HeaderMenuView from './view/header-menu.js';
import RoutePresenter from './presenter/route.js';
import FilterPresenter from './presenter/filter.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import {generateTask} from './mock/task.js';
import {renderElement, RenderPosition} from './utils/render.js';

const TASK_COUNT = 20;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const siteHeader = document.querySelector('header');
const siteBlockMain = document.querySelector('main');
const siteHeaderElementTripMain = siteHeader.querySelector('.trip-main');
const siteHeaderElementNavigation = siteHeader.querySelector('.trip-controls__navigation');
const siteHeaderElementFilter = siteHeader.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
pointsModel.setPoints(tasks);

const filterModel = new FilterModel();

renderElement(siteHeaderElementNavigation, new HeaderMenuView(), RenderPosition.BEFOREEND);

if (tasks.length !== 0) {
  renderElement(siteHeaderElementTripMain, new HeaderRoutePriceView(), RenderPosition.AFTERBEGIN);
}

const routePresenter = new RoutePresenter(siteBlockMain, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteHeaderElementFilter, filterModel, pointsModel);

filterPresenter.init();
routePresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  routePresenter.createPoint();
});
