import './CalendarDay.css';

const CalendarDay = ({ item }) => {
  console.log(item);
  // const arr = item.split('-');
  // console.log(arr);
  //console.log(typeof item);
  const weekDay = item.slice(0, 3);
  const day = item.slice(5, 7);
  if (item) {
    return (
      <div className="calendar-day">
        <p>{day}</p>
        <p> {weekDay}</p>
      </div>
    );
  }
};

export default CalendarDay;
