const primaryTaskReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_PRIMARY_TASK':
        return action.payload[0];
      case 'UNSET_PRIMARY_TASK':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default primaryTaskReducer;