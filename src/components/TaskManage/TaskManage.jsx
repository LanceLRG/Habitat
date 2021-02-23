import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import moment from 'moment';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function manageTaskPage() {

    const store = useSelector(store => store)
    const dispatch = useDispatch();
    const history = useHistory();

    const [styleInput, setStyleInput] = useState ('single');
    const [nameInput, setNameInput] = useState('');
    const [iconInput, setIconInput] = useState('image');
    const [amountInput, setAmountInput] = useState('');
    const [unitInput, setUnitInput] = useState('');
    const [specialInput, setSpecialInput] = useState('');
    //const [taskSpecs, setTaskSpecs] = useState([])

    // const addSpecs = () => {
    //     const newSpecs = {
    //         amount: amountInput,
    //         unit: unitInput,
    //         special: specialInput,       
    //     }
    //     console.log('hello', newSpecs);
    //     setTaskSpecs(taskSpecs => [...taskSpecs, newSpecs])
    // }

    const submitTask = () => {
        const task_specs = [{
            amount: (amountInput || null),
            unit: (unitInput || null),
            special: (specialInput || null), 
            timer: false,
            timerTime: null,
            stopwatch: false,
            stopwatchTime: null,      
        }]
        const newTask = {
            style: styleInput,
            name: nameInput,
            icon: iconInput,
            date_created: moment().format(),
            user_id: store.user.id,
            primary_id: store.primaryTask.id,
            task_specs
        }
        console.log('newTask is', newTask);
        dispatch({type: 'ADD_TASK', payload: newTask})
        history.push('/home')
    }

  return (
      <>
    <div className="taskstyle">
      <h2>Task Style</h2>
      <input type="radio" name="style" value="single" defaultChecked onClick={() => setStyleInput('single')}/><label htmlFor="single">Single</label>
      <input type="radio" name="style" value="multiple" onClick={() => setStyleInput('multiple')}/><label htmlFor="multiple">Multiple</label>
      <hr />
    </div>
    <div>
        <h2>Task Design</h2>
        <input type="text" placeholder="Task Name" value={nameInput} onChange={(e) => setNameInput(e.target.value)}/>
    </div>
    <div>
        <h3>Image</h3>
        <FontAwesomeIcon value={iconInput} icon={['fas', `${iconInput}`]} size="5x"/>
    </div>
    <div>
        <p>choose an icon:</p>
        <input type="radio" value="coffee" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
        <FontAwesomeIcon htmlFor="coffee" icon={['fas', `coffee`]} size="2x"/>
        <input type="radio" value="image" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
        <FontAwesomeIcon htmlFor="image" icon={['fas', `image`]} size="2x"/>
        <hr />
    </div>
    <div>
        <h3>Specifications</h3>
        <label htmlFor="amount">Amount:</label><input type="text" name="amount" placeholder="ex: 20" value={amountInput} onChange={(e) => setAmountInput(e.target.value)}/>
        <label htmlFor="unit">Unit:</label><input type="text" name="unit" placeholder="ex: push-ups" value={unitInput} onChange={(e) => setUnitInput(e.target.value)}/>
        <input type="checkbox" id="special"/><label htmlFor="special">Special Instruction:</label><input type="text" name="special" placeholder="ex: take medicine" value={specialInput} onChange={(e) => setSpecialInput(e.target.value)}/>
        {/* <button onClick={() => addSpecs()} >accept specifications</button> */}
        {moment().format()}
    </div>
    <button>Cancel</button>
    <button onClick={submitTask}>Submit</button>
    </>
  );
}

export default manageTaskPage;
