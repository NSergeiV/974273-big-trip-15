import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDate = (date) => {
  const maxDaysGap = 21520;
  const maxDriveGap = 2880;
  const isDate = (!date) ? dayjs().add(getRandomInteger(24, maxDaysGap), 'm') : dayjs(date).add(getRandomInteger(1, maxDriveGap), 'm');

  return isDate;
};

const calculate = (d, h, m) => {
  if (d !== 0) {
    const day = dayjs().date(d).format('DD');
    const hour = dayjs().hour(h).format('HH');
    const minute = dayjs().minute(m).format('mm');

    return `${day}D ${hour}H ${minute}M`;
  } else if (h !== 0) {
    const hour = dayjs().hour(h).format('HH');
    const minute = dayjs().minute(m).format('mm');
    return `${hour}H ${minute}M`;
  } else {
    const minute = dayjs().minute(m).format('mm');
    return `${minute}M`;
  }
};

export const takeDate = () => {
  const dateStart = generateDate();
  const eventDate = dayjs(dateStart).format('MMM DD');
  const eventTimeStart = dayjs(dateStart).format('HH:mm');
  const dateEnd = generateDate(dateStart);
  const eventTimeEnd = dayjs(dateEnd).format('HH:mm');
  const travelTimeMinute = dateEnd.diff(dateStart, 'm');
  const travelTimeHour = dateEnd.diff(dateStart, 'h');
  const travelTimeDay = dateEnd.diff(dateStart, 'd');

  const travelTime = calculate(travelTimeDay, travelTimeHour, travelTimeMinute);

  return {
    dateStart,
    eventDate,
    eventTimeStart,
    travelTime,
    eventTimeEnd,
  };
};

export const compare = (a, b) => {
  const rezalt = (dayjs(a).isAfter(dayjs(b))) ? 1 : -1;
  return rezalt;
};
export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};
