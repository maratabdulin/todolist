import {appReducer, AppStatusStateType, setAppErrorAC, setAppStatusAC, setIsInitializedAC} from './app-reducer';

let startState: AppStatusStateType;

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
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

test('correct initialization status should be changed', () => {
    const endState: AppStatusStateType = appReducer(startState, setIsInitializedAC(true))
    expect(endState.isInitialized).toEqual(true)
})
