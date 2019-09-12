import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* postNewClub(action) {
    try {
        let response = yield axios.post(`/database`, action.payload)
        // INSERT A GET TO RETRIEVE THE CLUB INFO AND ID
        console.log('in postNewClub club id:', response.data);
        console.log('in postNewClub history:', action.history);
        //MOVE LOCATION
        yield action.history.push(`/club/${response.data[0].id}`)
        // DISPATCH THE ID TO THE NEW CLUB'S PAGE VIEW THROUGH SET NEW CLUB REDUCER
        // yield put ({
        //     type: 'SET_NEW_CLUB',
        //     payload: response.data
        // })
    } catch (error) {
        console.log('in postNewClub error:', error);
    }
}


function* searchGoodReads(action) {
    try {
        let response = yield axios.get(`/books/${action.payload}`)
        console.log('in getBooks:', response);
        yield put({
            type: 'SET_BOOKS',
            payload: response.data.GoodreadsResponse.search.results.work
        })
    } catch (error) {
        console.log('error in getBooks');
    }
}

//WATCHER SAGA
function* createNewSaga() {
    yield takeLatest ('SEARCH_GOODREADS', searchGoodReads);
    yield takeLatest('POST_NEWCLUB', postNewClub)
   
}

export default createNewSaga;