
const searchUsersReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_INVITE_USERS' :
            return action.payload
        default:
            return state
    }
}

export default searchUsersReducer;