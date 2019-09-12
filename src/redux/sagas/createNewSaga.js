import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* postNewClub(action) {
    try {
        yield axios.post(`/database`, action.payload)
        // INSERT A GET TO RETRIEVE THE CLUB INFO AND ID
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