import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import { TaskList } from '../TaskList';
import { BsCalendarWeek } from 'react-icons/bs';
import { showCalendarHandler } from '../../store/actions/actions';
import { CalendarDay } from './CalendarDay';
import './CalendarList.css';

const CalendarList = () => {
  const dispatch = useDispatch();
  const { showCalendar } = useSelector(state => state.main);

  const date = new Date(Date.now()).toISOString().slice(0, 10);

  const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const dateArr = [];

  for (let i = 0; i < 32; i++) {
    let innerDate = new Date(Date.now() + i * 24 * 60 * 60 * 1000).toUTCString();
    dateArr[i] = innerDate;
  }

  console.log(dateArr);
  return (
    <div>
      <div className="calendar">
        <div className="calendar-item">
          {dateArr.map((item, index) => (
            <CalendarDay item={item} key={item} />
          ))}
        </div>
        <BsCalendarWeek
          onClick={() => {
            dispatch(showCalendarHandler());
          }}
        />
        {showCalendar && (
          <input
            type="date"
            defaultValue={date}
            min={date}
            onChange={event =>
              console.log('здесь послать запрос с новой датой', event.target.value)
            }
          />
        )}
      </div>
      {/* <TaskList /> */}
    </div>
  );
};

export default CalendarList;

// defaultActiveStartDate={date}
// defaultValue={date}

{
  /* {date} {weekDay} {month} */
}
{
  /* <Calendar defaultActiveStartDate={date} minDate={date} value={date}>
        {/* <p> please add </p>
        <TaskList /> */
}
// </Calendar> */}

//console.log(new Date(Date.now()).getDay());
// эта строка кода не раюботает
// const weekDay = week.findIndex(
//   (index, item) => index === new Date(Date.now()).getDay(),
// );
// const weekDay = week.indexOf(
//   (index, item) => index === new Date(Date.now()).getDay(),
// );
// console.log(weekDay);
// const month = new Date(Date.now()).getMonth().toString();

// const monthes = [
//   {}
// ]

// const week = [
//   'Sunday',
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday',
// ];

//console.log('start date', date);
//console.log(new Date(Date.now()).getDate());

// const endDate = new Date().setDate(new Date(Date.now()).getDate() + 30);
// console.log(Date.now());
