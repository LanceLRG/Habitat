const editReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_EDIT':
        return action.payload[0];
      case 'UNSET_EDIT':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default editReducer;