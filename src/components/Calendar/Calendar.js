import './Calendar.css';

const Calendar = () => {
  const date = Date.now().toLocaleString();
  return <div>{date} </div>;
};

export default Calendar;
