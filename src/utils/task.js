import dayjs from 'dayjs';
import {getRandomInteger} from './common.js';

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
    travelTimeMinute,
  };
};

export const compare = (a, b) => {
  const rezalt = (dayjs(a).isAfter(dayjs(b))) ? 1 : -1;
  return rezalt;
};

export const sortPointTime = (pointA, pointB) => {
  const rezalt = (pointB.travelTimeMinute > pointA.travelTimeMinute) ? 1 : -1;
  return rezalt;
};

export const sortPointPrice = (pointA, pointB) => {
  const rezalt = (pointB.eventPrice > pointA.eventPrice) ? 1 : -1;
  return rezalt;
};
