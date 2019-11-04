const meetupsReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_MEETUPS' :
            console.log('meetups reducer payload:', action.payload);
            
            return action.payload
        default : 
        return state
    }
}

export default meetupsReducer;