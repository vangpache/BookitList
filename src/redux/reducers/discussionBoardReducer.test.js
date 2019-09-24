//UNIT TESTING: DISCUSSION BOARD REDUCER

import discussionBoardReducer from '../reducers/discussonBoardReducer';

describe('Testing discussion board reducer', () => {
    test('should have the state passed into it, undefined', () => {
        let action = { type: 'SET_DISCUSSION_BOARD' }
        let returnedState = discussionBoardReducer(undefined, action);
        expect(returnedState).toEqual(undefined)
    })
})