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
*/
const generateEventType = () => {
  const types = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant', 'Transport'];
  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};

const generateCity = () => {
  const citys = ['Amsterdam', 'Chamonix', 'Geneva', 'Berlin', 'Amsterdam', 'Athens', 'Tbilisi', 'Madrid', 'Rome', 'Moscow'];
  const randomIndex = getRandomInteger(0, citys.length - 1);
  return citys[randomIndex];
};

export const generateTask = () => ({
  eventDate: null,
  eventType: generateEventType(),
  eventCity: generateCity(),
  eventIcon: this.eventType,
});
