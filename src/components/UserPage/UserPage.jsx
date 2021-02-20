import React, { useEffect, useState} from 'react';
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
    dispatch({ type: 'FETCH_TASK' });
  }, []);

  const handleClick = (itemID) => {
    dispatch({type: 'COMPLETE_TASK', payload: itemID});
  }

  // const addTask = () => {
  //   dispatch({type: 'ADD_TASK', payload: placeholder})
  // }

  Date.prototype.YYYYMMDDHHMMSS = function () {
    var yyyy = this.getFullYear().toString();
    var MM = pad(this.getMonth() + 1,2);
    var dd = pad(this.getDate(), 2);
    var hh = pad(this.getHours(), 2);
    var mm = pad(this.getMinutes(), 2)
    var ss = pad(this.getSeconds(), 2)

    return yyyy +'-'+ MM +'-'+ dd + ' ' + hh + ':' + mm + ':' + ss;
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


  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <button onClick={getDate}>Make new task</button>
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
            <td>{item.complete ? 'true' : 'false' }</td>
            <td><button value={item.id} onClick={(e) => handleClick(e.target.value)}>Click</button></td>
          </tr>)}
        </tbody>
      </table>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
