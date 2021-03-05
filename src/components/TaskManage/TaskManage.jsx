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
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
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

        let task_specs = [{
            amount: (amountInput || null),
            unit: (unitInput || null),
            special: (specialInput || null),
            timer: false,
            timerTime: null,
            stopwatch: false,
            stopwatchTime: null,
        }]

        if (specialToggle){
            task_specs[0].amount = null;
            task_specs[0].unit = null;
        }
        else if (!specialToggle){
            task_specs[0].special = null;
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

    //list of icon names which will be looped over and displayed for selection
    const iconList = ['coffee', 'image', 'dumbbell', 'bicycle', `book-reader`, `book`, `brain`, `capsules`, `code`, `dollar-sign`, `dungeon`, `fist-raised`, `gamepad`, `globe`, `graduation-cap`, `guitar`, `hamburger`, `headphones-alt`, `hiking`, `home`, `music`,
        `language`, `hard-hat`, `dice`, `file-invoice-dollar`, `utensils`, `images`, `baby`, `wine-glass-alt`, `swimmer`, `leaf`, `shopping-cart`, `drafting-compass`, `quote-right`, `trophy`, `wrench`, `smoking-ban`, `couch`, `dog`, `key`, `marker`, `mobile`, `phone`,
         `place-of-worship`, `plug`, `pray`, `running`, `school`, `stethoscope`, `tooth`, `tv`, 'walking', 'yin-yang' ]
    return (
        <>
            <Container>
                <Form>
                    <div className="form-view p-3 mb-3 mb-md-0 mr-md-3 bg-light">
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
                            <Form.Text className="text-muted">
                            Single tasks require only one action to be completed.
                                    </Form.Text>
                                    <Form.Text className="text-muted">
                                    Mulptiple tasks require you complete several sub-tasks before it is marked as completed.
                                    </Form.Text>
                            </Col>
                            {/* <input type="radio" name="style" value="single" defaultChecked onClick={() => setStyleInput('single')} /><label htmlFor="single">Single</label>
                        <input type="radio" name="style" value="multiple" onClick={() => setStyleInput('multiple')} /><label htmlFor="multiple">Multiple</label> */}
                        </Form.Group>
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
                                <hr />
                                <Form.Row>
                                    <Col>
                                        <Form.Label htmlFor="amount">Amount</Form.Label>
                                        <Form.Control name="amount" type="number" placeholder="example: 20" disabled={(specialToggle) ? true : false} value={amountInput} onChange={(e) => setAmountInput(e.target.value)} />
                                        <Form.Text className="text-muted">
                                        Start off small, something you can't say 'no' to. You can always raise it later.
                                    </Form.Text>
                                    </Col>
                                    <Col>
                                        <Form.Label htmlFor="unit" >Unit</Form.Label>
                                        <Form.Control name="unit" type="text" placeholder="example: push-ups" disabled={(specialToggle) ? true : false} value={unitInput} onChange={(e) => setUnitInput(e.target.value)} />
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
                                    {(store.edit.id) ? <Button variant="danger" onClick={() => handleDelete(store.edit.id)}>Delete</Button> : ''}
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
