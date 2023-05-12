import './CalendarDay.css';

const CalendarDay = ({ item, changeDayHandler, tasks }) => {
  // console.log(item);
  // let showFirstDot = false;
  // if (tasks.length > 0) {
  //   showFirstDot = true;
  // }
  const weekDay = item.toUTCString().slice(0, 3);
  const day = item.toUTCString().slice(5, 7);
  // const activeDay

  return (
    <button
      className="calendar-day"
      onClick={() => changeDayHandler(item.toISOString().slice(0, 10))}
    >
      <div>{day}</div>
      <div> {weekDay}</div>
      {/* {showFirstDot && <div className="dot"> </div>} */}
    </button>
  );
};

export default CalendarDay;
