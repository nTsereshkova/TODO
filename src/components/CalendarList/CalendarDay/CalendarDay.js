import './CalendarDay.css';

const CalendarDay = ({ item }) => {
  console.log(item);
  // const arr = item.split('-');
  // console.log(arr);
  //console.log(typeof item);
  const weekDay = item.slice(0, 3);
  const day = item.slice(5, 7);

  return (
    <button className="calendar-day">
      <div>{day}</div>
      <div> {weekDay}</div>
    </button>
    // <div className="calendar-day">
    //   <div>{day}</div>
    //   <div> {weekDay}</div>
    // </div>
  );
};

export default CalendarDay;

{
  /* <button className="calendar-day">
{day}
{weekDay}
</button> */
}
