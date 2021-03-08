import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Swal from 'sweetalert2';


import './TaskManage.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

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
    const [timerToggle, setTimerToggle] = useState(false);
    const [timerTime, setTimerTime] = useState('');

    const fillIn = () => {
        if (store.edit.id) {
            setStyleInput(store.edit.style);
            setNameInput(store.edit.name);
            setIconInput(store.edit.icon);
            setAmountInput(store.edit.amount || '');
            setUnitInput(store.edit.unit || '');
            if (store.edit.timer) {
                setTimerToggle(true);
                setTimerTime(store.edit.timer_time);
            }
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

        let task_specs = [{
            amount: (amountInput || null),
            unit: (unitInput || null),
            special: (specialInput || null),
            timer: timerToggle,
            timerTime: (timerTime || null),
            stopwatch: false,
            stopwatchTime: null,
        }]

        if (specialToggle || timerToggle) {
            task_specs[0].amount = null;
            task_specs[0].unit = null;
        }
        else if (!specialToggle) {
            task_specs[0].special = null;
        }
        else if (!timerToggle) {
            task_specs[0].timer = false;
            task_specs[0].timer_time = null;
        }

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
            console.log('editing task', newTask);
            dispatch({ type: 'EDIT_TASK', payload: newTask })
            dispatch({ type: 'UNSET_EDIT' })
            history.push('/home')
        }
    }

    const handleDelete = (taskId) => {
        dispatch({ type: 'DELETE_TASK', payload: taskId })
        dispatch({ type: 'UNSET_EDIT' })
        history.push('/home')
    }

    const abortTask = () => {
        if (store.edit.id) {
            dispatch({ type: 'UNSET_EDIT' })
        }
        history.push('/home')
    }

    //list of icon names which will be looped over and displayed for selection
    const iconList = ['coffee', 'image', 'dumbbell', 'bicycle', `book-reader`, `book`, `brain`, `capsules`, `code`, `dollar-sign`, `dungeon`, `fist-raised`, `gamepad`, `globe`, `graduation-cap`, `guitar`, `hamburger`, `headphones-alt`, `hiking`, `home`, `music`,
        `language`, `hard-hat`, `dice`, `file-invoice-dollar`, `utensils`, `images`, `baby`, `wine-glass-alt`, `swimmer`, `leaf`, `shopping-cart`, `drafting-compass`, `quote-right`, `trophy`, `wrench`, `smoking-ban`, `couch`, `dog`, `key`, `marker`, `mobile`, `phone`,
        `place-of-worship`, `plug`, `pray`, `running`, `school`, `stethoscope`, `tooth`, `tv`, 'walking', 'yin-yang']
    return (
        <>
            <Container>
                <Form>
                    <div className="form-view p-3 mb-3 mb-md-0 mr-md-3 bg-light">
                        {/* <Form.Group as={Row}>
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
                                <Form.Text className="text-muted">
                                    Single tasks require only one action to be completed.
                                    </Form.Text>
                                <Form.Text className="text-muted">
                                    Mulptiple tasks require you complete several sub-tasks before it is marked as completed.
                                    </Form.Text>
                            </Col>
                        </Form.Group> */}
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
                                        What do you want to do? Common tasks include "exercising", "reading", "meditating", etc.
                                    </Form.Text>
                                </Col>

                            </Form.Row>
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
                        <Form.Group>
                            <div>
                                <h3>Specifications</h3>
                                <Form.Text className="text-muted">
                                    Start off small, something you can't say 'no' to. You can always raise it later.
                                    </Form.Text>
                                <hr />
                                <Form.Row>
                                    <Col>
                                        <Form.Label htmlFor="amount">Amount</Form.Label>
                                        <Form.Control name="amount" type="number" placeholder="example: 20" disabled={(specialToggle || timerToggle) ? true : false} value={amountInput} onChange={(e) => setAmountInput(e.target.value)} />

                                        <Form.Label htmlFor="unit" >Unit</Form.Label>
                                        <Form.Control name="unit" type="text" placeholder="example: push-ups" disabled={(specialToggle || timerToggle) ? true : false} value={unitInput} onChange={(e) => setUnitInput(e.target.value)} />
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label="Timer" checked={(timerToggle) ? true : false} onClick={() => setTimerToggle(!timerToggle)} />
                                            <InputGroup>
                                                <Form.Control aria-describedby="basic-addon1" name="timer" type="number" disabled={(timerToggle) ? false : true} value={timerTime} onChange={(e) => setTimerTime(e.target.value)} />
                                                <InputGroup.Append>
                                                    <InputGroup.Text id="basic-addon1">Minutes</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <Form.Text className="text-muted">
                                                Tasks with a timer require the timer to run fully before being marked complete. If you'd prefer to manage your time less strictly, record it into the amount and unit fields and keep track of the time by some other means.
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <br />
                                <Form.Label htmlFor="special">Special Instruction:</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox checked={(specialToggle) ? true : false} onClick={() => setSpecialToggle(!specialToggle)} />
                                    </InputGroup.Prepend>
                                    <Form.Control placeholder="ex: take medicine" disabled={(specialToggle) ? false : true} value={specialInput} onChange={(e) => setSpecialInput(e.target.value)} />
                                </InputGroup>
                                <Form.Text className="text-muted">
                                    This is also a good place to specify <i>when</i> you'd like to do something, like "after work" or "on the bus".
                                    </Form.Text>
                            </div>
                            <br />
                            <Row>
                                <Col xs="auto">
                                    <Button variant="secondary" onClick={abortTask}>Cancel</Button>
                                </Col>
                                <Col xs={6}>
                                    {(store.edit.id) ? <Button block variant="primary" onClick={() => submitTask('edit')}>Submit Changes</Button> : <Button block variant="success" onClick={() => submitTask('add')}>Add Task</Button>}
                                </Col>
                                <Col md={{ span: 1, offset: 3 }}>
                                    {(store.edit.id) ? <Button variant="danger" onClick={() => Swal.fire({
                                        title: 'Are you sure?',
                                        text: "You won't be able to revert this!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Yes, delete it!'
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            handleDelete(store.edit.id);
                                            Swal.fire(
                                                'Deleted!',
                                                'Your task has been deleted.',
                                                'success'
                                            )
                                        }
                                    })}> Delete</Button > : ''}
                                </Col>
                            </Row>
                        </Form.Group>
                    </div>
                </Form>
            </Container>
        </>
    );
}
export default manageTaskPage;
