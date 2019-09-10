import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


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
}

export default createNewSaga;