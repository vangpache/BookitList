const discussionBoardReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_DISCUSSION_BOARD' :
            return action.payload
        default:
            return state
    }
}


export default discussionBoardReducer;