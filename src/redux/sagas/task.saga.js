import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// This saga will recieve the id of the user logged in and send out a GET request to retrieve 
// all the tasks the user associate with that id has, and places them into the task reducer
function* fetchTask(action) {
    try {
        const response = yield axios.get(`/api/task/${action.payload.userId}`)
        yield put({ type: 'SET_TASK', payload: response.data })
    } catch (error) {
        console.log(`error GETTING tasks, ${error}`);
    }
}

function* fetchPrimary(action) {
    try {
        // gets all the days the user has on record
        const response = yield axios.get(`/api/task/primary/${action.payload.userId}`)
        const record = new Date(response.data[0].date);
        const today = new Date();
        //TODO: implement an automatic NEW DAY to check current day with most recent primary task date and add trigger day resets
        if ((today.setHours(0, 0, 0, 0) - record.setHours(0, 0, 0, 0)) >= 8640000 || response.data[0].date === undefined) {
            //add a new day
            yield put({ type: 'ADD_PRIMARY', payload: { date: today.setHours(0, 0, 0, 0), userId:action.payload.userId }})
            //resets user's tasks back to incomplete
            yield axios.put(`/api/task/resettask/${action.payload.userId}`)
        }
        yield put({ type: 'SET_PRIMARY_TASK', payload:response.data })
    } catch (error) {
        console.log(`error GETTING primary task, ${error}`);
    }
}

function* addPrimary(action) {
    try {
        yield axios.post('/api/task/addprimary', action.payload)
        yield put({type: 'FETCH_PRIMARY', payload: action.payload.userId})
    } catch (error) {
        console.log(`error POSTING primarey task, ${error}`);
    }
}

function* addTask(action) {
    try {
        yield axios.post('/api/task', action.payload)
        yield put({ type: 'FETCH_TASK', payload: { userId: action.payload.user_id } })
    } catch (error) {
        console.log(`error POSTING new task, ${error}`);
    }
}

function* completeTask(action) {
    try {
        yield axios.put(`/api/task/complete/${action.payload.taskId}`)
        yield put({ type: 'FETCH_TASK', payload: action.payload })
    } catch (error) {
        console.log(`error PUTTING task completion, ${error}`);
    }
}

function* undoTask(action) {
    try {
        yield axios.put(`/api/task/undo/${action.payload.taskId}`)
        yield put({ type: 'FETCH_TASK', payload: action.payload })
    } catch (error) {
        console.log(`error PUTTING task undo, ${error}`);
    }
}

function* editTask(action) {
    try{
        console.log(action.payload);
        const response = yield axios.get(`/api/task/edit/${action.payload}`)
        yield put({type: 'SET_EDIT', payload: response.data})
    } catch (error) {
        console.log(`error GETTING task for edit, ${error}`);
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


function* taskSaga() {
    yield takeLatest('FETCH_TASK', fetchTask);
    yield takeLatest('FETCH_PRIMARY', fetchPrimary);
    yield takeLatest('ADD_TASK', addTask);
    yield takeLatest('COMPLETE_TASK', completeTask);
    yield takeLatest('UNDO_TASK', undoTask);
    yield takeLatest('TOGGLE_DAY', toggleDay);
    yield takeLatest('ADD_PRIMARY', addPrimary);
    yield takeLatest('EDIT_TASK', editTask);
}

export default taskSaga