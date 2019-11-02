import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addProfileImage(action) {
    try {
        yield axios.put('/fileupload', action.payload)
        yield put ({
            type: 'FETCH_USER'
        })
        
    } catch (error) {
     console.log('error in add profile image saga', error);
        
    }
}

function* updateProfile(action) {
    try {
        yield axios.put('/fileupload/updateprofile', action.payload)
        yield put({
            type: 'FETCH_USER'
        })
    } catch (error) {
        console.log('error in update profile info', error);
    }
}

//WATCHER
function* userProfileSaga() {
    yield takeLatest('ADD_PROFILE_IMAGE', addProfileImage);
    yield takeLatest('UPDATE_PROFILE', updateProfile);
}

export default userProfileSaga;