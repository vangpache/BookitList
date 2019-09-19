
const searchUsersReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_INVITE_USERS' :
            return action.payload
        case 'ON_SUBMIT_CLEAR' :
            return state=[]
        default:
            return state
    }
}

export default searchUsersReducer;