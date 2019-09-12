//CURRENTLY NOT ASSIGNED TO ANY SAGASSS

const singleBookReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_SINGLEBOOK_DETAILS' :
            return action.payload
        default:
            return state
    }
}



export default singleBookReducer;