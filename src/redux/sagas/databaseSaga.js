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


//WATCHER
function* databaseSaga() {
    //GETS TOP 3 CLUB DETAILS FOR THE HOME PAGE RENDER
    yield takeLatest('GET_CLUB_DETAILS', getClubDetail);
    // yield takeLatest('GET_ALL_CLUBS', getAllClubs)
}

export default databaseSaga;