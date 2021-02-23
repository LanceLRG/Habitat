import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// This saga will recieve the id of the user logged in and send out a GET request to retrieve 
// all the tasks the user associate with that id has, and places them into the task reducer
function* fetchTask(action) {
    try{
        const response = yield axios.get(`/api/task/${action.payload.userId}`)
        yield put ({type: 'SET_TASK', payload: response.data})
    } catch (error) {
        console.log(`error GETTING tasks, ${error}`);
    }
}

function* fetchPrimary(action) {
    try{
        const response = yield axios.get(`/api/task/primary/${action.payload.userId}`)
        yield put ({type: 'SET_PRIMARY_TASK', payload: response.data})
    } catch (error) {
        console.log(`error GETTING primary task, ${error}`);
    }
}

function* addTask(action) {
    try{
        yield axios.post('/api/task', action.payload)
        yield put({type: 'FETCH_TASK', payload: {userId: action.payload.user_id}})
    } catch (error) {
        console.log(`error POSTING new task, ${error}`);
    }
}

//TODO: implement an automatic NEW DAY to check current day with most recent primary task date and add trigger day resets

function* taskSaga() {
    yield takeLatest ('FETCH_TASK', fetchTask);
    yield takeLatest ('FETCH_PRIMARY', fetchPrimary);
    yield takeLatest ('ADD_TASK', addTask);
}

export default taskSaga