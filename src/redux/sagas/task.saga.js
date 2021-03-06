import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// This saga will recieve the id of the user logged in and send out a GET request to retrieve 
// all the tasks the user associate with that id has, and places them into the task reducer
function* fetchTask() {
    try {
        const response = yield axios.get(`/api/task/`)
        yield put({ type: 'SET_TASK', payload: response.data })
    } catch (error) {
        console.log(`error GETTING tasks, ${error}`);
    }
}

function* fetchPrimary() {
    try {
        // gets all the days the user has on record
        const response = yield axios.get(`/api/task/primary/`)
        const today = new Date();
        if (!response.data[0]){
            //if there's nothing in the record, add today and try again.
            yield put({ type: 'ADD_PRIMARY', payload: { date: today.setHours(0, 0, 0, 0)}})
        }
        const record = new Date(response.data[0].date);
        if ((today.setHours(0, 0, 0, 0) - record.setHours(0, 0, 0, 0)) >= 86400000 || !response.data) {
            console.log('comparing:', today.setHours(0, 0, 0, 0) - record.setHours(0, 0, 0, 0));
            if (response.data[0].complete === false || (today.setHours(0, 0, 0, 0) - record.setHours(0, 0, 0, 0)) >= 172800000){
                console.log('breaking your streak!');
                yield axios.put('/api/task/break')
            }
            //add a new day
            yield put({ type: 'ADD_PRIMARY', payload: { date: today.setHours(0, 0, 0, 0)}})
            //resets user's tasks back to incomplete
            yield axios.put(`/api/task/resettask/`)
        }
        yield put({ type: 'SET_PRIMARY_TASK', payload:response.data })
        yield put({ type: 'SET_PRIMARY_HISTORY', payload:response.data })
        yield put({type: 'FETCH_TASK'})
    } catch (error) {
        console.log(`error GETTING primary task, ${error}`);
    }
}

function* addPrimary(action) {
    try {
        yield axios.post('/api/task/addprimary', action.payload)
        yield put({type: 'FETCH_PRIMARY'})
    } catch (error) {
        console.log(`error POSTING primarey task, ${error}`);
    }
}

function* addTask(action) {
    try {
        yield axios.post('/api/task', action.payload)
        yield put({ type: 'FETCH_TASK'})
    } catch (error) {
        console.log(`error POSTING new task, ${error}`);
    }
}

function* completeTask(action) {
    try {
        yield axios.put(`/api/task/complete/${action.payload.taskId}`)
        yield put({ type: 'FETCH_TASK'})
    } catch (error) {
        console.log(`error PUTTING task completion, ${error}`);
    }
}

function* undoTask(action) {
    try {
        yield axios.put(`/api/task/undo/${action.payload.taskId}`)
        yield put({ type: 'FETCH_TASK'})
    } catch (error) {
        console.log(`error PUTTING task undo, ${error}`);
    }
}

function* fetchEdit(action) {
    try{
        console.log(action.payload);
        const response = yield axios.get(`/api/task/edit/${action.payload}`)
        yield put({type: 'SET_EDIT', payload: response.data})
    } catch (error) {
        console.log(`error GETTING task for edit, ${error}`);
    }
}

function* editTask(action) {
    try{
        yield axios.put(`/api/task/edit`, action.payload)
        yield put({type: 'FETCH_TASK'})
    } catch (error) {
        console.log(`error PUTTING task edit, ${error}`);
    }
}

function* deleteTask(action) {
    try{
        yield axios.delete(`/api/task/${action.payload}`)
        yield put({type: 'FETCH_TASK'})
    } catch (error) {
        console.log(`error DELETING task, ${error}`);
    }
}

//submits a POST to the given day to the opposite of the completion status it was given, then refreshes the primary task store
function* toggleDay(action) {
    try {
        yield axios.put('/api/task/toggle', action.payload)
        yield put({ type: 'FETCH_PRIMARY', payload: action.payload })
    } catch (error) {
        console.log(`error PUTTING day toggle, ${error}`);
    }
}

function* raiseLongest(action) {
    try{
        yield axios.put('/api/task/raise', action.payload)
        yield put({type: 'FETCH_PRIMARY', payload: action.payload})
    } catch (error) {
        console.log(`error PUTTING for raise longest, ${error}`);
    }
}


function* taskSaga() {
    yield takeLatest('FETCH_TASK', fetchTask);
    yield takeLatest('FETCH_PRIMARY', fetchPrimary);
    yield takeLatest('ADD_TASK', addTask);
    yield takeLatest('COMPLETE_TASK', completeTask);
    yield takeLatest('UNDO_TASK', undoTask);
    yield takeLatest('TOGGLE_DAY', toggleDay);
    yield takeLatest('ADD_PRIMARY', addPrimary);
    yield takeLatest('FETCH_EDIT', fetchEdit);
    yield takeLatest('EDIT_TASK', editTask);
    yield takeLatest('DELETE_TASK', deleteTask);
    yield takeLatest('RAISE_LONGEST_STREAK', raiseLongest);
}

export default taskSaga