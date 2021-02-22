import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import task from './task.reducer';
import primaryTask from './primary.task.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  task, // contains all tasks for the logged in user
  primaryTask, //contains every day a user has logged in, completion status for that day, and streak info
});

export default rootReducer;
