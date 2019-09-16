const inviteUsersReducer = (state=[], action) => {
    switch(action.type) {
        case 'INVITE_USER' :
            return [...state,
                    action.payload]
        default:
            return state
    }
}

export default inviteUsersReducer;