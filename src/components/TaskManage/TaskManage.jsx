import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function manageTaskPage() {

    const store = useSelector(store => store)
    const dispatch = useDispatch();
    const history = useHistory();

    const [styleInput, setStyleInput] = useState('single');
    const [nameInput, setNameInput] = useState('');
    const [iconInput, setIconInput] = useState('image');
    const [amountInput, setAmountInput] = useState('');
    const [unitInput, setUnitInput] = useState('');
    const [specialToggle, setSpecialToggle] = useState(false)
    const [specialInput, setSpecialInput] = useState('');

    const fillIn = () => {
        if (store.edit.id) {
            setStyleInput(store.edit.style);
            setNameInput(store.edit.name);
            setIconInput(store.edit.icon);
            setAmountInput(store.edit.amount || '');
            setUnitInput(store.edit.unit || '');
            if (store.edit.special) {
                setSpecialToggle(true);
                setSpecialInput(store.edit.special);
            }
        }
    }

    useEffect(() => {
        fillIn();
    }, [store.edit])

    const submitTask = (command) => {
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
            id: (store.edit.id || ''),
            style: styleInput,
            name: nameInput,
            icon: iconInput,
            date_created: moment().format(),
            user_id: store.user.id,
            primary_id: store.primaryTask.id,
            task_specs
        }
        if (command === 'add') {
            console.log('newTask is', newTask);
            dispatch({ type: 'ADD_TASK', payload: newTask })
            history.push('/home')
        }
        else if (command === 'edit') {
            console.log('editing task');
            dispatch({type: 'EDIT_TASK', payload: newTask})
            history.push('/home')
        }
    }

    const handleDelete = (taskId) => {
        dispatch({type: 'DELETE_TASK', payload: taskId})
        history.push('/home')
    }

    const abortTask = () => {
        dispatch({ type: 'UNSET_EDIT' })
        history.push('/home')
    }


    return (
        <>
            <div className="taskstyle">
                <button onClick={fillIn}>fill In</button>
                {(store.edit.id) ? <p>got somethin' {store.edit.id}</p> : <p>nothing to edit {store.edit.id}</p>}
                <h2>Task Style</h2>
                <input type="radio" name="style" value="single" defaultChecked onClick={() => setStyleInput('single')} /><label htmlFor="single">Single</label>
                <input type="radio" name="style" value="multiple" onClick={() => setStyleInput('multiple')} /><label htmlFor="multiple">Multiple</label>
                <hr />
            </div>
            <div>
                <h2>Task Design</h2>
                <input type="text" placeholder="Task Name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
            </div>
            <div>
                <h3>Image</h3>
                <FontAwesomeIcon value={iconInput} icon={['fas', `${iconInput}`]} size="5x" />
            </div>
            <div>
                <p>choose an icon:</p>
                <input type="radio" value="coffee" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="coffee" icon={['fas', `coffee`]} size="2x" />
                <input type="radio" value="image" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="image" icon={['fas', `image`]} size="2x" />
                <input type="radio" value="dumbbell" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="dumbbell" icon={['fas', `dumbbell`]} size="2x" />
                <input type="radio" value="bicycle" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="bicycle" icon={['fas', `bicycle`]} size="2x" />
                <input type="radio" value="book-reader" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="book-reader" icon={['fas', `book-reader`]} size="2x" />
                <input type="radio" value="book" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="book" icon={['fas', `book`]} size="2x" />
                <input type="radio" value="brain" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="brain" icon={['fas', `brain`]} size="2x" />
                <input type="radio" value="capsules" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="capsules" icon={['fas', `capsules`]} size="2x" />
                <input type="radio" value="code" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="code" icon={['fas', `code`]} size="2x" />
                <input type="radio" value="dollar-sign" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="dollar-sign" icon={['fas', `dollar-sign`]} size="2x" />
                <input type="radio" value="dungeon" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="dungeon" icon={['fas', `dungeon`]} size="2x" />
                <input type="radio" value="fist-raised" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="fist-raised" icon={['fas', `fist-raised`]} size="2x" />
                <input type="radio" value="gamepad" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="gamepad" icon={['fas', `gamepad`]} size="2x" />
                <input type="radio" value="globe" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="globe" icon={['fas', `globe`]} size="2x" />
                <input type="radio" value="graduation-cap" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="graduation-cap" icon={['fas', `graduation-cap`]} size="2x" />
                <input type="radio" value="guitar" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="guitar" icon={['fas', `guitar`]} size="2x" />
                <input type="radio" value="hamburger" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="hamburger" icon={['fas', `hamburger`]} size="2x" />
                <input type="radio" value="headphones-alt" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="headphones-alt" icon={['fas', `headphones-alt`]} size="2x" />
                <input type="radio" value="hiking" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="hiking" icon={['fas', `hiking`]} size="2x" />
                <input type="radio" value="home" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="home" icon={['fas', `home`]} size="2x" />
                <input type="radio" value="music" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="music" icon={['fas', `music`]} size="2x" />
                <input type="radio" value="language" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="language" icon={['fas', `language`]} size="2x" />
                <input type="radio" value="hard-hat" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="hard-hat" icon={['fas', `hard-hat`]} size="2x" />
                <input type="radio" value="dice" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="dice" icon={['fas', `dice`]} size="2x" />
                <input type="radio" value="file-invoice-dollar" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="file-invoice-dollar" icon={['fas', `file-invoice-dollar`]} size="2x" />
                <input type="radio" value="utensils" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="utensils" icon={['fas', `utensils`]} size="2x" />
                <input type="radio" value="images" name="iconSelect" onClick={(e) => setIconInput(e.target.value)} />
                <FontAwesomeIcon htmlFor="images" icon={['fas', `images`]} size="2x" />
                <hr />
            </div>
            <div>
                <h3>Specifications</h3>
                <label htmlFor="amount">Amount:</label><input type="text" name="amount" placeholder="ex: 20" disabled={(specialToggle) ? true : false} value={amountInput} onChange={(e) => setAmountInput(e.target.value)} />
                <label htmlFor="unit">Unit:</label><input type="text" name="unit" placeholder="ex: push-ups" disabled={(specialToggle) ? true : false} value={unitInput} onChange={(e) => setUnitInput(e.target.value)} />
                <input type="checkbox" id="special" onClick={() => setSpecialToggle(!specialToggle)} /><label htmlFor="special">Special Instruction:</label><input type="text" name="special" placeholder="ex: take medicine" disabled={(specialToggle) ? false : true} value={specialInput} onChange={(e) => setSpecialInput(e.target.value)} />
                {/* <button onClick={() => addSpecs()} >accept specifications</button> */}
                {moment().format()}
            </div>
            <button onClick={abortTask}>Cancel</button>
            {(store.edit.id) ? <button onClick={() => submitTask('edit')}>Submit Changes</button> : <button onClick={() => submitTask('add')}>Add Task</button>}
            {(store.edit.id) ? <button onClick={() => handleDelete(store.edit.id)}>Delete</button> : ''}
        </>
    );
}

export default manageTaskPage;
