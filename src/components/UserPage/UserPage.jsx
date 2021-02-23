import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import './Dashboard.css';

function UserPage() {

  const dispatch = useDispatch();
  const store = useSelector(store => store);
  const history = useHistory();
  const user = useSelector((store) => store.user);

  const markComplete = (taskId) => {
    console.log('completing task with id:', taskId);
    dispatch({type: 'COMPLETE_TASK', payload: {taskId: taskId, userId: store.user.id} })
  }

  useEffect(() => {
    dispatch({type:'FETCH_PRIMARY', payload: {userId: store.user.id}});
    dispatch({type:'FETCH_TASK', payload: {userId: store.user.id}});
  }, [])

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      {/* <button value={store.user.id} onClick={() => dispatch({type:'FETCH_TASK', payload: {userId: store.user.id}})} >Button</button> */}
      <p>Your ID is: {user.id}</p>
      {/* draws a task for every task in the task reducer conditionally renders elements
          based on whether or not certain elements are setup*/}
      {store.task.map((task) =>  
      <div className="task" key={task.id}>
        <h3>{task.name}</h3>
        <FontAwesomeIcon htmlFor="image" icon={['fas', `${task.icon}`]} size="2x"/>
        {(task.amount) ? <p>{task.amount}: {task.unit}</p>: ''}
        {(task.special) ? <p>{task.special}</p>: ''}
        <button value={task.id} onClick={(e) => markComplete(e.target.value)}>Complete</button>
        {(task.tcomplete) ? <p>COMPLETE</p> : <p>NOT COMPLETE</p>}
      </div>
      )}
      <br />
      <br />
      <button onClick={() => history.push('/taskmanage')}>Add task</button>
      <br />
      <br />
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
