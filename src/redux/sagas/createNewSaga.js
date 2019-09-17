import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



function* postNewClub(action) {
    try {
        let response = yield axios.post(`/database`, action.payload)
        // INSERT A GET TO RETRIEVE THE CLUB INFO AND ID
        console.log('in postNewClub club id:', response.data.clubs_id);
        // console.log('in postNewClub history:', action.history);
        //MOVE LOCATION
        yield action.history.push(`/club/${response.data.clubs_id}`)
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

///GET USERNAMES FOR USER SEARCH INVITES
function* getUsernames(action) {
    try {
        let response = yield axios.get(`/usernames/${action.payload}`)
        yield put({
            type: 'SET_INVITE_USERS',
            payload: response.data[0]
        })     
    } catch (error) {
        console.log('in getUsernames saga error:', error);       
    }
}

//TAKES THE ADDED USER TO INVITE AND SPREADS IN THE INVITE-USERS-REDUCER STATE
function* inviteUser(action) {
    try {
        yield put ({
            type: 'SAVE_USER_INVITES',
            payload: action.payload
        })
    } catch (error) {
        console.log('in inviteUsers Error', error);
    }
}

function* sendInvites(action) {
    try {
        yield axios.post(`/usernames/${action.clubId.id}`, action.payload)
    } catch (error) {
        console.log('in sendInvites post error:', error);
        
    }
}


//WATCHER SAGA
function* createNewSaga() {
    yield takeLatest ('SEARCH_GOODREADS', searchGoodReads);
    yield takeLatest('POST_NEWCLUB', postNewClub)
    yield takeLatest('GET_USERNAMES', getUsernames)
    // yield takeLatest('INVITE_USER', inviteUser)
    yield takeLatest('SEND_INVITES', sendInvites)
   
}

export default createNewSaga;