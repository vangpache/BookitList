const notificationsReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_NOTIFICATIONS' :
            return action.payload.data
        default: 
        return state
    }
}

export default notificationsReducer;