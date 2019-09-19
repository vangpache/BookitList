const membersReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_MEMBERS_TO_DISPLAY' :
        return action.payload.data
    default:
        return state 
    }
}

export default membersReducer;