//REDUCER TO CAPTURE DETAILS FOR HOME PAGE
//MIGHT BE ABLE TO USE WITH INDIVIDUAL CLUB PAGES --nope.

const databaseReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_CLUB_DETAILS' :
            return action.payload.data
        default:
            return state
    }
}

export default databaseReducer;