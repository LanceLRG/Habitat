import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import './Dashboard.css';

function UserPage() {

  const dispatch = useDispatch();
  const store = useSelector(store => store);

  const user = useSelector((store) => store.user);

  const markComplete = (taskId) => {
    console.log('completing task with id:', taskId);
  }

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <button value={store.user.id} onClick={() => dispatch({type:'FETCH_TASK', payload: {userId: store.user.id}})} >Button</button>
      <p>Your ID is: {user.id}</p>
      {store.task.map((task) =>  
      <div className="task" key={task.id}>
        <h3>{task.name}</h3>
        {(task.amount) ? <p>{task.amount}:{task.unit}</p>: ''}
        {(task.special) ? <p>{task.special}</p>: ''}
        <button value={task.id} onClick={(e) => markComplete(e.target.value)}>Complete</button>
        {(task.complete) ? <p>COMPLETE</p> : <p>NOT COMPLETE</p>}
      </div>
      )}
      <br />
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
