import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTask() {
  try{
      const response = yield axios.get('/api/test')
      yield put({type:'SET_TASK', payload: response.data})
  } catch (error) {
    console.log(error);
  }
}

function* testingSaga() {
    yield takeLatest('FETCH_TASK', fetchTask );
  }
  
  export default testingSaga;
  