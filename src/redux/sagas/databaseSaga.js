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

//DELETE USER FROM USER_CLUBS TABLE: LEAVE A BOOK CLUB
function* leaveBook(action) {
    try {
        yield axios.delete(`/database/${action.payload}`)
        yield action.history.push('/');
    } catch (error) {
        console.log('in leaveBook Error:', error);
    }
}


function* postDiscussion(action) {
    try {
        yield axios.post(`/database/${action.payload.clubId.id}`, action.payload)
    } catch (error) {
        console.log('in postDiscussion saga error:', error);
    }
}

//GET DISCUSSION BOARD FOR SINGLE CLUB ON DISPLAY
function* getDiscussionBoard(action) {
    try {
        let response = yield axios.get(`/database/discussion/${action.payload}`)
        console.log('in getDiscussionBoard saga:', response.data);
        //PUT TO REDUCER
        yield put({
            type: 'SET_DISCUSSION_BOARD',
            payload: response.data
        })
    } catch (error) {
        console.log('in getDiscussionBoard saga error:', error); 
    }
}


function* useBookId(action) {
    try {
        let response = yield axios.get(`/database/${action.payload}`)
        console.log('what is the payload?', action.payload);
        
        console.log('in useBookId:', response);
        yield put({
            type: 'SET_SINGLEBOOK_DETAILS',
            payload: response.data[0]
        })
    } catch (error) {
        console.log('in useBookId error:', error);
        
    }
}

function* deleteClub(action) {
    try {
        yield axios.delete(`/database/deletemyclub/${action.payload}`)
        console.log('in deleteClub saga');

        
    } catch (error) {
        console.log('in deleteClub error:', error);
        
    }
}

//GETS NOTIFICATION INVITES FOR HOME PAGE ON LOAD
function* getNotifications (action) {
    try {
        let response = yield axios.get(`/notifications`)
        console.log('in get notifications response:', response.data);
        yield put ({
            type: 'SET_NOTIFICATIONS',
            payload: response
        })
    } catch (error) {
        console.log('in get notifications saga error:', error);
    }
}

function* acceptInvite (action) {
    try {
        yield axios.put(`/notifications/${action.clubId}`, action.payload)
        // console.log('in accept invite saga response:', response);
        yield put ({
            type: 'GET_NOTIFICATIONS'
        })
    } catch (error) {
        console.log('in accept invite saga ERROR:', error);
    }
}


//WATCHER
function* databaseSaga() {
    //GETS TOP 3 CLUB DETAILS FOR THE HOME PAGE RENDER
    yield takeLatest('GET_CLUB_DETAILS', getClubDetail);
    // yield takeLatest('GET_ALL_CLUBS', getAllClubs)
    yield takeLatest('USE_BOOK_ID', useBookId)
    yield takeLatest('LEAVE_BOOK', leaveBook)
    yield takeLatest('POST_DISCUSSION_CONTENT', postDiscussion)
    yield takeLatest('GET_DISCUSSION_BOARD', getDiscussionBoard)
    yield takeLatest('DELETE_CLUB', deleteClub)
    yield takeLatest('GET_NOTIFICATIONS', getNotifications)
    yield takeLatest('ACCEPT_INVITE', acceptInvite)
}

export default databaseSaga;