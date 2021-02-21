import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const store = useSelector((store) => store);
  const dispatch = useDispatch();

  const [date, setDate] = useState('')

  useEffect(() => {
    setInterval(() => {
      getDate();
    }, 1000)
    brandNewDay()
    dispatch({ type: 'FETCH_TASK' });
  }, []);

  const handleClick = (itemID) => {
    dispatch({ type: 'COMPLETE_TASK', payload: { id: itemID } });
    dispatch({ type: 'FETCH_TASK' });
  }

  const addTask = () => {
    dispatch({ type: 'ADD_TASK', payload: { date: date } });
    dispatch({ type: 'FETCH_TASK' });
  }

  /* date get/format taken from Stack Overflow */
  Date.prototype.YYYYMMDDHHMMSS = function () {
    var yyyy = this.getFullYear().toString();
    var MM = pad(this.getMonth() + 1, 2);
    var dd = pad(this.getDate(), 2);
    var hh = pad(this.getHours(), 2);
    var mm = pad(this.getMinutes(), 2)
    var ss = pad(this.getSeconds(), 2)

    return yyyy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
  };

  const getDate = () => {
    let d = new Date();
    setDate(d.YYYYMMDDHHMMSS());
  }

  function pad(number, length) {

    var str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }

    return str;
  }

  const parseMe = () => {
    let second = (Date.parse(date) / 1000);
    let minute = Math.floor(second / 60);
    let now = Math.floor(Date.now() / 60000)
    alert(minute);
  }

  const brandNewDay = () => {
    console.log('sending date', date);
    dispatch({
      type: 'CHECK_DAY', payload: {
        today: new Date(),
        id: store.user.id
      }
    });
    dispatch({ type: 'FETCH_TASK' });
  }


  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <button onClick={addTask}>Make new task</button>
      <button onClick={parseMe}>Parse Date-now</button>
      <button onClick={brandNewDay}>Check day</button>
      <div>
        {date}
      </div>
      <table>
        <thead>
          <th>Date</th>
          <th>Complete</th>
        </thead>
        <tbody>
          {store.testing.map((item) => <tr key={item.id}>
            <td>I was made at: {item.date}</td>
            <td>{item.complete ? 'true' : 'false'}</td>
            <td><button value={item.id} onClick={(e) => handleClick(e.target.value)}>Click</button></td>
          </tr>)}
        </tbody>
      </table>
      <p>Your ID is: {user.id}</p>
      <table>
        <thead>
          <th>Autogenerated Date</th>
          <th>Complete</th>
        </thead>
        <tbody>
          {store.days.map((item) => <tr key={item.id}>
            <td>I made myself for: {item.date_day}</td>
            <td>{item.complete ? 'true' : 'false' }</td>
            <td><button value={item.id} onClick={(e) => handleClick(e.target.value)}>Click</button></td>
          </tr>)}
        </tbody>
      </table>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
