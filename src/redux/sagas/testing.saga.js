import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTask() {
  try{
      const response = yield axios.get('/api/test')
      yield put({type:'SET_TASK', payload: response.data})
  } catch (error) {
    console.log(error);
  }
}

function* addTask(action) {
  try{
    yield axios.post('/api/test', action.payload);
    yield put({type:'FETCH_TASK'})
  } catch (error) {
    console.log(error);
  }
}

function* completeTask(action) {
  try{
    yield axios.put('/api/test', action.payload);
    yield put({type: 'FETCH_TASK'})
  } catch (error) {
    console.log(error);
  }
}

function* checkDay(action) {
  try {
    const response = yield axios.get('/api/test/check')
    console.log("today", Date.parse(action.payload.today));
    console.log('last recorded day', Date.parse(response.data[0].date));
    console.log('difference is:', Date.parse(action.payload.today) - Date.parse(response.data[0].date), 'milliseconds');
    //check if today is more than 86,401,000 ms (24 hours and 1 second) since the most recent date in the table
    //an extra second is given because every so often a leap second is added on the last day of June or December. Thanks a lot, Moon.
    //or if there was no previously recorded day.
    if (Date.parse(action.payload.today) - Date.parse(response.data[0].date) > 86401000 || !response.data[0].date_day) {
      console.log('sending', action.payload.today);
      yield put({type: "ADD_DAY", payload: {newday: action.payload.today}})
    }
    yield put({type: 'FETCH_DAYS'})
  }catch (error) {
    console.log(error);
  }
}

function* addDay(action) {
  try{
    yield axios.post('/api/test/newday', action.payload)
    yield put({type: 'FETCH_DAYS'})
  } catch (error) {
    console.log(error);
  }
}

function* fetchDays() {
  try{
    const response = yield axios.get('/api/test/getdays')
    yield put({type: 'SET_DAYS', payload: response.data});
  }catch (error) {
    console.log(error);
  }
}

function* testingSaga() {
    yield takeEvery('FETCH_TASK', fetchTask );
    yield takeEvery('ADD_TASK', addTask);
    yield takeEvery('COMPLETE_TASK', completeTask);
    yield takeEvery('CHECK_DAY', checkDay);
    yield takeEvery('ADD_DAY', addDay);
    yield takeEvery('FETCH_DAYS', fetchDays);
  }
  
  export default testingSaga;
  