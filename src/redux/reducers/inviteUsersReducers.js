//CURRENTLY NO LONGER IN USE! INVITES ARE STORED LOCALLY ON USERNAME SEARCH COMPONENT AND DISPATCHED FROM THERE STRAIGHT TO INVITES DATABASE!
const inviteUsersReducer = (state=[], action) => {
    switch(action.type) {
        case 'SAVE_USER_INVITES' :
            return action.payload
        default:
            return state
    }
}

export default inviteUsersReducer;