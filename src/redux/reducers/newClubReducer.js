//CURRENTLY NOT ASSIGNED TO ANY SAGASSS

const newClubReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_NEW_CLUB' :
            return action.payload
        default:
            return state
    }
}

export default newClubReducer;