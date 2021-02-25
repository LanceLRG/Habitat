import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Dashboard.css';

function UserPage() {

  const dispatch = useDispatch();
  const store = useSelector(store => store);
  const history = useHistory();
  const user = useSelector((store) => store.user);

  // This task runs every time a 'complete' or 'undo' is made.
  // It will check if the number of 'task-completes' is equal to the number of tasks 
  // inside the store. If it is (and the day isn't arleady marked 'complete'),
  // it will send a put request to mark the day (primary task) as 'complete'. 
  // If it isn't, it will check to see if an 'undo' was made after a day completion.
  // If the day is marked as 'complete' but there aren't enough 'task-completes'
  // it will set the day's completion back to false.
  const calcComplete = () => {
    let compCount = 0;
    for (let task of store.task) {
      if (task.tcomplete) {
        ++compCount;
      }
    }
    console.log(compCount, store.task.length);
    if (compCount === store.task.length && !store.primaryTask.complete) {
      dispatch({ type: 'TOGGLE_DAY', payload: { primeTaskId: store.primaryTask.id, primeComp: store.primaryTask.complete, userId: store.user.id } })
    }
    else if (compCount < store.task.length && store.primaryTask.complete) {
      dispatch({ type: 'TOGGLE_DAY', payload: { primeTaskId: store.primaryTask.id, primeComp: store.primaryTask.complete, userId: store.user.id } });
    }
    return;
  }

  const checkDay = () => {
    let record = new Date(store.primaryTask.date)
    let today = new Date();
    console.log(store.primaryTask);
    if ((today.setHours(0, 0, 0, 0) - record.setHours(0, 0, 0, 0)) > 86401000) {
      console.log('That day was before today! by', (today.setHours(0, 0, 0, 0) - record.setHours(0, 0, 0, 0)));
    }
    else {
      console.log('that day is today!')
    }
  }

  const markComplete = (taskId) => {
    console.log('completing task with id:', taskId);
    dispatch({ type: 'COMPLETE_TASK', payload: { taskId: taskId, userId: store.user.id } })
    calcComplete();
  }

  const markUndo = (taskId) => {
    console.log('undoing task with id:', taskId);
    dispatch({ type: 'UNDO_TASK', payload: { taskId: taskId, userId: store.user.id } })
    calcComplete();
  }

  const handleEdit = (taskId) => {
    console.log('edit task with id,', taskId);
   dispatch({type: 'FETCH_EDIT', payload: taskId})
   history.push('/taskmanage');
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_PRIMARY', payload: { userId: store.user.id } });
    dispatch({ type: 'FETCH_TASK', payload: { userId: store.user.id } });
  }, [])

  return (
    <div className="container">
      <div>
        <button onClick={() => calcComplete()}>Calculate completions</button>
        <button onClick={() => checkDay()}>Check Day</button>
        <h2>{moment().format('MMMM Do YYYY')}</h2>
        {(store.primaryTask.complete) ? <FontAwesomeIcon htmlFor="image" icon={['fas', `star`]} color="gold" size="2x" /> : <FontAwesomeIcon htmlFor="image" icon={['fas', `star`]} opacity=".2" size="2x" />}
      </div>
      <h2>Welcome, {user.username}!</h2>
      {/* <button value={store.user.id} onClick={() => dispatch({type:'FETCH_TASK', payload: {userId: store.user.id}})} >Button</button> */}
      <p>Your ID is: {user.id}</p>
      {/* draws a task for every task in the task reducer conditionally renders elements
          based on whether or not certain elements are setup*/}
      {store.task.map((task) =>
        <div className="task" key={task.id}>
          <button value={task.id} onClick={(e) => handleEdit(e.target.value)}>Edit</button>
          <FontAwesomeIcon htmlFor="image" icon={['fas', 'pen']} size="1x" value={task.id} onClick={(e) => handleEdit(e.target.value)} />
          <h3>{task.name}</h3>
          <FontAwesomeIcon htmlFor="image" icon={['fas', `${task.icon}`]} size="2x" />
          {(task.amount) ? <p>{task.amount} {task.unit}</p> : ''}
          {(task.special) ? <p>{task.special}</p> : ''}
          {(task.tcomplete) ? <button value={task.id} onClick={(e) => markUndo(e.target.value)}>Undo</button> : <button value={task.id} onClick={(e) => markComplete(e.target.value)}>Complete</button>}
          {(task.tcomplete) ? <FontAwesomeIcon htmlFor="image" icon={['far', `check-circle`]} color="green" size="2x" /> : <FontAwesomeIcon htmlFor="image" icon={['far', `circle`]} size="2x" />}
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
