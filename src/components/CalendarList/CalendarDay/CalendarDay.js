import './CalendarDay.css';

const CalendarDay = ({ item, changeDayHandler }) => {
  // console.log(item);

  const weekDay = item.toUTCString().slice(0, 3);
  const day = item.toUTCString().slice(5, 7);

  return (
    <button
      className="calendar-day"
      onClick={() => changeDayHandler(item.toISOString().slice(0, 10))}
    >
      <div>{day}</div>
      <div> {weekDay}</div>
    </button>
  );
};

export default CalendarDay;
