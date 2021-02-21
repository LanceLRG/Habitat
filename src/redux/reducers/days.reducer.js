const daysReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DAYS':
            return action.payload;
        default:
            return state;
    }
};

export default daysReducer;