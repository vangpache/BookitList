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

function* sendInvites(action) {
    try {
        yield axios.post(`/usernames/${action.clubId.id}`, action.payload)
    } catch (error) {
        console.log('in sendInvites post error:', error);
        
    }
}

function* updateClubDetails(action) {
    // console.log('in update club details action.payload:', action.payload.clubId);
    
    try {
        yield axios.put(`/database`, action.payload)
        yield action.history.push(`/club/${action.payload.clubId}`)
    } catch (error) {
        console.log('in update club details error:', error);
    }
}

function* getMeetups(action) {
    try {
        let response = yield axios.get(`/database/meetup/get/${action.payload}`)
        console.log('in get meetups response:', response.data);
        //YIELD PUT SET MEETUPS TO REDUCER HERE
        yield put({
            type: 'SET_MEETUPS',
            payload: response.data
        })
    } catch (error) {
        console.log('error in getMeetups:', error);
    }
}

function* postMeetup(action) {
    try {
        yield axios.post('/database/meetup/post', action.payload)
        //YIELD PUT GET MEETUPS HERE
        yield put ({
            try: 'GET_MEETUPS'
        })
    } catch (error) {
        console.log('error in post meetup saga', error);
    }
}


//WATCHER SAGA
function* createNewSaga() {
    yield takeLatest ('SEARCH_GOODREADS', searchGoodReads);
    yield takeLatest('POST_NEWCLUB', postNewClub);
    yield takeLatest('UPDATE_CLUB_DETAILS', updateClubDetails);
    yield takeLatest('GET_USERNAMES', getUsernames);
    yield takeLatest('SEND_INVITES', sendInvites);
    yield takeLatest('POST_MEETUP', postMeetup);
    yield takeLatest('GET_MEETUPS', getMeetups)
   
}

export default createNewSaga;