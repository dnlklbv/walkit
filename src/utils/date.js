const MONTHS = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export const humanizeDate = (time) => {
  const date = new Date(time);
  const dateNow = new Date();

  const currentYear = dateNow.getFullYear();
  const currentDay = dateNow.getDate();
  const currentMonthIdx = dateNow.getMonth();

  const day = date.getDate();
  const monthIdx = date.getMonth();
  const month = MONTHS[monthIdx];
  const year = date.getFullYear();

  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);

  const isCurrentYear = currentYear === year;
  const isToday =
    isCurrentYear && day === currentDay && monthIdx === currentMonthIdx;

  let dateString = isToday ? 'Сегодня' : `${day} ${month}`;
  if (!isCurrentYear) {
    dateString = `${dateString} ${year}`;
  }

  return `${dateString} • ${hours}:${minutes}`;
};
