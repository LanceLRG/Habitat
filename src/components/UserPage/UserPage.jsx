import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Dashboard.css';

import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

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
  const [percent, setPercent] = useState(0);
  const calcComplete = () => {
    let compCount = 0;

    for (let task of store.task) {
      if (task.tcomplete) {
        ++compCount;
      }
      setPercent((compCount / store.task.length) * 100)
    }
    console.log(compCount, store.task.length);
    //no free streaks if you have no tasks
    if (store.task.length <= 0) {
      return;
    }
    if (compCount === store.task.length && !store.primaryTask.complete) {
      dispatch({ type: 'TOGGLE_DAY', payload: { primeTaskId: store.primaryTask.id, primeComp: store.primaryTask.complete, userId: store.user.id } })
    }
    else if (compCount < store.task.length && store.primaryTask.complete) {
      dispatch({ type: 'TOGGLE_DAY', payload: { primeTaskId: store.primaryTask.id, primeComp: store.primaryTask.complete, userId: store.user.id } });
    }
  }

  const calcStreak = () => {
    if (store.primaryTask.current_streak > store.primaryTask.long_streak) {
      dispatch({ type: 'RAISE_LONGEST_STREAK', payload: { newStreak: store.primaryTask.current_streak, userId: store.user.id } })
    }
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
  }

  const markUndo = (taskId) => {
    console.log('undoing task with id:', taskId);
    dispatch({ type: 'UNDO_TASK', payload: { taskId: taskId, userId: store.user.id } })
  }

  const handleEdit = (taskId) => {
    console.log('edit task with id,', taskId);
    dispatch({ type: 'FETCH_EDIT', payload: taskId })
    history.push('/taskmanage');
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_PRIMARY' });
    dispatch({ type: 'FETCH_TASK' });
  }, [])

  useEffect(() => {
    calcComplete();
  }, [store.task])

  useEffect(() => {
    calcStreak();
    calcComplete();
  }, [store.primaryTask])

  return (
    <div className="container">
      <div>
        {/* <button onClick={() => calcComplete()}>Calculate completions</button>
        <button onClick={() => checkDay()}>Check Day</button>
        <button onClick={() => history.push('/calendar')}>Calendar</button> */}
        <Card style={{ width: '100%' }}>
          <Card.Header>
            <h1 class="font-weight-bold">{moment().format('MMMM Do YYYY')}</h1>
            <h5 class="header text-right">Current Streak: {store.primaryTask.current_streak}</h5>
            {(store.primaryTask.complete) ? <FontAwesomeIcon id="star" icon={['fas', `star`]} color="gold" size="2x" /> : <FontAwesomeIcon id="star" icon={['fas', `star`]} opacity=".2" size="2x" />}
          </Card.Header>
          <Card.Body>
            {/* <Card.Text>Longest Streak: {(store.primaryTask.long_streak)}</Card.Text> */}
            <ProgressBar variant="info" now={percent} />
          </Card.Body>
        </Card>
      </div>
      <h2>Welcome, {user.username}!</h2>
      {/* <button value={store.user.id} onClick={() => dispatch({type:'FETCH_TASK', payload: {userId: store.user.id}})} >Button</button> */}
      <p>Your ID is: {user.id}</p>
      {/* draws a task for every task in the task reducer conditionally renders elements
          based on whether or not certain elements are setup*/}
      {store.task.map((task) =>
        <Card  style={{ width: '100%', margin: '10px' }}>
          <div className="task" key={task.id}>
            <Card.Header>
            <FontAwesomeIcon id="icon" icon={['fas', `${task.icon}`]} size="2x" />
              <h3 className="task-name">{task.name}</h3>
              <OverlayTrigger key="top" placement="top" overlay={<Tooltip id={'tooltip-top'}>edit</Tooltip>}>
              <button className="edit-button" onClick={() => handleEdit(task.id)}><FontAwesomeIcon icon={['fas', 'pen']} size="1x" /></button>
              </OverlayTrigger>
              {(task.tcomplete) ? <button className="btn-secondary undo-button" value={task.id} onClick={(e) => markUndo(e.target.value)}>Undo</button> : <button className="complete-button" value={task.id} onClick={(e) => markComplete(e.target.value)}>Complete</button>}
              {(task.tcomplete) ? <FontAwesomeIcon id="completion" icon={['far', `check-circle`]} color="green" size="2x" /> : <FontAwesomeIcon id="completion" icon={['far', `circle`]} size="2x" />}
            </Card.Header>
            <Card.Body>{(task.amount) ? <p>{task.amount} {task.unit}</p> : ''}
              {(task.special) ? <p>{task.special}</p> : ''}
            </Card.Body>
          </div>
        </Card>
      )}
      <br />
      <br />
      <button className="btn btn-block btn-outline-primary" onClick={() => history.push('/taskmanage')}>Add task</button>
      <br />
      <br />
      <LogOutButton />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
