import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


//GETS ALL THE CLUBS FOR ONE USER TO DISPLAY ON HOME PAGE
// function* getAllClubs(action) {
//     try {
//         let response = yield axios.get('/database')
//     } catch (error) {
        
//     }
// }




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

//DELETE USER FROM USER_CLUBS TABLE: LEAVE A BOOK CLUB
function* leaveBook(action) {
    try {
        yield axios.delete(`/database/${action.payload}`)
        yield action.history.push('/');
    } catch (error) {
        console.log('in leaveBook Error:', error);
    }
}

function* useBookId(action) {
    try {
        let response = yield axios.get(`/database/${action.payload}`)
        console.log('in useBookId:', response.data[0]);
        yield put({
            type: 'SET_SINGLEBOOK_DETAILS',
            payload: response.data[0]
        })
    } catch (error) {
        console.log('in useBookId:', error);
        
    }
}


//WATCHER
function* databaseSaga() {
    //GETS TOP 3 CLUB DETAILS FOR THE HOME PAGE RENDER
    yield takeLatest('GET_CLUB_DETAILS', getClubDetail);
    // yield takeLatest('GET_ALL_CLUBS', getAllClubs)
    yield takeLatest('USE_BOOK_ID', useBookId)
    yield takeLatest('LEAVE_BOOK', leaveBook)
}

export default databaseSaga;