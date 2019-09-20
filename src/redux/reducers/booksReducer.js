const booksReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BOOKS':
            return action.payload
        case 'CLEAR_BOOKS_REDUCER' :
            return state=[]
        default:
            return state
    }
}


export default booksReducer;