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
    </div>
  );
};

export default CalendarList;
