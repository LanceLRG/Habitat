const primaryHistoryReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_PRIMARY_HISTORY':
        return action.payload;
      case 'UNSET_PRIMARY_HISTORY':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default primaryHistoryReducer;