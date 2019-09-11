import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* getClubDetail(action) {
    try {
        let response = yield axios.get('/database')
        console.log('in get book detail');
        yield put({
            type: 'SET_CLUB_DETAILS',
            payload: response
        })
    } catch (error) {
        console.log('in GET CLUB DETAILS error:', error);   
    }
}


//WATCHER
function* databaseSaga() {
    yield takeLatest('GET_CLUB_DETAILS', getClubDetail);
}

export default databaseSaga;