const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
/*
const transport = {
  Taxi: 'taxi.png',
  Bus: 'bus.png',
  Train: 'train.png',
  Ship: 'ship.png',
  Drive: 'drive.png',
  Flight: 'flight.png',
  Check-in: 'check-in.png',
  Sightseeing: 'sightseeing.png',
  Restaurant: 'restaurant.png',
  Transport: 'transport.png',
};

const offer = {
  'Add luggage': 30,
  'Switch to comfort class': 100,
  'Add meal': 15,
  'Choose seats': 5,
  'Travel by train': 40,
};
*/

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

const generatePhoto = () => {
  const photoAdress = `http://picsum.photos/248/152?r=${Math.random()}`;
  return photoAdress;
};

const generateOffer = (length) => {
  const offersNew = offers.splice(0, length);
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

export const generateTask = () => ({
  eventDateStart: null,
  eventDateEnd: null,
  eventType: generateEventType(),
  eventCity: generateCity(),
  eventIcon: nameEventIcon,
  eventPrice: getRandomInteger(1, 1000),
  eventOffer: generateOffer(getRandomInteger(0, 5)),
  description: generateDescription(getRandomInteger(1, 5)),
  eventPhoto: generatePhoto(),
  isFavorite: false,
});
