import {getRandomInteger} from '../utils/common.js';
import {takeDate} from '../utils/task.js';
import {nanoid} from 'nanoid';

const descriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];

const offers = [{'Add luggage': 30}, {'Switch to comfort class': 100}, {'Add meal': 15}, {'Choose seats': 5}, {'Travel by train': 40}];

const generateDescription = (length) => {
  const descriptionsNew = new Array(length).fill().map(() => {
    const randomIndex = getRandomInteger(0, descriptions.length - 1);
    return descriptions[randomIndex];
  });
  const descriptionFull = descriptionsNew.join(' ');
  return descriptionFull;
};

const generatePhoto = (result = getRandomInteger(0, 1)) => {
  let photoAdress = null;
  if (result === 1) {
    photoAdress = [`http://picsum.photos/248/152?r=${Math.random()}`];
  }
  return photoAdress;
};

const getStatusFavorite = () => {
  const number = getRandomInteger();
  let favorite = false;
  if (number === 1) {
    favorite = true;
    return favorite;
  }
  return favorite;
};

const generateOffer = () => {
  const offersNew = offers.slice(0, getRandomInteger(0, 5));
  return offersNew;
};

let nameEventIcon;

const generateEventType = () => {
  const types = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant', 'Transport'];
  const randomIndex = getRandomInteger(0, types.length - 1);
  nameEventIcon = `img/icons/${types[randomIndex].toLowerCase()}.png`;
  return types[randomIndex];
};

const generateCity = () => {
  const citys = ['Amsterdam', 'Chamonix', 'Geneva', 'Berlin', 'Amsterdam', 'Athens', 'Tbilisi', 'Madrid', 'Rome', 'Moscow'];
  const randomIndex = getRandomInteger(0, citys.length - 1);
  return citys[randomIndex];
};

export const generateTask = () => {
  const {dateStart, dateEnd, eventDate, eventDateStart, eventTimeStart, travelTime, eventDateEnd, eventTimeEnd, travelTimeMinute} = takeDate();

  return {
    id: nanoid(),
    dateStart,
    dateEnd,
    eventDate,
    eventDateStart,
    eventTimeStart,
    travelTime,
    eventDateEnd,
    eventTimeEnd,
    travelTimeMinute,
    eventType: generateEventType(),
    eventCity: generateCity(),
    eventIcon: nameEventIcon,
    eventPrice: getRandomInteger(1, 1000),
    eventOffer: generateOffer(),
    description: generateDescription(getRandomInteger(0, 5)),
    eventPhoto: generatePhoto(),
    isFavorite: getStatusFavorite(),
  };
};

