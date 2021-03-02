import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import './TaskManage.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

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
            dispatch({ type: 'EDIT_TASK', payload: newTask })
            history.push('/home')
        }
    }

    const handleDelete = (taskId) => {
        dispatch({ type: 'DELETE_TASK', payload: taskId })
        history.push('/home')
    }

    const abortTask = () => {
        if (store.edit.id) {
            dispatch({ type: 'UNSET_EDIT' })
        }
        history.push('/home')
    }

    const iconList = ['coffee', 'image', 'dumbbell', 'bicycle', `book-reader`, `book`, `brain`, `capsules`, `code`, `dollar-sign`, `dungeon`, `fist-raised`, `gamepad`, `globe`, `graduation-cap`, `guitar`, `hamburger`, `headphones-alt`, `hiking`, `home`, `music`,
        `language`, `hard-hat`, `dice`, `file-invoice-dollar`, `utensils`, `images`]
    return (
        <>
            <Container>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label as="legend" column="lg" lg={2}>Task Style</Form.Label>
                        <Col sm={3}>
                            <Form.Check
                                type="radio"
                                label="Single"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                value="single"
                                defaultChecked
                                onClick={() => setStyleInput('single')}
                            />
                            <Form.Check
                                type="radio"
                                label="Multiple"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                value="multiple"
                                onClick={() => setStyleInput('multiple')}
                            />
                        </Col>
                        <br />
                        <Col>
                            <p>Single tasks require only one action to be completed.</p>
                            <p> Mulptiple tasks require you complete several sub-tasks before it is marked as completed.
                        </p>
                        </Col>
                        {/* <input type="radio" name="style" value="single" defaultChecked onClick={() => setStyleInput('single')} /><label htmlFor="single">Single</label>
                        <input type="radio" name="style" value="multiple" onClick={() => setStyleInput('multiple')} /><label htmlFor="multiple">Multiple</label> */}
                    </Form.Group>
                    <div className="p-3 mb-3 mb-md-0 mr-md-3 bg-light">
                        <h2>Task Design</h2>
                        <hr />
                        <br />
                        <Form.Group controlId="formTaskDesign">
                            <Form.Row>
                                <Col md="auto" id="exIcon">
                                    <FontAwesomeIcon value={iconInput} icon={['fas', `${iconInput}`]} size="5x" />
                                </Col>
                                <Col md={9}>
                                    <Form.Label>Task Name</Form.Label>
                                    <Form.Control type="text" placeholder="Task Name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                                    <Form.Text className="text-muted">
                                        Choose something specific like "reading" or "exercising"
                        </Form.Text>
                                </Col>

                            </Form.Row>
                            {/*TODO: set the determined radio to be ticked for an edit */}
                            <div className="p-3 mb-3 mb-md-0 mr-md-3 bg-light">
                                {/* {console.log(typeof (iconInput))} */}
                                <Form.Label as="legend" column="md" md={2}>choose an icon:</Form.Label>
                                <div className="scrollme p-3 mb-3 mb-md-0 mr-md-3 bg-light">
                                    {iconList.map((name) => (
                                        <div className="icon-select" onClick={() => setIconInput(name)}>
                                            {/* <Form.Check inline value={name} type="radio" name="iconSelect" id={`inline-radio-1`} onClick={(e) => setIconInput(e.target.value)} /> */}
                                            <FontAwesomeIcon htmlFor={name} icon={['fas', `${name}`]} size="3x" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Form.Group>
                        <hr />
                        <div>
                            <h3>Specifications</h3>
                            <label htmlFor="amount">Amount:</label><input type="text" name="amount" placeholder="ex: 20" disabled={(specialToggle) ? true : false} value={amountInput} onChange={(e) => setAmountInput(e.target.value)} />
                            <label htmlFor="unit">Unit:</label><input type="text" name="unit" placeholder="ex: push-ups" disabled={(specialToggle) ? true : false} value={unitInput} onChange={(e) => setUnitInput(e.target.value)} />
                            <input type="checkbox" id="special" defaultChecked={(specialToggle) ? true : false} onClick={() => setSpecialToggle(!specialToggle)} /><label htmlFor="special">Special Instruction:</label><input type="text" name="special" placeholder="ex: take medicine" disabled={(specialToggle) ? false : true} value={specialInput} onChange={(e) => setSpecialInput(e.target.value)} />
                            {/* <button onClick={() => addSpecs()} >accept specifications</button> */}
                            {moment().format()}
                        </div>
                        <button onClick={abortTask}>Cancel</button>
                        {(store.edit.id) ? <button onClick={() => submitTask('edit')}>Submit Changes</button> : <button onClick={() => submitTask('add')}>Add Task</button>}
                        {(store.edit.id) ? <button onClick={() => handleDelete(store.edit.id)}>Delete</button> : ''}
                    </div>
                </Form>
            </Container>
        </>
    );
}

export default manageTaskPage;
