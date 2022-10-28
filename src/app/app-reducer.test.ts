import {appReducer, AppStatusStateType, setAppErrorAC, setAppStatusAC} from './app-reducer';

let startState: AppStatusStateType;

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
    }
})

test('correct app status should be changed', () => {
    const endState: AppStatusStateType = appReducer(startState, setAppStatusAC('succeeded'))
    expect(endState.status).toEqual('succeeded')
})

test('correct error status should be changed', () => {
    const endState: AppStatusStateType = appReducer(startState, setAppErrorAC('some error'))
    expect(endState.error).toEqual('some error')
})
