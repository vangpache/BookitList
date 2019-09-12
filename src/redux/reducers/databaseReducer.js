//REDUCER TO CAPTURE THE TOP 3 CLUBS FOR HOME PAGE
//MIGHT BE ABLE TO USE WITH INDIVIDUAL CLUB PAGES

const databaseReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_CLUB_DETAILS' :
            return action.payload.data
        default:
            return state
    }
}

export default databaseReducer;