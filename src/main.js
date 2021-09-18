import HeaderRoutePriceView from './view/header-route-price.js';
import HeaderMenuView from './view/header-menu.js';
import HeaderFilterView from './view/header-filter.js';
import RoutePresenter from './presenter/route.js';
import {generateTask} from './mock/task.js';
import {renderElement, RenderPosition} from './utils/render.js';

const TASK_COUNT = 20;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const siteHeader = document.querySelector('header');
const siteBlockMain = document.querySelector('main');
const siteHeaderElementTripMain = siteHeader.querySelector('.trip-main');
const siteHeaderElementNavigation = siteHeader.querySelector('.trip-controls__navigation');
const siteHeaderElementFilter = siteHeader.querySelector('.trip-controls__filters');

renderElement(siteHeaderElementNavigation, new HeaderMenuView(), RenderPosition.BEFOREEND);
renderElement(siteHeaderElementFilter, new HeaderFilterView(), RenderPosition.BEFOREEND);

if (tasks.length !== 0) {
  renderElement(siteHeaderElementTripMain, new HeaderRoutePriceView(), RenderPosition.AFTERBEGIN);
}

const routePresenter = new RoutePresenter(siteBlockMain);

routePresenter.init(tasks);

